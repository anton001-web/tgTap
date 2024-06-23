import { FC } from 'react'
import styles from './styles.module.scss'
import TokenIco from "../../../../assets/images/tokenIco.svg?react"
import SendIco from '../../../../assets/images/sendIco.svg?react'

interface HeaderProps {}

export const Header:FC<HeaderProps> = () => {
    return (
        <header 
            className={styles.header}
        >
            <div className={styles.headerGroup}>
                <TokenIco className={styles.headerToken} />
                <span className={styles.headerTitle} >1200</span>
            </div>
            <div className={styles.headerTopWrap}>
                <div className={styles.headerTopBlock}>
                    You`re TOP 12%
                </div>
                <div className={styles.headerSendBlock}>
                    {/* <img className={styles.headerToken} src={sendIco} /> */}
                    <SendIco className={styles.headerSend} />
                </div>
            </div>
        </header>
    )
}