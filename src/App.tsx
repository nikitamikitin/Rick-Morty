import { useState } from "react";
import { Routes } from "react-router";
import { Route, Link } from "react-router-dom";
import CharacterLayout from "./components/CharacterLayout";
import NavigationBar from "./components/NavigationBar";
import WatchList from "./components/WatchList";

const App = () => {
  const [isCharacterCardisOpen, setCharacterCardisOpen] =
    useState<boolean>(false);
  const [isWatchListOpen, setWatchListOpen] = useState<boolean>(false);
  const openCharacterPage = () => {
    setWatchListOpen(false);
    setCharacterCardisOpen(true);
  };
  const handleOpenWatchList = () => {
    setCharacterCardisOpen(false);
    setWatchListOpen(true);
  };
  return (
    <Routes>
      <Route
        path="/Rick-Morty/"
        element={<div>
          <NavigationBar
        ></NavigationBar><CharacterLayout />
          </div>}
      ></Route>

      <Route
        path="/Rick-Morty/characters"
        element={<div>
          <NavigationBar
        ></NavigationBar><CharacterLayout />
          </div>}
      ></Route>
      <Route path="/Rick-Morty/watchlist" element={<div>
          <NavigationBar

        ></NavigationBar><WatchList />
          </div>}></Route>
    </Routes>
  );
};

export default App;
