import {FC, useContext} from 'react'
import s from './styles.module.scss'
import cat from '../../assets/images/dailyCat.webp'
import TokenIco from "../../assets/images/tokenIco.svg?react"
import footerBg from '../../assets/images/dailyFooterImg.webp'
import { TokenContext } from '../../providers/Auth'

interface DailyProps {
    visibility: boolean,
    setVisibility: (state:boolean) => void;
}

export const Daily:FC<DailyProps> = ({visibility, setVisibility}) => {
    const {pointsClaim}:any = useContext(TokenContext)

    const handler = () => {
        setVisibility(false)
    }

    return (
        <div className={`${s.dailyWrap} ${visibility && s.dailyWrapActive}`}>
            <img src={footerBg} className={s.dailyFooter} />
            <div className={s.headerGroup}>
                <span className={s.dailyTitle}>
                    {/* daily */}
                     MEOW
                    </span>
                {/* <span className={s.dailySubtitle}>1 DAY STREAK</span> */}
            </div>
            <div className={s.dailyMainWrap}>
                <div className={s.catWrap}>
                    <img src={cat} className={s.cat} />
                </div>
                <div className={s.dailyPrize}>
                    <div className={s.dailyCoins}>
                        <span className={s.dailyPrizeTitle}>
                            {pointsClaim}
                        </span>
                        <TokenIco className={s.tokenIco} />
                    </div>
                    {/* <div className={s.border}></div>
                    <div className={s.dailyTickets}>
                        <span className={s.dailyPrizeTitle}>1</span>
                        <img className={s.minesIco} src={minesIco} />
                    </div> */}
                </div>
            </div>
            <div className={s.claimBLock} onClick={handler} >
                Claim
            </div>
        </div>
    )
}