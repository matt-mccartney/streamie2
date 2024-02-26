import AuthForm from "@/components/AuthForm/AuthForm";
import Logo from "@/components/Logo/Logo";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const AuthContainer = styled.div<any>`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 32px;
`;

export default function SignIn() {
  const router = useRouter();
  useEffect(() => {
    const profile = localStorage.getItem("user");
    if (profile) {
      router.push("/movies");
    }
  }, []);

  return (
    <AuthContainer>
      <Logo size={16} returnToHome={true}></Logo>
      <AuthForm></AuthForm>
    </AuthContainer>
  );
}
