import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import NewsCard from '../../components/NewsCard/NewsCard';
import SubHeader from '../../components/SubHeader/SubHeader';
import { loaderActions } from '../../reducers/loader';
import { getSearchResults } from '../../services/contentAPIs';
import s from './SearchResults.module.scss';

export const SearchResults = props => {
    const isLoading = useSelector(state => { return state.loader.isLoading });
    const [searchResults, setSearchResults] = useState([]);
    const queryParams = useParams();
    const dispatch = useDispatch();
    const val = queryParams['*'];
    let count = 1;

    function debounce(func, timeout = 300) {
        let timer;
        return (...args) => {
            clearTimeout(timer);
            timer = setTimeout(() => { func.apply(this, args); }, timeout);
        };
    }

    const querySearchResults = (isScrollLoad, num) => {
        dispatch(loaderActions.actions.togggle(true));
        dispatch(getSearchResults(val, 'newest', num, (results) => {
            dispatch(loaderActions.actions.togggle(false));
            let response = results;
            if (isScrollLoad) {
                response = [...response, ...results]
            }
            setSearchResults(response);
        }));
    }
    const scrollCntrl = debounce((event) => {
        if (window.innerHeight + document.documentElement.scrollTop !== document.documentElement.offsetHeight) return;
        count += 1;
        querySearchResults(true, count);
    }, 400)

    useEffect(() => {
        window.addEventListener("scroll", scrollCntrl);
        return () => window.removeEventListener('scroll', scrollCntrl);
    }, []);



    useEffect(() => {
        querySearchResults(false, 1);
    }, [])

    const filterResults = (value) => {
        console.log(value);
    }
    return (<>{!isLoading && <div className={`w-100 ${s.root}`}>
        <SubHeader title='Search result' filterResults={filterResults} isBookmarkHide={true} />
        <div className='w-100'>
            <div className={`row ${s.root}`}>

                {searchResults.map((bItem, i) => {
                    return <div className={`${s.article} article-large`} key={`search${i}`}>
                        <NewsCard newsDetails={bItem} large={true}/>
                    </div>
                })}

            </div>
        </div>

    </div>}</>)
}