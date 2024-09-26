import React, { useState, useEffect, useRef } from 'react';
import '../styles/Main_EventBanner.css';
import { eventAxios } from '../services/Request';
import Loading from "../components/Loading";

const BannerSlider = () => {
    const [eventList, setEventList] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            const response = await eventAxios(null, 0);
            setEventList(response.filter((item) => item.type === 0));
        };
        fetchData();
    }, []);

    const [currentIndex, setCurrentIndex] = useState(1); // Starting at 1 to account for the first clone
    const [isTransitioning, setIsTransitioning] = useState(false);
    const sliderRef = useRef();
    const intervalRef = useRef(null); // To store the interval ID

    const handlePrevClick = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => prevIndex - 1);
        }
    };

    const handleNextClick = () => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex((prevIndex) => prevIndex + 1);
        }
    };

    const handleTransitionEnd = () => {
        setIsTransitioning(false);
        if (currentIndex === 0) {
            // If we go to the left of the first image (clone of the last), jump to the real last image
            setCurrentIndex(eventList.length);
        } else if (currentIndex === eventList.length + 1) {
            // If we go to the right of the last image (clone of the first), jump to the real first image
            setCurrentIndex(1);
        }
    };

    useEffect(() => {
        if (eventList) {
            sliderRef.current.addEventListener('transitionend', handleTransitionEnd);
            return () => {
                sliderRef.current.removeEventListener('transitionend', handleTransitionEnd);
            };
        }
    }, [currentIndex, eventList]);

    // Automatically advance the slider every 3 seconds
    useEffect(() => {
        if (eventList) {
            intervalRef.current = setInterval(() => {
                handleNextClick();
            }, 5000); // 5 seconds interval

            return () => {
                clearInterval(intervalRef.current); // Clear interval on component unmount
            };
        }
    }, [eventList, isTransitioning]);

    const handleIndicatorClick = (index) => {
        if (!isTransitioning) {
            setIsTransitioning(true);
            setCurrentIndex(index + 1);
        }
    };

    const getdimmedImage = (index) => {
        const leftIndex = currentIndex === 1 ? eventList.length : currentIndex - 1;
        const rightIndex = currentIndex === eventList.length ? 1 : currentIndex + 1;

        if (index === leftIndex || index === rightIndex) {
            return 'dimmed';
        }
        return '';
    };

    if (!eventList) {
        return <Loading />;
    }

    return (
        <section className="mainPage_BannerSection">
            <div className="slider-container" style={{ marginLeft: (document.body.clientWidth - 1280) / 2 }}>
                <button className="slider-arrow left" onClick={handlePrevClick}>‹</button>
                <div className="slider-wrapper">
                    <div
                        className="slider"
                        ref={sliderRef}
                        style={{
                            transform: `translateX(-${currentIndex * (1280 + 80)}px)`,
                            transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none'
                        }}
                    >
                        {/* Clone of the last image placed at the start */}
                        <img
                            className={`mainPage_BannerImage ${getdimmedImage(eventList.length)}`}
                            src={`${process.env.REACT_APP_IMG_URL}/${eventList[eventList.length - 1].img}.png`}
                            alt={`Banner ${eventList.length - 1}`}
                            style={{ width: '1280px', marginRight: '80px' }}
                        />

                        {/* Original images */}
                        {eventList.map((item, index) => (
                            <img
                                key={index}
                                className={`mainPage_BannerImage ${getdimmedImage(index + 1)}`}
                                src={`${process.env.REACT_APP_IMG_URL}/${item.img}.png`}
                                alt={`Banner ${index}`}
                                style={{ width: '1280px', marginRight: '80px' }}
                                onClick={() => window.location.href = `/Event/${item.event_num}`}
                            />
                        ))}

                        {/* Clone of the first image placed at the end */}
                        <img
                            className={`mainPage_BannerImage ${getdimmedImage(1)}`}
                            src={`${process.env.REACT_APP_IMG_URL}/${eventList[0].img}.png`}
                            alt={`Banner 0`}
                            style={{ width: '1280px', marginRight: '80px' }}
                        />
                    </div>
                </div>
                <button className="slider-arrow right" onClick={handleNextClick}>›</button>
            </div>
            <div className="slider-indicators">
                {eventList.map((_, index) => (
                    <span
                        key={index}
                        className={`indicator ${index + 1 === currentIndex ? 'active' : ''}`}
                        onClick={() => handleIndicatorClick(index)}
                    ></span>
                ))}
            </div>
        </section>
    );
};

export default BannerSlider;
