import React, { useState, useEffect } from "react";
import '../styles/Admin_Content.css'
import '../styles/QuickFAQPage.css'
import { KoreaLogo, IncomeLogo } from '../components/LogoList'
import {
    optionGetAxios,
    optionAddAxios,
    imageUploadAxios,
    quickDealAxios,
    quickDealInsertAxios,
    quickDealDeleteAxios,
} from '../services/Request'
import { imageResize4_3, generateRandomString } from '../utils/imageResize'
import NoCardList from '../components/NoCardList'
import Loading from "./Loading";





export const Admin_QuickDealAdd = (props) => {
    const [categoryStat, setCategoryStat] = useState('국산');
    const [brandStat, setBrandStat] = useState(null);
    const [FAQ_carname, setFAQ_carname] = useState('');
    const [FAQ_carprice, setFAQ_carprice] = useState('');
    const [FAQ_model, setFAQ_model] = useState('');
    const [FAQ_detailmodel, setFAQ_detailmodel] = useState('');
    const [FAQ_startDate, setFAQ_StartDate] = useState({ year: "2024", month: "11" });
    const [imgURL, setImgURL] = useState(null)
    const [rentalPrice, setRentalPrice] = useState('')

    const [monthStat, setMonthStat] = useState('렌트')
    const [payment, setPayment] = useState(null)
    const [deposit, setDeposit] = useState(null)
    const [inColor, setInColor] = useState('')
    const [outColor, setOutColor] = useState('')

    const [carType, setCarType] = useState(null)

    //옵션 배열
    const [optionList, setOptionList] = useState(null)
    const [optionSelectedList, setOptionSelectedList] = useState([])
    const [searchOption, setSearchOption] = useState('');
    const [optionName, setOptionName] = useState('')
    const [optionPrice, setOptionPrice] = useState('')

    useEffect(() => {
        const fetchData = async () => {
            const response1 = await optionGetAxios()
            setOptionList(response1)
        }
        fetchData()
    }, [])


    // 검색어를 포함하는 항목 필터링 (items가 null이 아닐 때만 실행)
    const filteredOption = optionList ? optionList.filter(item =>
        item.name.toLowerCase().includes(searchOption.toLowerCase())
    ) : [];


    if (!optionList) {
        return (
            <Loading />
        )
    }
    return (
        <div className="admin_content">
            <h2>즉시 출고 <span>- 차량 추가</span></h2>
            <div className="header-row" />
            <div className="admin_content_FAQ_add">
                <div className='categoryTitleDiv'>
                    <h3 onClick={() => setCategoryStat('국산')} className={categoryStat === '국산' ? 'selected' : ''}>국산 브랜드</h3>
                    <h3 onClick={() => setCategoryStat('수입')} className={categoryStat === '수입' ? 'selected' : ''}>수입 브랜드</h3>
                </div>
                {categoryStat === '국산' ?
                    <KoreaLogo setStat={setBrandStat} brandStat={brandStat} />
                    : <IncomeLogo setStat={setBrandStat} brandStat={brandStat} />
                }
                <div style={{ position: 'relative' }}>
                    <div className='quickDealCard' style={{ border: '1px solid #dbdbdb', position: 'absolute', right: 0 }}>
                        <img
                            className='hotDealCardImg'
                            src={imgURL ? imgURL : `${process.env.REACT_APP_IMG_URL}/error.png`}
                            alt="즉시 출고 상품 이미지"
                        />
                        <span className='hotDealCardTitleDiv'>
                            <h2>{brandStat} {FAQ_carname}</h2>
                        </span>
                        <p className='quickDealCardModel' style={{ marginBottom: 20 }}>{`${FAQ_model} ${FAQ_detailmodel}`}</p>
                        <span className='quickDealCardOptionDiv'>
                            <p className='quickDealCardTitle1'>외장</p>
                            <p className='quickDealCardInfo1'>{outColor}</p>
                        </span>
                        <span className='quickDealCardOptionDiv'>
                            <p className='quickDealCardTitle1'>내장</p>
                            <p className='quickDealCardInfo1'>{inColor}</p>
                        </span>
                        <span className='quickDealCardOptionDiv'>
                            <p className='quickDealCardTitle1'>옵션</p>
                            <div className='quickDealCardInfoDiv'>
                                {optionSelectedList.length <= 2
                                    ? <>
                                        {optionSelectedList.map((item, idx) => (
                                            <p className='quickDealCardInfo2'>{item.name}{idx === 0 && optionSelectedList.length === 2 && ', '}</p>
                                        ))}
                                    </>
                                    : <>
                                        <p className='quickDealCardInfo1'>{optionSelectedList[0] && optionSelectedList[0].name}, {optionSelectedList[1] && optionSelectedList[1].name}</p>
                                        <p className='quickDealCardInfoMore'>외 {optionSelectedList.length - 2}건</p>
                                    </>
                                }
                            </div>
                        </span>
                        <div className='quickDealCardBorder' />
                        <span className='hotDealCardMonthPriceDiv'>
                            <p className='hotDealCardMonthPriceTitle'>차량가</p>
                            <p className='hotDealCardMonthPrice' style={{ marginLeft: 'auto' }}><span>{FAQ_carprice.toLocaleString()}</span> 원</p>
                        </span>
                        <span className='hotDealCardMonthPriceDiv'>
                            <p className='hotDealCardMonthPriceTitle'>{monthStat} (월)</p>
                            <p className='hotDealCardMonthPrice' style={{ marginLeft: 'auto' }}><span>{rentalPrice.toLocaleString()}</span> 원</p>
                        </span>
                        <div className='infoPaddingDiv'>
                            <span>
                                <p>{payment}</p>
                                <p>{deposit} 30%</p>
                            </span>
                        </div>
                    </div>
                </div>
                <h3>차량 이름</h3>
                <input
                    placeholder='ex) K5'
                    value={FAQ_carname}
                    onChange={(e) => setFAQ_carname(e.target.value)}
                />
                <h3>차종</h3>
                <div className="admin_content_FAQ_detailSection">
                    <div className="admin_content_FAQ_detail_Section_input">
                        <button onClick={() => setCarType('경차')} className={carType === '경차' && 'selected'}>경차</button>
                        <button onClick={() => setCarType('소형/승용')} className={carType === '소형/승용' && 'selected'}>소형/승용</button>
                        <button onClick={() => setCarType('SUV')} className={carType === 'SUV' && 'selected'}>SUV</button>
                        <button onClick={() => setCarType('스포츠카')} className={carType === '스포츠카' && 'selected'}>스포츠카</button>
                        <button onClick={() => setCarType('화물')} className={carType === '화물' && 'selected'}>화물</button>
                    </div>
                </div>
                <h3 style={{ marginTop: 150 }}>차량 사진 첨부하기</h3>
                <img
                    src={require('../assets/img/popup/imageUpload.png')}
                    alt="이미지 업로드 이미지"
                    style={{ width: '38px', height: '38px', cursor: 'pointer' }}
                    onClick={() => document.getElementById('fileInput3').click()}
                />
                <input
                    id="fileInput3"
                    type="file"
                    accept="image/*"
                    style={{ display: 'none' }}
                    onChange={async (e) => {
                        const response = await imageResize4_3(e)
                        setImgURL(response)
                    }}
                />
                <div className="admin_content_FAQ_newcar_bodySection" style={{ marginTop: 150 }}>
                    <div className="admin_content_FAQ_newcar_PriceSection">
                        <h3>차량 금액</h3>
                        <div className="admin_content_FAQ_newcar_PriceSection_input">
                            <input
                                placeholder='가격을 입력하세요.'
                                type="number"
                                value={FAQ_carprice}
                                onChange={(e) => setFAQ_carprice(e.target.value)}
                            />
                            <p>원</p>
                        </div>
                    </div>
                </div>
                <h3>이용 방법</h3>
                <div className="admin_content_FAQ_detailSection">
                    <div className="admin_content_FAQ_detail_Section_input">
                        <button onClick={() => setMonthStat('렌트')} className={monthStat === '렌트' && 'selected'}>렌트</button>
                        <button onClick={() => setMonthStat('리스')} className={monthStat === '리스' && 'selected'}>리스</button>
                    </div>
                </div>
                <div className="admin_content_FAQ_newcar_PriceSection">
                    <h3>월 {monthStat}비</h3>
                    <div className="admin_content_FAQ_newcar_PriceSection_input">
                        <input
                            placeholder='금액 입력'
                            value={rentalPrice}
                            type="number"
                            onChange={(e) => setRentalPrice(e.target.value)}
                        />
                        <p>원</p>
                    </div>
                </div>
                <h3>할부</h3>
                <div className="admin_content_FAQ_detailSection">
                    <div className="admin_content_FAQ_detail_Section_input">
                        <button onClick={() => setPayment('12개월')} className={payment === '12개월' && 'selected'}>12개월</button>
                        <button onClick={() => setPayment('24개월')} className={payment === '24개월' && 'selected'}>24개월</button>
                        <button onClick={() => setPayment('36개월')} className={payment === '36개월' && 'selected'}>36개월</button>
                        <button onClick={() => setPayment('48개월')} className={payment === '48개월' && 'selected'}>48개월</button>
                        <button onClick={() => setPayment('60개월')} className={payment === '60개월' && 'selected'}>60개월</button>
                    </div>
                </div>
                <h3>선납금/보증금</h3>
                <div className="admin_content_FAQ_detailSection">
                    <div className="admin_content_FAQ_detail_Section_input">
                        <button onClick={() => setDeposit('선납금')} className={deposit === '선납금' && 'selected'}>선납금</button>
                        <button onClick={() => setDeposit('보증금')} className={deposit === '보증금' && 'selected'}>보증금</button>
                    </div>
                </div>
                <h3>세부모델</h3>
                <div className="admin_content_FAQ_detailSection">
                    <div className="admin_content_FAQ_detail_Section_input">
                        <input
                            placeholder='ex) 2.5 가솔린 터보'
                            value={FAQ_model}
                            onChange={(e) => setFAQ_model(e.target.value)}
                        />
                        <span>-</span>
                        <input
                            placeholder='ex) 프레스티지 4인승 (A/T)'
                            value={FAQ_detailmodel}
                            onChange={(e) => setFAQ_detailmodel(e.target.value)}
                        />
                    </div>
                </div>
                <div className="admin_content_FAQ_newcar_bodySection">
                    <div className="admin_content_FAQ_newcar_PriceSection">
                        <h3>외장 색상</h3>
                        <div className="admin_content_FAQ_newcar_PriceSection_input">
                            <input
                                placeholder='외장 색상 입력'
                                value={outColor}
                                onChange={(e) => setOutColor(e.target.value)}
                            />
                        </div>
                    </div>
                    <div className="admin_content_FAQ_newcar_DateSection">
                        <h3>내장 색상</h3>
                        <div className="admin_content_FAQ_newcar_PriceSection_input">
                            <input
                                placeholder='내장 색상 입력'
                                value={inColor}
                                onChange={(e) => setInColor(e.target.value)}
                            />
                        </div>
                    </div>
                </div>
                <div className="admin_content_FAQ_ColorAddDiv">
                    <h3>옵션</h3>
                    <span>
                        <div>
                            <input
                                placeholder='옵션을 검색해주세요'
                                value={searchOption}
                                onChange={(e) => setSearchOption(e.target.value)}
                            />
                            <div className='admin_content_colorCard title'>
                                <p style={{ width: 50 }}>옵션명</p>
                                <p>금액</p>
                            </div>
                            <span></span>
                            <div className='admin_content_colorCardList'>
                                {filteredOption.length === 0 && <NoCardList card={'옵션이'} />}
                                {filteredOption.map((item, idx) => (
                                    <div className='admin_content_colorCard'>
                                        <p>{item.name}</p>
                                        <p>{parseInt(item.price / 10000).toLocaleString()} 만원</p>
                                        <button
                                            onClick={async () => {
                                                setOptionSelectedList([...optionSelectedList, { name: item.name, price: item.price, img: item.img }])
                                                setOptionList(optionList.filter((_, index) => index !== idx))
                                            }}
                                            style={{ color: 'blue' }}
                                        >
                                            추가
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <div>
                                <input
                                    placeholder='옵션명을 입력해주세요'
                                    value={optionName}
                                    onChange={(e) => setOptionName(e.target.value)}
                                />
                                <input
                                    placeholder='만원 단위로 0 모두 입력'
                                    value={optionPrice}
                                    type="number"
                                    onChange={(e) => setOptionPrice(e.target.value)}
                                />
                                <button
                                    onClick={async () => {
                                        if (optionName !== '' && optionPrice !== '') {
                                            await optionAddAxios({
                                                name: optionName,
                                                price: optionPrice,
                                                img: null,
                                            })
                                            //await imageUploadAxios(optionImg, `option_${random}`)
                                            setOptionSelectedList([...optionSelectedList, { name: optionName, price: optionPrice }]);
                                            setOptionName(''); // 입력 필드 초기화
                                            setOptionPrice(''); // 입력 필드 초기화
                                        }
                                    }}
                                >
                                    추가
                                </button>
                            </div>
                            <div className='admin_content_colorCard title'>
                                <p style={{ width: 50 }}>옵션명</p>
                                <p>금액</p>
                            </div>
                            <span></span>
                            <div className='admin_content_colorCardList'>
                                {optionSelectedList.length === 0 && <NoCardList card={'선택 된 옵션이'} />}
                                {optionSelectedList.map((item, idx) => (
                                    <div className='admin_content_colorCard'>
                                        <p>{item.name}</p>
                                        <p>{parseInt(item.price / 10000).toLocaleString()} 만원</p>
                                        <button
                                            onClick={async () => {
                                                setOptionList([...optionList, { name: item.name, price: item.price, img: item.img }])
                                                setOptionSelectedList(optionSelectedList.filter((_, index) => index !== idx))
                                            }}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </span>
                </div>
                <div className="admin_content_FAQ_alladd_buttonSection">
                    <button
                        className="admin_content_FAQ_alladd_addbutton"
                        onClick={async () => {
                            if (FAQ_carname !== '' && FAQ_carprice !== ''
                                && FAQ_startDate.year !== "" && FAQ_startDate.month !== ""
                                && imgURL && rentalPrice !== '' && carType
                                && FAQ_model !== '' && FAQ_detailmodel !== ''
                                && inColor !== '' && outColor !== ''
                                && payment && deposit
                            ) {
                                const random = generateRandomString(20)
                                await quickDealInsertAxios({
                                    entry: categoryStat,                  //국내
                                    enter: brandStat,                     //기아
                                    car_name: FAQ_carname,                //K5
                                    img: `car_${random}`,                 //car_gjanjrbnnbbb23
                                    category: carType,
                                    price: FAQ_carprice,                  //23000000
                                    info: `${FAQ_model} ${FAQ_detailmodel}`,
                                    month_price: rentalPrice,             //월 리스/렌트 비용
                                    year: FAQ_startDate.year,             //
                                    month: FAQ_startDate.month,           //
                                    option: optionSelectedList,           //
                                    payment: payment,                     //할부 개월
                                    deposit: deposit,                     //선납금/보증금
                                    month_use: monthStat,                 //렌트/리스
                                    in_color: inColor,
                                    out_color: outColor,
                                })
                                await imageUploadAxios(imgURL, `car_${random}`)
                                const response = await optionGetAxios()
                                setOptionList(response)
                                setCategoryStat('국산');
                                setBrandStat(null);
                                setFAQ_carname('');
                                setFAQ_carprice('');
                                setFAQ_model('');
                                setFAQ_detailmodel('');
                                setImgURL(null)
                                setRentalPrice('')
                                setMonthStat('렌트')
                                setPayment(null)
                                setDeposit(null)
                                setInColor('')
                                setOutColor('')
                                setCarType(null)
                                setOptionSelectedList([])
                                setSearchOption('');
                                setOptionName('')
                                setOptionPrice('')
                                alert('즉시 출고 차량이 추가되었습니다.')
                            } else {
                                alert('내용이 입력되지 않았습니다')
                            }
                        }}
                    >
                        추가
                    </button>
                </div>
            </div>
        </div>
    )
}




export const Admin_QuickDealEdit = (props) => {
    const [carList, setCarList] = useState(null)
    const [filteredList, setFilteredList] = useState(null)
    const [searchValue, setSearchValue] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await quickDealAxios(null, null, null)
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
            <h2>즉시 출고 <span>- 차량 관리</span></h2>
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
                        </div>
                        <div style={{ marginLeft: 30 }}>
                            <p>내장 색상: {item.in_color}</p>
                            <p>외장 색상: {item.out_color}</p>
                        </div>
                        <div style={{ marginLeft: 30 }}>
                            <p>세부모델: {item.info}</p>
                        </div>
                        <div style={{ marginLeft: 30 }}>
                            {item.option.map((item, idx) => (
                                <p>{item.name}</p>
                            ))}
                        </div>
                        <button
                            className="admin_content_carListDeleteButton"
                            onClick={async () => {
                                setCarList(carList.filter((_, index) => index !== idx))
                                await quickDealDeleteAxios(item.seq)
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