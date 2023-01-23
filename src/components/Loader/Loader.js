import { useState } from 'react';
import { useSelector } from 'react-redux';
import s from './Loader.module.scss';
const Loader = (props) => {
    return (
        props.loading && <div className={`p-absolute ${s.root}`}>
            <div className={s.loader}></div>
        </div>
    );
};

export default Loader;