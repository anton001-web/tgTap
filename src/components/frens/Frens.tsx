import {FC, useContext, useState} from 'react'
import style from './styles.module.scss'
import { FrensHeader } from './components/header/FrensHeader'
import { Referals } from './components/referals/Referals'
import { Road } from './components/road/Road'
import CopyIco from '../../assets/images/copyIco.svg?react'
import { TokenContext } from '../../providers/Auth'
import checkIco from '../../assets/images/checkIco.png'

const USER_REF_URL = 'https://t.me/app_tap_cat_bot/AppTapCatBot?startapp='

interface FrensProps {}

export const Frens:FC<FrensProps> = () => {
    const {refCode, toaster, referals}:any = useContext(TokenContext)

    console.log('LOL', referals)

    const [anim, setAnim] = useState<boolean>(false)

    const handler = async () => {
        toaster('Copied!')
        console.log('REFS', refCode)
        setAnim(true)
            setTimeout(() => {
                setAnim(false)
            }, 2000)
        try {
            await navigator.clipboard.writeText(`${USER_REF_URL}${refCode}`)
        } catch {
            const input = document.createElement('input');
            input.value = `${USER_REF_URL}${refCode}`;
            document.body.appendChild(input);
            input.select();
            input.setSelectionRange(0, 99999); // Для мобильных устройств

            try {
                document.execCommand('copy');
                alert('Текст скопирован в буфер обмена!');
            } catch (err) {
                console.error('Ошибка копирования текста: ', err);
            }
        
            document.body.removeChild(input);
        }
    }

    return (
        <div className={style.frensWrap}>
             <FrensHeader />
             <Referals />
             <Road />
             <div className={style.footer}>
                <div className={style.footerGroup}>
                    <span className={style.footerTitle}>Earned Points</span>
                    <span className={style.footerSubtitle}>{referals?.total_referral_points}</span>
                </div>
                <div className={style.footerGroup}>
                    <span className={style.footerTitle}>Total Referrals</span>
                    <span className={style.footerSubtitle}>{referals?.total_referrals}</span>
                </div>
             </div>
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