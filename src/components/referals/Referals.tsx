import {FC, useContext, useEffect, useState} from 'react'
import s from './styles.module.scss'
import icoTest from '../../assets/images/refIcoTest.png'
import Pike from '../../assets/images/refIco.svg?react'
import { getReferral } from '../api/api'
import { TokenContext } from '../../providers/Auth'
import tokenWhite from '../../assets/images/tokenWhite.png'

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
    const [answer, setAnswer] = useState<any>()
    const {token}:any = useContext(TokenContext)

    const getRefsF = async () => {
        const res = await getReferral(token)
        setAnswer(res)
    }

    useEffect(() => {
        console.log('REFERALS', answer)
    }, [answer])

    useEffect(() => {
        token && getRefsF()
    }, [token])

    return (
        <div className={s.referalWrap}>
            <div className={s.referalBlock}>
                <div className={s.referalTitleBlock}>
                    <Pike className={s.pike} />
                    referals
                </div>
                <div className={s.referalBalance}>
                    <img src={tokenWhite} />
                    {answer?.total_referral_points | 0}
                </div>
                <div className={s.referalList}>
                    <div className={s.border}></div>
                    {
                        answer?.leader_board.length >= 1 ? answer.leader_board.map((item:any, ind:number) => (
                            <>
                                <div className={s.referalListItem} key={ind} >
                                    <img className={s.referalIco} src={icoTest} />
                                    <div className={s.referalItemGroup}>
                                        <span className={s.refName}>{item.name}</span>
                                        <span className={s.refBalance}>
                                            {item.balance}
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
                    referals
                </div>
            </div>
        </div>
    )
}