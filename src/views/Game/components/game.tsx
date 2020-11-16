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

const Game = () => {
  const images = [Level1, Level2, Level3, Level4];
  const [userName, setUserName] = useState("");
  const history = useHistory();
  console.log("Getting into Game ");
  useEffect(() => {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(function (user) {
      if (user) {
        // User is signed in.
        console.log("user", user);
      } else {
        // No user is signed in.
      }
    });

    console.log("currentUser", firebase.auth().currentUser);
    setUserName(firebase.auth().currentUser.displayName);
    // db.collection("users")
    //   .doc(firebase.auth().currentUser!.uid)
    //   .get()
    //   .then((res) => {
    //     const user = res.data();
    //     console.log("user", user);
    //     if (user) {
    //       setUserName(user["username"]);
    //     }
    //   });
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
                <Col xs={24} md={12} className="text-left">
                  <div className="level">
                    <div className="image">
                      <img src={image} alt="Nivel 1"></img>
                    </div>
                    <div className="content">
                      <div className="name">
                        <h3>Nivel {index + 1}</h3>
                      </div>
                      <Line
                        percent={30}
                        status="active"
                        strokeColor={"#ffca28"}
                        style={{ margin: 20 }}
                      />

                      <h3>5/10</h3>
                    </div>
                  </div>
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
