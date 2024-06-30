import {FC, useContext, useEffect} from 'react'
import s from './styles.module.scss'
import { TokenContext } from '../../../../providers/Auth'
import { Link } from 'react-router-dom'

interface ReferalsProps {}

export const Referals:FC<ReferalsProps> = () => {
    const {referals}:any = useContext(TokenContext)

    useEffect(() => {
        console.log('REFS', referals)
    }, [referals])

    return (
        <div className={s.referalsWrap}>
            <div className={s.referalsGroup}>
                <Link to='/referals' className={s.referalsCheckBtn}>Friends List</Link>
            </div>
            <div className={s.referalsLine}></div>
        </div>
    )
}