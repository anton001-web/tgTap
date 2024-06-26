import {FC, useEffect, useState} from 'react'
import styles from './styles.module.scss'
import CardsIco from '../../assets/images/cardsIco.svg?react' 
import CherryIco from '../../assets/images/cherryIco.svg?react' 
import { Link, useLocation } from 'react-router-dom'
import tokenWhite from '../../assets/images/tokenWhite.png'

interface FooterMenuProps {}

export const FooterMenu:FC<FooterMenuProps> = () => {
    const loc = useLocation()
    const [tab, setTab] = useState<string>('home')

    useEffect(() => {
        if(loc.pathname === '/home') {
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
            <Link to='/home' onClick={() => setTab('home')} className={`${styles.MenuItem} ${tab === 'home' && styles.MenuItemActive}`}>
                <img src={tokenWhite} className={styles.Icon} />
                home
            </Link>
            <Link to='/tasks' onClick={() => setTab('tasks')} className={`${styles.MenuItem} ${tab === 'tasks' && styles.MenuItemActive}`}>
                <CardsIco className={styles.Icon} />
                tasks
            </Link>
            <Link to='/frens' onClick={() => setTab('frens')} className={`${styles.MenuItem} ${tab === 'frens' && styles.MenuItemActive}`}>
                <CherryIco className={styles.Icon} />
                frens
            </Link>
        </div>
    )
}