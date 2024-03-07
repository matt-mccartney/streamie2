import { useEffect, useState } from "react";
import { MovieProps } from "../Movie/Movie";
import { getTrendingMovies } from "@/utility/apis/moviedb";
import styled from "styled-components";
import { inactiveGray } from "@/library/constants/colors";

const ShowcaseContainer = styled.div<any>`
height: 320px;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
padding: 64px;
border-radius: 12px;
display: flex;
align-items: end;
`
const ShowcaseMovieTitle = styled.h2<any>`
font-weight: 800;
color: white;
margin-block-start: 0px;
margin-block-end: 0px;
font-size: 3.5vw;
filter: drop-shadow(0px 0px 10px #000);
`
const ShowcaseMovieDescription = styled.p<any>`
color: ${inactiveGray};
filter: drop-shadow(0px 0px 10px #000);
`

export default function MovieShowcase({displayTime = 10000} : {displayTime?: number}) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [movieData, setMovieData] = useState<MovieProps[]>([]);

  useEffect(() => {
    getTrendingMovies().then((movies) => {
      setMovieData(movies);
    });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentIndex(
        (prevIndex: number) => (prevIndex + 1) % movieData.length
      );
    }, displayTime);

    return () => clearInterval(intervalId);
  }, [movieData]);

  return (
    <div>
      <ShowcaseContainer
        key={currentIndex}
        style={{
          backgroundImage: `linear-gradient(to top, rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0)), url(https://image.tmdb.org/t/p/original/${movieData[currentIndex]?.backdrop_path})`,
        }}
      >
        <div>
          <ShowcaseMovieTitle>{movieData[currentIndex]?.title}</ShowcaseMovieTitle>
          <ShowcaseMovieDescription>{movieData[currentIndex]?.overview}</ShowcaseMovieDescription>
        </div>
      </ShowcaseContainer>
    </div>
  );
}
