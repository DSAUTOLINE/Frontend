import React, { useEffect, useState } from 'react'
import '../styles/QuickFAQPage.css'
import GNB from '../components/GNB'
import Footer from '../components/Footer'
import { KoreaLogo, IncomeLogo } from '../components/LogoList'
import { QuickCarCard } from '../components/Cards'
import FastFAQSticky from '../components/FastFAQSticky'
import { quickFAQAxios, eventAxios } from '../services/Request'
import NoCardList from '../components/NoCardList'
import Loading from '../components/Loading'


const QuickFAQPage = (props) => {
    const [carStat, setCarStat] = useState(null)
    const [categoryStat, setCategoryStat] = useState('국산')
    const [brandStat, setBrandStat] = useState('기아')
    const [listStat, setListStat] = useState('전체')
    const [quickFAQList, setQuickFAQList] = useState(null)
    const [banner, setBanner] = useState(null)

    // 우선 순위를 정의
    const categoryOrder = ['경차', '소형/승용', 'SUV', '스포츠카', '화물'];

    const fetchData = async (entry, enter, category) => {
        const response1 = await quickFAQAxios(entry, enter, category)
        setQuickFAQList(response1.sort((a, b) => {
            // 먼저 category를 기준으로 정렬
            const categoryComparison = categoryOrder.indexOf(a.category) - categoryOrder.indexOf(b.category);
            
            // category가 같으면 name을 기준으로 오름차순 정렬
            if (categoryComparison === 0) {
                return a.name.localeCompare(b.name);  // 이름 오름차순 정렬
            }
        
            // category가 다르면 category 기준으로 정렬
            return categoryComparison;
        }));
        const response2 = await eventAxios(1, 0)
        setBanner(response2)
    }

    useEffect(() => {
        fetchData('국산', '기아', '전체')
    }, [])

    useEffect(() => {
        fetchData(categoryStat, brandStat, listStat)
    }, [categoryStat, brandStat, listStat])

    useEffect(() => {
        if (carStat !== null) {
            // 스크롤을 최하단으로 이동
            window.scrollTo({
                top: document.documentElement.scrollHeight,
                behavior: 'smooth' // 부드럽게 스크롤
            });
        }
    }, [carStat]); // carStat이 변경될 때마다 실행


    if (!quickFAQList || !banner) {
        return (
            <Loading />
        )
    }
    return (
        <>
            <GNB stat={true} page={'빠른 간편 문의'} />
            {banner[0] &&
                <div className='bannerSection'>
                    <img src={`${process.env.REACT_APP_IMG_URL}/${banner[0].img}.png`} alt='이벤트 베너' onClick={() => window.location.href=`/event/${banner[0].event_num}`}/>
                </div>
            }
            <FastFAQSticky height={1150} />
            <div className='categorySection'>
                <h1>빠른 <span>간편 문의</span></h1>
                <p>쉽고 간편하게 문의 해보세요</p>
                <div className='categoryTitleDiv'>
                    <h3 onClick={() => { setCategoryStat('국산'); setBrandStat('기아'); }} className={categoryStat === '국산' ? 'selected' : ''}>국산 브랜드</h3>
                    <h3 onClick={() => { setCategoryStat('수입'); setBrandStat('BMW'); }} className={categoryStat === '수입' ? 'selected' : ''}>수입 브랜드</h3>
                </div>
                {categoryStat === '국산' ?
                    <KoreaLogo setStat={setBrandStat} brandStat={brandStat} />
                    : <IncomeLogo setStat={setBrandStat} brandStat={brandStat} />
                }
            </div>
            <div className='quickCarListSection'>
                <h2>차량 리스트</h2>
                <div className='quickCarListSelectDiv'>
                    <p onClick={() => { setListStat('전체'); fetchData(categoryStat, brandStat, '전체') }} className={listStat === '전체' ? 'selected' : ''}>전체</p>
                    <p onClick={() => { setListStat('경차'); fetchData(categoryStat, brandStat, '경차') }} className={listStat === '경차' ? 'selected' : ''}>경차</p>
                    <p onClick={() => { setListStat('소형/승용'); fetchData(categoryStat, brandStat, '소형/승용') }} className={listStat === '소형/승용' ? 'selected' : ''}>소형/승용</p>
                    <p onClick={() => { setListStat('SUV'); fetchData(categoryStat, brandStat, 'SUV') }} className={listStat === 'SUV' ? 'selected' : ''}>SUV</p>
                    <p onClick={() => { setListStat('스포츠카'); fetchData(categoryStat, brandStat, '스포츠카') }} className={listStat === '스포츠카' ? 'selected' : ''}>스포츠카</p>
                    <p onClick={() => { setListStat('화물'); fetchData(categoryStat, brandStat, '화물') }} className={listStat === '화물' ? 'selected' : ''}>화물</p>
                </div>
                <div className='quickCarCardListDiv'>
                    {quickFAQList.length === 0 && <NoCardList card={'차량이'} />}
                    {quickFAQList.map((item, index) => (
                        <QuickCarCard
                            item={item}
                            index={item.car_code}
                            carStat={carStat}
                            setCarStat={setCarStat}
                        />
                    ))}

                </div>
            </div>
            <div className='btnSection'>
                {
                    carStat === null
                        ? <span className='nonNextBtn'>다음으로</span>
                        : <a className='nextBtn' href={`/Option/${carStat}`}>다음으로</a>
                }

            </div>

            <Footer />
        </>
    )
}


export default QuickFAQPage