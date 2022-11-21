import React, { useEffect, useRef, useState } from "react";
import useAuth from "../../hooks/useAuth";
import { Link, useNavigate, useLocation } from "react-router-dom";

import axios from "../../api/axios";
const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [user, setUser] = useState("");
  const [passwrd, setPasswrd] = useState("");
  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, passwrd]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        LOGIN_URL,
        JSON.stringify({ user, passwrd }),
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log(JSON.stringify(response?.data));

      const accessToken = response?.data?.accessToken;
      const roles = response?.data?.roles;

      setAuth({ user, passwrd, roles, accessToken });
      setUser("");
      setPasswrd("");
      navigate(from, { replace: true });
    } catch (error) {
      if (!error?.response) {
        setErrMsg("No Server Response");
      } else if (error.response?.status === 400) {
        setErrMsg("Missing Username and Password");
      } else if (error.response?.status === 401) {
        setErrMsg("UnAuthorize");
      } else {
        setErrMsg("Login failed");
      }
      errRef.current.focus();
    }
  };
  return (
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>

      <form onSubmit={handleSubmit}>
        <h1>LOGIN HERE</h1>
        <label htmlFor="username">UserName:</label>
        <input
          type="text"
          value={user}
          ref={userRef}
          placeholder="User Name"
          id="username"
          autoComplete="off"
          onChange={(e) => setUser(e.target.value)}
          required
        />{" "}
        <br />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          value={passwrd}
          placeholder="Password"
          id="password"
          onChange={(e) => setPasswrd(e.target.value)}
          required
        />{" "}
        <br />
        <button className="btn btn-danger">
          <i className="fa fa-sign-in me-2"></i> Sign In
        </button>
        <p>
          New Member Please
          <span>
            <a href="/register">Sign Up</a>
          </span>
        </p>
      </form>
    </section>
  );
};

export default Login;
