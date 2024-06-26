import {FC} from 'react'
import s from './styles.module.scss'
import cat from '../../assets/images/dailyCat.png'
import TokenIco from "../../assets/images/tokenIco.svg?react"
import minesIco from '../../assets/images/minesIco.png'
import footerBg from '../../assets/images/dailyFooterImg.png'

interface DailyProps {
    visibility: boolean,
    setVisibility: (state:boolean) => void;
}

export const Daily:FC<DailyProps> = ({visibility, setVisibility}) => {
    

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
                            50
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