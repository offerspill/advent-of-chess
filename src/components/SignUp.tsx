import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import {
  auth,
  generateUserDocument,
  getUniqueLowercaseUsernames,
} from "../firebase/firebaseConfig";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import { UserContext } from "../providers/UserProvider";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import { CloseSharp } from "@material-ui/icons";

const TextFieldWithDescription = styled.div`
  display: flex;
  flex-direction: column;

  span {
    text-align: left;
    font-size: 13px;
    color: #6a6a6a;
    font-weight: 100;
  }
`;

const StyledSignUp = styled.div`
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
  }

  .signedin {
    h3 {
      margin-right: 1rem;
    }
    .center {
      display: flex;

      flex-direction: row;
      justify-content: center;
    }
  }

  .submitFeedback {
    max-width: 600px;
    margin: 0 auto;
    margin-top: 2rem;
  }
`;

const SignUp = () => {
  const user = useContext(UserContext);
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (formData: any) => {
    setError("");
    setLoading(true);
    const { displayName, email, password } = formData;
    const usernames = await getUniqueLowercaseUsernames();

    if (usernames.includes(displayName.toLowerCase())) {
      console.error("Username already taken");
      setError("Username is already taken.");
      setOpenError(true);
      setLoading(false);
      return;
    }

    if (!displayName) {
      setError(
        "No username. Try refreshing and typing your username again. Contact offerspill@gmail.com if the problem persists."
      );
      setOpenError(true);
      setLoading(false);
      return;
    }

    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      generateUserDocument(user, { displayName });

      if (user != null) {
        user?.sendEmailVerification();
      }
    } catch (err) {
      setError(err.message);
      setOpenError(true);
      setLoading(false);
      return;
    }

    setLoading(false);
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
                  pattern: {
                    value: /^(?=[a-zA-Z0-9._]{2,20}$)(?!.*[_.]{2})[^_.].*[^_.]$/i,
                    message: "Invalid username",
                  },
                })}
                name="displayName"
                label="Username"
                variant="filled"
                error={errors.displayName}
                helperText={errors.displayName && "Invalid username"}
              />
              <TextFieldWithDescription className="textfield">
                <TextField
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
                <span className="description">
                  We will only use it for password reset and contacting winners.
                </span>
              </TextFieldWithDescription>
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
                Register
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
              <span>Already have an account?</span>
              <Link to="signin" className="text-blue-500 hover:text-blue-600">
                Sign in here
              </Link>
            </div>
          </p>
        </>
      ) : (
        <div className="signedin">
          {user?.emailVerified ? (
            <>
              <h2>You're signed in as {user.displayName}!</h2>
              <div className="center">
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
            </>
          ) : !user.displayName ? (
            <>
              <h2>It seems like there was an error with your user creation.</h2>
              <div className="center">
                Please contact offerspill@gmail.com from the registered email
                and tell us which username you wanted to fix this. You won't be
                able to submit any answers before this is fixed.
              </div>
            </>
          ) : (
            <>
              <h2>Check your email to verify your user</h2>
              <div className="center">No email? Check your spam folder.</div>
              <div className="center">
                Still no email? Contact adventofchess@offerspill.no.
              </div>
            </>
          )}
        </div>
      )}
    </StyledSignUp>
  );
};
export default SignUp;
