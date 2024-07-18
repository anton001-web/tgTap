import {FC, useContext, useEffect, useState} from 'react'
import s from './styles.module.scss'
import SlotsArr from '../../assets/images/slotsArr.svg?react'
import SlotsArrRight from '../../assets/images/slotsRightArr.svg?react'
import tokenWhite from '../../assets/images/tokenWhite.webp'

import Coin10 from '../../assets/images/slotsCoin10.svg?react'
import Coin20 from '../../assets/images/slotsCoin20.svg?react'
import Coin50 from '../../assets/images/slotsCoin50.svg?react'
import BackBtn from '../../assets/images/slotsBackBtn.svg?react'

import { getSlots } from '../api/api'
import { TokenContext } from '../../providers/Auth'
import { useNavigate } from 'react-router-dom'
import { Spinner } from '../tasks/components/Spinner'

const coinsArr = [
    {
        id: 300,
        icon: <Coin10 />,
    },
    {
        id: 200,
        icon: <Coin20 />,
    },
    {
        id: 100,
        icon: <Coin50 />,
    },
    {
        id: 300,
        icon: <Coin10 />,
    },
    {
        id: 200,
        icon: <Coin20 />,
    },
    {
        id: 100,
        icon: <Coin50 />,
    },
    {
        id: 300,
        icon: <Coin10 />,
    },
    {
        id: 200,
        icon: <Coin20 />,
    },
    {
        id: 100,
        icon: <Coin50 />,
    },
    {
        id: 300,
        icon: <Coin10 />,
    },
    {
        id: 200,
        icon: <Coin20 />,
    },
    {
        id: 100,
        icon: <Coin50 />,
    },
]

function shuffle(array:any) {
    let shuffledArray = array.slice();
    
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    
    return shuffledArray;
}

type SlotsAnswer = {
    slots_result: number[]
    reward: number;
}

interface SlotsProps {}

