import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import NewsCard from '../../components/NewsCard/NewsCard';
import SubHeader from '../../components/SubHeader/SubHeader';
import s from './Bookmark.module.scss';

export const Bookmark = props => {
    const options = [{ label: "Newest first", value: "newest" }, { label: "Oldest first", value: "oldest" }];
    const isLoading = useSelector(state => { return state.loader.isLoading });
    const [bookmarks, setBookmarks] = useState([]);
    const filterResults = (value) => {
        console.log(value);
    }
    useEffect(() => {
        const bookmarkCollection = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setBookmarks(bookmarkCollection);
    }, [])
    return (<>{!isLoading && <div className={`w-100 ${s.root}`}>
        <SubHeader title='All bookmark' filterResults={filterResults} isBookmarkHide={true} />
        <div className='w-100'>
            <div className={`row ${s.root}`}>
                {bookmarks.map((bItem, i) => {
                    return <div className={`${s.article} article-large`} key={`bookmark${i}`}>
                        <NewsCard newsDetails={bItem} large={true}/>
                    </div>
                })}

            </div>
        </div>

    </div>}</>)
}