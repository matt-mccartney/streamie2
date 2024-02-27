import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import styled from "styled-components";

export type MovieProps = {
  id: number;
  title: string;
  poster_path: string;
  backdrop_path?: string;
  overview?: string | null;
};

const MovieContainer = styled.div<any>`
  max-width: 200px;
`;
const MovieTitle = styled.p<any>`
height: 100%;
padding: 8px;
color: #d1d1d1;
margin-block-start: 0px;
margin-block-end: 0px;
`;
const Rating = styled.span<any>``;
const MovieInfoContainer = styled.div<any>`
`;

export default function Movie({ title, id, poster_path }: MovieProps) {
  const [active, setActive] = useState<boolean>(false)
  const router = useRouter();
  return (
    <>
      <MovieContainer onClick={() => router.push(`https://www.themoviedb.org/movie/${id}`)}>
        <Image style={{borderRadius: "12px"}} width={200} height={300} src={`https://image.tmdb.org/t/p/original/${poster_path}`} alt={title}></Image>
        <MovieInfoContainer>
          <MovieTitle>{title}</MovieTitle>
          {/*<Rating>
            <span className="fa fa-star checked"></span>
          </Rating>*/}
        </MovieInfoContainer>
      </MovieContainer>
    </>
  );
}
