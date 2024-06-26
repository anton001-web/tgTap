import {FC, useContext, useEffect, useState} from 'react'
import s from './styles.module.scss'
import minesQuest from '../../assets/images/minesQuest.png'
import minesCoin from '../../assets/images/minesCoin.png'
import minesBomb from '../../assets/images/minesBomb.png'
import tokenRed from '../../assets/images/tokenRed.png'
import tokenWhite from '../../assets/images/tokenWhite.png'
import shadow from '../../assets/images/minesHeaderShadow.png'
import FrensBgItem from '../../assets/images/frensBgItem.svg?react'
import { TokenContext } from '../../providers/Auth'
import { getTable } from '../api/api'
import { WinModal } from './WinModal'
import { useNavigate } from 'react-router-dom'
import { sendPoints } from '../api/api'

interface MinesProps {}

export const Mines:FC<MinesProps> = () => {
    const [table, setTable] = useState<any>(null)
    const {token}:any = useContext(TokenContext)
    const [reward, setReward] = useState<number>(0)
    const navigate = useNavigate()
    const [lose, setLose] = useState(false)
    const [modalVisibility, setModalVisibility] = useState(false)
    const [tableList, setTableList] = useState([])
    
    const getTableF = async () => {
        const res = await getTable(token)
        setTable(res.playing_board)
        // console.log(res)
    }

    useEffect(() => {
        token && getTableF()
    }, [token])

    useEffect(() => {
        if(table) {
            const flattenedArray = table.reduce((acc:any, val:boolean) => acc.concat(val), []);
            setTableList(flattenedArray)
        }
    }, [table])

    const sendPointsF = async (isBombed:boolean) => {
        const res = await sendPoints(token, (reward / 10), isBombed)
        // setPOSTRES(res)
        return res
    }

    const cashoutHandler = () => {

        if(lose || reward === 0) {
            return null
        }
        
        token && sendPointsF(false)

        setModalVisibility(true)
    }

    const handleReset = () => {

    }

    const handleCheck = (itemState:boolean, ind:number) => {
        const clickedItem = document.getElementById(`minesTableItem${ind}`)
        // console.log(clickedItem, itemState)

        if(lose) {
            return null
        }

        if(itemState === true) {
            if(clickedItem?.classList.contains('ITEMCLICKED')) {
                // return null;
                clickedItem?.classList.add(s.minesItemCoin)
            } else {
                clickedItem?.classList.add(s.minesItemCoin)
                setReward(reward + 10)
            }

        } else {
            handleReset()
            setReward(0)
            sendPointsF(true)
            setLose(true)
            clickedItem?.classList.add(s.minesItemBomb)

            setTimeout(() => {
                navigate('/home')
            }, 1000)
        }

        clickedItem?.classList.add('ITEMCLICKED')
    }

    return (
        <div className={s.minesWrap}>
            <WinModal winValue={reward} visibility={modalVisibility} />
            <FrensBgItem className={s.bgItem} />
            <div className={s.minesHeader}>
                <img className={s.minesHeaderShadow} src={shadow} />
                <div className={s.minesHeaderGroup}>
                    <span className={s.minesHeaderTitle}>chips</span>
                    <img className={s.minesHeaderToken} src={minesCoin} />
                    <span className={s.minesHeaderValue}>6</span>
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
                    <span className={s.minesHeaderValue}>3</span>
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