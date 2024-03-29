import styled from "styled-components";
import Movie, { MovieProps } from "../Movie/Movie";
import { useRouter } from "next/router";
import { streamieGreen } from "@/library/constants/colors";

type MovieCategory = {
  data: MovieProps[];
  categoryId?: number | null;
  categoryName: string;
};

type MovieCategoryPresentationalProps = {
  data: MovieProps[];
};

const CategoryTitle = styled.h2<any>`
  color: white;
`;
const CategoryTitleContainer = styled.div<any>`
display: flex;
flex-direction: row;
gap: 20px;
align-items: center;
`;
const CategoryMovieContainer = styled.div<any>`
  display: flex;
  flex-direction: row;
  gap: 24px;
  overflow-y: scroll;
  padding-top: 10px;
  padding-bottom: 10px;
`;
const CategoryLink = styled.a<any>`
  text-transform: uppercase;
  letter-spacing: 0.2rem;
  font-weight: 800;
  cursor: pointer;
  color: ${streamieGreen}
`;

function MovieCategoryPresentational({
  data,
}: MovieCategoryPresentationalProps) {
  return (
    <CategoryMovieContainer>
      {data.map((movie) => movie.backdrop_path && (
        <Movie
          id={movie.id}
          title={movie.title}
          poster_path={movie.backdrop_path}
        />
      ))}
    </CategoryMovieContainer>
  );
}

export default function MovieCategory({
  data,
  categoryId = null,
  categoryName,
}: MovieCategory) {
  const router = useRouter();
  return (
    <>
      <CategoryTitleContainer>
        <CategoryTitle>{categoryName}</CategoryTitle>
        {categoryId && (
          <CategoryLink
            onClick={() => router.push(`/movies/category/${categoryId}`)}
          >
            View all
          </CategoryLink>
        )}
      </CategoryTitleContainer>
      <MovieCategoryPresentational data={data}></MovieCategoryPresentational>
    </>
  );
}
