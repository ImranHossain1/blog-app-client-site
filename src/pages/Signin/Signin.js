import { gql, useMutation } from "@apollo/client";
import React, { useEffect, useState } from "react";
const SIGN_IN = gql`
  mutation signin($email: String!, $password: String!) {
    signIn(email: $email, password: $password) {
      userError
      token
    }
  }
`;

const Signin = () => {
  const [signIn, { data, loading, error }] = useMutation(SIGN_IN);

  const [userError, setUserError] = useState(null);
  useEffect(() => {
    if (data && data.signIn.token) {
      localStorage.setItem("token", data.signIn.token);
    }
    if (data && data.signIn.userError) {
      setUserError(data.signIn.userError);
    }
  }, [data]);

  if (loading) return "Submitting...";
  if (error) return `Submission error! ${error.message}`;
  if (userError) return `Submission error! ${userError}`;
  const handleRegister = (e) => {
    e.preventDefault();
    const data = {
      email: e.target.email.value,
      password: e.target.password.value,
    };
    signIn({ variables: data });
  };
  return (
    <div className="form">
      <form onSubmit={handleRegister}>
        <label htmlFor="">Your Email</label>
        <input name="email" type="email" />
        <label htmlFor="">Your Password</label>
        <input name="password" type="password" />

        <button className="rounded-full p-2 bg-white text-black">Login</button>
      </form>
    </div>
  );
};

export default Signin;
