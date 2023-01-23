import { useNavigate } from 'react-router-dom';
import s from './NewsCard.module.scss'
const NewsCard = (props) => {
    let navigateTo = useNavigate()

    const newsDetails = props.newsDetails;
    return (<div className={`w-100 h-100 ${props.bodyClass ? props.bodyClass : ''} 
    ${props.large && !(newsDetails?.fields?.thumbnail) ? s.lg : ''}
    ${props.isMedium && !(newsDetails?.fields?.thumbnail) ? s.md : ''}
    ${s.root} ${newsDetails?.fields?.thumbnail ? s.thumbnail : s.noThumbnail}`} style={{
            backgroundImage: (newsDetails?.fields && newsDetails?.fields?.thumbnail ?
                `url(${newsDetails?.fields?.thumbnail})` : '')
        }} onClick={() => { navigateTo(`/article/${newsDetails.id}`) }}>
        <div className={s.title}>
            {props.isMedium ? newsDetails?.fields?.headline.substr(0, 35) : newsDetails?.fields?.headline.substr(0, 50)}
            <p>{newsDetails?.webTitle}</p>
        </div>

    </div>)

}

export default NewsCard