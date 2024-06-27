import {FC, useContext, useState} from 'react'
import s from '../styles.module.scss'
import BowlBall from '../../../assets/images/bowl.svg?react'
import { TokenContext } from '../../../providers/Auth';
import { closeTask } from '../../api/api';

const IMG_URL = 'https://cat-backend.pro'

export interface ListT {
    title: string;
    text: string;
    id: number;
    task_name: string;
    description: string;
    task_type: string;
    task_link: string;
    icon: string;
    is_completed_task: boolean
}

interface DailyTasksProps {
    variant: string;
    list: ListT[] | undefined
}

export const DailyTasks:FC<DailyTasksProps> = ({variant, list}) => {
    const {token}:any = useContext(TokenContext)
    const [taskRes, setTaskRes] = useState<any>()

    const closeTaskFn = async (id:number) => {
        const res = closeTask(token, id)
        setTaskRes(res)
    }

    const claimHandler = (link:string, id:number) => {
        window.open(link,'_blank', 'rel=noopener noreferrer')
        token && closeTaskFn(id)
    }

    console.log(taskRes)

    return (
        <div className={`${s.tasksBlock} ${variant === 'red' ? s.tasksBlockRed : s.tasksBlockGreen}`}>
            <span className={s.tasksTitle}>
                {variant === 'red' ? 'daily' : 'Basic'} tasks
                <BowlBall className={s.bowlBall} />
            </span>
            <div className={s.tasksList}>
                {
                    list && list.map((item, ind) => (
                        <div key={ind} className={s.tasksListItem} >
                            <div className={s.tasksListItemGroup}>
                                <div className={s.pawBlock}>
                                    <img src={`${IMG_URL}${item.icon}`} />
                                </div>
                                <div className={s.tasksListItemTextGroup}>
                                    <span className={s.tasksListItemTitle}>{item.title}</span>
                                    <span className={s.tasksListItemText}>{item.description}</span>
                                </div>
                            </div>
                            <div onClick={() => {
                                item.is_completed_task ? null : claimHandler(item.task_link, item.id)
                            }} className={`${s.claimBtn} ${item.is_completed_task && s.claimBtnDone}`}>
                                {item.is_completed_task ? 'Done' : 'Claim'}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}