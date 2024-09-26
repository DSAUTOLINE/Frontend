import React, { useState, useEffect } from "react";
import '../../styles/mobile/Mobile_QuickFAQ.css'
import '../../styles/mobile/Mobile_QuickDeal.css'
import Mobile_GNB from "../../components/mobile/Mobile_GNB";
import Mobile_Footer from "../../components/mobile/Mobile_Footer";
import { Mobile_QuickDealPageCard } from "../../components/mobile/Mobile_Card";
import { Mobile_LogoList } from "../../components/mobile/Mobile_LogoList";
import { quickDealAxios, eventAxios } from '../../services/Request'
import NoCardList from '../../components/NoCardList'
import Loading from "../../components/Loading";



const Mobile_QuickDeal = (props) => {
    const [categoryStat, setCategoryStat] = useState('국산')
    const [brandStat, setBrandStat] = useState('all')
    const [listStat, setListStat] = useState('전체')
    const [quickDealList, setQuickDealList] = useState(null)
    const [banner, setBanner] = useState(null)

    //팝업 State
    const [popupStat, setPopupStat] = useState(null)

    // 우선 순위를 정의
    const categoryOrder = ['경차', '소형/승용', 'SUV', '스포츠카', '화물'];


    const fetchData = async (entry, enter, category) => {
        const response1 = await quickDealAxios(entry, enter, category)
        setQuickDealList(response1.sort((a, b) => {
            // 먼저 category를 기준으로 정렬
            const categoryComparison = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
            
            // category가 같으면 name을 기준으로 오름차순 정렬
            if (categoryComparison === 0) {
                return a.name.localeCompare(b.name);  // 이름 오름차순 정렬
            }
        
            // category가 다르면 category 기준으로 정렬
            return categoryComparison;
        }));
        const response2 = await eventAxios(3, 0)
        setBanner(response2)
    }

    useEffect(() => {
        fetchData('국산', '기아', '전체')
    }, [])

    useEffect(() => {
        fetchData(categoryStat, brandStat, listStat)
    }, [categoryStat, brandStat, listStat])


    if (!quickDealList || !banner) {
        return (
            <Loading />
        )
    }
    return (
        <div className="mobile_container">
            <Mobile_GNB page={'즉시 출고'} />
            <section className="mobile_hotDeal_eventBannerSection">
                <img src={`${process.env.REACT_APP_IMG_URL}/${banner[0].img}.png`} alt='이벤트 베너'  onClick={() => window.location.href=`/event/${banner[0].event_num}`}/>
            </section>
            <section className="mobile_hotDeal_hotDealListSection">
                <h3>즉시 출고</h3>
                <p>바로 출고 될 수 있는 차량을 확인하세요.</p>
                <Mobile_LogoList categoryStat={categoryStat} setCategoryStat={setCategoryStat} brandStat={brandStat} setBrandStat={setBrandStat} all={true}/>
                <h4>차량 리스트</h4>
                <span>
                    {quickDealList.length === 0 && <NoCardList card={'차량이'}/>}
                    {quickDealList.map((item, _) => (
                        <Mobile_QuickDealPageCard item={item} setPopup={setPopupStat}/>
                    ))}
                </span>
            </section>
            <Mobile_Footer />
        </div>
    )
}

export default Mobile_QuickDeal