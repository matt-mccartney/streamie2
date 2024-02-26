import React, { useState } from "react";
import axios from "axios";
import styled from "styled-components";

const FormContainer = styled.div<any>`
  width: 400px;
  background-color: white;
  border-radius: 8px;
  padding: 32px;
`;
const SignUpForm = styled.form<any>`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const LoginForm = styled.form<any>`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const SignUpInput = styled.input<any>`
  padding: 8px;
  border-radius: 4px;
  border: 2px solid #c7c7c7;
  &:focus {
    border: 2px solid #55e798;
  }
  outline: none;
`;
const SignUpButton = styled.button<any>`
  background-color: #55e798;
  color: white;
  border-radius: 99px;
  outline: none;
  border: none;
  font-weight: 600;
  padding: 8px;
`;
const FormTitle = styled.h1<any>`
text-align: center;
font-weight: 800;
margin-block-start: 0px;
margin-block-end: 0px;
margin-bottom: 20px;
`
const FormError = styled.p<any>`
color: red;
`
const SwitchFormP = styled.p<any>`
text-align: center;
`
const SwitchFormA = styled.a<any>`
color: blue;
text-decoration: underline;
cursor: pointer;
`

const AuthForm: React.FC = () => {
  const [mode, setMode] = useState<"signup" | "login">("login");
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        mode === "signup" ? "/api/signup" : "/api/login",
        { email, password },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.data;
      localStorage.setItem("user", JSON.stringify(data.user))
    } catch (error: any) {
      setError(error.response.data.error);
    }
  };

  return (
    <FormContainer>
      <FormTitle>{mode === "login" ? "Log in" : "Sign up"}</FormTitle>
      <FormError>{error}</FormError>
      {mode === "signup" && (
        <SignUpForm onSubmit={handleSubmit}>
          <SignUpInput
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <SignUpInput
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <SignUpButton type="submit">Sign Up</SignUpButton>
          <SwitchFormP>Already have an account? <SwitchFormA onClick={() => setMode(mode === "signup" ? "login" : "signup")}>Log in</SwitchFormA></SwitchFormP>
        </SignUpForm>
      )}
      {mode === "login" && (
        <LoginForm onSubmit={handleSubmit}>
          <SignUpInput
            type="email"
            value={email}
            onChange={(e: any) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
          <SignUpInput
            type="password"
            value={password}
            onChange={(e: any) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <SignUpButton type="submit" onSubmit={handleSubmit}>Login</SignUpButton>
          <SwitchFormP>Don't have an account? <SwitchFormA onClick={() => setMode(mode === "login" ? "signup" : "login")}>Sign up</SwitchFormA></SwitchFormP>
        </LoginForm>
      )}
    </FormContainer>
  );
};

export default AuthForm;
