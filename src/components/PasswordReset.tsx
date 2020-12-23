import React, { useState } from "react";
import { auth } from "../firebase/firebaseConfig";
import { Button, TextField, Collapse, IconButton } from "@material-ui/core";
import { useForm } from "react-hook-form";
import CircularProgress from "@material-ui/core/CircularProgress";
import styled from "styled-components";
import Alert from "@material-ui/lab/Alert";
import { CloseSharp } from "@material-ui/icons";

const StyledPasswordReset = styled.div`
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

  .checkEmail {
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
`;

const PasswordReset = () => {
  const [error, setError] = useState("");
  const [openError, setOpenError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [emailSent, setEmailSent] = useState(false);

  const { handleSubmit, register, errors } = useForm();

  const onSubmit = async (formData: any) => {
    setLoading(true);

    setError("");

    const { email } = formData;

    await auth
      .sendPasswordResetEmail(email)
      .then(() => {
        setEmailSent(true);
      })
      .catch(() => {
        setError("Error resetting password");
      })
      .finally(() => {
        setLoading(false);

        if (!error) {
          setEmailSent(true);
        }
      });
  };

  return (
    <StyledPasswordReset>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2>Reset password</h2>
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
        </div>
        {loading ? (
          <CircularProgress size={24} className="buttonProgress" />
        ) : emailSent ? (
          <p className="checkEmail">Check your email!</p>
        ) : (
          <Button type="submit" variant="contained" color="primary">
            Reset password
          </Button>
        )}
      </form>{" "}
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
    </StyledPasswordReset>
  );
};

export default PasswordReset;

/*

  const sendResetEmail = (event: any) => {
    event.preventDefault();
    auth.sendPasswordResetEmail(email).catch(() => {
      setError("Error resetting password" as any);
    });
  };*/
