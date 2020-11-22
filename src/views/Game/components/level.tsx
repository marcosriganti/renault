import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  useHistory,
  useRouteMatch,
  useParams,
} from "react-router-dom";

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

const Level = () => {
  let match = useRouteMatch();
  const [level, setLevel] = useState(1);
  const history = useHistory();
  let { levelId } = useParams<{ levelId: string }>();

  console.log("Game", match);

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

            if (level < parseInt(levelId)) {
              history.push("/game");
            }
          });
      } else {
        // No user is signed in.
      }
    });
  }, []);
  return (
    <Container>
      <SharedHeader />
      <Content style={{ paddingTop: 20, paddingBottom: 20 }}>
        <Grid>
          <Row className="login-top">
            <Col xs={24} md={12} className="text-left">
              <h1>Nivel {levelId} </h1>
            </Col>
          </Row>
        </Grid>
        <Grid>
          <Row>
            <Col md={12}>Game goes here</Col>
          </Row>
        </Grid>
      </Content>
      <SharedFooter />
    </Container>
  );
};

export default Level;
