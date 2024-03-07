import Logo from "@/components/Logo/Logo";
import { inactiveGray, streamieGreen } from "@/library/constants/colors";
import { database } from "@/library/firebaseConfig";
import { getMovieWatchProviders } from "@/utility/apis/moviedb";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import styled from "styled-components";

type WatchProvider = {
  display_priorities: Record<string, number>;
  display_priority: number;
  logo_path: string;
  provider_name: string;
  provider_id: number;
};

const CenteredContainer = styled.div<any>`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  flex-direction: column;
  gap: 12px;
`;
const WatchProviderText = styled.p<any>`
  margin-block-start: 2px;
  margin-block-end: 2px;
`;
const WatchProviderContainer = styled.div<any>`
  display: flex;
  flex-direction: row;
  gap: 12px;
`;
const SettingsContainer = styled.div<any>`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 400px;
  padding: 24px;
  background: white;
  border-radius: 12px;
  border: 2px solid ${inactiveGray};
`;
const SaveButton = styled.button<any>`
  background-color: ${streamieGreen};
  border-radius: 99px;
  padding: 8px;
  padding-right: 12px;
  padding-left: 12px;
  color: white;
  font-weight: 800;
  font-size: 18px;
  border: none;
  outline: none;
`;
const SearchInput = styled.input<any>`
  padding: 8px;
  padding-right: 12px;
  padding-left: 12px;
  outline: none;
  border: 2px solid ${inactiveGray};
  border-radius: 8px;
`;
const PaginationButton = styled.button<any>`
  background-color: black;
  font-weight: 800;
  border-radius: 99px;
  border: none;
  outline: none;
  color: white;
  padding: 8px;
  padding-right: 12px;
  padding-left: 12px;
`;
const PaginationContainer = styled.div<any>`
  margin: auto;
  display: flex;
  gap: 12px;
  flex-direction: row;
  align-items: center;
`;

const Settings = () => {
  const [watchProviders, setWatchProviders] = useState<WatchProvider[]>([]);
  const [toggled, setToggled] = useState<number[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numPages, setNumPages] = useState<number>(1);
  const itemsPerPage = 14;
  const router = useRouter();

  useEffect(() => {
    getMovieWatchProviders().then((providers) => {
      setWatchProviders(providers);
      setNumPages(Math.ceil(providers.length / itemsPerPage));
      const user = localStorage.getItem("user");
      if (user) {
        const docRef = doc(database, "settings", JSON.parse(user).uid);
        console.log(docRef);
        const docSnap = getDoc(docRef).then((docSnap) => {
          if (docSnap.exists()) {
            setToggled(docSnap.data().providers);
          }
        });
      }
    });
  }, []);

  function saveSettings() {
    const user = localStorage.getItem("user");
    if (user) {
      setDoc(doc(database, "settings", JSON.parse(user).uid), {
        providers: toggled,
      });
    }
    console.log("Saved");
    router.push("/movies");
  }

  function searchProviders() {
    if (searchInput === "") {
      return watchProviders;
    }
    return watchProviders.filter((value, index) =>
      value.provider_name.includes(searchInput)
    );
  }

  return (
    <>
      <CenteredContainer>
      <Logo returnTo={"/movies"}></Logo>
        <SettingsContainer>
          <SearchInput
            placeholder={"Search Providers"}
            value={searchInput}
            onChange={(event: any) => setSearchInput(event.target.value)}
          ></SearchInput>
          {searchProviders()
            .slice(
              currentPage * itemsPerPage - itemsPerPage,
              currentPage * itemsPerPage
            )
            .map((provider) => (
              <WatchProviderContainer>
                <input
                  type="checkbox"
                  checked={
                    toggled.includes(provider.provider_id) ? true : false
                  }
                  onChange={() => {
                    toggled.includes(provider.provider_id)
                      ? setToggled((prevItems) =>
                          prevItems.filter(
                            (item, index) => item !== provider.provider_id
                          )
                        )
                      : setToggled((prevItems) => [
                          ...prevItems,
                          provider.provider_id,
                        ]);
                  }}
                ></input>
                <WatchProviderText>{provider.provider_name}</WatchProviderText>
              </WatchProviderContainer>
            ))}
          <PaginationContainer>
            <PaginationButton
              onClick={() => setCurrentPage((current) => current - 1)}
              disabled={currentPage === 1}
            >
              ←
            </PaginationButton>
            {currentPage}/{numPages}
            <PaginationButton
              onClick={() => setCurrentPage((current) => current + 1)}
              disabled={currentPage === numPages}
            >
              →
            </PaginationButton>
          </PaginationContainer>
          <SaveButton onClick={saveSettings}>Save Settings</SaveButton>
        </SettingsContainer>
      </CenteredContainer>
    </>
  );
};

export default Settings;
