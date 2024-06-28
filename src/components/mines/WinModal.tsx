import {Dispatch, FC, SetStateAction, useContext} from 'react'
import s from './styles.module.scss'
import cat from '../../assets/images/modalCat.webp'
import modalCoin from '../../assets/images/modalCoin.webp'
import modalCoin2 from '../../assets/images/modalCoin2.webp'
import Mines from '../../assets/images/minesIco.svg?react'
import minesIco from '../../assets/images/minesIco.webp'
import { Link } from 'react-router-dom'
import tokenWhite from '../../assets/images/tokenWhite.webp'
import { TokenContext } from '../../providers/Auth'
import closeIco from '../../assets/images/closeIco.png'

interface WinModalProps {
    winValue: number;
    visibility: boolean;
    setVisibility: Dispatch<SetStateAction<boolean>>;
    reset: () => void;
}

export const WinModal:FC<WinModalProps> = ({winValue, visibility, setVisibility, reset}) => {
    const {setMinesTable}:any = useContext(TokenContext)

    const playMoreHandler = async () => {
        await setMinesTable()
        reset() 
        setVisibility(false)
    }

    return (
        <div className={`${s.modal} ${visibility && s.modalVisibility}`}>
            <Link to='/home' className={s.closeIco} >
                <img src={closeIco} />
            </Link>
            <img src={modalCoin} className={s.modalIco} />
            <img src={modalCoin2} className={s.modalIco2} />
            <div className={s.modalFragment}></div>
            <div className={s.catWrap}>
                <img className={s.cat} src={cat} />
                <span className={s.winTitle}>
                    {winValue}
                    <img src={tokenWhite} className={s.winCoin} />
                </span>
            </div>
            <div className={s.modalFooter}>
                <Link to='/frens' className={s.modalInvite}>
                    invite friends for <img src={minesIco} />
                </Link>
                <div onClick={playMoreHandler} className={s.modalPlayBtn}>
                    Play 1 more ( 7 <Mines /> left )
                </div>
            </div>
        </div>
    )
}