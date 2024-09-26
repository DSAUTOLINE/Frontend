import React, { useState, useEffect } from "react";
import '../styles/Admin_Content.css'
import {
    currentSituationAxios,
    userListAxios,
    carInquiryDeleteAxios,
    carInquiryChangeAxios,
    counselingInquiryDeleteAxios,
    counselingInquiryChangeAxios,
    mentoInquiryDeleteAxios,
    mentoInquiryChangeAxios,
    quickInquiryChangeAxios,
    quickInquiryDeleteAxios,
} from "../services/Request";
import NoCardList from './NoCardList'


//완료
export const Admin_UserCompletedList = (props) => {
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

    const onClickDelete = async (id) => {
        if (userStat === 0) {
            await quickInquiryDeleteAxios(id)
            setUserList(userList.filter(list => list.seq !== id))
        } else if (userStat === 1) {
            await carInquiryDeleteAxios(id)
            setUserList(userList.filter(list => list.order_num !== id))
        } else if (userStat === 2) {
            await counselingInquiryDeleteAxios(id)
            setUserList(userList.filter(list => list.seq !== id))
        } else if (userStat === 3) {
            await mentoInquiryDeleteAxios(id)
            setUserList(userList.filter(list => list.seq !== id))
        } else if (userStat === 4) {
            await counselingInquiryDeleteAxios(id)
            setUserList(userList.filter(list => list.seq !== id))
        }
    }
    const onClickChange = async (data) => {
        if (userStat === 0) {
            await quickInquiryChangeAxios(data)
            setUserList(userList.filter(list => list.seq !== data.seq))
        } else if (userStat === 1) {
            await carInquiryChangeAxios(data)
            setUserList(userList.filter(list => list.order_num !== data.seq))
        } else if (userStat === 2) {
            await counselingInquiryChangeAxios(data)
            setUserList(userList.filter(list => list.seq !== data.seq))
        } else if (userStat === 3) {
            await mentoInquiryChangeAxios(data)
            setUserList(userList.filter(list => list.seq !== data.seq))
        } else if (userStat === 4) {
            await counselingInquiryChangeAxios(data)
            setUserList(userList.filter(list => list.seq !== data.seq))
        }
    }


    return (
        <div className="admin_content">
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
            <span className="admin_content_eventStat_buttonDiv">
                <button className={userStat === 5 && 'selected'} onClick={() => setUserStat(5)}>현황</button>
                <button className={userStat === 0 && 'selected'} onClick={() => onClickEvent(0)}>즉시 출고</button>
                <button className={userStat === 1 && 'selected'} onClick={() => onClickEvent(1)}>빠른 간편 문의 / 한정 특가</button>
                <button className={userStat === 2 && 'selected'} onClick={() => onClickEvent(2)}>간편 상담</button>
                <button className={userStat === 3 && 'selected'} onClick={() => onClickEvent(3)}>우수 카멘토</button>
                <button className={userStat === 4 && 'selected'} onClick={() => onClickEvent(4)}>이벤트 상담</button>
            </span>
            {userStat === 5 && <CurrentSituation item={currentSituation !== null && currentSituation} />}
            {userStat === 0 && <QuickDealList item={userList !== null && userList} stat={0} onClickDelete={onClickDelete} onClickChange={onClickChange} />}
            {userStat === 1 && <QuickFAQList item={userList !== null && userList} stat={0} onClickDelete={onClickDelete} onClickChange={onClickChange} />}
            {userStat === 2 && <FastFAQList item={userList !== null && userList} stat={0} onClickDelete={onClickDelete} onClickChange={onClickChange} />}
            {userStat === 3 && <CarmentoList item={userList !== null && userList} stat={0} onClickDelete={onClickDelete} onClickChange={onClickChange} />}
            {userStat === 4 && <EventUserList item={userList !== null && userList} stat={0} onClickDelete={onClickDelete} onClickChange={onClickChange} />}
        </div>
    )
}




