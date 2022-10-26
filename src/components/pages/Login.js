import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const Login = () => {
  const [user, setUser] = useState("");
  const [passwrd, setPasswrd] = useState("");
  const userRef = useRef();
  const errRef = useRef();

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  //   useEffect(() => {
  //     useRef.current.focus();
  //   }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, passwrd]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser("");
    setPasswrd("");
    setSuccess(true);
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
            <form
              action=""
              onSubmit={handleSubmit}
              className="form-control px-20 mt-8"
            >
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
