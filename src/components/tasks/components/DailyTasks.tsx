import {FC} from 'react'
import s from '../styles.module.scss'
import Paw from '../../../assets/images/paw.svg?react'
import BowlBall from '../../../assets/images/bowl.svg?react'

const list = [
    {
        title: "Claim some shit <3",
        text: 'I love TRACER i love TRACER'
    },
    {
        title: "Claim some shit <3",
        text: 'I love TRACER i love TRACER'
    },
    {
        title: "Claim some shit <3",
        text: 'I love TRACER i love TRACER'
    },
]

interface DailyTasksProps {
    variant: string
}

export const DailyTasks:FC<DailyTasksProps> = ({variant}) => {
    return (
        <div className={`${s.tasksBlock} ${variant === 'red' ? s.tasksBlockRed : s.tasksBlockGreen}`}>
            <span className={s.tasksTitle}>
                {variant === 'red' ? 'daily' : 'Basic'} tasks
                <BowlBall className={s.bowlBall} />
            </span>
            <div className={s.tasksList}>
                {
                    list.map((item, ind) => (
                        <div key={ind} className={s.tasksListItem} >
                            <div className={s.tasksListItemGroup}>
                                <div className={s.pawBlock}>
                                    <Paw />
                                </div>
                                <div className={s.tasksListItemTextGroup}>
                                    <span className={s.tasksListItemTitle}>{item.title}</span>
                                    <span className={s.tasksListItemText}>{item.text}</span>
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