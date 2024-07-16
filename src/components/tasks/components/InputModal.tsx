import {Dispatch, FC, SetStateAction, useContext, useState} from 'react'
import s from '../styles.module.scss'
import cat from '../../../assets/images/modalCat.webp'
import { TokenContext } from '../../../providers/Auth';
import { closeTask } from '../../api/api';

interface InputModalProps {
    visibility: boolean;
    setVisibility: Dispatch<SetStateAction<boolean>>
}

//@ts-ignore
export const InputModal:FC<InputModalProps> = ({visibility, setVisibility}) => {
    const [inpValue, setInpValue] = useState('')
    const {token, setTasks, inputTaskId}:any = useContext(TokenContext)
    const [lengthError, setLengthError] = useState(false)

    const closeTaskFn = async (id:number) => {
        const res = await closeTask(token, id)
        setTasks(id, res)
    }

    const handleChange = (value:string) => {
        const ru = /[а-яё]+/i.test(value);

        if(value.length >= 1) {
            setLengthError(false)
        }

        if(ru) {
            return null
        } else {
            setInpValue(value)
        }
    }


    const handleSubmit = () => {
        if(inpValue.length <= 0) {
            setLengthError(true)
            return null
        }

        token && closeTaskFn(inputTaskId)
        setVisibility(false)
    }

    return (
        <div className={`${s.inputModalWrap} ${visibility && s.modalActive}`}>
            <div className={s.inputModalBody}>
                <img className={s.cat} src={cat} />
                <span className={s.inputModalTitle}>Enter your waller address</span>
                <input value={inpValue} onChange={(e) => handleChange(e.target.value)} placeholder='Enter your $SOL address' type='text' className={s.input} />
                {
                    lengthError && <span className={s.error}>Incorrect address</span>
                }
                <button className={s.inputBtn} onClick={handleSubmit}>Submit</button>
            </div>
        </div>
    )
}