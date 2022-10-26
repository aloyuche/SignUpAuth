import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
// import { fontAwesome } from "fontawesome";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;

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

  // useEffect(() => {
  //   useRef.current.focus();
  // }, []);

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

    setSuccess(true);
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

          <form className="form-control" onSubmit={handleSubmit}>
            <h1>REGISTER</h1>

            <label htmlFor="username">
              UserName
              <span className={validName ? "valid" : "hide"}>
                {/* <fontAwesome icon = {faCheck}/> */}
                <i className="fa fa-check"></i>
              </span>
              <span className={validName || !user ? "hide" : "invalid"}>
                <i className="fa fa-times"></i>
              </span>
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
              <i className="fa fa-info-circle" />
              4 to 24 characters <br />
              Must begin with a letter. <br />
              Letters, number, underscores allowed
            </p>
            <br />

            <label htmlFor="password">
              Password
              <span className={validPasswrd ? "valid" : "hide"}>
                {/* <fontAwesome icon = {faCheck}/> */}
                <i className="fa fa-check"></i>
              </span>
              <span className={validPasswrd || !pwd ? "hide" : "invalid"}>
                <i className="fa fa-times"></i>
              </span>
            </label>
            <input
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              id="password"
              aria-invalid={validPasswrd ? "false" : "true"}
              aria-describedby="pwdnote"
              onFocus={() => setPasswrdFocus(true)}
              onBlur={() => setPasswrdFocus(false)}
              value={user}
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
              <i className="fa fa-info-circle" />
              8 to 24 characters <br />
              Must include uppercase and lowercase letters, a number and a
              special character. <br />
              Letters, number, special characters allowed:{" "}
              <span aria-label="exclamation mark">!</span>
              <span aria-label="at symbol">@</span>{" "}
              <span aria-label="hashtag">#</span>{" "}
              <span aria-label="dollar sign">$</span>
            </p>
            <br />

            <label htmlFor="cpassword">
              Confirm Password
              <span className={validMatch ? "valid" : "hide"}>
                {/* <fontAwesome icon = {faCheck}/> */}
                <i className="fa fa-check"></i>
              </span>
              <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
                <i className="fa fa-times"></i>
              </span>
            </label>
            <input
              type="password"
              onChange={(e) => setMatchPwd(e.target.value)}
              id="cpassword"
              aria-invalid={validMatch ? "false" : "true"}
              aria-describedby="matchnote"
              onFocus={() => setMatchFocus(true)}
              onBlur={() => setMatchFocus(false)}
              value={user}
              required
            />
            <p
              id="matchnote"
              className={
                matchFocus && pwd && !validMatch ? "instructions" : "offscreen"
              }
            >
              <i className="fa fa-info-circle" />
              Must be same with first Password input
            </p>
            <br />

            <button
              disabled={
                !validMatch || !validName || !validPasswrd ? "true" : "false"
              }
              className="btn btn-danger"
            >
              Sign Up
            </button>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
