import {FC} from 'react'
import style from './styles.module.scss'
import { FrensHeader } from './components/header/FrensHeader'
import { Referals } from './components/referals/Referals'
import { Road } from './components/road/Road'

interface FrensProps {}

export const Frens:FC<FrensProps> = () => {
    return (
        <div className={style.frensWrap}>
            <FrensHeader />
            <Referals />
            <Road />
        </div>
    )
}