import React from "react";
import { useEffect, useRef, useState } from "react";
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
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
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
    } catch (err) {
      if (!err?.response) {
        setErrMsg("No Server Response");
      } else if (err.response?.status === 400) {
        setErrMsg("Missing Username and Password");
      } else if (err.response?.status === 409) {
        setErrMsg("Username Token");
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
            <a href="/login">Logi In</a>
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
              <span className={validName ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <br />
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
              className="form-control "
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
              <span className={validPasswrd ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validPasswrd || !pwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <br />
            <input
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              id="password"
              aria-invalid={validPasswrd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswrdFocus(true)}
              onBlur={() => setPasswrdFocus(false)}
              value={pwd}
              required
              className="form-control fas fa-lock"
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
              <span className={validMatch ? "valid" : "hide"}>
                <FontAwesomeIcon icon={faCheck} />
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <FontAwesomeIcon icon={faTimes} />
              </span>
            </label>
            <br />
            <input
              type="password"
              onChange={(e) => setMatchPwd(e.target.value)}
              id="cpassword"
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="matchnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              value={matchPwd}
              required
              className="form-control "
            />
            <p
              id="matchnote"
              className={
                matchFocus && matchPwd && !validMatch
                  ? "instructions"
                  : "offscreen"
              }
            >
              <FontAwesomeIcon icon={faInfoCircle} />
              Must be same with first Password input
            </p>

            <button
              disabled={
                !validMatch || !validName || !validPasswrd ? "true" : "false"
              }
              className="form-control "
            >
              <i className="fa fa-sign-in me-3"></i>
              Sign Up
            </button>
          </form>
          <p>
            Already a Member Please
            <span>
              <a href="/login">Sign In</a>
            </span>
          </p>
        </section>
      )}
    </>
  );
};

export default Register;
