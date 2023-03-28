import {Routes} from "react-router";
import {Route} from "react-router-dom";
import CharacterLayout from "../CharacterLayout";
import WatchList from "../WatchList";


const Router = () => {
    return (
        <Routes>
            <Route path="/characters" element={<CharacterLayout/>}/>
            <Route path="/watchlist" element={<WatchList/>}/>
        </Routes>
    )
}

export default Router