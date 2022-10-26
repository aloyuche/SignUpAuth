import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState, useContext } from "react";
import AuthContext from "../context/AuthProvide";
import axios from "../../api/axios";

const LOGIN_URL = "/auth";

const Login = () => {
  const { setAuth } = useContext(AuthContext);
  const [user, setUser] = useState("");
  const [passwrd, setPasswrd] = useState("");
  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

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
      setSuccess(true);
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
    <>
      {success ? (
        <section>
          <h1>You Logged in</h1> <br />
          <p>
            <a href="/">Go to Home</a>
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

          <div className="col-md-4 form-control">
            <form onSubmit={handleSubmit} className="form-control px-20 mt-8">
              <h1>LOGIN HERE</h1>
              <input
                type="text"
                value={user}
                ref={userRef}
                placeholder="User Name"
                id="username"
                onChange={(e) => setUser(e.target.value)}
                className="form-control form-group"
                required
              />{" "}
              <br />
              <input
                type="password"
                value={passwrd}
                placeholder="Password"
                id="password"
                onChange={(e) => setPasswrd(e.target.value)}
                className="form-control form-group"
                required
              />{" "}
              <br />
              <button className="form-control btn btn-danger ms-2">
                <i className="fa fa-sign-in text-6"></i> Sign In
              </button>
              <p>
                New Member Please
                <span>
                  <a href="/register">Sign Up</a>
                </span>
              </p>
            </form>
          </div>
        </section>
      )}
    </>
  );
};

export default Login;
