import React, { useState, useEffect } from "react";
import '../styles/Admin_Content.css'
import { faqFilterAxios, hotDealAxios, hotDealInsertAxios, hotDealDeleteAxios, } from '../services/Request'
import NoCardList from '../components/NoCardList'
import Loading from "../components/Loading";





export const Admin_HotdealAdd = (props) => {
    const [carList, setCarList] = useState(null)
    const [filteredList, setFilteredList] = useState(null)
    const [searchValue, setSearchValue] = useState('');
    const [lease, setLease] = useState('')
    const [rental, setRental] = useState('')
    const [leasePercent, setLeasePercent] = useState('')
    const [rentalPercent, setRentalPercent] = useState('')
    const [payment, setPayment] = useState(null)
    const [deposit, setDeposit] = useState(null)
    const [editStat, setEditStat] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await faqFilterAxios()
            setCarList(response)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (carList) {
            // 검색어를 포함하는 항목 필터링
            setFilteredList(carList.filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            ))
        }
    }, [carList, searchValue])

    const oilFunction = (item) => {
        const oil = [
            item.lpg === 1 && 'LPG',
            item.gasoline === 1 && '가솔린',
            item.diesel === 1 && '디젤',
            item.hybrid === 1 && '하이브리드',
            item.electric === 1 && '전기',
            item.h2 === 1 && '수소',
        ].filter(Boolean).join(', ');
        return oil
    }



    if (!filteredList) {
        return (
            <Loading />
        )
    }
    return (
        <div className="admin_content">
            <h2>한정 특가 <span>- 차량 추가</span></h2>
            <input
                className="admin_content_searchListInput"
                placeholder='차량을 검색해주세요'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="header-row">
                {/* <input type="checkbox" /> */}
            </div>
            <div className="admin_content_HotdealList">
                {filteredList.length === 0 && <NoCardList card={'차량이'} />}
                {filteredList.map((item, idx) => (
                    <>
                        <div className="admin_content_HotdealItem" key={item.id}>
                            <img
                                className="admin_content_hotdeal-image"
                                src={`${process.env.REACT_APP_IMG_URL}/${item.img}.png`}
                                alt="차량 이미지"
                                onError={(e) => {
                                    e.target.onerror = null; // 무한 루프 방지
                                    e.target.src = `${process.env.REACT_APP_IMG_URL}/error.png`;
                                }}
                            />
                            <div className="admin_content_hotdeal-info">
                                <h1>{item.enter} {item.name}</h1>
                                <div className='admin_content_hodeal_infosub'>
                                    <p>{item.year}.{item.month}</p>
                                    <div className='admin_content_hodeal_line' />
                                    <p>{item.category}</p>
                                    <div className='admin_content_hodeal_line' />
                                    <p>{oilFunction(item)}</p>
                                </div>
                                <div className='admin_content_hodeal_infosub'>
                                    <p>{item.electric === 1 ? `총주행거리 ${item.max_cc.toLocaleString()} Km` : `${item.min_cc.toLocaleString()}~${item.max_cc.toLocaleString()}CC`}</p>
                                    <div className='admin_content_hodeal_line' />
                                    <p>복합 {item.electric === 1 ? `전비 ${item.max_fuel_efficiency} Km/kWh` : `연비 ${item.min_fuel_efficiency}~${item.max_fuel_efficiency} Km/L`}</p>
                                </div>
                            </div>
                            <button
                                className="admin_content_carListAddButton"
                                onClick={() => setEditStat(idx)}
                            >
                                추가
                            </button>
                        </div>
                        <div className="admin_content_hotDealList_EditDiv" style={editStat !== idx ? { display: 'none' } : null}>
                            <span>
                                <p>월 렌트비</p>
                                <input placeholder='할인 된 금액 입력' value={rental} type="number" onChange={(e) => setRental(e.target.value)} />
                                <p>월 리스비</p>
                                <input placeholder="할인 된 금액 입력" value={lease} type="number" onChange={(e) => setLease(e.target.value)} />
                            </span>
                            <span>
                                <p>렌트 할인율</p>
                                <input placeholder='할인 된 % 입력' value={rentalPercent} type="number" onChange={(e) => setRentalPercent(e.target.value)} style={{ width: 90 }} />
                                <p>리스 할인율</p>
                                <input placeholder="할인 된 % 입력" value={leasePercent} type="number" onChange={(e) => setLeasePercent(e.target.value)} style={{ width: 90 }} />
                            </span>
                            <span>
                                <p>할부 (개월)</p>
                                <span>
                                    <button onClick={() => setPayment('12개월')} className={payment === '12개월' && 'selected'}>12개월</button>
                                    <button onClick={() => setPayment('24개월')} className={payment === '24개월' && 'selected'}>24개월</button>
                                    <button onClick={() => setPayment('36개월')} className={payment === '36개월' && 'selected'}>36개월</button>
                                    <button onClick={() => setPayment('48개월')} className={payment === '48개월' && 'selected'}>48개월</button>
                                    <button onClick={() => setPayment('60개월')} className={payment === '60개월' && 'selected'}>60개월</button>
                                </span>
                                <p>선납금 / 보증금</p>
                                <span>
                                    <button onClick={() => setDeposit('선납금')} className={deposit === '선납금' && 'selected'}>선납금</button>
                                    <button onClick={() => setDeposit('보증금')} className={deposit === '보증금' && 'selected'}>보증금</button>
                                </span>
                            </span>

                            <button
                                onClick={async () => {
                                    if (lease !== '' && rental !== '' && leasePercent !== '' && rentalPercent !== '' && payment && deposit) {
                                        await hotDealInsertAxios({
                                            car_code: item.car_code,
                                            rental_price: rental,
                                            lease_price: lease,
                                            rental_percent: rentalPercent,
                                            lease_percent: leasePercent,
                                            payment: payment,
                                            deposit: deposit,
                                        })
                                        setCarList(carList.filter((_, index) => index !== idx))
                                        setLease('')
                                        setRental('')
                                        setLeasePercent('')
                                        setRentalPercent('')
                                        setDeposit(null)
                                        setPayment(null)
                                        setEditStat(null)
                                        alert('한정 특가 차량이 추가되었습니다.')
                                    } else {
                                        alert('내용이 입력되지 않았습니다')
                                    }
                                }}
                            >
                                추가
                            </button>
                        </div>
                    </>
                ))}
            </div>
        </div>
    )
}




