import { streamieGreen } from "@/library/constants/colors";
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
`
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
  width: 400px;
  padding: 16px;
  background: white;
  border-radius: 12px;
  border: 2px solid #d1d1d1
`;
const SaveButton = styled.button<any>`
background-color:${streamieGreen};
border-radius: 99px;
padding: 16px;
padding-right: 24px;
padding-left: 24px;
color: white;
font-weight: 800;
font-size: 18px;
border: none;
outline: none;
`

const Settings = () => {
  const [watchProviders, setWatchProviders] = useState<WatchProvider[]>([]);
  const [toggled, setToggled] = useState<number[]>([]);
  const router = useRouter()

  useEffect(() => {
    getMovieWatchProviders().then((providers) => {
      setWatchProviders(providers);
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
    router.push("/movies")
  }

  return (
    <CenteredContainer>
      <SettingsContainer>
        {watchProviders.map((provider) => (
          <WatchProviderContainer>
            <WatchProviderText>{provider.provider_name}</WatchProviderText>
            <input
              type="checkbox"
              checked={toggled.includes(provider.provider_id) ? true : false}
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
          </WatchProviderContainer>
        ))}
        <SaveButton onClick={saveSettings}>Save Settings</SaveButton>
      </SettingsContainer>
    </CenteredContainer>
  );
};

export default Settings;
