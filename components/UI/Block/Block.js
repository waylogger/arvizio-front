import React from 'react';
import cl from './Block.module.css';

const Block = ({children, visible, setVisible}) => {

    const rootClasses = [cl.myBlock]

    if (visible) {
        rootClasses.push(cl.active);
    }

    return (
        <div className={rootClasses.join(' ')} onClick={() => setVisible(false)}>
            <div className={cl.myBlockContent} onClick={(e) => e.stopPropagation()}>
                {children}
            </div>
        </div>
    );
};

export default Block;