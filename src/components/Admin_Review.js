import React, { useState, useEffect } from "react";
import '../styles/Admin_Content.css'
import { reviewAxios, reviewChangeAxios, reviewDeleteAxios } from '../services/Request'
import NoCardList from '../components/NoCardList'
import Loading from "../components/Loading";






const Admin_Review = (props) => {
    const [carList, setCarList] = useState(null)
    const [reviewStat, setReviewStat] = useState(0)


    useEffect(() => {
        const fetchData = async () => {
            const response = await reviewAxios(0)
            setCarList(response)
        }
        fetchData()
    }, [])


    const onClickEvent = async (stat) => {
        const response = await reviewAxios(stat)
        setCarList(response)
        setReviewStat(stat)
    }



    if (!carList) {
        return (
            <Loading />
        )
    }
    return (
        <div className="admin_content">
            <h2>리뷰 <span>- 총 {carList.length}개</span></h2>
            <div className="header-row">
                {/* <input type="checkbox" /> */}
                <span className="admin_content_eventStat_buttonDiv">
                    <button className={reviewStat === 0 && 'selected'} onClick={() => onClickEvent(0)}>승인 리뷰</button>
                    <button className={reviewStat === 1 && 'selected'} onClick={() => onClickEvent(1)}>미승인 리뷰</button>
                </span>
            </div>
            <div className="admin_content_HotdealList">
                {carList.length === 0 && <NoCardList card={'리뷰가'} />}
                {carList.map((item, idx) => (
                    <div className="admin_content_HotdealItem" key={item.id}>
                        <img
                            className="admin_content_hotdeal-image"
                            src={`${process.env.REACT_APP_IMG_URL}/${item.img}.png`}
                            alt="리뷰 이미지"
                            onError={(e) => {
                                e.target.onerror = null; // 무한 루프 방지
                                e.target.src = `${process.env.REACT_APP_IMG_URL}/error.png`;
                            }}
                        />
                        <div className="admin_content_hotdeal-info">
                            <h1>{item.name}</h1>
                            <div className='admin_content_hodeal_infosub'>
                                <p>{item.enter} {item.car_name}</p>
                                <div className='admin_content_hodeal_line' />
                                <p>별점: {item.star}/5</p>
                            </div>
                            <div className='admin_content_hodeal_infosub'>
                                <p>작성일</p>
                                <div className='admin_content_hodeal_line' />
                                <p>{item.created_at.slice(0, 10)}</p>
                            </div>
                        </div>
                        <div className="admin_content_reviewListComment">
                            <p>{item.comment}</p>
                        </div>
                        <div className="admin_content_listButtonDiv">
                            {reviewStat === 0
                                ? <button onClick={async () => {
                                    await reviewChangeAxios({
                                        seq: item.seq,
                                        allow: item.allow,
                                    });
                                    setCarList(carList.filter(list => list.seq !== item.seq))
                                }}>
                                    미승인
                                </button>
                                : <button onClick={async () => {
                                    await reviewChangeAxios({
                                        seq: item.seq,
                                        allow: item.allow,
                                    });
                                    setCarList(carList.filter(list => list.seq !== item.seq))
                                }}>
                                    승인
                                </button>
                            }
                            <button onClick={async () => {
                                await reviewDeleteAxios(item.seq);
                                setCarList(carList.filter(list => list.seq !== item.seq))
                            }}>
                                삭제
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}



export default Admin_Review