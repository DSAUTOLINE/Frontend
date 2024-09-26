import React, { useState, useEffect, useRef } from 'react'
import '../styles/App.css';
import GNB from '../components/GNB';
import Footer from '../components/Footer';
import { PartnerSection } from '../components/Partner';
import { carmentoList } from '../assets/item';
import {
    HotDealCard,
    QuickDealCard,
    EventCard,
    ReviewCard,
    PopularCarCard,
} from '../components/Cards';
import { CarmentoPopUp, OptionPagePopUp, QuickDealCarCard_Popup } from '../components/PopUp';
import { hotDealAxios, quickDealAxios, reviewAxios, popularListAxios, eventAxios } from '../services/Request';
import Slider from "react-slick";
import '../styles/slick.css'
import '../styles/slick-theme.css'
import { handleNext, handlePrev, hotDealSlicerSettings, reviewSlicerSettings } from '../utils/SliderMove';
import FastFAQSticky from '../components/FastFAQSticky';
import BannerSlider from '../components/Main_EventBanner';
import NoCardList from '../components/NoCardList'
import Loading from '../components/Loading';



const MainPage = (props) => {
    //한정 특가 변수
    const [hotHovered, setHotHovered] = useState(false);

    //즉시 출고 변수
    const [quickHovered, setQuickHovered] = useState(false);
    const [quickDealPopup, setQuickDealPopup] = useState(false)

    //우수카멘토 변수
    const [carmentPopup, setCarmentoPopup] = useState(false);
    const [checkPopup, setCheckPopup] = useState(false);
    const [mento, setMento] = useState('');

    //리뷰 변수
    const [reviewHovered, setReviewHovered] = useState(false);

    //슬라이더
    const hotDealSliderRef = useRef(null);
    const quickDealSliderRef = useRef(null);
    const reviewSliderRef = useRef(null);


    //DB 리스트 로드
    const [hotDealList, setHotDealList] = useState(null)
    const [quickDealList, setQuickDealList] = useState(null)
    const [reviewList, setReviewList] = useState(null)
    const [popularList, setPopularList] = useState(null)
    const [eventList, setEvevntList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await hotDealAxios()
            setHotDealList(response1)
            const response2 = await quickDealAxios(null, null, null)
            setQuickDealList(response2)
            const response3 = await reviewAxios(0)
            setReviewList(response3)
            const response4 = await popularListAxios()
            setPopularList(response4)
            const response5 = await eventAxios(4, 0)
            setEvevntList(response5)
        }
        fetchData()
    }, [])

    

    if (!hotDealList || !quickDealList || !reviewList || !popularList || !eventList) {
        return (
            <Loading />
        )
    }
    return (
        <div className='mainPage_container'>
            {quickDealPopup && <QuickDealCarCard_Popup setPopup={setQuickDealPopup} item={quickDealPopup} />}
            <GNB stat={false} />
            <BannerSlider />
            <FastFAQSticky height={1300} />
            <section
                className='hotDealSection'
                onMouseEnter={() => setHotHovered(true)}
                onMouseLeave={() => setHotHovered(false)}
            >
                {hotHovered && (
                    <>
                        <button
                            style={{ top: 300 }}
                            onMouseEnter={() => setHotHovered(true)}
                            onClick={() => handlePrev(hotDealSliderRef)}
                            className="moveButton">〈</button>
                        <button
                            style={{ top: 300 }}
                            onMouseEnter={() => setHotHovered(true)}
                            onClick={() => handleNext(hotDealSliderRef)}
                            className="moveButton right">〉</button>
                    </>
                )}
                <h1>한정 <span>특가</span></h1>
                {hotDealList.length === 0 && <NoCardList card={'차량이'} />}
                <Slider {...hotDealSlicerSettings} ref={hotDealSliderRef}>
                    {hotDealList.map((item, idx) => (
                        <HotDealCard item={item} idx={idx} />
                    ))}
                </Slider>
                <a className='moreBtnA' href='/HotDeal'>
                    <span>
                        <p>자세히 보기</p>
                    </span>
                </a>
            </section>
            <section className='quickDealSection'
                onMouseEnter={() => setQuickHovered(true)}
                onMouseLeave={() => setQuickHovered(false)}
            >
                {quickHovered && (
                    <>
                        <button
                            style={{ top: 300 }}
                            onMouseEnter={() => setQuickHovered(true)}
                            onClick={() => handlePrev(quickDealSliderRef)}
                            className="moveButton">〈</button>
                        <button
                            style={{ top: 300 }}
                            onMouseEnter={() => setQuickHovered(true)}
                            onClick={() => handleNext(quickDealSliderRef)}
                            className="moveButton right">〉</button>
                    </>
                )}
                <h1>즉시 <span>출고</span></h1>
                {quickDealList.length === 0 && <NoCardList card={'차량이'} />}
                <div
                    className='hotDealListDiv'
                >
                    <Slider {...hotDealSlicerSettings} ref={quickDealSliderRef}>
                        {quickDealList.map((item, idx) => (
                            <QuickDealCard item={item} idx={idx} setPopup={setQuickDealPopup} />
                        ))}
                    </Slider>
                </div>
                <a className='moreBtnA' href='QuickDeal'>
                    <span>
                        <p>자세히 보기</p>
                    </span>
                </a>
            </section>
            <div className='eventBannerImage'>
                <img src={`${process.env.REACT_APP_IMG_URL}/${eventList[0].img}.png`} />
            </div>
            <section className='popularSection'>
                <h1 style={{ marginBottom: 40 }}>가장 <span>인기 많은 차량</span></h1>
                {/* <span>
                    <p className={popularEntryStat === 0 && 'selected'} onClick={() => setPopularEntryStat(0)}>국산 차</p>
                    <p className={popularEntryStat === 1 && 'selected'} onClick={() => setPopularEntryStat(1)}>수입 차</p>
                </span> */}
                {popularList.length === 0 && <NoCardList card={'차량이'} />}
                <div>
                    {popularList.map((item, idx) => (
                        <PopularCarCard
                            item={item}
                            index={idx}
                        />
                    ))}
                </div>
            </section>
            <section
                className='reviewSection'
                onMouseEnter={() => setReviewHovered(true)}
                onMouseLeave={() => setReviewHovered(false)}
            >
                {reviewHovered && (
                    <>
                        <button
                            style={{ top: 220 }}
                            onMouseEnter={() => setReviewHovered(true)}
                            onClick={() => handlePrev(reviewSliderRef)}
                            className="moveButton">〈</button>
                        <button
                            style={{ top: 220 }}
                            onMouseEnter={() => setReviewHovered(true)}
                            onClick={() => handleNext(reviewSliderRef)}
                            className="moveButton right">〉</button>
                    </>
                )}
                <h1>많은 고객님들이 <span>만족하신 후기</span></h1>
                {reviewList.length === 0 && <NoCardList card={'리뷰가'} />}
                <div className='reviewCardDiv'>
                    <Slider {...reviewSlicerSettings} ref={reviewSliderRef}>
                        {reviewList.map((item, idx) => (
                            <ReviewCard item={item} />
                        ))}
                    </Slider>
                </div>
                <a className='moreBtnA' href='/Review'>
                    <span>
                        <p>더 많은 리뷰 보기</p>
                    </span>
                </a>
            </section>
            {carmentPopup &&
                <CarmentoPopUp setCarmentoPopup={setCarmentoPopup} mento={mento} setCheckPopup={setCheckPopup} />
            }
            {checkPopup &&
                <OptionPagePopUp />
            }
            <section
                className='eventSection'
            >
                <h1>가장 좋은<br /><span>후기를 받은 우수카멘토</span></h1>
                <div className='eventListDiv'>
                    {carmentoList.slice(0, 4).map((item, idx) => (
                        <EventCard item={item} setMento={setMento} setCarmentoPopup={setCarmentoPopup} />
                    ))}
                </div>
            </section>
            <PartnerSection />
            <Footer />
        </div>

    );
}


export default MainPage