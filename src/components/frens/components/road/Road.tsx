import {FC} from 'react'
import s from './styles.module.scss'
import Arr1 from '../../../../assets/images/frensArr1.svg?react'
import Num from '../../../../assets/images/frensNum.svg?react'
import Cube from '../../../../assets/images/minesIco.svg?react'

interface RoadProps {}

export const Road:FC<RoadProps> = () => {
    return (
        <div className={s.roadmapWrap}>
            <div className={s.roadmapItem}>
                <Num className={s.Num} />
                <div className={s.roadmapTextGroup}>
                    <span className={s.roadmapTitle}>
                        Share your invite link
                    </span>
                    <span className={s.roadmapText}>Get <Cube className={s.Cube} /> for each friend</span>
                </div>
                <Arr1 className={s.Arr1} />
            </div>
            <div className={s.roadmapItem}>
                <Num className={s.Num} />
                <div className={`${s.roadmapTextGroup} ${s.roadmapTextGroupSecond}`}>
                    <span className={`${s.roadmapTitle} ${s.roadmapTitleTwo}`}>
                        Earn 15% of your friend's <br /> tokens
                    </span>
                </div>
            </div>
        </div>
    )
}