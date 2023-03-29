import Urls from 'constants/Urls';
import CharacterLayout from 'components/CharacterLayout';
import WatchList from 'components/WatchList';
import { Route, Routes } from 'react-router-dom';
import navigateHook from 'services/hooks/navigateHook';

const AppRouter = () => {
  navigateHook();
  return (
    <Routes>
      <Route path={Urls.characters} element={<CharacterLayout />}></Route>
      <Route path={Urls.watchList} element={<WatchList />}></Route>
    </Routes>
  );
};
export default AppRouter;
