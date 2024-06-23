import {FC} from 'react'
import s from './styles.module.scss'
import romb from '../../assets/images/tasksRomb.png'

interface TasksProps {}

export const Tasks:FC<TasksProps> = () => {
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
                        15 <span>available</span>
                    </div>
                    <p className={s.availableText}>Here u can farm exta points</p>
                    <div className={s.availableBorder}></div>
                </div> 
            </div>
        </div>
    )
}