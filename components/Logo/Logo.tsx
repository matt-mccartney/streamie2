import { Josefin_Sans } from "next/font/google";
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
    colorMode?: "light" | "dark"
}
export default function Logo({size = 6, colorMode = "light"}: LogoProps){
    return (
        <LogoContainer>
            <LogoType style={{fontSize: `${size*4}px`, color: `${colorMode === "light" ? "white" : "black"}`}} className={josefinSans.className}>
                streamie
                <LogoSpan>.</LogoSpan>
            </LogoType>
        </LogoContainer>
    );
}