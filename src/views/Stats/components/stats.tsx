import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import firebase from "../../../firebase";
import "firebase/firestore";

import {
  Grid,
  Content,
  Container,
  Table,
  Row,
  Col,
  Button,
  Progress,
} from "rsuite";

import SharedFooter from "../../Shared/footer";
import SharedHeader from "../../Shared/header";
import Loading from "../../Shared/loading";
const { Circle } = Progress;

const { Column, HeaderCell, Cell, Pagination } = Table;

const Stats = () => {
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  const history = useHistory();
  const [page, setPage] = useState(0);
  const displayLength = 30;
  const authContext = useContext(AuthContext);
  const user = authContext.user;

  useEffect(() => {
    const db = firebase.firestore();

    if (user) {
      db.collection("users")
        .where("uid", "==", user.uid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const userDoc = doc.data();
            setCurrentUser(userDoc);
          });
        });
    } else {
      // No user is signed in.
    }

    db.collection("users")
      .doc(firebase.auth().currentUser!.uid)
      .get()
      .then((res) => {
        const user = res.data();
        if (user) {
          // TODO set more data for the logged in user
          // setUserName(user["username"]);
          const userRef = db
            .collection("users")
            .orderBy("points", "desc")
            .limit(30)
            .get();

          userRef
            .then(function (querySnapshot) {
              let counter = 1;
              querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                const userData = doc.data();

                let questions = 0;
                if (userData.levels) {
                  Object.keys(userData.levels).map((key) => {
                    const lvl = userData.levels[key];
                    questions += lvl.answered.length;
                  });
                }

                const user = {
                  ...doc.data(),
                  id: counter,
                  username: userData.username
                    .toLowerCase()
                    .split(" ")
                    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
                    .join(" "),
                  answers: questions + "/65",
                };
                counter++;
                let newUsers = users;
                newUsers.push(user);
                setUsers(newUsers);
              });
              setLoading(false);
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
          // Get the List of users
        }
      });
  }, []);

  if (loading) return <Loading />;
  let questions = 0;
  if (currentUser.levels) {
    Object.keys(currentUser.levels).map((key) => {
      const lvl = currentUser.levels[key];
      questions += lvl.answered.length;
    });
  }
  return (
    <Container>
      <SharedHeader />
      <Content>
        <Grid>
          <Row className="login-top" style={{ textAlign: "left" }}>
            <Col md={24} mdOffset={0}>
              <Row>
                <Col md={12}>
                  <h1>Estadisticas</h1>
                </Col>
              </Row>
              <Row>
                <Col md={12}>
                  <h3>Hola {currentUser.username} </h3>
                  <h3>Sumaste: {currentUser.points} Puntos</h3>
                </Col>
                <Col md={2} xsHidden={true}>
                  <Circle
                    percent={(questions * 100) / 65}
                    strokeColor="#ffc107"
                    showInfo={false}
                  />
                </Col>
                <Col md={2} xsHidden={true}>
                  <h4
                    style={{
                      color: "rgb(165, 173, 187)",
                      textAlign: "center",
                      lineHeight: "20px",
                      marginTop: 20,
                    }}
                  >
                    {questions}/65 <br />
                    <small style={{ fontSize: 13 }}>preguntas</small>
                  </h4>
                </Col>
                <Col md={2} xsHidden={true}>
                  <Circle
                    percent={(currentUser.level * 100) / 4}
                    strokeColor="#ffc107"
                    showInfo={false}
                  />
                </Col>
                <Col md={2} xsHidden={true}>
                  <h4
                    style={{
                      color: "rgb(165, 173, 187)",
                      textAlign: "center",
                      lineHeight: "20px",
                      marginTop: 20,
                    }}
                  >
                    {currentUser.level}/4
                    <br />
                    <small style={{ fontSize: 13 }}>niveles</small>
                  </h4>
                </Col>
                <Col md={4} xsHidden={true}>
                  <Button color="yellow" onClick={() => history.push("/game")}>
                    IR AL JUEGO
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row className="login-top" style={{ textAlign: "left" }}>
            <Col md={24} mdOffset={0}>
              <div>
                <Table
                  virtualized
                  height={600}
                  autoHeight
                  data={users}
                  onRowClick={(data) => {
                    console.log(data);
                  }}
                >
                  <Column width={70} align="center">
                    <HeaderCell>#</HeaderCell>
                    <Cell dataKey="id" />
                  </Column>

                  <Column width={300}>
                    <HeaderCell>Participante</HeaderCell>
                    <Cell dataKey="username" />
                  </Column>

                  <Column width={130}>
                    <HeaderCell>Aciertos</HeaderCell>
                    <Cell dataKey="answers" />
                  </Column>

                  <Column width={80}>
                    <HeaderCell>Nivel</HeaderCell>
                    <Cell dataKey="level" />
                  </Column>

                  <Column width={130}>
                    <HeaderCell>Puntos</HeaderCell>
                    <Cell dataKey="points" />
                  </Column>
                </Table>
                <Pagination
                  activePage={page}
                  displayLength={displayLength}
                  total={users.length}
                  onChangePage={(dataKey) => setPage(dataKey)}
                  // onChangeLength={this.handleChangeLength}
                />
              </div>
            </Col>
          </Row>
        </Grid>
      </Content>
      <SharedFooter />
    </Container>
  );
};

export default Stats;
