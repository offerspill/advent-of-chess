import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  auth,
  generateUserDocument,
  getUniqueLowercaseUsernames,
} from "../firebase/firebaseConfig";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { UserContext } from "../providers/UserProvider";
import styled from "styled-components";

const StyledSignUp = styled.div`
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

  .signedin {
    h3 {
      margin-right: 1rem;
    }
    .notyou  {
      display: flex;

      flex-direction: row;
      justify-content: center;
    }
  }
`;

const SignUp = () => {
  const user = useContext(UserContext);
  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (formData: any) => {
    const { displayName, email, password } = formData;
    const usernames = await getUniqueLowercaseUsernames();

    if (usernames.includes(displayName.toLowerCase())) {
      console.error("Username already taken");
      return;
    }

    const { user } = await auth.createUserWithEmailAndPassword(email, password);

    /*
    if (user != null) {
      user?.sendEmailVerification();
    }
    */

    generateUserDocument(user, { displayName });
  };

  return (
    <StyledSignUp>
      {!user ? (
        <>
          {" "}
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>Register</h2>
            <div className="formElements">
              <TextField
                className="textfield"
                inputRef={register({
                  required: "Required",
                })}
                name="displayName"
                label="Username"
                variant="filled"
                error={errors.username}
                helperText={errors.username && "Invalid username"}
              />
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
              Register
            </Button>
          </form>
          <p className="noAccount">
            <div className="margin-top">
              <span>Already have an account?</span>
              <Link to="signin" className="text-blue-500 hover:text-blue-600">
                Sign in here
              </Link>
            </div>
          </p>
        </>
      ) : (
        <div className="signedin">
          <h2>You're signed in as {user.displayName}!</h2>
          <div className="notyou">
            <h3>Not you?</h3>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => {
                auth.signOut();
              }}
            >
              Sign out
            </Button>
          </div>
        </div>
      )}
    </StyledSignUp>
  );
};
export default SignUp;
