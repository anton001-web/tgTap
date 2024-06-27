import {Dispatch, FC, SetStateAction, useContext, useEffect, useState} from 'react'
import styles from './styles.module.scss'
import { useLocation } from 'react-router-dom';
import CopyIco from '../../assets/images/copyIco.svg?react'
import { TokenContext } from '../../providers/Auth';
import tokenIco  from '../../assets/images/tokenRed.webp'

const USER_REF_URL = 'https://t.me/antontest777_bot/Areva?start=kentId='

interface ClaimBlockProps {
    claimValue: number | string | any;
    setIsActive: Dispatch<SetStateAction<boolean>>;
    isActive: boolean;
    onClick: () => void;
    claimFn: () => void;
}

export const ClaimBlock:FC<ClaimBlockProps> = ({claimValue, onClick, claimFn}) => {
    const loc = useLocation()
    const {token, referals}:any = useContext(TokenContext)
    const [title, setTitle] = useState('Claim')

    const handler = async () => {
        if(loc.pathname === '/frens') {
            navigator.clipboard.writeText(`${USER_REF_URL}${referals?.referral_code}`)
        }

        if(claimValue !== 0) {
            token && claimFn()
            return null
        } 

        token && onClick()
    }


    useEffect(() => {
        if(loc.pathname === '/home') {
            setTitle('Claim')
        } else if(loc.pathname === '/frens') {
            setTitle('Invite friends')
        }
      }, [loc])


    return (
        <div className={styles.claimBLock} onClick={handler} >
            <span className={styles.claimTitle}>
                {title}
                {title === 'Claim' && <> {claimValue.toFixed(2)} <img className={styles.tokenIco} src={tokenIco} /></>}
            </span>
            {loc.pathname === '/frens' && 
                <div className={styles.copyIcoWrap}>
                    <CopyIco className={styles.copyIco} />
                </div>
            }
        </div>
    )
}