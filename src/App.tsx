import { useState } from "react";
import CharacterLayout from "./components/CharacterLayout";
import NavigationBar from "./components/NavigationBar";
import WatchList from "./components/WatchList";


const App = () => {
  const [isCharacterCardisOpen,setCharacterCardisOpen]=useState<boolean>(false)
  const [isWatchListOpen,setWatchListOpen]=useState<boolean>(false)
  const openCharacterPage=()=>{
    setWatchListOpen(false)
    setCharacterCardisOpen(true)
    
  }
  const handleOpenWatchList=()=>{
    setCharacterCardisOpen(false)
    setWatchListOpen(true)
  }
  return (
      <div>
        <NavigationBar handleOpenCharacterPage={openCharacterPage} handleOpenWatchList={handleOpenWatchList}></NavigationBar>
        {isCharacterCardisOpen && <CharacterLayout></CharacterLayout>}
        {isWatchListOpen && <WatchList></WatchList>}
      </div>
  );
};

export default App;