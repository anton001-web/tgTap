import {FC, useContext, useEffect, useState} from 'react'
import styles from './styles.module.scss'
import CardsIco from '../../assets/images/cardsIco.svg?react' 
import CherryIco from '../../assets/images/cherryIco.svg?react' 
import { useLocation, useNavigate } from 'react-router-dom'
import tokenWhite from '../../assets/images/tokenWhite.webp'
import { TokenContext } from '../../providers/Auth'

interface FooterMenuProps {}

export const FooterMenu:FC<FooterMenuProps> = () => {
    const loc = useLocation()
    const [tab, setTab] = useState<string>('home')
    const navigate = useNavigate()
    const {tasks}:any = useContext(TokenContext)

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

    const clickHandle = (link:string) => {

        if (navigator.vibrate) {
            navigator.vibrate(200);
            navigator.vibrate([200]);
          } else {
            console.log('Вибрация не поддерживается этим устройством');
          }

        setTimeout(() => {
            setTab(link)
        }, 100)

        setTimeout(() => {
            navigate(link)
        }, 300)
    }

    return (
        <div className={styles.FooterMenu}>
            <div className={`${styles.Border} ${tab === 'home' ? styles.BorderLeft : tab === 'tasks' ? styles.BorderCenter : styles.BorderRight}`}></div>
            <span onClick={() => clickHandle('home')} className={`${styles.MenuItem} ${tab === 'home' && styles.MenuItemActive}`}>
                <img src={tokenWhite} className={styles.Icon} />
                home
            </span>
            <span onClick={() => clickHandle('tasks')} className={`${styles.MenuItem} ${tab === 'tasks' && styles.MenuItemActive}`}>
                <CardsIco className={styles.Icon} />
                tasks
                <div className={styles.tasksTodo}>
                    {tasks && tasks.length - tasks[0].total_completed_tasks | 0}
                </div>
            </span>
            <span  onClick={() => clickHandle('frens')} className={`${styles.MenuItem} ${tab === 'frens' && styles.MenuItemActive}`}>
                <CherryIco className={styles.Icon} />
                frens
            </span>
        </div>
    )
}