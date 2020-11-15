import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import { auth, signInWithGoogle } from "../firebase/firebaseConfig";
import styled from "styled-components";

const StyledSignIn = styled.div`
  margin-top: 6rem;
`;

const SignIn = () => {
  const [error, setError] = useState(null);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (formData: any) => {
    console.log("SUBMITTING", formData);

    auth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .catch((error) => {
        setError("Error signing in with password and email!" as any);
        console.error("Error signing in with password and email", error);
      });
  };

  return (
    <StyledSignIn>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label htmlFor="userEmail" className="block">
          Email:
        </label>
        <TextField
          className="textfield"
          inputRef={register({
            required: "Required",
            pattern: {
              value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
              message: "invalid email address",
            },
          })}
          name="email"
          label="Email"
          variant="filled"
          error={errors.email}
          helperText={errors.email && "Invalid email"}
        />
        <TextField
          className="textfield"
          inputRef={register({ required: "Required" })}
          name="password"
          label="Password"
          variant="filled"
          error={errors.name}
          helperText={errors.name && "This field is required"}
        />
        <Button type="submit" variant="contained" color="primary">
          Submit
        </Button>
      </form>
      <p>
        Don't have an account?{" "}
        <Link to="signUp" className="text-blue-500 hover:text-blue-600">
          Sign up here
        </Link>
        <Link to="reset" className="text-blue-500 hover:text-blue-600">
          Forgot Password?
        </Link>
      </p>
    </StyledSignIn>
  );
};
export default SignIn;
