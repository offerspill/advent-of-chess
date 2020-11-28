import React, { useState, useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import { CloseSharp } from "@material-ui/icons";
import { auth } from "../firebase/firebaseConfig";
import { UserContext } from "../providers/UserProvider";

const StyledSignIn = styled.div`
  margin-top: 6rem;
  margin-bottom: 6rem;
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

    .buttonProgress {
      display: block;
      margin: 0 auto;
      margin-bottom: 20px;
    }
  }

  .submitFeedback {
    max-width: 600px;
    margin: 0 auto;
    margin-top: 2rem;
  }
`;

const SignIn = () => {
  const user = useContext(UserContext);
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = (formData: any) => {
    setLoading(true);
    setError("");
    setOpenError(false);

    auth
      .signInWithEmailAndPassword(formData.email, formData.password)
      .catch((error) => {
        if (
          error.code === "auth/user-not-found" ||
          error.code === "auth/wrong-password"
        ) {
          setError("You have entered an invalid username or password.");
        } else {
          setError("Error signing in.");
        }
        setOpenError(true);
        console.error("Error signing in", error);
      })
      .finally(() => {
        setLoading(false);
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
            {loading ? (
              <CircularProgress size={24} className="buttonProgress" />
            ) : (
              <Button type="submit" variant="contained" color="primary">
                Sign in
              </Button>
            )}
          </form>
          <div className="submitFeedback">
            {error && (
              <Collapse in={openError}>
                <Alert
                  severity="error"
                  action={
                    <IconButton
                      aria-label="close"
                      color="inherit"
                      size="small"
                      onClick={() => {
                        setOpenError(false);
                      }}
                    >
                      <CloseSharp fontSize="inherit" />
                    </IconButton>
                  }
                >
                  {error}
                </Alert>
              </Collapse>
            )}
          </div>
          <p className="noAccount">
            <div className="margin-top">
              <span>Don't have an account?</span>
              <Link to="register" className="text-blue-500 hover:text-blue-600">
                Register
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
        <Redirect
          to={{
            pathname: "/",
            state: { loggedIn: true },
          }}
        />
      )}
    </StyledSignIn>
  );
};
export default SignIn;
