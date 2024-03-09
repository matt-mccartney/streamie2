import {
  inactiveGray,
  streamieGreen,
  backdropBlue,
} from "@/library/constants/colors";
import { getCompleteMovieDetails } from "@/utility/apis/moviedb";
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

const MovieImage = styled.img<any>`
  transition: 0.3s ease-in-out;
  border-radius: ${({ isActive }) => (isActive ? "0px" : "4px")};
  border-top-right-radius: ${({ isActive }) => (isActive ? "8px" : "4px")};
  border-top-left-radius: ${({ isActive }) => (isActive ? "8px" : "4px")};
`;
const MovieContainer = styled.div<any>`
  max-width: 240px;
  transition: 0.3s ease-in-out; /* Add transition for smooth scaling */
  transform: ${({ isActive }) =>
    isActive
      ? "scale(1.1)"
      : "scale(1)"}; /* Apply scaling if isActive is true */
  background-color: ${({ isActive }) =>
    isActive ? `${backdropBlue}` : "none"};
  border-radius: ${({ isActive }) => (isActive ? "8px" : "0px")};
`;
const MovieTitle = styled.p<any>`
  height: 100%;
  color: ${inactiveGray};
  margin-block-start: 0px;
  margin-block-end: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const GenreList = styled.p<any>`
  height: 100%;
  font-size: 8px;
  color: ${streamieGreen};
  opacity: ${({ isActive }) => (isActive ? `1` : `0`)};
  margin-block-start: 0px;
  margin-block-end: 0px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const MoviePreview = styled.iframe<any>`
  outline: none;
  border: none;
  border-top-right-radius: ${({ isActive }) => (isActive ? "8px" : "12px")};
  border-top-left-radius: ${({ isActive }) => (isActive ? "8px" : "12px")};
  pointer-events: none;
`;
const Rating = styled.span<any>``;
const MovieInfoContainer = styled.div<any>`
  padding: 8px;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

function findTrailer(arr: any[]) {
  let results = [];
  for (let item of arr) {
    if (item?.name.toLowerCase().includes("trailer")) {
      results.push(item);
    }
  }
  return results;
}

export default function Movie({ title, id, poster_path }: MovieProps) {
  const [active, setActive] = useState<boolean>(false);
  const router = useRouter();
  const [data, setData] = useState<any>(null);
  const [delayHandler, setDelayHandler] = useState<NodeJS.Timeout | null>(null);

  const handleMouseEnter = (event: any) => {
    setDelayHandler(
      setTimeout(() => {
        if (data === null) {
          getCompleteMovieDetails(id).then((resp) => {
            setData(resp);
            setActive(true);
          });
        } else {
          setActive(true);
        }
      }, 750)
    );
  };

  const handleMouseLeave = () => {
    if (delayHandler) {
      clearTimeout(delayHandler);
    }
    setActive(false);
  };

  return (
    <>
      <MovieContainer
        onClick={() => router.push(`https://www.themoviedb.org/movie/${id}`)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        isActive={active}
      >
        {(!active || (active && findTrailer(data?.videos.results).length === 0)) && (
          <MovieImage
            width={240}
            height={135}
            src={`https://image.tmdb.org/t/p/original/${poster_path}`}
            alt={title}
            isActive={active}
          ></MovieImage>
        )}
        {active && findTrailer(data?.videos.results).length !== 0 && (
          <MoviePreview
            width="240"
            height="135"
            src={`https://www.youtube.com/embed/${
              findTrailer(data?.videos.results)[0]?.key
            }?autoplay=1&mute=1&controls=0&loop=1`}
            allowfullscreen={true}
          />
        )}
        <MovieInfoContainer>
          <MovieTitle>{title}</MovieTitle>
          <GenreList isActive={active}>
            {data?.genres.map((x: any) => `${x.name}`).join(" • ")}
          </GenreList>
          {/*<Rating>
            <span className="fa fa-star checked"></span>
          </Rating>*/}
        </MovieInfoContainer>
      </MovieContainer>
    </>
  );
}
