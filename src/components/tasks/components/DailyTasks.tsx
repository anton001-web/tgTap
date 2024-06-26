import {FC} from 'react'
import s from '../styles.module.scss'
import Paw from '../../../assets/images/paw.svg?react'
import BowlBall from '../../../assets/images/bowl.svg?react'

export interface ListT {
    title: string;
    text: string;
    task_name: string;
    description: string;
    task_type: string;
}

interface DailyTasksProps {
    variant: string;
    list: ListT[] | undefined
}

export const DailyTasks:FC<DailyTasksProps> = ({variant, list}) => {
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
                                    <Paw />
                                </div>
                                <div className={s.tasksListItemTextGroup}>
                                    <span className={s.tasksListItemTitle}>{item.title}</span>
                                    <span className={s.tasksListItemText}>{item.description}</span>
                                </div>
                            </div>
                            <div className={s.claimBtn}>Claim</div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}