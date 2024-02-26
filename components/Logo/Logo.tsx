import { Josefin_Sans } from "next/font/google";
import { useRouter } from "next/router";
import styled from "styled-components";


const josefinSans = Josefin_Sans({weight: "600", subsets: ["latin"]});

const LogoContainer = styled.div<any>``
const LogoType = styled.p<any>`
color:white;
margin-block-start: 0px;
margin-block-end: 0px;
`
const LogoSpan = styled.span`
color:#55E798;
`

type LogoProps = {
    size?: number;
    colorMode?: "light" | "dark";
    returnToHome?: boolean;
}
export default function Logo({size = 6, colorMode = "light", returnToHome = false}: LogoProps){
    const router = useRouter()
    return (
        <LogoContainer>
            <LogoType onClick={returnToHome ? () => router.push("/") : () => {}} style={{fontSize: `${size*4}px`, color: `${colorMode === "light" ? "white" : "black"}`}} className={josefinSans.className}>
                streamie
                <LogoSpan>.</LogoSpan>
            </LogoType>
        </LogoContainer>
    );
}