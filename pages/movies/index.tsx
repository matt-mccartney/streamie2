import Logo from "@/components/Logo/Logo";
import Modal from "@/components/Modal/Modal";
import { MovieProps } from "@/components/Movie/Movie";
import MovieCategory from "@/components/MovieCategory/MovieCategory";
import MovieShowcase from "@/components/MovieShowcase/MovieShowcase";
import { backdropBlue } from "@/library/constants/colors";
import { database } from "@/library/firebaseConfig";
import { getMovieGenres, getMoviesByGenre } from "@/utility/apis/moviedb";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

const PageContainer = styled.div<any>`
padding: 2rem;
padding-left: 6%;
padding-right: 6%;
display: flex;
flex-direction: column;
gap: 2vh;
`;
const DisplayContainer = styled.div<any>`
width: 100%
`
const HeaderContainer = styled.div<any>`
display: flex;
justify-content: space-between;
align-items: center;
`;
const SettingsButton = styled.button<any>`
padding: 8px;
border-radius: 99px;
border: none;
outline: none;
cursor: pointer;
font-weight: 800;
`

type Genre = {
  id: number;
  name: string;
}

export default function Movies() {
  const router = useRouter();
  const [movieGenres, setMovieGenres] = useState<Genre[]>([])
  const [moviesByGenre, setMoviesByGenre] = useState<Record<number, any>>({})

  useEffect(() => {
    getMovieGenres().then(genres => setMovieGenres(genres));
  }, [])

  useEffect(() => {
    const profile = localStorage.getItem("user");
    if (!profile) {
      router.replace("/login"); // Redirect to login page if user is not authenticated
    }
  }, []);

  useEffect(() => {
    const fetchMoviesByGenre = async () => {
      const profile = localStorage.getItem("user");
      const moviesByGenreObj: { [key: number]: MovieProps[] } = {};
      let providers = null;
      if (profile) {
        const docRef = doc(database, "settings", JSON.parse(profile).uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          providers = docSnap.data().providers;
        }
      }
      for (let genre of movieGenres) {
        const movies = await getMoviesByGenre(genre.id, providers);
        moviesByGenreObj[genre.id] = movies;
      }
      setMoviesByGenre(moviesByGenreObj);
    };

    if (movieGenres.length > 0) {
      fetchMoviesByGenre();
    }
  }, [movieGenres]);

  return (
    <PageContainer>
      <HeaderContainer>
      <Logo size={10}/>
      <SettingsButton onClick={() => router.push("/settings")}>Settings</SettingsButton>
      </HeaderContainer>
      {false && <Modal></Modal>}
      <MovieShowcase displayTime={20000}/>
      <DisplayContainer>
      {movieGenres?.map((genre, index) => <MovieCategory key={index} categoryId={genre.id} categoryName={genre.name} data={moviesByGenre[genre.id] || []}></MovieCategory>)}
      </DisplayContainer>
    </PageContainer>
  );
}
