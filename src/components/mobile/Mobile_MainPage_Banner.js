import React, { useState, useEffect } from "react";
import { eventAxios } from "../../services/Request";

const Mobile_MainPage_Banner = (props) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [eventList, setEventList] = useState(null);
    const [startX, setStartX] = useState(0);
    const [isSwiping, setIsSwiping] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await eventAxios(null, 0);
            setEventList(response.filter((item) => item.type === 0));
        };
        fetchData();
    }, []);

    // 슬라이드 전환 효과
    useEffect(() => {
        const interval = setInterval(() => {
            handleNext();
        }, 3000); // 3초마다 슬라이드

        return () => clearInterval(interval); // 컴포넌트 언마운트 시 클린업
    }, [currentIndex, eventList]);

    // 다음 슬라이드로 이동
    const handleNext = () => {
        if (eventList && eventList.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % eventList.length);
        }
    };

    // 이전 슬라이드로 이동
    const handlePrev = () => {
        if (eventList && eventList.length > 0) {
            setCurrentIndex((prevIndex) => (prevIndex - 1 + eventList.length) % eventList.length);
        }
    };

    // 터치 시작 시 호출되는 함수
    const handleTouchStart = (e) => {
        setStartX(e.touches[0].clientX);
        setIsSwiping(true);
    };

    // 터치 이동 시 호출되는 함수
    const handleTouchMove = (e) => {
        if (!isSwiping) return;
        const touchX = e.touches[0].clientX;
        const deltaX = touchX - startX;

        if (deltaX > 50) {
            handlePrev(); // 오른쪽으로 스와이프 -> 이전 슬라이드로 이동
            setIsSwiping(false); // 슬라이드 이동 후 스와이프 종료
        } else if (deltaX < -50) {
            handleNext(); // 왼쪽으로 스와이프 -> 다음 슬라이드로 이동
            setIsSwiping(false);
        }
    };

    // 터치가 끝날 때 호출되는 함수
    const handleTouchEnd = () => {
        setIsSwiping(false); // 스와이프 종료
    };

    if (!eventList) {
        return (
            <img
                src={`${process.env.REACT_APP_IMG_URL}/error.png`}
                style={{ width: "100%", height: "100%" }}
            />
        );
    }
    
    return (
        <div 
            className="event-banner-container"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
        >
            <div
                className="event-banner-slide"
                style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
                {eventList.map((banner) => (
                    <img
                        key={banner.id}
                        className="event-banner"
                        src={`${process.env.REACT_APP_IMG_URL}/${banner.img}.png`}
                        onClick={() => window.location.href = `/event/${banner.event_num}`}
                    />
                ))}
            </div>
            <div className="indicator-container">
                {eventList.map((_, index) => (
                    <div
                        key={index}
                        className={`indicator ${index === currentIndex ? "active" : ""}`}
                        onClick={() => setCurrentIndex(index)}
                    />
                ))}
            </div>
        </div>
    );
};

export default Mobile_MainPage_Banner;
