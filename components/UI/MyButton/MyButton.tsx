import React from 'react';
import classes from './MyButton.module.css';

const MyButton = (props: {
    onClick?: (event) => void,
    children
},) => {
    return (
        <button onClick={props.onClick} className={classes.myBtn}>
       {
       props.children 
       } 
        </button>
    );
};

export default MyButton;
