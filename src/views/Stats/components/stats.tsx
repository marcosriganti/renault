import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../../firebase";
import "firebase/firestore";

import { Grid, Content, Container, FlexboxGrid, Table } from "rsuite";

import SharedFooter from "../../Shared/footer";
import SharedHeader from "../../Shared/header";
import Loading from "../../Shared/loading";

const { Column, HeaderCell, Cell, Pagination } = Table;

const Stats = () => {
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(true);
  const [users, setUsers] = useState([]);
  const history = useHistory();
  const [page, setPage] = useState(0);
  const displayLength = 30;

  useEffect(() => {
    const db = firebase.firestore();
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

                const { levels } = userData.levels;
                let questions = 0;
                if (userData.levels) {
                  console.log(userData.levels);
                  Object.keys(userData.levels).map((key) => {
                    const lvl = userData.levels[key];
                    questions += lvl.answered.length;
                  });
                }

                const user = {
                  ...doc.data(),
                  id: counter,
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
          console.log(users);
        }
      });
  }, []);

  if (loading) return <Loading />;

  const tableData = users.slice(
    page * displayLength,
    page * displayLength + displayLength
  );
  console.log(users, tableData);
  return (
    <Container>
      <SharedHeader />
      <Content style={{ paddingTop: 100 }}>
        <FlexboxGrid justify="center" className="login-middle">
          <FlexboxGrid.Item colspan={10}>
            <h1>Estadisticas</h1>
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
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <SharedFooter />
    </Container>
  );
};

export default Stats;
