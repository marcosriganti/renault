import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";

import "firebase/firestore";

import {
  Content,
  Container,
  FlexboxGrid,
  Icon,
  Button,
  Grid,
  Row,
  Col,
  Progress,
} from "rsuite";

import firebase from "../../../firebase";
import SharedFooter from "../../Shared/footer";
import SharedHeader from "../../Shared/header";

import Level1 from "../../../images/nivel 1_400.jpg";
import Level2 from "../../../images/nivel 2_400.jpg";
import Level3 from "../../../images/nivel 3_400.jpg";
import Level4 from "../../../images/nivel 4_400.jpg";

const { Line } = Progress;
const questions = [10, 12, 18, 25];

const Game = () => {
  const images = [Level1, Level2, Level3, Level4];
  const [level, setLevel] = useState(1);
  const history = useHistory();

  console.log("Getting into Game ");
  useEffect(() => {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        db.collection("users")
          .doc(user.uid)
          .get()
          .then((res) => {
            const userDoc = res.data();
            console.log("user found", userDoc);
            if (userDoc.level) setLevel(userDoc.level);
            else
              db.collection("users").doc(user.uid).update({
                level,
              });
          });
      } else {
        // No user is signed in.
      }
    });
  }, []);

  return (
    <Container>
      <SharedHeader />
      <Content style={{ paddingTop: 100, paddingBottom: 100 }}>
        <Grid>
          <Row className="login-top">
            <Col xs={24} md={12} className="text-left">
              <h1>¡A jugar!</h1>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            {images.map((image, index) => {
              return (
                <Col
                  xs={24}
                  md={12}
                  className="text-left"
                  key={`level-${index}`}
                >
                  <a
                    className="level"
                    href={`/game/level/${index + 1}`}
                    onClick={(ev) => {
                      if (index + 1 > level) {
                        ev.preventDefault();
                        return false;
                      }
                    }}
                  >
                    <div className="image">
                      <img src={image} alt="Nivel 1"></img>
                    </div>
                    <div className="content">
                      <div className="name">
                        <h3>Nivel {index + 1}</h3>
                      </div>
                      {index + 1 > level ? (
                        <>
                          <Icon icon="lock" size={"5x"} />
                          <div className="info">
                            <h3>0/{questions[index]}</h3>
                          </div>
                        </>
                      ) : (
                        <div className="info">
                          <h3>5/{questions[index]}</h3>
                          <div className="progress">
                            <Line
                              percent={30}
                              status="active"
                              strokeColor={"#ffca28"}
                              showInfo={false}
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </a>
                </Col>
              );
            })}
          </Row>
        </Grid>
      </Content>
      <SharedFooter />
    </Container>
  );
};

export default Game;
