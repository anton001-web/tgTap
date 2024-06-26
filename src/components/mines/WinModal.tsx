import {FC} from 'react'
import s from './styles.module.scss'
import cat from '../../assets/images/modalCat.png'
import modalCoin from '../../assets/images/modalCoin.png'
import modalCoin2 from '../../assets/images/modalCoin2.png'
import Mines from '../../assets/images/minesIco.svg?react'
import minesIco from '../../assets/images/minesIco.png'
import { useNavigate } from 'react-router-dom'
import tokenWhite from '../../assets/images/tokenWhite.png'

interface WinModalProps {
    winValue: number;
    visibility: boolean
}

export const WinModal:FC<WinModalProps> = ({winValue, visibility}) => {
    const navigate = useNavigate()

    const inviteHandler = () => {
        navigate('/referals')
    }

    const playMoreHandler = () => { 
        window.location.reload()
    }

    return (
        <div className={`${s.modal} ${visibility && s.modalVisibility}`}>
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
                <div onClick={inviteHandler} className={s.modalInvite}>
                    invite friends for <img src={minesIco} />
                </div>
                <div onClick={playMoreHandler} className={s.modalPlayBtn}>
                    Play 1 more ( 7 <Mines /> left )
                </div>
            </div>
        </div>
    )
}