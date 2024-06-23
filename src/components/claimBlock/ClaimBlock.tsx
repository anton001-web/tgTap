import {FC, useEffect, useState} from 'react'
import styles from './styles.module.scss'
import tokenIco  from '../../assets/images/tokenRed.png'
import { useLocation } from 'react-router-dom';
import CopyIco from '../../assets/images/copyIco.svg?react'

interface ClaimBlockProps {}

export const ClaimBlock:FC<ClaimBlockProps> = () => {
    const [isDisabled, setIsDisabled] = useState(false);
    const loc = useLocation()
    const [title, setTitle] = useState('Claim')

    useEffect(() => {
        const lastClicked = localStorage.getItem('buttonLastClicked');
        if (lastClicked) {
        const timeElapsed = Date.now() - new Date(lastClicked).getTime();
        const hoursElapsed = timeElapsed / (1000 * 60 * 60);

        if (hoursElapsed >= 8) {
            setIsDisabled(false);
            localStorage.removeItem('buttonLastClicked');
        } else {
            setIsDisabled(true);
        }
        }
    }, []);

  const handleClick = () => {
    localStorage.setItem('buttonLastClicked', new Date().toISOString());
    setIsDisabled(true);
  };

  useEffect(() => {
    if(loc.pathname === '/') {
        setTitle('Claim')
    } else if(loc.pathname === '/frens') {
        setTitle('Invite friends')
    }
  }, [loc])

    return (
        <div className={styles.claimBLock}>
            <span className={styles.claimTitle}>
                {title}
                {title === 'Claim' && <img className={styles.tokenIco} src={tokenIco} />}
            </span>
            {loc.pathname === '/frens' && 
                <div className={styles.copyIcoWrap}>
                    <CopyIco className={styles.copyIco} />
                </div>
            }
        </div>
    )
}