import styled from "styled-components";
import Movie, { MovieProps } from "../Movie/Movie"

type MovieCategory = {
  data: MovieProps[];
  categoryName: string;
}

type MovieCategoryPresentationalProps = {
  data: MovieProps[];
}

const CategoryTitle = styled.h2<any>`
color: white
`
const CategoryMovieContainer = styled.div<any>`
display: flex;
flex-direction: row;
gap: 24px;
`

function MovieCategoryPresentational({data} : MovieCategoryPresentationalProps) {
    return (
        <CategoryMovieContainer>
          {
            data.slice(0,7).map(
                movie => (
                    <Movie id={movie.id} title={movie.title} poster_path={movie.poster_path}/>
                )
            )
          }
        </CategoryMovieContainer>
    )
}

export default function MovieCategory({data, categoryName} : MovieCategory) {
  return (
    <>
      <CategoryTitle>{categoryName}</CategoryTitle>
      <MovieCategoryPresentational data={data}></MovieCategoryPresentational>
    </>
  )
}