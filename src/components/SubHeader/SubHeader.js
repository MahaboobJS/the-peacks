import { useNavigate } from 'react-router-dom';
import BookmarkButton from '../BookmarkButton/BookmarkButton';
import DropDown from '../Dropdown/Dropdown';
import s from './SubHeader.module.scss';
const SubHeader = (props) => {
    const options = [{ label: "Newest first", value: "newest" }, { label: "Oldest first", value: "oldest" }];
    const navigate = useNavigate();
    const bookmarkcallback = () => {
        navigate("/bookmark");
    }
    return (
        <div className={s.header}>
            <div className={s.title}>{props.title}</div>
            <div className={s.actions}>
                {!props.isBookmarkHide && <span style={{ marginTop: '5px' }}>
                    <BookmarkButton callback={bookmarkcallback} buttonContent="VIEW BOOKMARK" />
                </span>}
                <DropDown options={options} changeHandler={props.filterResults} />
            </div>
        </div>
    );
};

export default SubHeader;