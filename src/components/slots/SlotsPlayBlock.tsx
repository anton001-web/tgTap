import styles from './styles.module.scss'
import {FC, useContext} from 'react'
import minesIco from '../../assets/images/minesIco.webp'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../../providers/Auth'

interface SlotsPlayBlockProps {}

export const SlotsPlayBlock:FC<SlotsPlayBlockProps> = () => {
    const {tickets}:any = useContext(TokenContext)
    const navigate = useNavigate()

    const navigateFn = () => {
        navigate('/slots')
    }

    const modalHandler = () => {

    }

    return (
        <div className={styles.PlayBlock} onClick={navigateFn}>
            <div className={styles.shadow1}></div>
            <div className={styles.shadow2}></div>
            <div className={styles.Mines}>
                <span className={styles.MinesTitle}>Slots</span>
                <div className={styles.MinesGroup}>
                    <img src={minesIco} className={styles.MinesIco} />
                    <span className={styles.gamesNum}>{tickets}</span>
                </div>
            </div>
            <div className={styles.Quest} onClick={modalHandler} >
                <span>NEW</span>
            </div>
        </div>
    )
}