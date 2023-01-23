
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import NewsCard from '../../components/NewsCard/NewsCard';
import SubHeader from '../../components/SubHeader/SubHeader';
import { loaderActions } from '../../reducers/loader';
import { getAllSectionNews, getTOPNews } from '../../services/contentAPIs';
import s from './Home.module.scss';

export const Home = props => {
    const [newsResults, setNewsResults] = useState([]);
    const [categoryResults, setCategoryResults] = useState({});
    const dispatch = useDispatch();
    const isLoading = useSelector(state => { return state.loader.isLoading });
    const navigate = useNavigate();


    const getTopNews = (type) => {
        dispatch(loaderActions.actions.togggle(true));
        dispatch(getTOPNews('news', type, (results) => {
            dispatch(loaderActions.actions.togggle(false));
            setNewsResults(results);
        }));
    }

    useEffect(() => {
        getTopNews('newest');
    }, [])

    const getCategoryInfo = (type) => {
        dispatch(loaderActions.actions.togggle(true));
        dispatch(getAllSectionNews(['sport', 'culture', 'lifeandstyle'], type, (results) => {
            dispatch(loaderActions.actions.togggle(false));
            setCategoryResults(results);
        }));
    }

    useEffect(() => {
        getCategoryInfo('newest');

    }, [])

    const filterResults = (value) => {
        setTimeout(() => {
            getTopNews(value);
            getCategoryInfo(value);
        }, 500);
    }

    return (<><div className={`w-100 ${s.root}`}>
        <SubHeader title='Top Stories' filterResults={filterResults} />
        {!isLoading && <div className='w-100'>
            <div className={s.topstoryContent}>
                <div className={`w-50 ${s.cardX}`}>
                    <div className="article-x-large">
                        <NewsCard newsDetails={newsResults[0]} bodyClass="border-green" />
                    </div>
                </div>
                <div className={s.rightStory}>
                    <div className='d-flex'>
                        <div className={`article-medium ${s.card}`}>
                            <NewsCard newsDetails={newsResults[1]} isMedium={true}/>
                        </div>
                        <div className={`article-medium ${s.card}`} style={{ marginLeft: '25px' }}>
                            <NewsCard newsDetails={newsResults[2]} bodyClass="border-yellow" isMedium={true}/>
                        </div>
                    </div>

                    <div className='d-flex' style={{ marginTop: '35px' }}>
                        <div className={`article-small ${s.card}`}>
                            <NewsCard newsDetails={newsResults[3]} bodyClass="border-blue" isMedium={true}/>
                        </div>
                        <div className={`article-small ${s.card}`} style={{ marginLeft: '25px' }}>
                            <NewsCard newsDetails={newsResults[4]} bodyClass="border-green" isMedium={true}/>
                        </div>
                    </div>
                </div>
            </div>


            {/* <div className={s.bottomStory}> */}
            <div className="row" style={{
                'margin': '20px 0',
                justifyContent: 'space-between'
            }}>
                <div className="article-large">
                    <NewsCard newsDetails={newsResults[5]} large={true}/>
                </div>
                <div className="article-large">
                    <NewsCard newsDetails={newsResults[6]} large={true}/>
                </div>
                <div className="article-large">
                    <NewsCard newsDetails={newsResults[7]}  large={true}/>
                </div>
            </div>

            {(!!categoryResults?.sport?.length) && <div className='w-100'>
                <div className={s.header}>
                    <div className={s.title}>Sport</div>
                </div>
                <div className="row" style={{
                    'margin': '20px 0',
                    justifyContent: 'space-between'
                }}>
                    {categoryResults?.sport.map((cat, i) => {
                        return <div className="article-large my-2" key={`sport${i}`}>
                            <NewsCard newsDetails={cat} large={true}/>
                        </div>
                    })}
                </div>
            </div>}
            {(!!categoryResults?.culture?.length) && <div className='w-100'>
                <div className={s.header}>
                    <div className={s.title}>Culture</div>
                </div>
                <div className="row" style={{
                    'margin': '20px 0',
                    justifyContent: 'space-between'
                }}>

                    {categoryResults?.culture.map((cat, i) => {
                        return <div className="article-large my-2" key={`culture${i}`}>
                            <NewsCard newsDetails={cat} large={true}/>
                        </div>
                    })}

                </div>
            </div>
            }
            {(!!categoryResults?.lifeAndStyle?.length) && <div className='w-100'>
                <div className={s.header}>
                    <div className={s.title}>Life and Style</div>
                </div>
                <div className="row" style={{
                    'margin': '20px 0',
                    justifyContent: 'space-between'
                }}>

                    {categoryResults?.lifeAndStyle.map((cat, i) => {
                        return <div className="article-large my-2" key={`life${i}`}>
                            <NewsCard newsDetails={cat} large={true}/>
                        </div>
                    })}
                </div>
            </div>}

        </div>}
    </div></>)

}