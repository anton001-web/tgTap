import styles from './styles.module.scss'
import { FC, useContext } from 'react'
import minesIco from '../../../../assets/images/minesIco.webp'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../../../../providers/Auth'

interface MinesPlayBlockProps {}

export const MinesPlayBlock:FC<MinesPlayBlockProps> = () => {
    const {setMinesTable, profile}:any = useContext(TokenContext)
    const navigate = useNavigate()

    const navigateFn = async () => {
        if(profile.playing_tickets_amount) {
            if(profile?.playing_tickets_amount === 0) {
                return null
            }

            await setMinesTable()
            navigate('/mines')
        }
    }

    return (
        <div className={styles.PlayBlock}>
            <div className={styles.Mines}>
                <span className={styles.MinesTitle}>Mines</span>
                <div className={styles.MinesGroup}>
                    <img src={minesIco} className={styles.MinesIco} />
                    <span className={styles.gamesNum}>{profile?.playing_tickets_amount}</span>
                </div>
            </div>
            <div className={styles.GamieBlock} >
                <span onClick={navigateFn}>GamIe</span>
            </div>
        </div>
    )
}