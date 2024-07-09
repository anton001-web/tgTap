import {FC, useContext, useState} from 'react'
import style from './styles.module.scss'
import { FrensHeader } from './components/header/FrensHeader'
import { Referals } from './components/referals/Referals'
import { Road } from './components/road/Road'
import CopyIco from '../../assets/images/copyIco.svg?react'
import { TokenContext } from '../../providers/Auth'
import checkIco from '../../assets/images/checkIco.png'

const USER_REF_URL = 'https://t.me/purrtapbot/PurrTapBot?start=refId='

interface FrensProps {}

export const Frens:FC<FrensProps> = () => {
    const {refCode, toaster}:any = useContext(TokenContext)

    const [anim, setAnim] = useState<boolean>(false)

    const handler = async () => {
        toaster('Copied!')
        console.log('REFS', refCode)
        setAnim(true)
            setTimeout(() => {
                setAnim(false)
            }, 2000)
        navigator.clipboard.writeText(`${USER_REF_URL}${refCode}`)
    }

    return (
        <div className={style.frensWrap}>
             <FrensHeader />
             <Referals />
             <Road />
            <div className={style.claimBLock} onClick={handler} >
                <span className={`${style.claimTitle} ${anim && style.claimTitleAnim}`}>
                    Invite friends
                </span>
                <div className={`${style.copyIcoWrap} ${anim && style.copyIcoWrapAnim}`}>
                    <CopyIco className={style.copyIco} />
                </div>
                <div className={`${style.checkIcoWrap} ${anim && style.checkIcoWrapAnim}`}>
                    <img src={checkIco} />
                </div>
        </div>
        </div>
    )
}