
import s from './BookmarkButton.module.scss'
const BookmarkButton = (props) => {
    const {callback, buttonContent} = props;
    return (
        <div className={s.button} onClick={callback}>
            <span className={s.bookmarkIcon}></span>
             <span>{buttonContent}</span>
        </div>
    )

}

export default BookmarkButton;