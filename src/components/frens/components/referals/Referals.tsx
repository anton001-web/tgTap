import {FC} from 'react'
import s from './styles.module.scss'

interface ReferalsProps {}

export const Referals:FC<ReferalsProps> = () => {
    return (
        <div className={s.referalsWrap}>
            <div className={s.referalsGroup}>
                <span className={s.referalsTitle}>U have 12 referals</span>
                <div className={s.referalsCheckBtn}>chech stats</div>
            </div>
            <div className={s.referalsLine}></div>
        </div>
    )
}