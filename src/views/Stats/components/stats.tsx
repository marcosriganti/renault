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
          setUserName(user["username"]);
          const userRef = db.collection("users").limit(30).get();
          userRef
            .then(function (querySnapshot) {
              querySnapshot.forEach(function (doc) {
                // doc.data() is never undefined for query doc snapshots
                const user = {
                  id: doc.id,
                  points: 0,
                  level: 1,
                  questions: 0,
                  ...doc.data(),
                };
                let newUsers = users;
                newUsers.push(user);
                setUsers(newUsers);
              });
            })
            .catch(function (error) {
              console.log("Error getting documents: ", error);
            });
          // Get the List of users
          console.log(users);
        }
      });
  }, []);
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
                height={400}
                data={users}
                onRowClick={(data) => {
                  console.log(data);
                }}
              >
                <Column width={70} align="center">
                  <HeaderCell>#</HeaderCell>
                  <Cell dataKey="id" />
                </Column>

                <Column width={130}>
                  <HeaderCell>Participante</HeaderCell>
                  <Cell dataKey="username" />
                </Column>

                <Column width={130}>
                  <HeaderCell>Aciertos</HeaderCell>
                  <Cell dataKey="questions" />
                </Column>

                <Column width={200}>
                  <HeaderCell>Nivel</HeaderCell>
                  <Cell dataKey="level" />
                </Column>

                <Column width={200}>
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
