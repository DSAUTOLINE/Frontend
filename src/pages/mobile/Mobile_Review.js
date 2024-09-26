import React, { useState, useEffect } from "react";
import '../../styles/mobile/Mobile_Review.css'
import Mobile_GNB from "../../components/mobile/Mobile_GNB";
import Mobile_Footer from "../../components/mobile/Mobile_Footer";
import { reviewAxios } from '../../services/Request';
import { Mobile_ReviewPageCard } from '../../components/mobile/Mobile_Card'
import NoCardList from '../../components/NoCardList'
import Loading from "../../components/Loading";



const Mobile_Review = (props) => {
    const [reviewList, setReviewList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await reviewAxios(0)
            setReviewList(response)
        }
        fetchData()
    }, [])


    if (!reviewList) {
        return (
            <Loading />
        )
    }
    return (
        <div className="mobile_container">
            <Mobile_GNB page={'고객 리뷰'} />
            <section className="mobile_review_contentSection">
                <h3>고객 리뷰</h3>
                <p>다른 고객님들이 어떻게 느끼셨는지 확인해보세요.</p>
                <button onClick={() => window.location.href='/ReviewAdd'}>리뷰 작성하기</button>
                <span>
                    {reviewList.length === 0 && <NoCardList card={'리뷰가'}/>}
                    {reviewList.map((item, _) => (
                        <Mobile_ReviewPageCard item={item}/>
                    ))}
                </span>
            </section>
            <Mobile_Footer />
        </div>
    )
}

export default Mobile_Review