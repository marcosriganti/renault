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
} from "rsuite";
import SharedFooter from "../../Shared/footer";
import DashboardImage from "../../../images/dashboard-img.png";
import Logo from "../../../images/logo.png";

const Dashboard = () => {
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
        <FlexboxGrid justify="center" align="middle" className="login-top">
          <FlexboxGrid.Item colspan={6}>
            <div>
              <h1>Cumplimos 65 años</h1>
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            <img src={DashboardImage} alt="65 años" />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid justify="center" className="login-middle">
          <FlexboxGrid.Item colspan={10}>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem.
            </p>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem.
            </p>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem.
            </p>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem.
            </p>
            <p>
              Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
              consectetur, adipisci velit, sed quia non numquam eius modi
              tempora incidunt ut labore et dolore magnam aliquam quaerat
              voluptatem.
            </p>
            <p className="text-center">
              <b>
                Te invitamos a jugar con nosotros y repasar nuestra historia
              </b>
            </p>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <SharedFooter />
    </Container>
  );
};

export default Dashboard;
