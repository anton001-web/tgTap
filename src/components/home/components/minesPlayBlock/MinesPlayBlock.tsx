import styles from './styles.module.scss'
import { FC, useContext, useEffect, useState } from 'react'
import minesIco from '../../../../assets/images/minesIco.png'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../../../../providers/Auth'
import { getUser } from '../../../api/api'

interface MinesPlayBlockProps {}

export const MinesPlayBlock:FC<MinesPlayBlockProps> = () => {
    const [data, setData] = useState<any>()
    const {token}:any = useContext(TokenContext)
    const navigate = useNavigate()

    const getUserF = async () => {
        const res = await getUser(token)
        setData(res)
    }

    useEffect(() => {
        if(token) {
            getUserF()
        }       
    }, [token])

    const navigateFn = () => {
        if(data.playing_tickets_amount) {
            if(data?.playing_tickets_amount === 0) {
                return null
            }

            navigate('/mines')
        }
    }

    return (
        <div className={styles.PlayBlock}>
            <div className={styles.Mines}>
                <span className={styles.MinesTitle}>Mines</span>
                <div className={styles.MinesGroup}>
                    <img src={minesIco} className={styles.MinesIco} />
                    <span className={styles.gamesNum}>{data?.playing_tickets_amount}</span>
                </div>
            </div>
            <div className={styles.GamieBlock} >
                <span onClick={navigateFn}>GamIe</span>
            </div>
        </div>
    )
}