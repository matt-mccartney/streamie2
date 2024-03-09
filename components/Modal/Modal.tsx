import { backdropBlue } from "@/library/constants/colors";
import styled from "styled-components";

const MovieModal = styled.div<any>`
  background-color: ${backdropBlue};
  position: fixed;
  margin: auto;
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 50%;
  height: 80%;
  min-width: 200px;
  z-index: 99;
  border-radius: 12px;
  filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.4));
`;

const MovieModalBackground = styled.div<any>`
  position: fixed;
  background-color: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  right: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
`;

export default function Modal() {
  return (
    <>
      <MovieModal></MovieModal>
      <MovieModalBackground
        onClick={() => {
          console.log("teehee");
        }}
      ></MovieModalBackground>
    </>
  );
}