export const Slots:FC<SlotsProps> = () => {
    const {token}:any = useContext(TokenContext)
    const [inGame, setInGame] = useState<boolean>(false)
    const [firstArr, setFirstArr] = useState(shuffle(coinsArr))
    const [secondArr, setSecondArr] = useState(shuffle(coinsArr))
    const [thirdArr, setThirdArr] = useState(shuffle(coinsArr))
    const [slotsResponse, setSlotsResponse] = useState<SlotsAnswer>()
    const [winValue, setWinValue] = useState<number>(0)

    const navigate = useNavigate()

    const getSlotsF = async () => {
        const res = await getSlots(token)
        setSlotsResponse(res)
    }

    const handlePlay = () => {
        const allElems = document.querySelectorAll('.slotElem')

        allElems.forEach(el => {
            el.classList.remove('animed')
        })
        
        token && getSlotsF()
        setInGame(true)
    }

    function findLastObjectByName(array:any[], id:number) {
        let count = 0; // Счетчик найденных объектов

        for (let i = array.length - 1; i >= 0; i--) {
            if (array[i].id === id) {
                count++;
                // Если нашли второй объект (предпоследний)
                if (count === 2) {
                    return i;
                }
            }
        }
    }

    useEffect(() => {
        const row = document.getElementById('first')
        const row2 = document.getElementById('first2')
        const row3 = document.getElementById('first3')

        if(slotsResponse && row && row2 && row3) {

            setTimeout(() => {
                setWinValue(0)
            }, 1200)

            const indexFirst = findLastObjectByName(firstArr, slotsResponse.slots_result[0])
            const indexSec = findLastObjectByName(secondArr, slotsResponse.slots_result[1])
            const indexThird = findLastObjectByName(thirdArr, slotsResponse.slots_result[2])

            const winElemFirst = document.getElementById(`elem-first${indexFirst}`)
            const winElemSec = document.getElementById(`elem-sec${indexSec}`)
            const winElemThird = document.getElementById(`elem-third${indexThird}`)

            if(winElemFirst && winElemSec && winElemThird) {
                setTimeout(() => {
                    winElemFirst.classList.add('animed')

                    setTimeout(() => {
                        winElemSec.classList.add('animed')
                        setTimeout(() => {
                            winElemThird.classList.add('animed')
                        }, 0)
                    }, 0)
                }, 1200)
            }

            if(indexFirst && indexSec && indexThird) {
                setTimeout(() => {
                    row.style.transform = `translateY(-${(indexFirst * 80) - 40}px)`
                    console.log('IND', indexFirst)
                    const plusArr = shuffle(coinsArr)
                    setFirstArr([...firstArr, ...plusArr])

                    setTimeout(() => {
                        row2.style.transform = `translateY(-${(indexSec * 80) - 40}px)`
                        console.log('IND', indexSec)
                        const plusArr = shuffle(coinsArr)
                        setSecondArr([...secondArr, ...plusArr])

                        setTimeout(() => {
                            row3.style.transform = `translateY(-${(indexThird * 80) - 40}px)`
                            console.log('IND', indexThird)
                            const plusArr = shuffle(coinsArr)
                            setThirdArr([...thirdArr, ...plusArr])

                            setTimeout(() => {
                                setInGame(false)
                            }, 1500)
                        }, 100)
                    }, 100)
                }, 0)
                // row.style.transform = `translateY(-${(indexFirst * 80) - 40}px)`
                // console.log('IND', indexFirst)
                // const plusArr = shuffle(coinsArr)
                // setFirstArr([...firstArr, ...plusArr])

                // setTimeout(() => {
                //     row.style.transform = `translateY(-${(indexFirst * 80)-40}px)`
                //     row.style.transition = 'all 2s linear'

                //     setTimeout(() => {
                //         const plusArr = shuffle(coinsArr)
                //         setFirstArr([...firstArr, ...plusArr])
                //     }, 0)
                // }, 3000)
            }
        }
    }, [slotsResponse])

    return (
        <div className={s.SlotsWrapper}>
            <div className={s.SlotsBody}>
                <h1 className={s.SlotsTitle}>CAT SLOTS</h1>
                <div className={s.SlotsContainer}>
                    <div className={s.SlotsBlock}>
                        <SlotsArr className={s.SlotsLeftArr} />
                        <SlotsArrRight className={s.SlotsRightArr} />
                        <div className={s.SlotsCols}>
                            <div className={s.SlotsFirstCol}>
                                <div id='first' className={s.SlotsFirstColInner}>
                                    {
                                        firstArr.map((item:any, ind:number) => (
                                            <div className='slotElem' id={`elem-first${ind}`} data-num={ind} key={ind}>
                                                <div className={s.IconWrap}>
                                                    {item.icon}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className={s.SlotsFirstCol}>
                                <div id='first2' className={s.SlotsFirstColInner}>
                                    {
                                        secondArr.map((item:any, ind:number) => (
                                            <div className='slotElem' id={`elem-sec${ind}`} data-num={ind} key={ind}>
                                                <div className={s.IconWrap}>
                                                    {item.icon}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                            <div className={s.SlotsFirstCol}>
                                <div id='first3' className={s.SlotsFirstColInner}>
                                    {
                                        thirdArr.map((item:any, ind:number) => (
                                            <div className='slotElem' id={`elem-third${ind}`} data-num={ind} key={ind}>
                                                <div className={s.IconWrap}>
                                                    {item.icon}
                                                </div>
                                            </div>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={s.SlotsInfoWrap}>
                    <div className={s.SlotsInfoBlock}>
                        <div className={s.SlotsInfoBlockItem}>
                            3x <Coin50 />  <span>= 50</span> <img src={tokenWhite} />
                        </div>
                        <div className={s.SlotsInfoBlockItem}>
                            3x <Coin20 />  = 20 <img src={tokenWhite} />
                        </div>
                        <div className={s.SlotsInfoBlockItem}>
                            3x <Coin10 />  = 10 <img src={tokenWhite} />
                        </div>
                    </div>
                    <div className={s.SlotsRewardBlock}>
                        <div className={s.referalsLine}></div>
                        <div className={s.SlotsRewarsInner}>
                            <span className={s.SlotsRewardTitle}>Your reward</span>
                            <span className={s.SlotsRewardValue}>
                                {winValue}
                                <img src={tokenWhite} />
                            </span>
                        </div>
                    </div>
                </div>
                <div className={s.SlotsControlsWrap}>
                    <div onClick={() => navigate('/')} className={s.SlotsBackBtn}>
                        <BackBtn />    
                    </div>
                    <button disabled={inGame} onClick={handlePlay} className={s.SlotsPlayBtn}>
                        {
                            !inGame ? 'Spin' : (
                                <>
                                    Spinning
                                    <Spinner variant='black' />
                                </>
                            )
                        }

                    </button>
                </div>
            </div>
        </div>
    )
}