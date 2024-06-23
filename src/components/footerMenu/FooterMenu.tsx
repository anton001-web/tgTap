import {FC, useEffect, useState} from 'react'
import styles from './styles.module.scss'
import TokenIco from '../../assets/images/tokenIco.svg?react' 
import CardsIco from '../../assets/images/cardsIco.svg?react' 
import CherryIco from '../../assets/images/cherryIco.svg?react' 
import { Link, useLocation } from 'react-router-dom'
// import cardIco  from '../../../public/assets/images/test.svg'
// import cherryIco  from '../../../public/assets/images/cherryIco.png'

interface FooterMenuProps {}

export const FooterMenu:FC<FooterMenuProps> = () => {
    const loc = useLocation()
    const [tab, setTab] = useState<string>('home')

    useEffect(() => {
        if(loc.pathname === '/') {
            setTab('home')
        } else if (loc.pathname === '/frens') {
            setTab('frens')
        } else if (loc.pathname === '/referals') {
            setTab('frens')
        } else if (loc.pathname === '/tasks') {
            setTab('tasks')
        }
    }, [loc])

    return (
        <div className={styles.FooterMenu}>
            <Link to='/' onClick={() => setTab('home')} className={`${styles.MenuItem} ${tab === 'home' && styles.MenuItemActive}`}>
                {/* <img className={styles.Icon} src={tokenIco} /> */}
                <TokenIco className={styles.Icon} />
                home
            </Link>
            <Link to='/tasks' onClick={() => setTab('tasks')} className={`${styles.MenuItem} ${tab === 'tasks' && styles.MenuItemActive}`}>
                {/* <img className={styles.Icon} src={cardIco} /> */}
                <CardsIco className={styles.Icon} />
                tasks
            </Link>
            <Link to='/frens' onClick={() => setTab('frens')} className={`${styles.MenuItem} ${tab === 'frens' && styles.MenuItemActive}`}>
                {/* <img className={styles.Icon} src={cherryIco} /> */}
                <CherryIco className={styles.Icon} />
                frens
            </Link>
        </div>
    )
}