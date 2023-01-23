
import s from './Dropdown.module.scss'
const DropDown = (props) => {
    let { changeHandler, options } = props;
    let handleChange = (event) => {
        changeHandler(event.target.value);
    }
    return (
        <div className="select-box-container">
            <select onChange={handleChange} className={s.dropDown}>
                {options.map((option, index) => {
                    return <option value={option.value} key={index}>{option.label}</option>
                })}
            </select>
        </div>
    )

}

export default DropDown;