//미완료
export const Admin_UserIncompleteList = (props) => {
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


    const onClickDelete = async (id) => {
        if (userStat === 0) {
            await quickInquiryDeleteAxios(id)
            setUserList(userList.filter(list => list.seq !== id))
        } else if (userStat === 1) {
            await carInquiryDeleteAxios(id)
            setUserList(userList.filter(list => list.order_num !== id))
        } else if (userStat === 2) {
            await counselingInquiryDeleteAxios(id)
            setUserList(userList.filter(list => list.seq !== id))
        } else if (userStat === 3) {
            await mentoInquiryDeleteAxios(id)
            setUserList(userList.filter(list => list.seq !== id))
        } else if (userStat === 4) {
            await counselingInquiryDeleteAxios(id)
            setUserList(userList.filter(list => list.seq !== id))
        }
    }
    const onClickChange = async (data) => {
        if (userStat === 0) {
            await quickInquiryChangeAxios(data)
            setUserList(userList.filter(list => list.seq !== data.seq))
        } else if (userStat === 1) {
            await carInquiryChangeAxios(data)
            setUserList(userList.filter(list => list.order_num !== data.seq))
        } else if (userStat === 2) {
            await counselingInquiryChangeAxios(data)
            setUserList(userList.filter(list => list.seq !== data.seq))
        } else if (userStat === 3) {
            await mentoInquiryChangeAxios(data)
            setUserList(userList.filter(list => list.seq !== data.seq))
        } else if (userStat === 4) {
            await counselingInquiryChangeAxios(data)
            setUserList(userList.filter(list => list.seq !== data.seq))
        }
    }


    return (
        <div className="admin_content">
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
            <span className="admin_content_eventStat_buttonDiv">
                <button className={userStat === 5 && 'selected'} onClick={() => setUserStat(5)}>현황</button>
                <button className={userStat === 0 && 'selected'} onClick={() => onClickEvent(0)}>즉시 출고</button>
                <button className={userStat === 1 && 'selected'} onClick={() => onClickEvent(1)}>빠른 간편 문의 / 한정 특가</button>
                <button className={userStat === 2 && 'selected'} onClick={() => onClickEvent(2)}>간편 상담</button>
                <button className={userStat === 3 && 'selected'} onClick={() => onClickEvent(3)}>우수 카멘토</button>
                <button className={userStat === 4 && 'selected'} onClick={() => onClickEvent(4)}>이벤트 상담</button>
            </span>
            {userStat === 5 && <CurrentSituation item={currentSituation !== null && currentSituation} />}
            {userStat === 0 && <QuickDealList item={userList !== null && userList} stat={1} onClickDelete={onClickDelete} onClickChange={onClickChange} />}
            {userStat === 1 && <QuickFAQList item={userList !== null && userList} stat={1} onClickDelete={onClickDelete} onClickChange={onClickChange} />}
            {userStat === 2 && <FastFAQList item={userList !== null && userList} stat={1} onClickDelete={onClickDelete} onClickChange={onClickChange} />}
            {userStat === 3 && <CarmentoList item={userList !== null && userList} stat={1} onClickDelete={onClickDelete} onClickChange={onClickChange} />}
            {userStat === 4 && <EventUserList item={userList !== null && userList} stat={1} onClickDelete={onClickDelete} onClickChange={onClickChange} />}
        </div>
    )
}

















const CurrentSituation = (props) => {
    return (
        <>
            <div className="header-row">
                <span className="admin_content_UserListTitleSpan" style={{ justifyContent: 'space-between' }}>
                    <p style={{ width: 250 }}>신청</p>
                    <p>미완료</p>
                    <p>완료</p>
                </span>
            </div>
            <div className="admin_content_UserAllListDiv">
                <div>
                    <span style={{ justifyContent: 'space-between' }}>
                        <p style={{ width: 250 }}>즉시 출고</p>
                        <p>{props.item.quick_n ? props.item.quick_n : '0'}</p>
                        <p>{props.item.quick_y ? props.item.quick_y : '0'}</p>
                    </span>
                </div>
                <div>
                    <span style={{ justifyContent: 'space-between' }}>
                        <p style={{ width: 250 }}>빠른 간편 문의 / 한정 특가</p>
                        <p>{props.item.estimate_n ? props.item.estimate_n : '0'}</p>
                        <p>{props.item.estimate_y ? props.item.estimate_y : '0'}</p>
                    </span>
                </div>
                <div>
                    <span style={{ justifyContent: 'space-between' }}>
                        <p style={{ width: 250 }}>간편 상담</p>
                        <p>{props.item.counsel_n ? props.item.counsel_n : '0'}</p>
                        <p>{props.item.counsel_y ? props.item.counsel_y : '0'}</p>
                    </span>
                </div>
                <div>
                    <span style={{ justifyContent: 'space-between' }}>
                        <p style={{ width: 250 }}>우수 카멘토</p>
                        <p>{props.item.mento_n ? props.item.mento_n : '0'}</p>
                        <p>{props.item.mento_y ? props.item.mento_y : '0'}</p>
                    </span>
                </div>
                <div>
                    <span style={{ justifyContent: 'space-between' }}>
                        <p style={{ width: 250 }}>이벤트 상담</p>
                        <p>{props.item.event_n ? props.item.event_n : '0'}</p>
                        <p>{props.item.event_y ? props.item.event_y : '0'}</p>
                    </span>
                </div>
            </div>
        </>
    )
}







