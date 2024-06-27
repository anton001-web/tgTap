import {FC} from 'react'
import styles from './styles.module.scss'
import cat from "../../../../assets/images/mainCat.webp"

interface MainCatProps {}

export const MainCat:FC<MainCatProps> = () => {
    return (
        <div className={styles.MainCatImgWrap} >
            <img
                src={cat}
                className={styles.MainCatImg}
            />
        </div>
    )
}