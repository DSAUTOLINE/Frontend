import React, { useState, useEffect } from "react";
import '../../styles/mobile/Mobile_Admin.css'
import {
    currentSituationAxios,
    userListAxios,
} from "../../services/Request";
import { Mobile_Admin_UserList_Popup } from './Mobile_Popup'
import NoCardList from '../NoCardList'


//완료
export const Mobile_Admin_UserCompletedList = (props) => {
    const [userStat, setUserStat] = useState(5)
    const [currentSituation, setCurrentSituation] = useState(null)
    const [userList, setUserList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await currentSituationAxios()
            setCurrentSituation(response1)
        }
        fetchData()
    }, [])

    const onClickEvent = async (stat) => {
        const response2 = await userListAxios(stat, 0)
        setUserList(response2)
        setUserStat(stat)
    }


    return (
        <div className="mobile_admin_content">
            <section className="mobile_admin_titleSection">
                <h2>고객 리스트
                    <span>- 완료
                        {currentSituation && (
                            parseInt(currentSituation.counsel_y ? currentSituation.counsel_y : 0) +
                            parseInt(currentSituation.estimate_y ? currentSituation.estimate_y : 0) +
                            parseInt(currentSituation.mento_y ? currentSituation.mento_y : 0) +
                            parseInt(currentSituation.quick_y ? currentSituation.quick_y : 0) +
                            parseInt(currentSituation.event_y ? currentSituation.event_y : 0))}건
                    </span>
                </h2>
                <span>
                    <p className={userStat === 5 && 'selected'} onClick={() => setUserStat(5)}>현황</p>
                    <p className={userStat === 0 && 'selected'} onClick={() => onClickEvent(0)}>즉시 출고</p>
                    <p className={userStat === 1 && 'selected'} onClick={() => onClickEvent(1)}>빠른 간편 문의 / 한정 특가</p>
                    <p className={userStat === 2 && 'selected'} onClick={() => onClickEvent(2)}>간편 상담</p>
                    <p className={userStat === 3 && 'selected'} onClick={() => onClickEvent(3)}>우수 카멘토</p>
                    <p className={userStat === 4 && 'selected'} onClick={() => onClickEvent(4)}>이벤트 상담</p>
                </span>
            </section>
            <section className="mobile_admin_contentSection">
                {userStat === 5 && <CurrentSituation item={currentSituation !== null && currentSituation} />}
                {userStat === 0 && <QuickDealList item={userList !== null && userList} stat={0} />}
                {userStat === 1 && <QuickFAQList item={userList !== null && userList} stat={0} />}
                {userStat === 2 && <FastFAQList item={userList !== null && userList} stat={0} />}
                {userStat === 3 && <CarmentoList item={userList !== null && userList} stat={0} />}
                {userStat === 4 && <EventUserList item={userList !== null && userList} stat={0} />}
            </section>
        </div>
    )
}




//미완료
export const Mobile_Admin_UserIncompleteList = (props) => {
    const [userStat, setUserStat] = useState(5)
    const [currentSituation, setCurrentSituation] = useState(null)
    const [userList, setUserList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await currentSituationAxios()
            setCurrentSituation(response1)
        }
        fetchData()
    }, [])

    const onClickEvent = async (stat) => {
        const response2 = await userListAxios(stat, 1)
        setUserList(response2)
        setUserStat(stat)
    }

    return (
        <div className="mobile_admin_content">
            <section className="mobile_admin_titleSection">
                <h2>고객 리스트
                    <span>- 미완료
                        {currentSituation && (
                            parseInt(currentSituation.counsel_n ? currentSituation.counsel_n : 0) +
                            parseInt(currentSituation.estimate_n ? currentSituation.estimate_n : 0) +
                            parseInt(currentSituation.mento_n ? currentSituation.mento_n : 0) +
                            parseInt(currentSituation.quick_n ? currentSituation.quick_n : 0) +
                            parseInt(currentSituation.event_n ? currentSituation.event_n : 0))}건
                    </span>
                </h2>
                <span>
                    <p className={userStat === 5 && 'selected'} onClick={() => setUserStat(5)}>현황</p>
                    <p className={userStat === 0 && 'selected'} onClick={() => onClickEvent(0)}>즉시 출고</p>
                    <p className={userStat === 1 && 'selected'} onClick={() => onClickEvent(1)}>빠른 간편 문의 / 한정 특가</p>
                    <p className={userStat === 2 && 'selected'} onClick={() => onClickEvent(2)}>간편 상담</p>
                    <p className={userStat === 3 && 'selected'} onClick={() => onClickEvent(3)}>우수 카멘토</p>
                    <p className={userStat === 4 && 'selected'} onClick={() => onClickEvent(4)}>이벤트 상담</p>
                </span>
            </section>
            <section className="mobile_admin_contentSection">
                {userStat === 5 && <CurrentSituation item={currentSituation !== null && currentSituation} />}
                {userStat === 0 && <QuickDealList item={userList !== null && userList} stat={1} />}
                {userStat === 1 && <QuickFAQList item={userList !== null && userList} stat={1} />}
                {userStat === 2 && <FastFAQList item={userList !== null && userList} stat={1} />}
                {userStat === 3 && <CarmentoList item={userList !== null && userList} stat={1} />}
                {userStat === 4 && <EventUserList item={userList !== null && userList} stat={1} />}
            </section>
        </div>
    )
}

















