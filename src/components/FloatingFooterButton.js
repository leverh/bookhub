import React from 'react';
import styles from "../styles/FloatingFooterButton.module.css"

const FloatingFooterButton = ({ onClick }) => {  
    return (
        <button className={styles.footerButton} onClick={onClick}> 
            Info
        </button>
    );
}

export default FloatingFooterButton;
