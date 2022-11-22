import React from "react";
import { useNavigate } from "react-router-dom";

const Unauthorized = () => {
  const navigate = useNavigate()

  const goBack = () => navigate(-1)
  return <section>
    <h2>Unauthorized</h2>
    <br/>
    <p>You do not have access to this page</p>
    <div>
      <button onClick={goBack}>Go Back</button>
    </div>
  </section>;
};

export default Unauthorized;
