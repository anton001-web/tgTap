import styles from './styles.module.scss'
import { FC } from 'react'
import minesIco from '../../../../assets/images/minesIco.png'

interface MinesPlayBlockProps {}

export const MinesPlayBlock:FC<MinesPlayBlockProps> = () => {
    return (
        <div className={styles.PlayBlock}>
            <div className={styles.Mines}>
                <span className={styles.MinesTitle}>Mines</span>
                <div className={styles.MinesGroup}>
                    <img src={minesIco} className={styles.MinesIco} />
                    <span className={styles.gamesNum}>8</span>
                </div>
            </div>
            <div className={styles.GamieBlock} >
                GamIe
            </div>
        </div>
    )
}