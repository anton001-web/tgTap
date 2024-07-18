import {FC, useContext, useEffect, useState} from 'react'
import s from './styles.module.scss'
import minesQuest from '../../assets/images/minesQuest.webp'
import minesCoin from '../../assets/images/minesCoin.webp'
import minesBomb from '../../assets/images/minesBomb.webp'
import tokenRed from '../../assets/images/tokenRed.webp'
import tokenWhite from '../../assets/images/tokenWhite.webp'
import shadow from '../../assets/images/minesHeaderShadow.webp'
import FrensBgItem from '../../assets/images/frensBgItem.svg?react'
import { TokenContext } from '../../providers/Auth'
import { WinModal } from './WinModal'
import { sendPoints } from '../api/api'
import { LoseModal } from './LoseModal'
import closeIco from '../../assets/images/closeIco.png'
import { Link } from 'react-router-dom'
interface MinesProps {}

export const Mines:FC<MinesProps> = () => {
    const {token, minesTable, setBalance, setTickets}:any = useContext(TokenContext)
    const [reward, setReward] = useState<number>(0)
    const [lose, setLose] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [tableList, setTableList] = useState([])
    const [loseModal, setLoseModal] = useState(false)

    useEffect(() => {
        if(minesTable) {
            const flattenedArray = minesTable.reduce((acc:any, val:boolean) => acc.concat(val), []);
            setTableList(flattenedArray)
        }
    }, [minesTable])

    useEffect(() => {
        if(!minesTable) {
            window.location.href = '/home'
        }
    }, [])

    const sendPointsF = async (isBombed:boolean) => {
        const res = await sendPoints(token, (reward / 10), isBombed)
        setBalance(res.total_reward, true)
        return res
    }

    const cashoutHandler = () => {

        if(lose || reward === 0) {
            return null
        }
        
        token && sendPointsF(false)
        setTickets(1)
        setModalVisibility(true)
    }

    const handleReset = () => {
        const items = document.querySelectorAll('.minesItem')
        items.forEach(item => {
            item.classList.remove('ITEMCLICKED', s.minesItemCoin, s.minesItemBomb)
        })
        setReward(0)
        setLose(false)
    }

    const handleCheck = (itemState:boolean, ind:number) => {
        const clickedItem = document.getElementById(`minesTableItem${ind}`)

        if(lose) {
            return null
        }

        if(itemState === true) {
            if(clickedItem?.classList.contains('ITEMCLICKED')) {
                // return null;
                clickedItem?.classList.add(s.minesItemCoin)
            } else {
                clickedItem?.classList.add(s.minesItemCoin)
                setReward(reward + 5)
            }

        } else {
            setLoseModal(true)
            setTickets(1)
            handleReset()
            setReward(0)
            setLose(true)
            clickedItem?.classList.add(s.minesItemBomb)


        }

        clickedItem?.classList.add('ITEMCLICKED')
    }

    return (
        <div className={s.minesWrap}>
            <WinModal winValue={reward} reset={handleReset} setVisibility={setModalVisibility} visibility={modalVisibility} />
            <LoseModal setVisibility={setLoseModal} visibility={loseModal} />
            <FrensBgItem className={s.bgItem} />
            <div className={s.minesHeader}>
                <Link to='/home' className={s.closeIcoMines} >
                    <img src={closeIco} />
                </Link>
                <div className={s.minesHeaderBody}>
                    <img className={s.minesHeaderShadow} src={shadow} />
                    <div className={s.minesHeaderGroup}>
                        <span className={s.minesHeaderTitle}>chips</span>
                        <img className={s.minesHeaderToken} src={minesCoin} />
                        <span className={s.minesHeaderValue}>8</span>
                    </div>
                    <div className={s.minesHeaderRewardBlock}>
                        <span className={s.rewardTitle}>Reward</span>
                        <span className={s.rewardValue}>
                            {reward}
                            <img src={tokenWhite} />
                        </span>
                    </div>
                    <div className={s.minesHeaderGroup}>
                        <span className={s.minesHeaderTitle}>mines</span>
                        <img className={s.minesHeaderToken} src={minesBomb} />
                        <span className={s.minesHeaderValue}>1</span>
                    </div>
                </div>
            </div>
            <div className={s.minesTable}>
                {
                    tableList && tableList.map((item, ind) => (
                        <div onClick={() => handleCheck(item, ind+1)} key={ind} className={`${s.minesTableItem} minesItem`} id={`minesTableItem${ind+1}`} >
                            <img className={`${s.minesTableItemContentImg} ${s.minesQuest}`} src={minesQuest} />
                            <img className={`${s.minesTableItemContentImg} ${s.minesBomb}`} src={minesBomb} />
                            <img className={`${s.minesTableItemContentImg} ${s.minesCoin}`} src={minesCoin} />
                        </div>
                    ))
                }
            </div>
            <div className={s.claimBLock} onClick={cashoutHandler} >
                <span className={s.claimTitle}>cashout {reward}
                    <img src={tokenRed} className={s.tokenIco} />
                </span>
            </div>
        </div>
    )
}