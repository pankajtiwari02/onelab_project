import axios, { AxiosError, AxiosResponse } from "axios";
import "./login.css";
import { useRef, useState } from "react";
import { Base_Auth_Url } from "../constants";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/NavBar";

function Login() {
  const signInRef = useRef();
  const signUpRef = useRef();

  const [isSignIn, setIsSignIn] = useState(true);
  const [signInEmail, setSignInEmail] = useState("");
  const [signInPassword, setSignInPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [name, setName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [createPassword, setCreatePassword] = useState("");

  const navigate = useNavigate();

  const isValidEmail = (email: string) => {
    const emailRegex = "[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,}";
    return email.match(emailRegex);
  };

  const isStrongPassword = (password: string): boolean => {
    console.log(`password: ${password}`);

    const strongPasswordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    return strongPasswordRegex.test(password);
  };

  const isValidPhoneNumber = (phoneNumber: string) => {
    const phoneNumberRegex = /^\+?[1-9][0-9]{7,14}$/;
    return phoneNumber.match(phoneNumberRegex);
  };

  const showSignInView = () => {
    if (!isSignIn) {
      signInRef.current.classList = "views";
      signUpRef.current.classList = "views hide";
      setIsSignIn(true);
    }
  };

  const showSignUpView = () => {
    if (isSignIn) {
      signUpRef.current.classList = "views";
      signInRef.current.classList = "views hide";
      setIsSignIn(false);
    }
  };

  const handleSignIn = async () => {
    try {
      if (
        signInEmail.trim() != "" &&
        isValidEmail(signInEmail) &&
        signInPassword.length > 0
      ) {
        const response = await axios.post(
          `${Base_Auth_Url}/auth/signIn`,
          {
            email: signInEmail,
            password: signInPassword,
          },
          {
            withCredentials: true,
            headers: {
              credentials: "include",
              "Content-Type": "application/json",
            },
          }
        );

        console.log(response.status);

        setSignInEmail("");
        setSignInPassword("");
        navigate("/");
      }
    } catch (err) {
      if (err instanceof AxiosError) {
        console.log("HI");
        if (err.response) {
          if (err.response.status == 404) {
            alert("Email doesn't exist");
          } else if (err.response.status == 400) {
            alert("Wrong Credentials");
          } else if (err.response.status == 500) {
            alert("Server Error");
          }
        }
      }
      console.log("error = " + err);
    }
  };

  const handleSignUp = async () => {
    try {
      if (signUpEmail.trim() == "") {
        return alert("Enter email");
      }
      if (!isValidEmail(signUpEmail)) {
        return alert("Enter Valid Email");
      }
      console.log(`password: ${createPassword}`);
      if (!isStrongPassword(createPassword)) {
        return alert("Enter a Strong Password");
      }
      if (name.trim() == "") return alert("Enter name");
      if (!isValidPhoneNumber(phoneNumber))
        return alert("Enter valid Phone Number");

      const response = await axios.post(
        `${Base_Auth_Url}/auth/signUp`,
        {
          email: signUpEmail,
          password: createPassword,
          name: name,
          phoneNumber: phoneNumber,
        },
        {
          withCredentials: true,
          headers: {
            credentials: "include",
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
    } catch (err) {
      if (err instanceof AxiosError) {
        if (err.response && err.response.data) {
          alert(err.response.status);
        }
      }
      console.log(err);
    }
  };
  // CI CD Pipeline integrated
  return (
    <div className="authView">
      <div className="card">
        <div className="row">
          <div className="switch-button" onClick={showSignInView}>
            Sign In
          </div>
          <div className="switch-button" onClick={showSignUpView}>
            Sign Up
          </div>
        </div>
        <div id="sign-in-view" ref={signInRef} className="views">
          <div className="expanded">
            <div className="input-container">
              <p className="label">Email:</p>
              <input
                type="text"
                className="input-field"
                value={signInEmail}
                onChange={(e) => setSignInEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <p className="label">Password:</p>
              <input
                type="password"
                className="input-field"
                value={signInPassword}
                onChange={(e) => setSignInPassword(e.target.value)}
              />
            </div>
          </div>
          <div className="horizontal-center">
            <div className="auth-button" onClick={handleSignIn}>
              Sign In
            </div>
          </div>
        </div>
        <div id="sign-up-view" ref={signUpRef} className="views hide">
          <div className="expanded">
            <div className="input-container">
              <p className="label">Name:</p>
              <input
                type="text"
                className="input-field"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="input-container">
              <p className="label">Phone Number:</p>
              <input
                type="text"
                className="input-field"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
              />
            </div>
            <div className="input-container">
              <p className="label">Email:</p>
              <input
                type="text"
                className="input-field"
                value={signUpEmail}
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
            </div>
            <div className="input-container">
              <p className="label">Password:</p>
              <input
                type="password"
                className="input-field"
                value={createPassword}
                onChange={(e) => setCreatePassword(e.target.value)}
              />
            </div>
          </div>
          <div className="horizontal-center">
            <div className="auth-button" onClick={handleSignUp}>
              Sign Up
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
