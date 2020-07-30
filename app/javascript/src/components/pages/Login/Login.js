import React, { useState, useEffect, useContext } from "react";
import { useForm } from "react-hook-form";

// contexts
import { UserContext } from "#contexts/User";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import Form, { Label, TextInput } from "#components/shared/Form";
import Button from "#components/shared/Button";

const Login = ({ ...props }) => {
  const userContext = useContext(UserContext);
  const [error, setError] = useState();
  const { register, handleSubmit, errors } = useForm();

  const authenticate = (formData) => {
    userContext.actions
      .authenticate(formData.username, formData.password)
      .then(() => {
        console.log("redirecting");
        window.location = "/dashboard";
      })
      .catch(() => {
        setError("invalid credentials");
      });
  };

  return (
    <Layout.Padding>
      <Layout.Wrapper>
        <Text.H1>Login</Text.H1>

        {error && <p>{error}</p>}

        <Form onSubmit={handleSubmit(authenticate)}>
          <Label>Username</Label>
          <TextInput
            type="text"
            name="username"
            ref={register({ required: true })}
          />

          <Label>Password</Label>
          <TextInput
            type="password"
            name="password"
            ref={register({ required: true })}
          />

          <div style={{ marginTop: "2rem" }}>
            <Button type="submit" scheme="green">
              Login
            </Button>
          </div>
        </Form>
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default Login;
