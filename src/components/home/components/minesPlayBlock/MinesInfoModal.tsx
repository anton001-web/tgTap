import {Dispatch, FC, SetStateAction} from 'react'
import s from './styles.module.scss'

interface MinesInfoModalProps {
    visibility: boolean
    setVisibility: Dispatch<SetStateAction<boolean>>
}

export const MinesInfoModal:FC<MinesInfoModalProps> = ({setVisibility, visibility}) => {

    const handleOverlayClick = () => {
        setVisibility(false)
    };

    const handleBodyClick = (e:any) => {
        e.stopPropagation(); // предотвращает всплытие события
    };

    return (
        <div className={`${s.modalOverlay} ${visibility && s.modalActive}`} onClick={handleOverlayClick} >
            <div className={s.modalBody} onClick={handleBodyClick} >
                <p className={s.modalText}>
                    In Mines, there are 9 squares with 6 tokens and 3 bombs hidden.
                </p>
                <p className={s.modalText}>
                    If you land on a bomb on the field, you immediately lose; finding a token earns you 10 tokens.
                </p>
                <p className={s.modalText}>
                    Mines offers an exciting challenge: uncover the locations of 6 tokens and 3 bombs within 9 squares.
                </p>
            </div>
        </div>
    )
}