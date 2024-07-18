import {Dispatch, FC, SetStateAction} from 'react'
import style from './styles.module.scss'
import { Header } from './components/header/Header'
import { MainCat } from './components/mainCat/MainCat'
import { MinesPlayBlock } from './components/minesPlayBlock/MinesPlayBlock'
import { SlotsPlayBlock } from '../slots/SlotsPlayBlock'

interface HomeProps {
    setVisibility: Dispatch<SetStateAction<boolean>>
}

export const Home:FC<HomeProps> = ({setVisibility}) => {
    return (
        <div className={style.homeWrap}>
            <Header />
            <MainCat />
            <MinesPlayBlock setVisibility={setVisibility} />
            <SlotsPlayBlock />
        </div>
    )
}