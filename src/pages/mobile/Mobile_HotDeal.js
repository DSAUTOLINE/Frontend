import React, { useState, useEffect } from "react";
import '../../styles/mobile/Mobile_HotDeal.css'
import Mobile_GNB from "../../components/mobile/Mobile_GNB";
import Mobile_Footer from "../../components/mobile/Mobile_Footer";
import { hotDealAxios, eventAxios } from '../../services/Request'
import { Mobile_HotDealPageCard } from "../../components/mobile/Mobile_Card";
import NoCardList from '../../components/NoCardList'
import Loading from "../../components/Loading";



const Mobile_HotDeal = (props) => {
    const [hotDealList, setHotDealList] = useState(null)
    const [banner, setBanner] = useState(null)

    // 우선 순위를 정의
    const categoryOrder = ['경차', '소형/승용', 'SUV', '스포츠카', '화물'];

    useEffect(() => {
        const fetchData = async () => {
            const tmp1 = await hotDealAxios()
            setHotDealList(tmp1.sort((a, b) => {
                // 먼저 category를 기준으로 정렬
                const categoryComparison = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
                
                // category가 같으면 name을 기준으로 오름차순 정렬
                if (categoryComparison === 0) {
                    return a.name.localeCompare(b.name);  // 이름 오름차순 정렬
                }
            
                // category가 다르면 category 기준으로 정렬
                return categoryComparison;
            }));
            const tmp2 = await eventAxios(2, 0)
            setBanner(tmp2)
        }
        fetchData()
    }, [])


    if (!hotDealList || !banner) {
        return (
            <Loading />
        )
    }
    return (
        <div className="mobile_container">
            <Mobile_GNB page={'한정 특가'} />
            <section className="mobile_hotDeal_eventBannerSection">
                <img src={`${process.env.REACT_APP_IMG_URL}/${banner[0].img}.png`} alt='이벤트 베너'  onClick={() => window.location.href=`/event/${banner[0].event_num}`}/>
            </section>
            <section className="mobile_hotDeal_hotDealListSection">
                <h3>한정 특가</h3>
                <p>특별 할인이 들어간 차량 가격을 확인하세요.</p>
                <span>
                    {hotDealList.length === 0 && <NoCardList card={'차량이'} />}
                    {hotDealList.map((item, _) => (
                        <Mobile_HotDealPageCard item={item} />
                    ))}
                </span>
            </section>
            <Mobile_Footer />
        </div>
    )
}

export default Mobile_HotDeal