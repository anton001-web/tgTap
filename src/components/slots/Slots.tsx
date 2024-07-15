import {FC, useEffect, useState} from 'react'
import s from './styles.module.scss'
import SlotsArr from '../../assets/images/slotsArr.svg?react'
import SlotsArrRight from '../../assets/images/slotsRightArr.svg?react'

import Coin10 from '../../assets/images/slotsCoin10.svg?react'
import Coin20 from '../../assets/images/slotsCoin20.svg?react'
import Coin50 from '../../assets/images/slotsCoin50.svg?react'

const coinsArr = [
    {
        id: 10,
        icon: <Coin10 />,
    },
    {
        id: 20,
        icon: <Coin20 />,
    },
    {
        id: 50,
        icon: <Coin50 />,
    },
    {
        id: 10,
        icon: <Coin10 />,
    },
    {
        id: 20,
        icon: <Coin20 />,
    },
    {
        id: 50,
        icon: <Coin50 />,
    },
    {
        id: 10,
        icon: <Coin10 />,
    },
    {
        id: 20,
        icon: <Coin20 />,
    },
    {
        id: 50,
        icon: <Coin50 />,
    },
    {
        id: 10,
        icon: <Coin10 />,
    },
    {
        id: 20,
        icon: <Coin20 />,
    },
    {
        id: 50,
        icon: <Coin50 />,
    },
    {
        id: 10,
        icon: <Coin10 />,
    },
    {
        id: 20,
        icon: <Coin20 />,
    },
    {
        id: 50,
        icon: <Coin50 />,
    },
    {
        id: 10,
        icon: <Coin10 />,
    },
    {
        id: 20,
        icon: <Coin20 />,
    },
    {
        id: 50,
        icon: <Coin50 />,
    },
    {
        id: 10,
        icon: <Coin10 />,
    },
    {
        id: 20,
        icon: <Coin20 />,
    },
    {
        id: 50,
        icon: <Coin50 />,
    },
    {
        id: 10,
        icon: <Coin10 />,
    },
    {
        id: 20,
        icon: <Coin20 />,
    },
    {
        id: 50,
        icon: <Coin50 />,
    },
]

function shuffle(array:any) {
    // Создаем копию оригинального массива, чтобы не изменять его напрямую
    let shuffledArray = array.slice();
    
    // Алгоритм Фишера-Йетса для перемешивания массива
    for (let i = shuffledArray.length - 1; i > 0; i--) {
        // Выбираем случайный индекс от 0 до i
        const j = Math.floor(Math.random() * (i + 1));
        
        // Меняем местами элементы shuffledArray[i] и shuffledArray[j]
        [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
    }
    
    return shuffledArray;
}

interface SlotsProps {}

export const Slots:FC<SlotsProps> = () => {
    //@ts-ignore
    const [firstArr, setFirstArr] = useState(shuffle(coinsArr))
        //@ts-ignore
    const [secondArr, setSecondArr] = useState(shuffle(coinsArr))
        //@ts-ignore
    const [thirdArr, setThirdArr] = useState(shuffle(coinsArr))

    const firstShow = 50

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

    
    console.log(firstShow)


    useEffect(() => {
        const row = document.getElementById('first')
            //@ts-ignore
        const row2 = document.getElementById('first2')
            //@ts-ignore
        const row3 = document.getElementById('first3')

        setTimeout(() => {
            if(row) {
                const indexFirst = findLastObjectByName(firstArr, 50)
                row.style.transform = 'translateY(-360px)'

                console.log('INDEX', indexFirst)

                setTimeout(() => {
                    row.style.transform = 'translateY(-362px)'
                    row.style.transition = '0.5s'
                }, 2000)
            }

            // setTimeout(() => {
            //     if(row2) {
            //         row2.style.transform = 'translateY(-440px)'
            //     }

            //     setTimeout(() => {
            //         if(row3) {
            //             row3.style.transform = 'translateY(-520px)'
            //         }
            //     }, 200)
            // }, 200)
        }, 5000)
    }, [])

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
                                            <div key={ind}>
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
                                            <div key={ind}>
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
                                            <div key={ind}>
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
            </div>
        </div>
    )
}