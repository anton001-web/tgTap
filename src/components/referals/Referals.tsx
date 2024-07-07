import {FC, useContext, useEffect} from 'react'
import s from './styles.module.scss'
import icoTest from '../../assets/images/refIcoTest.png'
import Pike from '../../assets/images/refIco.svg?react'
import { TokenContext } from '../../providers/Auth'
import tokenWhite from '../../assets/images/tokenWhite.webp'
import { Link } from 'react-router-dom'
import closeIco from '../../assets/images/closeIco.png'

// const list = [
//     {
//         name: "@eblan",
//         balance: '25.54'
//     },
//     {
//         name: "@eblan",
//         balance: '25.54'
//     },
//     {
//         name: "@eblan",
//         balance: '25.54'
//     },
//     {
//         name: "@eblan",
//         balance: '25.54'
//     },
// ]

interface ReferalsProps {}

export const Referals:FC<ReferalsProps> = () => {
    const {referals}:any = useContext(TokenContext)

    useEffect(() => {
        console.log('referals', referals)
    }, [referals])

    return (
        <div className={s.referalWrap}>
            <div className={s.referalBlock}>
                <Link to='/home' className={s.closeIco} >
                    <img src={closeIco} />
                </Link>
                <div className={s.referalTitleBlock}>
                    <Pike className={s.pike} />
                    friends
                </div>
                <div className={s.referalBalance}>
                    <img src={tokenWhite} />
                    {referals?.total_referral_points | 0}
                </div>
                <div className={s.referalList}>
                    <div className={s.border}></div>
                    {
                        referals?.leader_board.length >= 1 ? referals.leader_board.map((item:any, ind:number) => (
                            <>
                                <div className={s.referalListItem} key={ind} >
                                    <img className={s.referalIco} src={icoTest} />
                                    <div className={s.referalItemGroup}>
                                        <span className={s.refName}>{item.username}</span>
                                        <span className={s.refBalance}>
                                            {item.total_points}
                                            <img src={tokenWhite} />
                                        </span>
                                    </div>
                                </div>
                                <div className={s.border}></div>
                            </>
                        )) : <span className={s.noData}>no data yet</span>
                    }
                </div>
                <div className={s.referalTitleBlock}>
                    <Pike className={s.pike} />
                    friends
                </div>
            </div>
        </div>
    )
}