import { FC, useContext } from 'react'
import styles from './styles.module.scss'
import SendIco from '../../../../assets/images/sendIco.svg?react'
import { TokenContext } from '../../../../providers/Auth'
import tokenWhite from '../../../../assets/images/tokenWhite.webp'

interface HeaderProps {}

export const Header:FC<HeaderProps> = () => {
    const {profile, tokensBalance}:any = useContext(TokenContext)

    return (
        <header 
            className={styles.header}
        >
            <div className={styles.headerGroup}>
                <img src={tokenWhite} className={styles.headerToken} />
                <span className={styles.headerTitle} >{tokensBalance?.toFixed(2)}</span>
            </div>
            <div className={styles.headerTopWrap}>
                <div className={styles.headerTopBlock}>
                    You`re TOP {profile?.top_percent || 0}%
                </div>
                <div className={styles.headerSendBlock}>
                    {/* <img className={styles.headerToken} src={sendIco} /> */}
                    <SendIco className={styles.headerSend} />
                </div>
            </div>
        </header>
    )
}