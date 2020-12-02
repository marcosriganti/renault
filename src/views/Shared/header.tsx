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
  Timeline,
} from "rsuite";
import Logo from "../../images/logo.png";
import firebase from "../../firebase";

const SharedHeader = () => {
  const [userName, setUserName] = useState("");
  const [showDrawer, setDrawer] = useState(false);
  const history = useHistory();

  useEffect(() => {
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        setUserName(
          user.displayName
            .toLowerCase()
            .split(" ")
            .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
            .join(" ")
        );
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
              onClick={(ev) => {
                ev.preventDefault();
                history.push("/dashboard");
              }}
              target="_blank"
            >
              <img src={Logo} alt="Logo" />
            </a>
          </Navbar.Header>
          <Navbar.Body>
            <Nav pullRight>
              <Nav.Item onClick={() => setDrawer(true)}>
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
                  Estadísticas
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
      <Drawer backdrop={true} show={showDrawer} onHide={() => setDrawer(false)}>
        <Drawer.Header>
          <Drawer.Title>Instrucciones</Drawer.Title>
        </Drawer.Header>
        <Drawer.Body>
          <Timeline>
            <Timeline.Item>
              Encontrá los objetos que pertenecen a la historia de la Planta
              Santa Isabel y clickeá sobre ellos.
            </Timeline.Item>
            <Timeline.Item>
              Respondé una de las 3 opciones posibles.
            </Timeline.Item>
            <Timeline.Item>
              Si acertás, ganas 10 puntos, si te equivocas restás 5.
            </Timeline.Item>
            <Timeline.Item>
              Podés cerrar sesión cuando quieras, y volver a ingresar con tu
              usuario o redes sociales.
            </Timeline.Item>
            <Timeline.Item>
              Mirá tus puntos en el botón{" "}
              <Button
                onClick={() => {
                  history.push("/stats");
                  setDrawer(false);
                }}
                appearance="default"
              >
                Estadísticas
              </Button>
            </Timeline.Item>
          </Timeline>
        </Drawer.Body>
        <Drawer.Footer style={{ paddingBottom: 20 }}>
          <Button onClick={() => setDrawer(false)} color="yellow">
            Listo, entendí!
          </Button>
        </Drawer.Footer>
      </Drawer>
    </>
  );
};

export default SharedHeader;
