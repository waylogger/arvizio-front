import React from 'react';
import classes from './MyInput.module.css';

export default function MyInput (
    props: {
        type: 'text' | 'password',
        placeholder: string,
        onInput: (event) => void
    }
){
    return (
        <input type={props.type} placeholder={props.placeholder} className={classes.myInput} onInput={props.onInput} />
    )
}
