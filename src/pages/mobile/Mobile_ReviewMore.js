import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../../styles/mobile/Mobile_Review.css'
import Mobile_GNB from "../../components/mobile/Mobile_GNB";
import Mobile_Footer from "../../components/mobile/Mobile_Footer";
import { StarIcon } from "../../components/Icons";
import { reviewInfoAxios } from "../../services/Request";
import { Mobile_ReviewCard } from "../../components/mobile/Mobile_Card";
import NoCardList from '../../components/NoCardList'
import Loading from "../../components/Loading";



const Mobile_ReviewMore = (props) => {
    const { id } = useParams();
    const [reviewInfo, setReviewInfo] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await reviewInfoAxios(id)
            setReviewInfo(response)
        }
        fetchData()
    }, [])


    if (!reviewInfo) {
        return (
            <Loading />
        )
    }
    return (
        <div className="mobile_container">
            <Mobile_GNB page={'고객 리뷰'} />
            <section className="mobile_reviewMore_contentSection">
                <h3>고객 리뷰</h3>
                <p>다른 고객님들이 어떻게 느끼셨는지 확인해보세요.</p>
                <img
                    src={`${process.env.REACT_APP_IMG_URL}/${reviewInfo.img}.png`}
                    alt="리뷰 이미지"
                    onError={(e) => {
                        e.target.onerror = null; // 무한 루프 방지
                        e.target.src = `${process.env.REACT_APP_IMG_URL}/error.png`;
                    }}
                />
                <h4>{reviewInfo.enter} {reviewInfo.car_name}</h4>
                <p>{reviewInfo.comment}</p>
                <span></span>
                <span>
                    <h3>{reviewInfo.name[0]}*{reviewInfo.name[2]} 님</h3>
                    <p>{reviewInfo.created_at.slice(0, 10)}</p>
                </span>
                <span>
                    <h4>평점</h4>
                    <span>
                        {Array.from({ length: reviewInfo.star }, (_, index) => (
                            <StarIcon size={25} color={'#FBDA03'} />
                        ))}
                    </span>
                </span>
            </section>
            <section className="mobile_reviewMore_listSection">
                <h3>관련 리뷰</h3>
                <span>
                    {reviewInfo.order.length === 0 && <NoCardList card={'리뷰가'} />}
                    {reviewInfo.order.map((item, idx) => (
                        <Mobile_ReviewCard item={item} />
                    ))}
                </span>
                <button onClick={() => window.location.href='/Review'}>목록으로</button>
            </section>
            <Mobile_Footer />
        </div>
    )
}

export default Mobile_ReviewMore