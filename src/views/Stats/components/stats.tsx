import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../../firebase";
import "firebase/firestore";

import { Grid, Content, Container, FlexboxGrid, Table } from "rsuite";

import SharedFooter from "../../Shared/footer";
import SharedHeader from "../../Shared/header";
import Logo from "../../../images/logo.png";

const { Column, HeaderCell, Cell, Pagination } = Table;

const Stats = () => {
  const [userName, setUserName] = useState();
  const [users, setUsers] = useState([]);
  const history = useHistory();

  const handleClick = (event: any) => {
    event.preventDefault();

    firebase
      .auth()
      .signOut()
      .then((res) => {
        history.push("/auth/login");
      });
  };

  useEffect(() => {
    const db = firebase.firestore();
    db.collection("users")
      .doc(firebase.auth().currentUser!.uid)
      .get()
      .then((res) => {
        const user = res.data();
        if (user) {
          // TODO set more data for the logged in user
          setUserName(user["username"]);
          const userRef = db.collection("users").get();
          userRef
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                console.log(doc.id, " => ", doc.data());
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
          // Get the List of users
        }
      });
  }, []);

  return (
    <Container>
      <SharedHeader />
      <Content style={{ paddingTop: 100 }}>
        <FlexboxGrid justify="center" className="login-middle">
          <FlexboxGrid.Item colspan={10}>
            <h1>Estadisticas</h1>
            <p className="text-center">
              <div>
                <Table
                  virtualized
                  height={400}
                  data={[]}
                  onRowClick={(data) => {
                    console.log(data);
                  }}
                >
                  <Column width={70} align="center" fixed>
                    <HeaderCell>#</HeaderCell>
                    <Cell dataKey="id" />
                  </Column>

                  <Column width={130}>
                    <HeaderCell>Participante</HeaderCell>
                    <Cell dataKey="firstName" />
                  </Column>

                  <Column width={130}>
                    <HeaderCell>Aciertos</HeaderCell>
                    <Cell dataKey="lastName" />
                  </Column>

                  <Column width={200}>
                    <HeaderCell>Nivel</HeaderCell>
                    <Cell dataKey="city" />
                  </Column>

                  <Column width={200}>
                    <HeaderCell>Puntos</HeaderCell>
                    <Cell dataKey="street" />
                  </Column>
                </Table>
              </div>
            </p>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <SharedFooter />
    </Container>
  );
};

export default Stats;
