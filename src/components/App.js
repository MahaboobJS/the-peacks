import { BrowserRouter, Route, Routes } from "react-router-dom";
import '../styles/app.scss';
import LayoutComponent from '../components/Layout/Layout';
import { Home } from "../pages/home/Home";
import { SearchResults } from "../pages/search-results/SearchResults";
const App = () => {
  return (
    <div>
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<LayoutComponent />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  );
};

export default App;
