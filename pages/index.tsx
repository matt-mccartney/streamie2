"use client";

import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import Logo from "@/components/Logo/Logo";
import { useRouter } from "next/router";
import { streamieGreen } from "@/library/constants/colors";

const Container = styled.div<any>`
padding: 48px;
padding-left: 4vw;
padding-right: 4vw;
`
const HeroContainer = styled.div<any>`
display: flex;
flex-direction: column;
gap: 16px;
justify-content: center;
align-items: center;
width: 100%;
`
const HeroText = styled.p<any>`
text-align: center;
font-size: 4vw;
color: white;
`
const HeroSpan = styled.span<any>`
color:${streamieGreen};
`
const StatsContainer = styled.div<any>`
display: flex;
gap: 64px;
flex-direction: flex-row;
width: 100%;
justify-content: center;
`
const Statistic = styled.p<any>`
font-weight: 800;
font-size: 50px;
color: white;
margin-top: 100px;
`
const StatSpan = styled.span`
color:${streamieGreen};
`
const Header = styled.nav<any>`
display: flex;
justify-content: space-between;
flex-direction: row;
`
const SignInButton = styled.button<any>`
background-color:${streamieGreen};
border-radius: 99px;
padding: 16px;
padding-right: 24px;
padding-left: 24px;
color: white;
font-weight: 800;
font-size: 18px;
border: none;
outline: none;
`

export default function Home() {
  const router = useRouter()

  return (
    <>
      <Head>
        <title>streamie. | Find all of your movies</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container>
        <Header>
          <Logo size={12}/>
          <SignInButton onClick={() => router.push("/login")}>Login</SignInButton>
        </Header>
        <HeroContainer>
          <HeroText><HeroSpan>one thousand</HeroSpan> streaming services in one.<br/>say hello to streamie.</HeroText>
          <Image style={{borderRadius: "12px"}} src={`/product.png`} width={911} height={607} alt="Product Image"></Image>
        </HeroContainer>
        <StatsContainer>
          <Statistic>
            <StatSpan>5,000+</StatSpan> Movies
          </Statistic>
          <Statistic>
            <StatSpan>3,000+</StatSpan> TV Shows
          </Statistic>
          <Statistic>
            <StatSpan>2,500+</StatSpan> Providers
          </Statistic>
        </StatsContainer>
      </Container>
    </>
  );
}
