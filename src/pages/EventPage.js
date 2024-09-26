import React, { useState, useEffect } from 'react';
import Footer from "../components/Footer";
import GNB from "../components/GNB";
import '../styles/EventPage.css';
import { EventCardlist } from '../components/Cards';
import FastFAQSticky from '../components/FastFAQSticky';
import { eventAxios } from '../services/Request';
import NoCardList from '../components/NoCardList'
import Loading from "../components/Loading";





const EventPage = (props) => {
    const [selectedButton, setSelectedButton] = useState(0);
    const [eventList, setEventList] = useState(null)

    const handleButtonClick = (buttonIndex) => {
        setSelectedButton(buttonIndex);
    };

    useEffect(() => {
        const fetchData = async () => {
            const response = await eventAxios(0, 0)
            setEventList(response.filter(item => item.type !== 4))
        }
        fetchData()
    }, [])

    useEffect(() => {
        const fetchData = async () => {
            const response = await eventAxios(0, selectedButton)
            setEventList(response.filter(item => item.type !== 4))
        }
        fetchData()
    }, [selectedButton])


    if (!eventList) {
        return (
            <Loading />
        )
    }
    return (
        <>
            <div className='event_container'>
                <GNB stat={true} page={'이벤트/프로모션'} />
                <FastFAQSticky height={600}/>
                <div className="eventTitleSection">
                    <h1>이벤트/프로모션</h1>
                    <p>더 많은 혜택과 함께 하세요</p>
                </div>
                <div className="eventButtonSection">
                    <button
                        onClick={() => handleButtonClick(0)}
                        className={`eventButton ${selectedButton === 0 ? 'selected' : ''}`}
                    >
                        진행중인 이벤트
                    </button>
                    <button
                        onClick={() => handleButtonClick(1)}
                        className={`eventButton ${selectedButton === 1 ? 'selected' : ''}`}
                    >
                        종료된 이벤트
                    </button>
                </div>
                <div className="eventpageSection">
                    <div className='eventList'>
                        {eventList.length === 0 && <NoCardList card={'이벤트가'} />}
                        {eventList.map((item, idx) => (
                            <EventCardlist key={idx} item={item} isEnded={selectedButton === 1} />
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
}

export default EventPage;
