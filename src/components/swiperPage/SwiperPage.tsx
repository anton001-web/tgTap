import {FC, useRef} from 'react'
import s from './styles.module.scss'
import { Swiper, SwiperSlide, useSwiper } from 'swiper/react'
import 'swiper/css'
import nextArr from '../../assets/images/nextArr.png'
import Mines from '../../assets/images/minesIco.svg?react'
import { Link, useNavigate } from 'react-router-dom'

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
                        <h1 className={s.swiperTitle}>Play to suck</h1>
                        <div className={`${s.swiperImgBlock} ${s.swiperImgBlock1}`}>
                            <p className={s.swiperText}>
                                Arial is a sans-serif typeface and set of computer fonts in the neo-grotesque style. 
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
                        <h1 className={s.swiperTitle}>Love cat to blow</h1>
                        <div className={`${s.swiperImgBlock} ${s.swiperImgBlock2}`}>
                            <p className={s.swiperText}>
                                Arial is a sans-serif typeface and set of computer fonts in the neo-grotesque style. 
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
                        <h1 className={s.swiperTitle}>frfr to ffrrfrfr</h1>
                        <div className={`${s.swiperImgBlock} ${s.swiperImgBlock3}`}>
                            <p className={s.swiperText}>
                                Arial is a sans-serif typeface and set of computer fonts in the neo-grotesque style. 
                            </p>
                            <Link onClick={handlePlay} to='home' className={s.swiperPlayBlock}>
                                play
                                <Mines className={s.Mines} />
                            </Link>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    )
}