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
    const [right, setRight] = useState<string>()
    const navigate = useNavigate()
    const {tasks}:any = useContext(TokenContext)

    useEffect(() => {
        if(loc.pathname === '/home') {
            setTab('home')
            setRight('0')
        } else if (loc.pathname === '/frens') {
            setTab('frens')
            setRight('100%')
        } else if (loc.pathname === '/referals') {
            setTab('frens')
            setRight('100%')
        } else if (loc.pathname === '/tasks') {
            setTab('tasks')
            setRight('50%')
        }
    }, [loc])

    useEffect(() => {
        if(loc.pathname === '/home') {
            setRight('0')
        } else if (loc.pathname === '/frens') {
            setRight('100%')
        } else if (loc.pathname === '/referals') {
            setRight('100%')
        } else if (loc.pathname === '/tasks') {
            setRight('50%')
        }
    }, [])

    const clickHandle = (link:string, pos:string) => {
        setRight(pos)

        setTimeout(() => {
            setTab(link)
        }, 100)

        setTimeout(() => {
            navigate(link)
        }, 300)
    }

    return (
        <div className={styles.FooterMenu}>
            <div className={`${styles.Border} `} style={{
                left: right,
                transform: `translateX(-${right})`
            }} ></div>
            <span onClick={() => clickHandle('home', '0')} className={`${styles.MenuItem} ${tab === 'home' && styles.MenuItemActive}`}>
                <img src={tokenWhite} className={styles.Icon} />
                home
            </span>
            <span onClick={() => clickHandle('tasks', '50%')} className={`${styles.MenuItem} ${tab === 'tasks' && styles.MenuItemActive}`}>
                <CardsIco className={styles.Icon} />
                tasks
                <div className={styles.tasksTodo}>
                    {tasks && tasks.length - tasks[0].total_completed_tasks | 0}
                </div>
            </span>
            <span  onClick={() => clickHandle('frens', '100%')} className={`${styles.MenuItem} ${tab === 'frens' && styles.MenuItemActive}`}>
                <CherryIco className={styles.Icon} />
                frens
            </span>
        </div>
    )
}