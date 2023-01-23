import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import s from './Article.module.scss';
import { getArticleInformation } from '../../services/contentAPIs'
import { useDispatch, useSelector } from 'react-redux';
import { loaderActions } from '../../reducers/loader';
import BookmarkButton from '../../components/BookmarkButton/BookmarkButton';

export const Article = props => {
    const queryParams = useParams();
    const dispatch = useDispatch();
    const id = queryParams['*'];
    const [articleDetails, setArticleDetails] = useState([]);
    const [isSaved, setIsSaved] = useState(false);
    const isLoading = useSelector(state => { return state.loader.isLoading });
    const [notification, setNotification] = useState({});
    useEffect(() => {

        const bookmarkCollection = JSON.parse(localStorage.getItem('bookmarks')) || [];
        setIsSaved(bookmarkCollection.findIndex((item) => item.id == id) != -1);
        dispatch(loaderActions.actions.togggle(true));
        dispatch(getArticleInformation(id, (results) => {
            dispatch(loaderActions.actions.togggle(false));
            setArticleDetails(results);
        }));
    }, [])


    const formatDate = (dt) => {
        let date = new Date(dt);
        return `${date.toDateString()} ${("0" + date.getUTCHours()).slice(-2)}:${("0" + date.getUTCMinutes()).slice(-2)}`;
    }
    const hideNotification = () => {
        setTimeout(() => {
            setNotification({});
        }, 3000)
    }
    const bookmarkcallback = () => {
        const bookmarkCollection = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarkCollection.push(articleDetails);
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkCollection));
        setNotification({
            show: true,
            message: 'Saved to bookmarks',
            isAdded: true
        })
        setIsSaved(true);
        hideNotification();
    }
    const removeBookmarkcallback = () => {
        const bookmarkCollection = JSON.parse(localStorage.getItem('bookmarks')) || [];
        bookmarkCollection.splice(bookmarkCollection.findIndex((item) => item.id == id), 1)
        localStorage.setItem('bookmarks', JSON.stringify(bookmarkCollection));
        setNotification({
            show: true,
            message: 'Removed from bookmark',
            isAdded: false
        })
        setIsSaved(false);
        hideNotification();
    }

    return (<>{!isLoading && <div className={`w-100 ${s.root}`}>

        <div className={s.articlecontent}>
            <div className={s.wrapper}>
                <div className={s.header}>
                    {isSaved ? <BookmarkButton callback={removeBookmarkcallback} buttonContent="REMOVE BOOKMARK" /> : <BookmarkButton callback={bookmarkcallback} buttonContent="ADD BOOKMARK" />
                    }
                </div>
                <div className='text-upper'>
                    {formatDate(articleDetails?.webPublicationDate)}
                </div>
                <div className={s.headLine}>
                    {articleDetails?.fields?.headline}
                </div>
                {
                    articleDetails?.fields?.thumbnail && <div className={`${s.articleFigureCon} ${s.mobileVersion}`}>
                        <div className={s.articleFig} style={{ backgroundImage: `url(${articleDetails?.fields?.thumbnail})` }}></div>
                        <div className={s.articleFigTitle}> {articleDetails?.fields?.trailText}</div>

                    </div>}
                <div className={s.trailText}>
                    {articleDetails?.fields?.trailText}
                </div>
                <hr />
                <div className={s.contentBody} dangerouslySetInnerHTML={{ __html: articleDetails?.fields?.body }} >

                </div>
            </div>
            {
                articleDetails?.fields?.thumbnail && <div className={`${s.articleFigureCon} ${s.desktopVersion}`}>
                    <div className={s.articleFig} style={{ backgroundImage: `url(${articleDetails?.fields?.thumbnail})` }}></div>
                    <div className={s.articleFigTitle}> {articleDetails?.fields?.trailText}</div>

                </div>}
        </div>


        {notification.show && <div className={`${s.notification}`} style={{ backgroundColor: notification.isAdded ? '#388e3c' : '#d32f2f' }}>
            {notification.isAdded ? <span className={s.save}>

            </span> : <span className={s.remove}>

            </span>}
            <span> {notification.message}</span>
        </div>}

    </div>}</>)
}