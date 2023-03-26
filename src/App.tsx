import {Routes} from "react-router";
import {Route, useLocation, useNavigate} from "react-router-dom";
import CharacterLayout from "./components/CharacterLayout";
import NavigationBar from "./components/NavigationBar";
import WatchList from "./components/WatchList";
import {useEffect} from "react";

const App = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname !== 'characters' && pathname !== 'watchList') {
            navigate('/characters')
        }
    }, [])

    return (
        <Routes>
            <Route
                path="/characters"
                element={<div>
                    <NavigationBar
                    ></NavigationBar><CharacterLayout/>
                </div>}
            ></Route>
            <Route path="/watchlist" element={<div>
                <NavigationBar

                ></NavigationBar><WatchList/>
            </div>}></Route>
        </Routes>
    );
};

export default App;