const CurrentSituation = (props) => {
    return (
        <div className="mobile_admin_allUser">
            <span>
                <p>신청</p>
                <p>미완료</p>
                <p>완료</p>
            </span>
            <div>
                <p>즉시 출고</p>
                <p>{props.item.quick_n ? props.item.quick_n : '0'}</p>
                <p>{props.item.quick_y ? props.item.quick_y : '0'}</p>
            </div>
            <div>
                <p>빠른 간편 문의 / 한정 특가</p>
                <p>{props.item.estimate_n ? props.item.estimate_n : '0'}</p>
                <p>{props.item.estimate_y ? props.item.estimate_y : '0'}</p>
            </div>
            <div>
                <p>간편 상담</p>
                <p>{props.item.counsel_n ? props.item.counsel_n : '0'}</p>
                <p>{props.item.counsel_y ? props.item.counsel_y : '0'}</p>
            </div>
            <div>
                <p>우수 카멘토</p>
                <p>{props.item.mento_n ? props.item.mento_n : '0'}</p>
                <p>{props.item.mento_y ? props.item.mento_y : '0'}</p>
            </div>
            <div>
                <p>이벤트 상담</p>
                <p>{props.item.event_n ? props.item.event_n : '0'}</p>
                <p>{props.item.event_y ? props.item.event_y : '0'}</p>
            </div>
        </div>
    )
}







const QuickDealList = (props) => {
    const [popup, setPopup] = useState(null)
    return (
        <>
            {popup !== null && <Mobile_Admin_UserList_Popup setPopup={setPopup} item={popup} />}
            <div className="mobile_admin_quickDealUserList">
                {props.item.length === 0 && <NoCardList card={'고객이'} />}
                <span>
                    {props.item.map((item, idx) => (
                        <div onClick={() => setPopup(item)}>
                            <p>{item.name}</p>
                            <p>{item.enter} {item.car_name}</p>
                            <p>{item.created_at.slice(0, 10)}</p>
                        </div>
                    ))}
                </span>
            </div>
        </>
    )
}



const QuickFAQList = (props) => {
    const [popup, setPopup] = useState(null)
    return (
        <>
            {popup !== null && <Mobile_Admin_UserList_Popup setPopup={setPopup} item={popup} />}
            <div className="mobile_admin_quickDealUserList">
                {props.item.length === 0 && <NoCardList card={'고객이'} />}
                <span>
                    {props.item.map((item, idx) => (
                        <div onClick={() => setPopup(item)}>
                            <p>{item.name}</p>
                            <p>{item.enter} {item.car_name}</p>
                            <p>{item.created_at.slice(0, 10)}</p>
                        </div>
                    ))}
                </span>
            </div>
        </>
    )
}






const CarmentoList = (props) => {
    const [popup, setPopup] = useState(null)
    return (
        <>
            {popup !== null && <Mobile_Admin_UserList_Popup setPopup={setPopup} item={popup} />}
            <div className="mobile_admin_quickDealUserList">
                {props.item.length === 0 && <NoCardList card={'고객이'} />}
                <span>
                    {props.item.map((item, idx) => (
                        <div onClick={() => setPopup(item)}>
                            <p>{item.name}</p>
                            <p>{item.mento}</p>
                            <p>{item.created_at.slice(0, 10)}</p>
                        </div>
                    ))}
                </span>
            </div>
        </>
    )
}







const FastFAQList = (props) => {
    const [popup, setPopup] = useState(null)
    return (
        <>
            {popup !== null && <Mobile_Admin_UserList_Popup setPopup={setPopup} item={popup} />}
            <div className="mobile_admin_quickDealUserList">
                {props.item.length === 0 && <NoCardList card={'고객이'} />}
                <span>
                    {props.item.map((item, idx) => (
                        <div onClick={() => setPopup(item)}>
                            <p>{item.name}</p>
                            <p>{item.enter} {item.car_name}</p>
                            <p>{item.created_at.slice(0, 10)}</p>
                        </div>
                    ))}
                </span>
            </div>
        </>
    )
}


const EventUserList = (props) => {
    const [popup, setPopup] = useState(null)
    return (
        <>
            {popup !== null && <Mobile_Admin_UserList_Popup setPopup={setPopup} item={popup} />}
            <div className="mobile_admin_quickDealUserList">
                {props.item.length === 0 && <NoCardList card={'고객이'} />}
                <span>
                    {props.item.map((item, idx) => (
                        <div onClick={() => setPopup(item)}>
                            <p>{item.name}</p>
                            <p>{item.enter} {item.car_name}</p>
                            <p>{item.created_at.slice(0, 10)}</p>
                        </div>
                    ))}
                </span>
            </div>
        </>
    )
}