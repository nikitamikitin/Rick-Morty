import {useLocation, useNavigate} from "react-router-dom";
import {useEffect} from "react";
import AppLayout from "./components/Layout/AppLayout";
import Router from "./components/Router/Router";

const App = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        if (pathname !== '/characters' && pathname !== '/watchList') {
            navigate('/characters')
        }
    }, [])


    return (
        <AppLayout>
            <Router/>
        </AppLayout>
    );
};

export default App;
