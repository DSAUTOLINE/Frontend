import React, { useState, useEffect } from "react";
import '../styles/Admin_Content.css';
import NoCardList from "./NoCardList";
import { eventAxios, eventAddAxios, eventDeleteAxios, imageUploadAxios } from "../services/Request";
import {
    imageResize1280_700,
    imageResize1920_700,
    imageResize1280_110,
    imageKeepOriginal,
    generateRandomString
} from "../utils/imageResize";
import Loading from "../components/Loading";



export const Admin_EventAdd = () => {
    const [selectedEvent, setSelectedEvent] = useState(0);
    const [selectedSize, setSelectedSize] = useState('1280 x 700');
    const [startDate, setStartDate] = useState({ year: "", month: "", day: "" });
    const [endDate, setEndDate] = useState({ year: "", month: "", day: "" });

    const years = Array.from({ length: 30 }, (_, i) => (new Date().getFullYear() + i).toString());
    const months = Array.from({ length: 12 }, (_, i) => (i + 1).toString().padStart(2, '0'));
    const days = Array.from({ length: 31 }, (_, i) => (i + 1).toString().padStart(2, '0'));

    const [nameStat, setNameStat] = useState('')

    //이미지 URL
    const [bannerURL, setBannerURL] = useState(null)
    const [mainURL, setMainURL] = useState(null)

    const handleEventClick = (eventType, eventSize) => {
        setSelectedEvent(eventType);
        setSelectedSize(eventSize);
        setBannerURL(null)
        setMainURL(null)
    };

    const onClickAxios = async () => {
        if (nameStat !== '' && startDate.year !== '' && startDate.month !== '' && startDate.day !== '' && endDate.year !== '' && endDate.month !== '' && endDate.day !== '' && bannerURL) {
            const random1 = generateRandomString(20)
            const random2 = generateRandomString(20)
            if (selectedEvent === 4) {
                await eventAddAxios([{
                    title: nameStat,
                    start_date: new Date(`${startDate.year}-${startDate.month}-${startDate.day}`),
                    end_date: new Date(`${endDate.year}-${endDate.month}-${endDate.day}`),
                    img: `event_${random1}`,
                    type: selectedEvent,
                    state: 'out',
                    event_num: random1,
                }])
                await imageUploadAxios(bannerURL, `event_${random1}`)
                setNameStat('')
                setBannerURL(null)
                setMainURL(null)
                setEndDate({ year: "", month: "", day: "" })
                setStartDate({ year: "", month: "", day: "" })
                setSelectedEvent(0)
                setSelectedSize("1280 x 700")
                alert('이벤트가 추가되었습니다.')
            } else if (mainURL) {
                await eventAddAxios([{
                    title: nameStat,
                    start_date: new Date(`${startDate.year}-${startDate.month}-${startDate.day}`),
                    end_date: new Date(`${endDate.year}-${endDate.month}-${endDate.day}`),
                    img: `event_${random1}`,
                    type: selectedEvent,
                    state: 'out',
                    event_num: random1,
                },
                {
                    title: nameStat,
                    start_date: new Date(`${startDate.year}-${startDate.month}-${startDate.day}`),
                    end_date: new Date(`${endDate.year}-${endDate.month}-${endDate.day}`),
                    img: `event_${random2}`,
                    type: selectedEvent,
                    state: 'in',
                    event_num: random1,
                }])
                await imageUploadAxios(bannerURL, `event_${random1}`)
                await imageUploadAxios(mainURL, `event_${random2}`)
                setNameStat('')
                setBannerURL(null)
                setMainURL(null)
                setEndDate({ year: "", month: "", day: "" })
                setStartDate({ year: "", month: "", day: "" })
                setSelectedEvent(0)
                setSelectedSize("1280 x 700")
                alert('이벤트가 추가되었습니다.')
            }
        } else {
            alert('내용이 입력되지 않았습니다')
        }
    }

    const handleStartDateChange = (e) => {
        const { name, value } = e.target;
        setStartDate({ ...startDate, [name]: value });
    };

    const handleEndDateChange = (e) => {
        const { name, value } = e.target;
        setEndDate({ ...endDate, [name]: value });
    };


    return (
        <div className="admin_content">
            <h2>이벤트 <span>- 이벤트 추가</span></h2>
            <div className="header-row">
                <button
                    className={`admin_content_event_button ${selectedEvent === 0 ? "active" : ""}`}
                    onClick={() => handleEventClick(0, "1280 x 700")}
                >
                    메인 추가
                </button>
                <button
                    className={`admin_content_event_button ${selectedEvent === 1 ? "active" : ""}`}
                    onClick={() => handleEventClick(1, "1920 x 700")}
                >
                    빠른 간편 문의 추가
                </button>
                <button
                    className={`admin_content_event_button ${selectedEvent === 2 ? "active" : ""}`}
                    onClick={() => handleEventClick(2, "1920 x 700")}
                >
                    한정 특가 추가
                </button>
                <button
                    className={`admin_content_event_button ${selectedEvent === 3 ? "active" : ""}`}
                    onClick={() => handleEventClick(3, "1920 x 700")}
                >
                    즉시 출고 추가
                </button>
                <button
                    className={`admin_content_event_button ${selectedEvent === 4 ? "active" : ""}`}
                    onClick={() => handleEventClick(4, "1280 x 100")}
                >
                    메인 띠 배너 추가
                </button>
            </div>
            <div className="admin_content_event_addSection">
                <div className="admin_content_event_addSection_body">
                    <div className="admin_content_event_nameSection">
                        <h1>이벤트명</h1>
                        <input
                            placeholder="이벤트 이름을 입력하세요"
                            value={nameStat}
                            onChange={(e) => setNameStat(e.target.value)}
                        />
                    </div>
                    <div className="admin_content_event_dateSection">
                        <h1>기간</h1>
                        <div className="date-picker">
                            <select name="year" value={startDate.year} onChange={handleStartDateChange}>
                                <option value="">년</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <p>년</p>
                            <select name="month" value={startDate.month} onChange={handleStartDateChange}>
                                <option value="">월</option>
                                {months.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                            <p>월</p>
                            <select name="day" value={startDate.day} onChange={handleStartDateChange}>
                                <option value="">일</option>
                                {days.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                            <span> ~ </span>
                            <select name="year" value={endDate.year} onChange={handleEndDateChange}>
                                <option value="">년</option>
                                {years.map(year => (
                                    <option key={year} value={year}>{year}</option>
                                ))}
                            </select>
                            <p>년</p>
                            <select name="month" value={endDate.month} onChange={handleEndDateChange}>
                                <option value="">월</option>
                                {months.map(month => (
                                    <option key={month} value={month}>{month}</option>
                                ))}
                            </select>
                            <p>월</p>
                            <select name="day" value={endDate.day} onChange={handleEndDateChange}>
                                <option value="">일</option>
                                {days.map(day => (
                                    <option key={day} value={day}>{day}</option>
                                ))}
                            </select>
                            <p>일</p>
                        </div>
                    </div>
                    <div className="admin_content_event_bannerSection">
                        <h3>배너 사진 첨부하기</h3>
                        <span>{selectedSize} 사이즈 이미지를 넣어주세요!</span>
                        <img
                            src={require('../assets/img/popup/imageUpload.png')}
                            alt="이미지 업로드 이미지"
                            onClick={() => document.getElementById('fileInput1').click()}
                        />
                        <input
                            id="fileInput1"
                            type="file"
                            accept="image/*"
                            style={{ display: 'none' }}
                            onChange={async (e) => {
                                let resizedImage;
                                if (selectedEvent === 0) {
                                    resizedImage = await imageResize1280_700(e);
                                } else if (selectedEvent === 4) {
                                    resizedImage = await imageResize1280_110(e);
                                } else {
                                    resizedImage = await imageResize1920_700(e);
                                }
                                setBannerURL(resizedImage);
                            }}
                        />
                        <div className="admin_content_event_banner_img">
                            <img src={bannerURL} style={{ width: '100%' }} />
                        </div>
                    </div>

                    <div className="admin_content_event_mainSection">
                        {selectedEvent !== 4 &&
                            <>
                                <h3>메인 사진 첨부하기</h3>
                                <img
                                    src={require('../assets/img/popup/imageUpload.png')}
                                    alt="이미지 업로드 이미지"
                                    onClick={() => document.getElementById('fileInput2').click()}
                                />
                                <input
                                    id="fileInput2"
                                    type="file"
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                    onChange={async (e) => {
                                        const resizedImage = await imageKeepOriginal(e);
                                        setMainURL(resizedImage);
                                    }}
                                />
                                <div className="admin_content_event_banner_img">
                                    <img src={mainURL} style={{ width: '100%' }} />
                                </div>
                            </>
                        }
                        <div className="admin_content_event_add_buttonSection">
                            <button
                                className="admin_content_save_button"
                                onClick={onClickAxios}
                            >
                                추가
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};














export const Admin_EventEdit = () => {
    const [carList, setCarList] = useState(null)
    const [eventStat, setEventStat] = useState(0)

    useEffect(() => {
        const fetchData = async () => {
            const response = await eventAxios(null, 0)
            setCarList(response)
        }
        fetchData()
    }, [])


    const onClickEvent = (stat) => {
        if (stat !== eventStat) {
            setEventStat(stat)
            const fetchData = async () => {
                const response = await eventAxios(null, stat)
                setCarList(response)
            }
            fetchData()
        }
    }



    if (!carList) {
        return (
            <Loading />
        )
    }
    return (
        <div className="admin_content">
            <h2>이벤트 <span>- 이벤트 관리</span></h2>
            <div className="header-row">
                {/* <input type="checkbox" /> */}
                <span className="admin_content_eventStat_buttonDiv">
                    <button className={eventStat === 0 && 'selected'} onClick={() => onClickEvent(0)}>진행중인 이벤트</button>
                    <button className={eventStat === 1 && 'selected'} onClick={() => onClickEvent(1)}>종료된 이벤트</button>
                </span>
            </div>
            <div className="admin_content_HotdealList">
                {carList.length === 0 && <NoCardList card={'이벤트가 '} />}
                {carList.map((item, idx) => (
                    <div className="admin_content_HotdealItem" key={item.id}>
                        <img
                            className="admin_content_hotdeal-image"
                            src={`${process.env.REACT_APP_IMG_URL}/${item.img}.png`}
                            alt="이벤트 이미지"
                            onError={(e) => {
                                e.target.onerror = null; // 무한 루프 방지
                                e.target.src = `${process.env.REACT_APP_IMG_URL}/error.png`;
                            }}
                        />
                        <div className="admin_content_hotdeal-info">
                            <h1>{item.title}</h1>
                            <div className='admin_content_hodeal_infosub'>
                                <p>기간</p>
                                <div className='admin_content_hodeal_line' />
                                <p>{item.start_date} ~ {item.end_date}</p>
                            </div>
                            <div className='admin_content_hodeal_infosub'>
                                <p>작성일</p>
                                <div className='admin_content_hodeal_line' />
                                <p>{item.created_at.slice(0, 10)}</p>
                            </div>
                        </div>
                        <div className="admin_content_listButtonDiv">
                            <button style={{ display: 'none' }}></button>
                            <button
                                onClick={async () => {
                                    await eventDeleteAxios(item.event_num);
                                    setCarList(carList.filter(list => list.event_num  !== item.event_num))
                                }}>
                                삭제
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
};
