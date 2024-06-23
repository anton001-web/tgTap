import {FC} from 'react'
import s from './styles.module.scss'
import icoTest from '../../assets/images/refIcoTest.png'
import Pike from '../../assets/images/refIco.svg?react'
import TokenIco from "../../assets/images/tokenIco.svg?react"

const list = [
    {
        name: "@eblan",
        balance: '25.54'
    },
    {
        name: "@eblan",
        balance: '25.54'
    },
    {
        name: "@eblan",
        balance: '25.54'
    },
    {
        name: "@eblan",
        balance: '25.54'
    },
]

interface ReferalsProps {}

export const Referals:FC<ReferalsProps> = () => {
    return (
        <div className={s.referalWrap}>
            <div className={s.referalBlock}>
                <div className={s.referalTitleBlock}>
                    <Pike className={s.pike} />
                    referals
                </div>
                <div className={s.referalBalance}>
                    <TokenIco />
                    259.34
                </div>
                <div className={s.referalList}>
                    <div className={s.border}></div>
                    {
                        list.map((item, ind) => (
                            <>
                                <div className={s.referalListItem} key={ind} >
                                    <img className={s.referalIco} src={icoTest} />
                                    <div className={s.referalItemGroup}>
                                        <span className={s.refName}>{item.name}</span>
                                        <span className={s.refBalance}>
                                            {item.balance}
                                            <TokenIco />
                                        </span>
                                    </div>
                                </div>
                                <div className={s.border}></div>
                            </>
                        ))
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