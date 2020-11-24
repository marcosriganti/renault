import React, { useState, useEffect, useContext } from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";

import "firebase/firestore";
import {
  Content,
  Container,
  Grid,
  Row,
  Col,
  Modal,
  Radio,
  RadioGroup,
  Button,
} from "rsuite";

import firebase from "../../../firebase";
import SharedFooter from "../../Shared/footer";
import SharedHeader from "../../Shared/header";
// import Level1 from "../../../images/levels/level1.svg";
import Level1Image from "../../../images/levels/level1.jpg";
// import Level1SVG from "../../../images/levels/level1.svg";
import { Level1 as Level1SVG } from "./level1";
import { AuthContext } from "../../../AuthProvider";
const db = firebase.firestore();
const shuffleArray = (array) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
};

const LevelImages = {
  1: Level1Image,
};
const Level = () => {
  const authContext = useContext(AuthContext);
  const [level, setLevel] = useState(1);
  const [points, setPoints] = useState(0);
  const [answer, setAnswer] = useState("");
  const [levels, setLevels] = useState({
    1: {
      answeredCount: 0,
      total: 10,
      answered: [],
    },
  });
  const [questions, setQuestions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState("");

  const history = useHistory();
  // const [uid, ]
  // console.log("authContext", authContext.user);
  const user = authContext.user;
  let { levelId } = useParams<{ levelId: string }>();

  useEffect(() => {
    // firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      db.collection("users")
        .doc(user.uid)
        .get()
        .then((res) => {
          const userDoc = res.data();

          if (userDoc.levels) setLevels(userDoc.levels);
          if (userDoc.level) setLevel(userDoc.level);
          if (userDoc.points) setPoints(userDoc.points);
          else
            db.collection("users").doc(user.uid).update({
              level,
            });

          if (level < parseInt(levelId)) {
            history.push("/game");
            return;
          }
          // get questions
          let qs = {};
          const questionsRef = db.collection("questions");
          questionsRef
            .where("level", "==", level)
            .get()
            .then((snapshot) => {
              snapshot.forEach((q) => {
                qs[q.data().num] = q.data();
                qs[q.data().num].correct = q.data().answers[0];
                shuffleArray(qs[q.data().num].answers);
              });
              setQuestions(qs);
            });
        });
    }
    // });
  }, []);

  const process = () => {
    let newLevels = levels;
    newLevels[levelId].answered.push(questions[currentQuestion].num);
    let newPoints = points;
    if (answer === questions[currentQuestion].correct) {
      console.log("bieeen");
      newPoints += 10;
    } else {
      newPoints -= 5;
    }
    setPoints(newPoints);
    setLevels(newLevels);

    db.collection("users").doc(user.uid).update({
      levels: newLevels,
      points: newPoints,
    });
  };
  const checkObject = (num) => {
    if (levels[levelId].answered.includes(parseInt(num))) return;
    if (questions[num]) {
      setCurrentQuestion(num);
    }
  };

  return (
    <>
      <Container>
        <SharedHeader />
        <Content style={{ background: "#56657A" }}>
          <Grid>
            <Row className="login-top">
              <Col xs={24} md={12} className="text-left">
                <div className="level-info">
                  <p>Nivel {levelId}</p>
                  <p>{points} puntos</p>
                  <p>
                    {levels[levelId].answered.length}/{levels[levelId].total}
                  </p>
                </div>
              </Col>
            </Row>
          </Grid>
          <div className="game-board">
            <img src={LevelImages[levelId]} alt="" className="game-img"></img>
            <div className="image-svg">
              <Level1SVG callback={checkObject}></Level1SVG>
            </div>
          </div>
        </Content>
        <SharedFooter />
      </Container>
      <Modal
        size="sm"
        show={currentQuestion !== ""}
        onHide={() => setCurrentQuestion("")}
      >
        <Modal.Header>
          <Modal.Title>Pregunta</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h3>
            {questions[currentQuestion] && questions[currentQuestion].question}
          </h3>
          <RadioGroup name="radioList">
            {questions[currentQuestion] &&
              questions[currentQuestion].answers.map((a, index) => {
                return (
                  <div className="text-left" key={`answer-div-${index}`}>
                    <Radio
                      key={`answer-${index}`}
                      value={index}
                      checked={answer === a}
                      onChange={(value) => setAnswer(a)}
                    >
                      {a}
                    </Radio>
                  </div>
                );
              })}
          </RadioGroup>

          <p></p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => process()} color="yellow">
            Enviar Respuesta!
          </Button>
          <Button onClick={() => setCurrentQuestion("")} appearance="default">
            Mejor Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Level;
