
import { useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import { Article } from '../../pages/article/Article';
import { Bookmark } from '../../pages/bookmark/Bookmark';
import { Home } from '../../pages/home/Home';
import { SearchResults } from '../../pages/search-results/SearchResults';
import Header from '../Header/Header';
import Loader from '../Loader/Loader';
import s from './Layout.module.scss';
const Layout = (props) => {
    const isLoading = useSelector(state => { return state.loader.isLoading });
    return (
        <div className={s.root} style={isLoading ? { 'height': '100vh' } : {}}>
            <Header />
            <div className={s.wrapper}>
                <main className={`container h-100 w-100`}>
                    <Loader loading={isLoading} />
                    <Routes>
                        <Route path="/" element={<Navigate replace to="home" />} />
                        <Route path='/home' element={<Home />} />
                        <Route path='/search/*' element={<SearchResults />} />
                        <Route path="/article/*" element={<Article />} />
                        <Route path="/bookmark" element={<Bookmark />} />

                    </Routes>
                </main>
            </div>
            <footer className={`container bg-blue ${s.footer}`}>

            </footer>
        </div>
    );
};

export default Layout;