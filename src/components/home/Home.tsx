import {FC} from 'react'
import style from './styles.module.scss'
import { Header } from './components/header/Header'
import { MainCat } from './components/mainCat/MainCat'
import { MinesPlayBlock } from './components/minesPlayBlock/MinesPlayBlock'

interface HomeProps {}

export const Home:FC<HomeProps> = () => {
    return (
        <div className={style.homeWrap}>
            <Header />
            <MainCat />
            <MinesPlayBlock />
        </div>
    )
}