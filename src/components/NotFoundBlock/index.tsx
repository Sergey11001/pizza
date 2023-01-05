import React from "react";
import styles from './NotFoundBlock.module.scss'
export default function NotFoundBlock(){
    return(
        <div className={styles.root}>
            <h1 className={styles.title_error}>404</h1>
            <h2 className={styles.description}>Ничего не найдено :(</h2>
            <p>К сожалению такой страницы в интернете не существует</p>
        </div>

    )
}