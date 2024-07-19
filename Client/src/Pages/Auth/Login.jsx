import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import "./index.css";
import Logomark from "../../assets/Images/bwl-logo-2.svg?react";
import Button from "../../Components/Button";
import background from "../../assets/Images/background_pattern_decorative.png";
import axiosInstance from "../../Utils/axiosConfig";
import { credentials } from "../../Validation/validation";
import { login } from "../../Features/Auth/authSlice";
import { useDispatch } from "react-redux";
import { createToast } from "../../Utils/toastUtils";
import Field from "../../Components/Inputs/Field";
import { Checkbox, FormControlLabel, Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const theme = useTheme();

  const idMap = {
    "login-email-input": "email",
    "login-password-input": "password",
  };

  const [form, setForm] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    axiosInstance
      .get("/auth/users/admin")
      .then((response) => {
        if (response.data.data === false) {
          navigate("/register");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { error } = credentials.validate(form, { abortEarly: false });

    if (error) {
      // validation errors
      const newErrors = {};
      error.details.forEach((err) => {
        newErrors[err.path[0]] = err.message;
      });
      setErrors(newErrors);
      createToast({
        body:
          error.details && error.details.length > 0
            ? error.details[0].message
            : "Error validating data.",
      });
    } else {
      const action = await dispatch(login(form));
      if (action.payload.success) {
        navigate("/monitors");
        createToast({
          body: "Welcome back! You're successfully logged in.",
        });
      } else {
        if (action.payload) {
          // dispatch errors
          createToast({
            body: action.payload.msg,
          });
        } else {
          // unknown errors
          createToast({
            body: "Unknown error.",
          });
        }
      }
    }
  };

  const handleChange = (event) => {
    const { value, id } = event.target;
    const name = idMap[id];
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    const { error } = credentials.validate(
      { [name]: value },
      { abortEarly: false }
    );

    setErrors((prev) => {
      const prevErrors = { ...prev };
      if (error) prevErrors[name] = error.details[0].message;
      else delete prevErrors[name];
      return prevErrors;
    });
  };

  return (
    <div className="login-page">
      <img
        className="background-pattern-svg"
        src={background}
        alt="background pattern"
      />
      <form className="login-form" onSubmit={handleSubmit}>
        <Stack gap={theme.gap.small} alignItems="center">
          <Logomark alt="BlueWave Uptime Icon" />
          <Typography component="h1" sx={{ mt: theme.gap.xl }}>
            Login to Your Account
          </Typography>
        </Stack>
        <Stack gap={theme.gap.large} sx={{ mt: `calc(${theme.gap.ml}*2)` }}>
          <Field
            type="email"
            id="login-email-input"
            label="Email"
            isRequired={true}
            placeholder="Enter your email"
            autoComplete="email"
            value={form.email}
            onChange={handleChange}
            error={errors.email}
          />
          <Field
            type="password"
            id="login-password-input"
            label="Password"
            isRequired={true}
            placeholder="••••••••••"
            autoComplete="current-password"
            value={form.password}
            onChange={handleChange}
            error={errors.password}
          />
          <Stack direction="row" justifyContent="space-between">
            <FormControlLabel
              control={
                <Checkbox
                  size="small"
                  sx={{
                    padding: 0,
                    "& .MuiTouchRipple-root": {
                      pointerEvents: "none",
                      display: "none",
                    },
                  }}
                />
              }
              label="Remember me"
            />
            <span onClick={() => navigate("/forgot-password")}>
              Forgot password
            </span>
          </Stack>
        </Stack>
        <Stack gap={theme.gap.ml} mt={theme.gap.large}>
          <Button
            type="submit"
            level="primary"
            label="Continue"
            disabled={Object.keys(errors).length !== 0 && true}
          />
          <Stack
            direction="row"
            justifyContent="center"
            gap="5px"
            mt={theme.gap.ml}
          >
            <Typography component="p" sx={{ alignSelf: "center" }}>
              Don't have an account?
            </Typography>
            <span
              onClick={() => {
                navigate("/register");
              }}
            >
              Sign up
            </span>
          </Stack>
        </Stack>
      </form>
    </div>
  );
};

export default Login;
