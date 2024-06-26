import {FC} from 'react'
import styles from './styles.module.scss'
import { useLocation, useNavigate } from 'react-router-dom';
import CopyIco from '../../assets/images/copyIco.svg?react'

interface ClaimBlockProps {}

export const ClaimBlock:FC<ClaimBlockProps> = () => {
    const navigate = useNavigate()
    const loc = useLocation()

  const handler = () => {
    if(loc.pathname === '/frens') {
        navigate('/referals')
    }
  }

    return (
        <div className={styles.claimBLock} onClick={handler} >
            <span className={styles.claimTitle}>
                Invite friends
            </span>
            {loc.pathname === '/frens' && 
                <div className={styles.copyIcoWrap}>
                    <CopyIco className={styles.copyIco} />
                </div>
            }
        </div>
    )
}