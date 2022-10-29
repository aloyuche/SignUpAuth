import React from "react";
import { useEffect, useRef, useState } from "react";
// import styled from "styled-components";
import {
  faCheck,
  faTimes,
  faUserCircle,
  faUserPen,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import axios from "../../api/axios";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";

const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPasswrd, setValidPasswrd] = useState(false);
  const [paswrdFocus, setPasswrdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [success, setSuccess] = useState("");
  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    setValidPasswrd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd, matchPwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const v1 = USER_REGEX.test(user);
    const v2 = PWD_REGEX.test(pwd);

    if (!v1 || !v2) {
      setErrMsg("Invalid Entry");
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ user, pwd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(response.data);
      console.log(response.accessToken);
      console.log(JSON.stringify(response));

      setSuccess(true);
      setUser("");
      setPwd("");
      setMatchPwd("");
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username and Password");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Taken");
      } else {
        setErrMsg("Registration failed");
      }
      errRef.current.focus();
    }
  };

  return (
    <>
      {success ? (
        <section>
          <h1>Success!</h1> <br />
          <p>
            <a href="/login">Log In</a>
          </p>
        </section>
      ) : (
        <section>
          <p
            ref={errRef}
            className={errMsg ? "errmsg" : "offscreen"}
            aria-live="assertive"
          >
            {errMsg}
          </p>

          <form onSubmit={handleSubmit}>
            <h1>REGISTER</h1>

            <label htmlFor="username">
              <FontAwesomeIcon icon={faUserCircle} />
              UserName
              <FontAwesomeIcon
                icon={faCheck}
                className={validName ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validName || !user ? "hide" : "invalid"}
              />
            </label>
            <input
              type="text"
              onChange={(e) => setUser(e.target.value)}
              id="username"
              ref={userRef}
              autoComplete="off"
              aria-invalid={validName ? "false" : "true"}
              aria-describedby="uidnote"
              onFocus={() => setUserFocus(true)}
              onBlur={() => setUserFocus(false)}
              value={user}
              required
            />
            <p
              id="uidnote"
              className={
                userFocus && user && !validName ? "instructions" : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              4 to 24 characters <br />
              Must begin with a letter. <br />
              Letters, number, underscores allowed
            </p>

            <label htmlFor="password">
              <FontAwesomeIcon icon={faUserPen} /> Password
              <FontAwesomeIcon
                icon={faCheck}
                className={validPasswrd ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validPasswrd || !pwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              id="password"
              aria-invalid={validPasswrd ? "true" : "false"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswrdFocus(true)}
              onBlur={() => setPasswrdFocus(false)}
              value={pwd}
              required
            />
            <p
              id="pwdnote"
              className={
                paswrdFocus && pwd && !validPasswrd
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              8 to 24 characters <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Letters, number, special characters allowed:{" "}
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>
              <span aria-label="percentage">%</span>
            </p>
            <label htmlFor="cpassword">
              {" "}
              <FontAwesomeIcon icon={faUserPen} />
              Confirm Password
              <FontAwesomeIcon
                icon={faCheck}
                className={validMatch ? "valid" : "hide"}
              />
              <FontAwesomeIcon
                icon={faTimes}
                className={validMatch || !matchPwd ? "hide" : "invalid"}
              />
            </label>
            <input
              type="password"
              onChange={(e) => setMatchPwd(e.target.value)}
              id="cpassword"
              aria-invalid={validMatch ? "true" : "false"}
              aria-describedby="confirmnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              value={matchPwd}
              required
            />
            <p
              id="confirmnote"
              className={
                matchFocus && matchPwd && !validMatch
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must be same with first Password input
            </p>
            <br />
            <button
              disabled={
                !validName || !validPasswrd || !validMatch ? "true" : "false"
              }
            >
              <i className="fa fa-sign-in me-3"></i>
              Sign Up
            </button>
          </form>
          <p>
            Already a Member Please <br />
            <span>
              <a href="/login">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

// const FormContainer = styled.div``;
//     height: 100vh;
//     width: 100vw;
//     gap = 1rem;
//     display: flex;
//     justify-content: center;
//     align-items: center;
//     flex-direction: colunm;
//     background:#131324;
//     .errmsg{
//       display:none;
//     }
//     .offscreen{
//       display:block;
//     }
//     .brand{
//         display:flex;
//         justify-content: center;
//         align-items:center;
//         gap: 1rem;
//         h1{
//         font-size:2.8rem;
//         color:white;

//         }
//         img{
//             width: 20%;
//         }
//     }
//     form{
//         display: flex;
//         flex-direction: column;
//         gap:1.2rem;
//         background:#00000076;
//         border-radius:2rem;
//         padding: 2rem 4rem;

//         input{
//             border:0.1px solid #4e0eff;
//             padding: 1rem;
//             background: transparent;
//             border-radius: 0.4rem;
//             color:white;
//             width:100%;
//             font-size:1rem;

//         }

//     }
//     button{
//         padding: 1rem 2rem;
//         background: #997af0;
//         color:white;
//         width:100%;
//         font-weight:bold;
//         border-radius: 1rem;
//     }
//     p{
//         color: orange;
//         font-size:1.2rem
//     }`;
export default Register;
