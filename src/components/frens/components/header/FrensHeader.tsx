import {FC} from 'react'
import style from './styles.module.scss'
import Banner from '../../../../assets/images/frensBanner.svg?react'

interface FrensHeaderProps {}

export const FrensHeader:FC<FrensHeaderProps> = () => {
    return (
        <div className={style.frensHeader}>
            <div className={style.frensBanner}>
                <Banner className={style.bannerImg} />
                <span className={style.frensTitle}>FRENS</span>
            </div>
        </div>
    )
}