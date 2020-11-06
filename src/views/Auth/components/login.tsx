import React, { useState, useContext, useEffect } from "react";
import { useHistory } from "react-router-dom";
import firebase from "../../../firebase";
import "firebase/auth";
import "firebase/firestore";
import { AuthContext } from "../../../AuthProvider";
import LoginImage from "../../../images/login-img.png";
import {
  Form,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock,
  ButtonToolbar,
  Button,
  Modal,
} from "rsuite";
import {
  Grid,
  Content,
  Container,
  FlexboxGrid,
  DatePicker,
  Divider,
  Icon,
} from "rsuite";
import { Input } from "rsuite";
import SharedFooter from "../../Shared/footer";

interface UserData {
  email: string;
  password: string;
}

const Login = () => {
  const authContext = useContext(AuthContext);
  const { loadingAuthState } = useContext(AuthContext);
  const history = useHistory();
  const [values, setValues] = useState({
    email: "",
    password: "",
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
        username: currentUser.displayName,
        email: currentUser.email,
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

  const handleClick = () => {
    history.push("/auth/signup");
  };

  const handleChange = (event: any) => {
    event.persist();
    setValues((values) => ({
      ...values,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event: any) => {
    event.preventDefault();

    firebase
      .auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then((res) => {
        authContext.setUser(res);
        console.log(res, "res");
        history.push("/dashboard");
      })
      .catch((error) => {
        console.log(error.message);
        alert(error.message);
      });
  };

  const handleSocialClick = (sns: any) => {
    console.log(sns, "sns");

    let provider: firebase.auth.AuthProvider;
    switch (sns) {
      case "Facebook":
        provider = new firebase.auth.FacebookAuthProvider();
        console.log(provider, "fbprovider");
        break;

      case "Google":
        provider = new firebase.auth.GoogleAuthProvider();
        console.log(provider, "gprovider");
        break;

      //   case "Twitter":
      //     provider = new firebase.auth.TwitterAuthProvider();
      //     break;

      default:
        throw new Error("Unsupported SNS" + sns);
    }

    firebase.auth().signInWithRedirect(provider).catch(handleAuthError);
  };

  const handleAuthError = (error: firebase.auth.Error) => {
    console.log(error);
  };

  if (loadingAuthState) {
    return (
      <div>
        <h1>Loading...</h1>
      </div>
    );
  }

  return (
    <Container>
      <Content style={{ paddingTop: 100 }}>
        <FlexboxGrid justify="center" align="middle" className="login-top">
          <FlexboxGrid.Item colspan={6}>
            <div>
              <h1>Bienvenidos</h1>
            </div>
          </FlexboxGrid.Item>
          <FlexboxGrid.Item colspan={6}>
            <img src={LoginImage} alt="Bienvenidos" />
          </FlexboxGrid.Item>
        </FlexboxGrid>
        <FlexboxGrid justify="center" className="login-middle">
          <FlexboxGrid.Item colspan={6}>
            <div className="legend">INICIAR SESIÓN</div>
            <p>Con tu legajo - Exclusivo colaboradores Renault</p>
            <Form>
              <FormGroup>
                <ControlLabel>Email</ControlLabel>
                <div className="rs-form-control-wrapper">
                  <Input
                    name="email"
                    value={values.email}
                    placeholder="Enter your Email"
                    onChange={handleChange}
                  />
                </div>
              </FormGroup>
              <FormGroup>
                <ControlLabel>Fecha de Nacimiento</ControlLabel>
                {/* <DatePicker
                  oneTap
                  style={{ width: 280 }}
                  format={"DD-MM-YYYY"}
                  value={values.password}
                  onChange={handleChange}
                  // onChange={(date) => setPassword(date)}
                /> */}
                <div className="rs-form-control-wrapper">
                  <Input
                    name="password"
                    type="password"
                    value={values.password}
                    placeholder="Enter your password"
                    onChange={handleChange}
                  />
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
                <Icon icon="facebook-official" /> Conectar con Facebook
              </Button>
              <Button
                appearance="default"
                onClick={() => handleSocialClick("Google")}
              >
                <Icon icon="google" /> Contectar con Gmail
              </Button>
            </ButtonToolbar>
          </FlexboxGrid.Item>
        </FlexboxGrid>
      </Content>
      <SharedFooter />
    </Container>
  );
};

export default Login;