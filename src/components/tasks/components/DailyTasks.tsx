import {FC} from 'react'
import s from '../styles.module.scss'

interface DailyTasksProps {
    variant: string
}

export const DailyTasks:FC<DailyTasksProps> = ({variant}) => {
    return (
        <div className={s.tasksBlock}>

        </div>
    )
}