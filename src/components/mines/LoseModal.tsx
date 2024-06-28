import {Dispatch, FC, SetStateAction} from 'react'
import s from './styles.module.scss'
import { Link } from 'react-router-dom';

interface LoseModalProps {
    visibility: boolean
    setVisibility: Dispatch<SetStateAction<boolean>>;
}

export const LoseModal:FC<LoseModalProps> = ({visibility, setVisibility}) => {
    return (
        <div className={`${s.modalLose} ${visibility && s.modalLoseActive}`}>
            <span className={s.gameOver}>Game over</span>
            <Link onClick={() => setVisibility(false)} to='/home' className={s.backHome}>Continue</Link>
        </div>
    )
}