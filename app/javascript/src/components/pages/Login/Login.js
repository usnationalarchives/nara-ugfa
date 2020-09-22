import React, { useState, useEffect, useContext } from "react";
import styled from "styled-components";
import { useForm } from "react-hook-form";

// contexts
import { UserContext } from "#contexts/User";

// components
import * as Layout from "#components/shared/Layout";
import * as Text from "#components/shared/Text";
import Form, { Label, TextInput } from "#components/shared/Form";
import Button from "#components/shared/Button";

const Inner = styled.div`
  margin: 100px 0;
`;

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
        <Inner>
          <Text.H1 style={{ marginBottom: "20px" }}>Login</Text.H1>

          {error && <p>{error}</p>}

          <Form onSubmit={handleSubmit(authenticate)}>
            <div style={{ marginBottom: "20px" }}>
              <Label htmlFor="username">Username</Label>
              <TextInput
                id="username"
                type="text"
                name="username"
                ref={register({ required: true })}
              />
            </div>

            <div style={{ marginBottom: "20px" }}>
              <Label htmlFor="password">Password</Label>
              <TextInput
                id="password"
                type="password"
                name="password"
                ref={register({ required: true })}
              />
            </div>

            <Button type="submit" scheme="green">
              Login
            </Button>
          </Form>
        </Inner>
      </Layout.Wrapper>
    </Layout.Padding>
  );
};

export default Login;
