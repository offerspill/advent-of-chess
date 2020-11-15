import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import styled from "styled-components";
import { auth } from "../firebase/firebaseConfig";
import { UserContext } from "../providers/UserProvider";

const StyledSignIn = styled.div`
  margin-top: 6rem;
  padding-left: 2rem;
  padding-right: 2rem;

  .signedIn {
    margin-top: 2rem;
  }

  h1,
  h2,
  h3 {
    text-align: center;
  }

  form {
    margin: 0 auto;
    margin-top: 5rem;
    max-width: 600px;

    .formElements {
      position: relative;
      display: flex;
      flex-direction: column;
      text-align: center;

      .textfield {
        margin-bottom: 2rem;
      }
    }

    button {
      display: block;
      margin: 0 auto;
    }

    .buttonSuccess {
      background-color: #4baf51;
    }

    .buttonSubmitError {
      background-color: #ff7561;
    }

    .buttonProgress {
      display: block;
      margin: 0 auto;
      margin-bottom: 20px;
    }
  }

  .noAccount {
    max-width: 600px;
    margin: 0 auto;
    margin-top: 2rem;
    text-align: center;

    display: flex;
    flex-direction: column;

    span {
      margin-right: 1rem;
    }

    .margin-top {
      margin-top: 1rem;
    }
  }
`;

const SignIn = () => {
  const user = useContext(UserContext);
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
      {!user ? (
        <>
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Sign in</h2>
            <div className="formElements">
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
                type="password"
                label="Password"
                variant="filled"
                error={errors.name}
                helperText={errors.name && "This field is required"}
              />
            </div>
            <Button type="submit" variant="contained" color="primary">
              Sign in
            </Button>
          </form>
          <p className="noAccount">
            <div className="margin-top">
              <span>Don't have an account?</span>
              <Link to="signUp" className="text-blue-500 hover:text-blue-600">
                Sign up here
              </Link>
            </div>
            <div className="margin-top">
              <Link to="reset" className="text-blue-500 hover:text-blue-600">
                Forgot Password?
              </Link>
            </div>
          </p>
        </>
      ) : (
        <h2 className="signedIn">You're signed in!</h2>
      )}
    </StyledSignIn>
  );
};
export default SignIn;
