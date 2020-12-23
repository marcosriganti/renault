import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import moment from "moment";
// import DatePicker from "react-date-picker";
import firebase from "../../../firebase";
import "firebase/auth";
import "firebase/firestore";
// import DatePicker from "react-datepicker";
import InputMask from "react-input-mask";

import { AuthContext } from "../../../AuthProvider";
import LoginImage from "../../../images/login-img.png";
import {
  Form,
  FormGroup,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  Button,
} from "rsuite";
import {
  Content,
  Container,
  FlexboxGrid,
  DatePicker,
  Divider,
  Icon,
  Grid,
  Row,
  Col,
} from "rsuite";
import { Input } from "rsuite";
import SharedFooter from "../../Shared/footer";
import Loading from "../../Shared/loading";

interface UserData {
  file: string;
  password: string;
  tempPass: string;
}

const Login = () => {
  const authContext = useContext(AuthContext);
  const { loadingAuthState } = useContext(AuthContext);
  const history = useHistory();
  const [values, setValues] = useState({
    file: "",
    tempPass: moment().format("DD-MM-YYYY"),
    password: moment().format("YYYY-MM-DD"),
  } as UserData);

  const db = firebase.firestore();

  useEffect(() => {
    firebase
      .auth()
      .getRedirectResult()
      .then((result) => {
        if (!result || !result.user || !firebase.auth().currentUser) {
          return;
        }

        return setUserProfile().then(() => {
          redirectToTargetPage();
        });
      })
      .catch((error) => {
        console.log(error, "error");
      });
  }, []);

  const setUserProfile = async () => {
    if (await isUserExists()) {
      return;
    }

    const currentUser = firebase.auth().currentUser!;
    /* Sign Up Information  */
    db.collection("users")
      .doc(currentUser.uid)
      .set({
        displayName: currentUser.displayName,
        username: currentUser.displayName,
        email: currentUser.email,
        photoURL: currentUser.photoURL,
        uid: currentUser.uid,
      })
      .then(() => {
        console.log("Saved");
        return;
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  const isUserExists = async () => {
    const doc = await db
      .collection("users")
      .doc(firebase.auth().currentUser!.uid)
      .get();
    return doc.exists;
  };

  const redirectToTargetPage = () => {
    history.push("/dashboard");
  };

  const handleChange = (event: any, val: string) => {
    // event.persist();
    setValues((values) => ({
      ...values,
      file: val,
    }));
  };

  const handleDateChange = (event: any, val: Date | Date[]) => {
    // console.log(">> handleDateChange", val);
    // event.persist();
    if (val == null) val = new Date();
    setValues((values) => ({
      ...values,
      password: moment(Array.isArray(val) ? val[0] : val).format("YYYY-MM-DD"),
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();
    const email = values.file + "@renault.com.ar";
    const password = values.tempPass.split("-").reverse().join("-");
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((res) => {
        authContext.setUser(res);
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  const handleSocialClick = (sns: any) => {
    let provider: firebase.auth.AuthProvider;
    switch (sns) {
      case "Facebook":
        provider = new firebase.auth.FacebookAuthProvider();
        break;

      case "Google":
        provider = new firebase.auth.GoogleAuthProvider();
        break;
      default:
        throw new Error("Unsupported SNS" + sns);
    }

    firebase
      .auth()
      .signInWithPopup(provider)
      .then((result) => {
        if (!result || !result.user || !firebase.auth().currentUser) {
          return;
        }

        return setUserProfile().then(() => {
          redirectToTargetPage();
        });
      })
      .catch(handleAuthError);
  };

  const handleAuthError = (error: firebase.auth.Error) => {
    console.log(error);
  };

  if (loadingAuthState) {
    return <Loading />;
  }
  const isValidDate = (d: Date) => {
    return d instanceof Date;
  };
  return (
    <Container>
      <Content
        style={{
          paddingTop: 100,
          paddingLeft: 10,
          paddingRight: 10,
          paddingBottom: 30,
        }}
      >
        <Grid>
          <Row className="login-top">
            <Col md={18} mdOffset={3}>
              <Row>
                <Col md={12} style={{ textAlign: "center" }}>
                  <h1>Bienvenidos</h1>
                </Col>
                <Col md={12} xsHidden={true}>
                  <img src={LoginImage} alt="Bienvenidos" />
                </Col>
              </Row>
            </Col>
          </Row>
        </Grid>

        <Grid>
          <Row className="login-middle">
            <Col md={10} mdOffset={7}>
              <div className="legend">INICIAR SESIÓN</div>
              <p>Con tu legajo - Exclusivo colaboradores Renault</p>
              <Form>
                <FormGroup>
                  <ControlLabel>Legajo</ControlLabel>
                  <div className="rs-form-control-wrapper">
                    <Input
                      name="file"
                      type="text"
                      value={values.file}
                      placeholder="Ingresa tu legajo"
                      onChange={(val, e) => handleChange(e, val)}
                    />
                  </div>
                </FormGroup>
                <FormGroup>
                  <ControlLabel>Fecha de Nacimiento</ControlLabel>
                  <InputMask
                    mask="99-99-9999"
                    // maskChar=" "
                    className="rs-input react-date-picker "
                    value={values.tempPass}
                    onChange={(ev) => {
                      const val = ev.target.value;

                      setValues((values) => ({
                        ...values,
                        tempPass: val,
                        password: isValidDate(val)
                          ? moment(val).format("YYYY-MM-DD")
                          : values.password,
                      }));

                      // return handleDateChange(
                      //   ev,
                      //   moment(ev.target.value).toDate()
                      // );
                    }}
                  />
                  {/* <DatePicker
                    // id="example-datepicker"
                    className="rs-input"
                    format="dd-MM-y"
                    value={new Date(values.password)}
                    onChange={(date) => handleDateChange(null, date)}
                  /> */}
                  {/* <DatePicker
                    oneTap
                    style={{ width: 280 }}
                    format={"DD-MM-YYYY"}
                    value={new Date(values.password)}
                    onChange={(val, e) => handleDateChange(e, val)}
                  /> */}
                  <div className="rs-form-control-wrapper">
                    <HelpBlock tooltip>Ejemplo: 11-10-1987</HelpBlock>
                  </div>
                </FormGroup>
                <FormGroup>
                  <ButtonToolbar>
                    <Button color="yellow" onClick={handleSubmit}>
                      Enviar
                    </Button>
                  </ButtonToolbar>
                </FormGroup>
              </Form>
              <Divider />
              <p>Con tus redes</p>
              <ButtonToolbar>
                <Button
                  appearance="default"
                  onClick={() => handleSocialClick("Facebook")}
                >
                  <Icon icon="facebook-official" />{" "}
                  <span className="hiddenXs">Conectar</span> con Facebook
                </Button>
                <Button
                  appearance="default"
                  onClick={() => handleSocialClick("Google")}
                >
                  <Icon icon="google" />{" "}
                  <span className="hiddenXs">Contectar</span> con Gmail
                </Button>
              </ButtonToolbar>
            </Col>
          </Row>
        </Grid>
      </Content>
      <SharedFooter />
    </Container>
  );
};

export default Login;
