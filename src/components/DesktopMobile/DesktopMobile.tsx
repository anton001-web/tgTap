import s from './styles.module.scss'
import {FC} from 'react'
import Code from '../../assets/images/qrCode.svg?react'

interface DesktopMobileProps {}

export const DesktopMobile:FC<DesktopMobileProps> = () => {
    return (
        <div className={s.modalWrap}>
            <div className={s.modalQrWrap}>
                <Code className={s.CodeImg} />
            </div>
            <div className={s.modalText}>
                <span>Open app on your mobile</span>
                <p>we banned the game on the desktop to make life harder for cheaters</p>
            </div>
        </div>
    )
}