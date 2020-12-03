import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../../firebase";
import "firebase/firestore";

import { Content, Container, Icon, Button, Grid, Row, Col } from "rsuite";
import SharedFooter from "../../Shared/footer";
import SharedHeader from "../../Shared/header";
import DashboardImage from "../../../images/dashboard-img.png";

const Dashboard = () => {
  const history = useHistory();

  return (
    <Container>
      <SharedHeader />
      <Content style={{ paddingTop: 100, paddingBottom: 100 }}>
        <Grid>
          <Row className="login-top">
            <Col xs={24} md={12} className="text-right">
              <h1>
                Universo <br /> Renault
              </h1>
            </Col>
            <Col xs={24} md={8}>
              <img src={DashboardImage} alt="65 años" />
            </Col>
          </Row>
        </Grid>

        <Grid>
          <Row style={{ textAlign: "left", padding: 20 }}>
            <Col md={12} mdOffset={6}>
              <p>
                En el año del 65° aniversario de Fábrica Santa Isabel, queremos
                invitarte a jugar y recorrer de manera divertida la historia de
                nuestra Fabrica y de Renault.
              </p>
              <p>
                Universo Renault es una plataforma online, donde podrás jugar y
                poner a prueba tus recuerdos, tus conocimientos y convertirte en
                un experto en la historia de nuestra Planta, mientras avanzás
                nivel a nivel.
              </p>
              <p>
                Este juego, además, fue diseñado, ilustrado y desarrollado por
                Gota, un estudio de comunicación profesional, que cuenta con un
                equipo creativo conformado por personas con discapacidad
                intelectual.
              </p>
              <p>
                A través de este juego, Renault continúa demostrando su
                compromiso con los negocios inclusivos, generando trabajo
                genuino para personas con discapacidad.
              </p>

              <p className="text-center">
                <b>
                  ¡Encontrá los 65 objetos, reconocé su historia y disfrutá del
                  Universo Renault!
                </b>
              </p>
              <div className="text-center">
                <p>
                  <Icon icon="chevron-down" size={"2x"} />
                </p>
                <p>
                  <Button color="yellow" onClick={() => history.push("/game")}>
                    EMPEZAR A JUGAR
                  </Button>
                </p>
                <p>
                  <Button
                    appearance="default"
                    onClick={() => history.push("/stats")}
                  >
                    ESTADISTICAS
                  </Button>
                </p>
              </div>
            </Col>
          </Row>
        </Grid>
      </Content>
      <SharedFooter />
    </Container>
  );
};

export default Dashboard;