export const Admin_HotdealEdit = (props) => {
    const [carList, setCarList] = useState(null)
    const [filteredList, setFilteredList] = useState(null)
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await hotDealAxios()
            setCarList(response)
        }
        fetchData()
    }, [])

    useEffect(() => {
        if (carList) {
            // 검색어를 포함하는 항목 필터링
            setFilteredList(carList.filter(item =>
                item.name.toLowerCase().includes(searchValue.toLowerCase())
            ))
        }
    }, [carList, searchValue])


    const oilFunction = (item) => {
        const oil = [
            item.lpg === 1 && 'LPG',
            item.gasoline === 1 && '가솔린',
            item.diesel === 1 && '디젤',
            item.hybrid === 1 && '하이브리드',
            item.electric === 1 && '전기',
            item.h2 === 1 && '수소',
        ].filter(Boolean).join(', ');
        return oil
    }


    if (!filteredList) {
        return (
            <Loading />
        )
    }
    return (
        <div className="admin_content">
            <h2>한정 특가 <span>- 차량 관리</span></h2>
            <input
                className="admin_content_searchListInput"
                placeholder='차량을 검색해주세요'
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)}
            />
            <div className="header-row">
                {/* <input type="checkbox" /> */}
            </div>
            <div className="admin_content_HotdealList">
                {filteredList.length === 0 && <NoCardList card={'차량이'} />}
                {filteredList.map((item, idx) => (
                    <div className="admin_content_HotdealItem" key={item.id}>
                        <img
                            className="admin_content_hotdeal-image"
                            src={`${process.env.REACT_APP_IMG_URL}/${item.img}.png`}
                            alt="차량 이미지"
                            onError={(e) => {
                                e.target.onerror = null; // 무한 루프 방지
                                e.target.src = `${process.env.REACT_APP_IMG_URL}/error.png`;
                            }}
                        />
                        <div className="admin_content_hotdeal-info">
                            <h1>{item.enter} {item.name}</h1>
                            <div className='admin_content_hodeal_infosub'>
                                <p>{item.year}.{item.month}</p>
                                <div className='admin_content_hodeal_line' />
                                <p>{item.category}</p>
                                <div className='admin_content_hodeal_line' />
                                <p>{oilFunction(item)}</p>
                            </div>
                            <div className='admin_content_hodeal_infosub'>
                                <p>{item.electric === 1 ? `총주행거리 ${item.max_cc.toLocaleString()} Km` : `${item.min_cc.toLocaleString()}~${item.max_cc.toLocaleString()}CC`}</p>
                                <div className='admin_content_hodeal_line' />
                                <p>복합 {item.electric === 1 ? `전비 ${item.max_fuel_efficiency} Km/kWh` : `연비 ${item.min_fuel_efficiency}~${item.max_fuel_efficiency} Km/L`}</p>
                            </div>
                        </div>
                        <button
                            className="admin_content_carListDeleteButton"
                            onClick={async () => {
                                setCarList(carList.filter((_, index) => index !== idx))
                                await hotDealDeleteAxios(item.seq)
                            }}
                        >
                            삭제
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}