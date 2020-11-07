import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  Header,
  Navbar,
  Nav,
  Dropdown,
  Icon,
  Drawer,
  Button,
  Placeholder,
} from "rsuite";
import Logo from "../../images/logo.png";
import firebase from "../../firebase";

const { Paragraph } = Placeholder;

const SharedHeader = () => {
  const [userName, setUserName] = useState();
  const [showDrawer, sethsowDrawer] = useState(false);
  const history = useHistory();

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

  const handleClick = (event: any) => {
    event.preventDefault();

    firebase
      .auth()
      .signOut()
      .then((res) => {
        history.push("/auth/login");
      });
  };
  return (
    <>
      <Header>
        <Navbar appearance="inverse">
          <Navbar.Header>
            <a
              className="navbar-brand logo"
              href="https://www.renault.com.ar/"
              target="_blank"
            >
              <img src={Logo} alt="Logo" />
            </a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav pullRight>
              <Nav.Item onClick={() => sethsowDrawer(true)}>
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
      <Drawer
        backdrop={true}
        show={showDrawer}
        onHide={() => sethsowDrawer(false)}
      >
        <Drawer.Header>
          <Drawer.Title>Instrucciones</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Paragraph />

          <p>
            Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet,
            consectetur, adipisci velit, sed quia non numquam eius modi tempora
            incidunt ut labore et dolore magnam aliquam quaerat voluptatem.
          </p>
          <Paragraph />
        </Drawer.Body>
        <Drawer.Footer style={{ paddingBottom: 20 }}>
          <Button onClick={() => sethsowDrawer(false)} color="yellow">
            Listo, entendí!
          </Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export default SharedHeader;
