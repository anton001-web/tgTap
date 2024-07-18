import styles from './styles.module.scss'
import { Dispatch, FC, SetStateAction, useContext } from 'react'
import minesIco from '../../../../assets/images/minesIco.webp'
import { useNavigate } from 'react-router-dom'
import { TokenContext } from '../../../../providers/Auth'

interface MinesPlayBlockProps {
    setVisibility: Dispatch<SetStateAction<boolean>>
}

export const MinesPlayBlock:FC<MinesPlayBlockProps> = ({setVisibility}) => {
    const {setMinesTable, tickets, toaster}:any = useContext(TokenContext)
    const navigate = useNavigate()

    const navigateFn = async () => {
        if(tickets === 0) {
            toaster('No tickets :(')
            console.log('sdfdsfds')
            return null
        }

        await setMinesTable()
        navigate('/mines')
    }

    const modalHandler = (e:any) => {
        e.stopPropagation()
        setVisibility(true)
    }

    return (
        <div className={styles.PlayBlock} onClick={navigateFn}>
            <div className={styles.shadow1}></div>
            <div className={styles.shadow2}></div>
            <div className={styles.Mines}>
                <span className={styles.MinesTitle}>Mines</span>
                <div className={styles.MinesGroup}>
                    <img src={minesIco} className={styles.MinesIco} />
                    <span className={styles.gamesNum}>{tickets}</span>
                </div>
            </div>
            <div className={styles.Quest} onClick={modalHandler} >
                <span>?</span>
            </div>
        </div>
    )
}