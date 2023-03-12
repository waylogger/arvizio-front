import React from 'react';
import classes from './MyButton.module.css';

const MyButton = (props: {
    onClick?: (event) => void,
    disabled?: boolean,
    children
},) => {
    return (
        <button onClick={props.onClick} className={classes.myBtn} disabled={props.disabled ? true : false} >
       {
       props.children 
       } 
        </button>
    );
};

export default MyButton;
