import React, { useState, useEffect, useContext } from "react";
import { useHistory } from "react-router-dom";
import { AuthContext } from "../../../AuthProvider";
import "firebase/firestore";

import { Content, Container, Icon, Grid, Row, Col, Progress } from "rsuite";

import firebase from "../../../firebase";
import SharedFooter from "../../Shared/footer";
import SharedHeader from "../../Shared/header";

import Level1 from "../../../images/nivel 1_400.jpg";
import Level2 from "../../../images/nivel 2_400.jpg";
import Level3 from "../../../images/nivel 3_400.jpg";
import Level4 from "../../../images/nivel 4_400.jpg";

const { Line } = Progress;

const Game = () => {
  const authContext = useContext(AuthContext);
  const images = [Level1, Level2, Level3, Level4];
  const [level, setLevel] = useState(1);
  const [levels, setLevels] = useState({
    1: {
      answeredCount: 0,
      total: 10,
      answered: [],
    },
    2: {
      answeredCount: 0,
      total: 12,
      answered: [],
    },
    3: {
      answeredCount: 0,
      total: 18,
      answered: [],
    },
    4: {
      answeredCount: 0,
      total: 25,
      answered: [],
    },
  });

  const user = authContext.user;
  useEffect(() => {
    const db = firebase.firestore();
    if (user) {
      db.collection("users")
        .where("uid", "==", user.uid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const userDoc = doc.data();
            if (userDoc.level) setLevel(userDoc.level);
            if (userDoc.levels)
              setLevels(Object.assign(levels, userDoc.levels));
            else
              db.collection("users").doc(doc.id).update({
                level,
                levels,
              });
          });
        });
    } else {
      // No user is signed in.
    }
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
                            <h3>0/{levels[index + 1].total}</h3>
                          </div>
                        </>
                      ) : (
                        <div className="info">
                          <h3>
                            {levels[index + 1].answered.length}/
                            {levels[index + 1].total}
                          </h3>
                          <div className="progress">
                            <Line
                              percent={
                                (levels[index + 1].answered.length * 100) /
                                levels[index + 1].total
                              }
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
