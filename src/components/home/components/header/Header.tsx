import { FC, useContext, useEffect, useState } from 'react'
import styles from './styles.module.scss'
import SendIco from '../../../../assets/images/sendIco.svg?react'
import { TokenContext } from '../../../../providers/Auth'
import { getUser } from '../../../api/api'
import tokenWhite from '../../../../assets/images/tokenWhite.png'

interface HeaderProps {}

export const Header:FC<HeaderProps> = () => {

    const [data, setData] = useState<any>()
    const {token}:any = useContext(TokenContext)

    const getUserF = async () => {
        const res = await getUser(token)
        setData(res)
    }

    useEffect(() => {
        if(token) {
            getUserF()
        }       
    }, [token])

    return (
        <header 
            className={styles.header}
        >
            <div className={styles.headerGroup}>
                <img src={tokenWhite} className={styles.headerToken} />
                <span className={styles.headerTitle} >{data?.total_points}</span>
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