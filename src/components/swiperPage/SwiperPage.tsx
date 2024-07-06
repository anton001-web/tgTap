import {FC, useRef} from 'react'
import s from './styles.module.scss'
import { Swiper, SwiperSlide } from 'swiper/react'
import 'swiper/css'
import nextArr from '../../assets/images/nextArr.webp'
import Mines from '../../assets/images/minesIco.svg?react'
import { Link } from 'react-router-dom'

interface SwiperPageProps {}

export const SwiperPage:FC<SwiperPageProps> = () => {
    const swiperRef = useRef<any>();

    const handlePlay = () => {
        localStorage.setItem('visitedSwiperPage', 'true');
    }

    return (
        <div className={s.swiperPageWrap}>
            <Swiper
                onSwiper={(swiper) => {
                    swiperRef.current = swiper;
                }}
                className={s.swiper}
                slidesPerView={1}
                spaceBetween={0}
            >
                <SwiperSlide className={s.swiperSlide} >
                    <div className={s.swiperSlideBody}>
                        <h1 className={s.miniTitle}>Welcome to</h1>
                        <h1 className={s.swiperTitle}>$TAPCAT bot</h1>
                        <div className={`${s.swiperImgBlock} ${s.swiperImgBlock1}`}>
                            <p className={s.swiperText}>
                                Play games, complete tasks, <br /> and earn $TAPCAT daily
                            </p>
                            <div className={`${s.swiperNextBtn} nextBtn`}>
                                <div className={s.dots}>
                                    <div className={`${s.dot} ${s.dotRed}`}></div>
                                    <div className={s.dot}></div>
                                    <div className={s.dot}></div>
                                </div>
                                <div className={`${s.nextBtn}`} onClick={() => {
                                    swiperRef.current.slideNext()
                                }} >
                                    <img className={s.nextArr} src={nextArr} />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={s.swiperSlide} >
                    <div className={s.swiperSlideBody}>
                        <h1 className={s.swiperTitle}>Investors</h1>
                        <div className={`${s.swiperImgBlock} ${s.swiperImgBlock2}`}>
                            <p className={s.swiperText}>
                                Backed by <span className={s.blurBlock}>adsasdadas</span> <br /> (will be revealed soon)
                            </p>
                            <div className={`${s.swiperNextBtn} nextBtn`}>
                                <div className={s.dots}>
                                    <div className={s.dot}></div>
                                    <div className={`${s.dot} ${s.dotRed}`}></div>
                                    <div className={s.dot}></div>
                                </div>
                                <div className={`${s.nextBtn}`} onClick={() => {
                                    swiperRef.current.slideNext()
                                }} >
                                    <img className={s.nextArr} src={nextArr} />
                                </div>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
                <SwiperSlide className={s.swiperSlide} >
                    <div className={s.swiperSlideBody}>
                        <h1 className={s.swiperTitle}>Start now</h1>
                        <div className={`${s.swiperImgBlock} ${s.swiperImgBlock3}`}>
                            <p className={s.swiperText}>
                                Be the first cat gambler and get bonuses
                            </p>
                            <Link onClick={handlePlay} to='home' className={s.swiperPlayBlock}>
                                Play
                                <Mines className={s.Mines} />
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}