const QuickDealList = (props) => {
    return (
        <>
            <div className="header-row">
                {/* <input type="checkbox" /> */}
                <span className="admin_content_quickDealUserListTitleSpan">
                    <p>신청일</p>
                    <p>이름</p>
                    <p>연락처</p>
                    <p>모델</p>
                    <p>옵션</p>
                    <p>금액</p>
                </span>
            </div>
            <div className="admin_content_quickDealUserListDiv">
                {props.item.length === 0 && <NoCardList card={'고객이'} />}
                {props.item.map((item, idx) => (
                    <div>
                        <span>
                            <p>{item.created_at.slice(0, 10)}</p>
                            <p>{item.name}</p>
                            <p>{item.phone}</p>
                            <p><span>[회사]</span><br />{item.enter}<br /><br /><span>[차량]</span><br />{item.car_name}</p>
                            <span>
                                <p><span>[트림]</span></p>
                                <p>· {item.info}</p>
                                <br />
                                <p><span>[옵션]</span></p>
                                {item.option.length === 0 && <p>-</p>}
                                {item.option.map((item, idx) => (
                                    <p>· {item.name}</p>
                                ))}
                            </span>
                            <p>{parseInt(item.price / 10000).toLocaleString()} 만원</p>
                        </span>
                        <button
                            onClick={async () => {
                                await props.onClickChange({
                                    seq: item.seq,
                                    allow: item.allow,
                                })
                            }}
                        >
                            {props.stat === 1 ? '완료' : '미완료'}
                        </button>
                        <button
                            onClick={async () => {
                                await props.onClickDelete(item.seq)
                            }}
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}



const QuickFAQList = (props) => {
    return (
        <>
            <div className="header-row">
                {/* <input type="checkbox" /> */}
                <span className="admin_content_quickFAQUserListTitleSpan">
                    <p>신청일</p>
                    <p>이름</p>
                    <p>연락처</p>
                    <p>모델</p>
                    <p>옵션</p>
                    <p>이용조건</p>
                    <p>금액</p>
                </span>
            </div>
            <div className="admin_content_quickFAQUserListDiv">
                {props.item.length === 0 && <NoCardList card={'고객이'} />}
                {props.item.map((item, idx) => (
                    <div>
                        <span>
                            <p>{item.created_at.slice(0, 10)}</p>
                            <p>{item.name}</p>
                            <p>{item.phone}</p>
                            <p><span>[회사]</span><br />{item.enter}<br /><br /><span>[차량]</span><br />{item.car_name}</p>
                            <span>
                                <p><span>[트림]</span></p>
                                <p>· {item.trim1}</p>
                                <p>· {item.trim2}</p>
                                <br />
                                <p><span>[옵션]</span></p>
                                {item.option.length === 0 && <p>-</p>}
                                {item.option.map((item, idx) => (
                                    <p>· {item.name}</p>
                                ))}
                            </span>
                            <span>
                                <p><span>이용 방법 -</span> {item.method}</p>
                                <p><span>이용 기간 -</span> {item.period}</p>
                                <p><span>보증금 -</span> {item.deposit}</p>
                                <p><span>보증금(원) -</span> {item.deposit_price.toLocaleString()} 원</p>
                                <p><span>선납금 -</span> {item.payment_price}</p>
                                <p><span>보험 연령 -</span> {item.age}</p>
                                <p><span>연간 주행거리 -</span> {item.annual_mileage}</p>
                            </span>
                            <p>{parseInt(item.price / 10000).toLocaleString()} 만원</p>
                        </span>
                        <button
                            onClick={async () => {
                                await props.onClickChange({
                                    seq: item.order_num,
                                    allow: item.allow,
                                })
                            }}
                        >
                            {props.stat === 1 ? '완료' : '미완료'}
                        </button>
                        <button
                            onClick={() => props.onClickDelete(item.order_num)}
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}






const CarmentoList = (props) => {
    return (
        <>
            <div className="header-row">
                {/* <input type="checkbox" /> */}
                <span className="admin_content_carmentoUserListTitleSpan" style={{ justifyContent: 'space-between' }}>
                    <p>신청일</p>
                    <p>이름</p>
                    <p>연락처</p>
                    <p>담당 카멘토</p>
                </span>
            </div>
            <div className="admin_content_carmentoUserListDiv">
                {props.item.length === 0 && <NoCardList card={'고객이'} />}
                {props.item.map((item, idx) => (
                    <div>
                        <span style={{ justifyContent: 'space-between' }}>
                            <p>{item.created_at.slice(0, 10)}</p>
                            <p>{item.name}</p>
                            <p>{item.phone}</p>
                            <p>{item.mento}</p>
                        </span>
                        <button
                            onClick={async () => {
                                await props.onClickChange({
                                    seq: item.seq,
                                    allow: item.allow,
                                })
                            }}
                        >
                            {props.stat === 1 ? '완료' : '미완료'}
                        </button>
                        <button
                            onClick={() => props.onClickDelete(item.seq)}
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}







const FastFAQList = (props) => {
    return (
        <>
            <div className="header-row">
                {/* <input type="checkbox" /> */}
                <span className="admin_content_carmentoUserListTitleSpan" style={{ justifyContent: 'space-between' }}>
                    <p>신청일</p>
                    <p>이름</p>
                    <p>연락처</p>
                    <p>차종</p>
                </span>
            </div>
            <div className="admin_content_carmentoUserListDiv">
                {props.item.length === 0 && <NoCardList card={'고객이'} />}
                {props.item.map((item, idx) => (
                    <div>
                        <span style={{ justifyContent: 'space-between' }}>
                            <p>{item.created_at.slice(0, 10)}</p>
                            <p>{item.name}</p>
                            <p>{item.phone}</p>
                            <p>{item.car_name}</p>
                        </span>
                        <button
                            onClick={async () => {
                                await props.onClickChange({
                                    seq: item.seq,
                                    allow: item.allow,
                                })
                            }}
                        >
                            {props.stat === 1 ? '완료' : '미완료'}
                        </button>
                        <button
                            onClick={() => props.onClickDelete(item.seq)}
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}






const EventUserList = (props) => {
    return (
        <>
            <div className="header-row">
                {/* <input type="checkbox" /> */}
                <span className="admin_content_carmentoUserListTitleSpan" style={{ justifyContent: 'space-between' }}>
                    <p>신청일</p>
                    <p>이름</p>
                    <p>연락처</p>
                    <p>이벤트명</p>
                </span>
            </div>
            <div className="admin_content_carmentoUserListDiv">
                {props.item.length === 0 && <NoCardList card={'고객이'} />}
                {props.item.map((item, idx) => (
                    <div>
                        <span style={{ justifyContent: 'space-between' }}>
                            <p>{item.created_at.slice(0, 10)}</p>
                            <p>{item.name}</p>
                            <p>{item.phone}</p>
                            <p>{item.car_name}</p>
                        </span>
                        <button
                            onClick={async () => {
                                await props.onClickChange({
                                    seq: item.seq,
                                    allow: item.allow,
                                })
                            }}
                        >
                            {props.stat === 1 ? '완료' : '미완료'}
                        </button>
                        <button
                            onClick={() => props.onClickDelete(item.seq)}
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </>
    )
}