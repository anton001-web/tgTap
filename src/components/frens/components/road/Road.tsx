import {FC} from 'react'
import s from './styles.module.scss'
import Arr1 from '../../../../assets/images/frensArr1.svg?react'
import Arr2 from '../../../../assets/images/frensArr2.svg?react'
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
                        Share a code to get <Cube className={s.Cube} />
                    </span>
                    <span className={s.roadmapText}>i love big cocks kek</span>
                </div>
                <Arr1 className={s.Arr1} />
            </div>
            <div className={s.roadmapItem}>
                <Num className={s.Num} />
                <div className={`${s.roadmapTextGroup} ${s.roadmapTextGroupSecond}`}>
                    <span className={s.roadmapTitle}>
                        Claim 5% bonuse tokens
                    </span>
                    <span className={s.roadmapText}>i love big cocks kek</span>
                </div>
                <Arr2 className={s.Arr2} />
            </div>
        </div>
    )
}