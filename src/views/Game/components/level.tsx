import React, { useState, useEffect, useContext } from "react";
import { useHistory, useRouteMatch, useParams } from "react-router-dom";

import "firebase/firestore";
import {
  Content,
  Container,
  Icon,
  Modal,
  Radio,
  RadioGroup,
  Button,
  Alert,
} from "rsuite";
import firebase from "../../../firebase";
import SharedFooter from "../../Shared/footer";
import SharedHeader from "../../Shared/header";
import Loading from "../../Shared/loading";

import Level1Image from "../../../images/levels/level1.jpg";
import Level2Image from "../../../images/levels/level2.jpg";
import Level3Image from "../../../images/levels/level3.jpg";
import Level4Image from "../../../images/levels/level4.jpg";

import { Level1 as Level1SVG } from "./level1";
import { Level2 as Level2SVG } from "./level2";
import { Level3 as Level3SVG } from "./level3";
import { Level4 as Level4SVG } from "./level4";

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
  2: Level2Image,
  3: Level3Image,
  4: Level4Image,
};
const Level = () => {
  const [loading, setLoading] = useState(true);
  const authContext = useContext(AuthContext);
  const [docID, setDocID] = useState(null);
  const [level, setLevel] = useState(1);
  const [completeShown, setCompleteShown] = useState(false);
  const [points, setPoints] = useState(0);
  const [levelComplete, setLevelComplete] = useState(false);
  const [nextLevel, setNextLevel] = useState(false);
  const [gameComplete, setGameComplete] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [answer, setAnswer] = useState("");
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
  const [questions, setQuestions] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState("");

  const history = useHistory();
  const user = authContext.user;
  let { levelId } = useParams<{ levelId: string }>();

  useEffect(() => {
    // firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
      db.collection("users")
        .where("uid", "==", user.uid)
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            const userDoc = doc.data();
            setDocID(doc.id);
            if (userDoc.levels)
              setLevels(Object.assign(levels, userDoc.levels));
            if (userDoc.level) setLevel(userDoc.level);
            if (userDoc.points) setPoints(userDoc.points);
            else
              db.collection("users").doc(doc.id).update({
                level,
                levels,
                points,
              });

            if (userDoc.level < parseInt(levelId)) {
              history.push("/game");
              return;
            }
            // get questions
            let qs = {};
            const questionsRef = db.collection("questions");
            questionsRef
              .where("level", "==", parseInt(levelId))
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
          setLoading(false);
        });
    }
  }, []);

  const process = () => {
    let newLevels = levels;
    let newLevel = level;
    const num = questions[currentQuestion].num;
    let newPoints = points;
    setAnswered(true);
    if (answer === questions[currentQuestion].correct) {
      newPoints += 10;
      Alert.success("+10 pts.", 5000);
      newLevels[levelId].answered.push(num);
    } else {
      newPoints -= 5;
      Alert.error("-5 pts.", 5000);
    }
    setPoints(newPoints);
    setLevels(newLevels);

    if (
      newLevels[levelId].answered.length >= newLevels[levelId].total * 0.7 &&
      parseInt(levelId) === level &&
      level < 4
    ) {
      newLevel = level + 1;
      setLevel(newLevel);
    }

    db.collection("users").doc(docID).update({
      levels: newLevels,
      points: newPoints,
      level: newLevel,
    });
  };
  const checkObject = (num) => {
    if (levels[levelId].answered.includes(parseInt(num))) {
      setAnswer(questions[num].correct);
      setAnswered(true);
    }
    if (questions[num]) {
      setCurrentQuestion(num);
    }
  };
  const close = () => {
    setCurrentQuestion("");
    setAnswered(false);

    if (
      parseInt(levelId) !== 4 &&
      !completeShown &&
      levels[levelId].answered.length >= levels[levelId].total * 0.7 &&
      levels[levelId].answered.length !== levels[levelId].total
    ) {
      // Show Next
      setCompleteShown(true);
      setLevelComplete(true);
    }

    if (levels[levelId].answered.length === levels[levelId].total) {
      setNextLevel(true);
    }
    let answeredQuestions = 0;
    if (levels) {
      Object.keys(levels).map((key) => {
        const lvl = levels[key];
        answeredQuestions += lvl.answered.length;
      });
    }
    if (!completeShown && parseInt(levelId) === 4 && answeredQuestions === 65) {
      // Show all finished
      setGameComplete(true);
      setCompleteShown(true);
    }
  };
  const levelInfo = (
    <div>
      Nivel {levelId} <b>|</b> {points} puntos <b>|</b>{" "}
      {levels[levelId].answered.length}/{levels[levelId].total}
    </div>
  );

  if (loading) return <Loading />;

  return (
    <>
      <Container>
        <SharedHeader level={levelInfo} />
        <Content style={{ background: "#56657A" }}>
          <div className="game-board">
            <img src={LevelImages[levelId]} alt="" className="game-img"></img>
            <div className="image-svg">
              {levelId === "1" ? (
                <Level1SVG callback={checkObject}></Level1SVG>
              ) : (
                ``
              )}
              {levelId === "2" ? (
                <Level2SVG callback={checkObject}></Level2SVG>
              ) : (
                ``
              )}
              {levelId === "3" ? (
                <Level3SVG callback={checkObject}></Level3SVG>
              ) : (
                ``
              )}
              {levelId === "4" ? (
                <Level4SVG callback={checkObject}></Level4SVG>
              ) : (
                ``
              )}
            </div>
          </div>
        </Content>
        <SharedFooter />
      </Container>

      <Modal size="sm" show={nextLevel} onHide={close}>
        <Modal.Header>
          <Modal.Title>Increible!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h2 className="done">Muy bien! lo lograste!</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="yellow"
            onClick={() => {
              history.push(
                `/game/level/${Math.min(level, parseInt(levelId) + 1)}`
              );
              setNextLevel(false);
              window.location.reload();
            }}
          >
            podes pasar al siguiente nivel!
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="sm" show={levelComplete} onHide={close}>
        <Modal.Header>
          <Modal.Title>Increible!</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          <h2 className="done">Desbloqueaste el Nivel {level}!</h2>
        </Modal.Body>
        <Modal.Footer>
          <Button
            color="yellow"
            onClick={() => {
              history.push(`/game/level/${level}`);
              setLevelComplete(false);
              window.location.reload();
            }}
          >
            Ir al Nivel {level}
          </Button>
          <Button onClick={() => setLevelComplete(false)} appearance="default">
            Continuar este nivel
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="sm" show={gameComplete} onHide={close}>
        <Modal.Body className="text-center">
          <h1>
            65/65 <br />{" "}
            <span style={{ color: "#ffcc00" }}>FELICITACIONES</span>
          </h1>
          <h2>Sos un experto Renault, compartilo con todos.</h2>
          <a
            href="https://www.facebook.com/sharer/sharer.php?u=http%3A//lausina.org/universo65"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="facebook-official" size="4x" />
          </a>
          &nbsp;&nbsp;&nbsp;
          <a
            href="https://twitter.com/intent/tweet?text=http%3A//lausina.org/universo65"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Icon icon="twitter" size="4x" />
          </a>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setGameComplete(false)} appearance="default">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Modal size="sm" show={currentQuestion !== ""} onHide={close}>
        <Modal.Header>
          <Modal.Title>{``}</Modal.Title>
        </Modal.Header>
        <Modal.Body className="text-center">
          {answered ? (
            <>
              {answer === questions[currentQuestion].correct ? (
                <>
                  <h2 className="done">INCREÍBLE</h2>
                  <h4>{questions[currentQuestion].solution}</h4>
                  <h2 className="done">+10 pts.</h2>
                </>
              ) : (
                <>
                  <h2 className="error">CASI CASI</h2>
                  <p>Probá una vez mas!</p>
                  <h2 className="error">-5 pts.</h2>
                </>
              )}
            </>
          ) : (
            <>
              <h3>
                {questions[currentQuestion] &&
                  questions[currentQuestion].question}
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
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          {answered ? (
            ``
          ) : (
            <Button onClick={() => process()} color="yellow">
              Enviar Respuesta!
            </Button>
          )}

          <Button onClick={close} appearance="default">
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Level;
