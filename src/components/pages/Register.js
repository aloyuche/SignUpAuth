import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";

const Register = () => {
  const [success, setSuccess] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const userRef = useRef();
  const errRef = useRef();

  useEffect(() => {
    useRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [user, pwd]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSuccess(true);
  };

  return (
    <>
      {success ? (
        <section>
          <h1>You Logged in</h1> <br />
          <p></p>
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

          <form action="" className="form-control" onSubmit={handleSubmit}>
            <h1>SIGN IN</h1>

            <label htmlFor="username">UserName</label>
            <input
              type="text"
              onChange={(e) => setUser(e.target.value)}
              id="username"
              ref={userRef}
              autoComplete="off"
              className="form-group"
              value={user}
              required
            />
            <br />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              onChange={(e) => setPwd(e.target.value)}
              id="password"
              className="form-group"
              value={pwd}
              required
            />
            <br />
            <button className="btn btn-danger">Sign Up</button>
            <p>
              New User? <br />
              <span className="line">
                <a href="/register">Sign Up</a>
              </span>
            </p>
          </form>
        </section>
      )}
    </>
  );
};

export default Register;
