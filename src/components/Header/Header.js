import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/Logo_White.png'
import { articleActions } from '../../reducers/articles';
import { loaderActions } from '../../reducers/loader';
import { getSearchResults } from '../../services/contentAPIs';
import s from './Header.module.scss';
const Header = () => {

    const navigateTo = useNavigate();
    const [openInput, setOpenInput] = useState(false);
    const dispatch = useDispatch();

    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const querySearchResults = (value) => {
        dispatch(loaderActions.actions.togggle(true));
        dispatch(getSearchResults(value, 'newest', 1, (results) => {
            dispatch(loaderActions.actions.togggle(false));
            dispatch(articleActions.actions.setArticles(results));
        }));
    }

    const onKeyUp = debounce((event) => {
        if (event.target.value.trim().length > 0) {
            console.log(event.target.value);
            navigateTo('/search/' + event.target.value);
            querySearchResults(event.target.value);
        }

        if (event.target.value.trim().length == 0) {
            setOpenInput(false);
        }
    }, 500)

    const performsearch = (event) => {
        if (openInput) {
            navigateTo('/search/' + event.target.value);
        } else {
            document.getElementById('searchbar').focus();
        }
    }

    return (
        <div className='bg-blue'>
            <div className={`${s.root} p-relative`}>
                <a href="/" className="navbar-logo">
                    <img className={s.logo} src={logo} />
                </a>
                <div className={`p-absolute ${s.searchContainer}`}>
                    <form action="/search" method="get">
                        <input className="search expandright" id="searchbar" type="search" name="q" placeholder="Search all news" onKeyUp={onKeyUp} />
                        <label className="button searchbutton" htmlFor="searchright" onClick={performsearch}><span className="mglass">
                            <span></span>
                        </span></label>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Header;