import React, { useState, useEffect } from "react";
import '../../styles/mobile/Mobile_Event.css'
import Mobile_GNB from "../../components/mobile/Mobile_GNB";
import Mobile_Footer from "../../components/mobile/Mobile_Footer";
import { eventAxios } from '../../services/Request'
import { Mobile_EventPageCard } from "../../components/mobile/Mobile_Card";
import NoCardList from '../../components/NoCardList'
import Loading from "../../components/Loading";



const Mobile_Event = (props) => {
    const [selectedButton, setSelectedButton] = useState(0);
    const [eventList, setEventList] = useState(null)

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
        <div className="mobile_container">
            <Mobile_GNB page={'이벤트/프로모션'} />
            <section className="mobile_event_eventListSection">
                <h3>이벤트 / 프로모션</h3>
                <p>진행중인 이벤트 및 프로모션을 확인해보세요.</p>
                <button className={selectedButton === 0 && 'selected'} onClick={() => setSelectedButton(0)}>진행중인 이벤트</button>
                <button className={selectedButton === 1 && 'selected'} onClick={() => setSelectedButton(1)}>종료된 이벤트</button>
                {eventList.length === 0 && <NoCardList card={'이벤트가'}/>}
                {eventList.map((item, _) => (
                    <Mobile_EventPageCard item={item} stat={selectedButton === 1 && true}/>
                ))}
            </section>
            <Mobile_Footer />
        </div>
    )
}

export default Mobile_Event