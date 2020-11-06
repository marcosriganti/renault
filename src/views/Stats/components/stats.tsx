import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../../firebase";
import "firebase/firestore";

import {
  Grid,
  Content,
  Container,
  FlexboxGrid,
  Header,
  Navbar,
  Nav,
  Dropdown,
  Icon,
  Table,
} from "rsuite";

import SharedFooter from "../../Shared/footer";
import Logo from "../../../images/logo.png";

const { Column, HeaderCell, Cell, Pagination } = Table;

const Stats = () => {
  const [userName, setUserName] = useState();
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
          setUserName(user["username"]);
        }
      });
  }, []);

  return (
    <Container>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Header>
            <a className="navbar-brand logo">
              <img src={Logo} alt="Logo" />
            </a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav pullRight>
              <Nav.Item>
                <Icon icon="info" style={{ fontSize: 20 }} />
              </Nav.Item>
              <Nav.Item>
                <Icon
                  icon="home"
                  style={{ fontSize: 20 }}
                  onClick={() => history.push("/dashboard")}
                />
              </Nav.Item>
              <Dropdown title={`Hola ${userName}`}>
                {/* <Dropdown.Item>Company</Dropdown.Item> */}
                <Dropdown.Item
                  icon={<Icon icon="heart-o" />}
                  onClick={() => history.push("/stats")}
                >
                  Estadisticas
                </Dropdown.Item>
                <Dropdown.Item
                  onClick={handleClick}
                  icon={<Icon icon="close" />}
                >
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown>
            </Nav>
          </Navbar.Body>
        </Navbar>
      </Header>
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
