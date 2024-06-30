import { FC, useContext } from 'react'
import styles from './styles.module.scss'
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
                    YOU'RE TOP {profile?.top_percent || 0}% PLAYER
                </div>
            </div>
        </header>
    )
}