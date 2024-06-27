import {FC, useContext, useEffect, useState} from 'react'
import s from './styles.module.scss'
import romb from '../../assets/images/tasksRomb.webp'
import { DailyTasks, ListT } from './components/DailyTasks'
import { TokenContext } from '../../providers/Auth'

// const tasks = [
//     {
//         title: 'timaeblan',
//         text:  'timaeblan',
//         task_name:  'timaeblan',
//         description:  'timaeblan',
//         task_type:  'timaeblan'
//     },
//     {
//         title: 'timaeblan',
//         text:  'timaeblan',
//         task_name:  'timaeblan',
//         description:  'timaeblan',
//         task_type:  'timaeblan'
//     },
//     {
//         title: 'timaeblan',
//         text:  'timaeblan',
//         task_name:  'timaeblan',
//         description:  'timaeblan',
//         task_type:  'timaeblan'
//     },
// ]

interface TasksProps {}

export const Tasks:FC<TasksProps> = () => {
    const {tasks}:any = useContext(TokenContext)
    const [dailyTasks, setDailyTasks] = useState<any>()
    const [basicTasks, setBasicTasks] = useState<any>()

    useEffect(() => {
        if(tasks) {
            setBasicTasks(
                tasks.filter((item:ListT) => item.task_type === 'basic')
            )
            setDailyTasks(
                tasks.filter((item:ListT) => item.task_type === 'daily')
            )
        }
    }, [tasks])

    return (
        <div className={s.tasksWrap}>
            <div className={s.tasksHeader}>
                <div className={s.tasksTitleBlock}>
                    <div className={s.tasksTitleWord}>t</div>
                    <div className={s.tasksTitleWord}>a</div>
                    <div className={s.tasksTitleWord}>s</div>
                    <div className={s.tasksTitleWord}>k</div>
                    <div className={s.tasksTitleWord}>s</div>
                </div> 
                <div className={s.availableBlock}>
                    <div className={s.availableGroup}>
                        <img className={s.romb} src={romb} />
                        {tasks && tasks.length - tasks[0].total_completed_tasks | 0} <span>available</span>
                    </div>
                    <p className={s.availableText}>Here u can farm exta points</p>
                    <div className={s.availableBorder}></div>
                </div> 
            </div>
            <DailyTasks variant='red' list={dailyTasks} />
            <DailyTasks variant='green' list={basicTasks} />
        </div>
    )
}