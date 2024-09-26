import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../../styles/mobile/Mobile_Option.css'
import Mobile_GNB from "../../components/mobile/Mobile_GNB";
import Mobile_Footer from "../../components/mobile/Mobile_Footer";
import { estimatedAxios, estimatedAddAxios } from '../../services/Request'
import { Mobile_TermsofInformationPopup, Mobile_OptionInfoPopup } from '../../components/mobile/Mobile_Popup'
import NoCardList from '../../components/NoCardList'
import Loading from "../../components/Loading";



const Mobile_Option = (props) => {
    const { id } = useParams();
    const [content, setContent] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await estimatedAxios(id)
            setContent(response)
        }
        fetchData()
    }, [id])


    const [infoSelect1, setInfoSelect1] = useState(false)
    const [infoSelect2, setInfoSelect2] = useState(false)
    const [colorStat, setColorStat] = useState([])
    const [oilStat, setOilStat] = useState(null)

    //세부모델 선택
    const [trimStat, setTrimStat] = useState(null)
    const [trimSelect1, setTrimSelect1] = useState(null)
    const [trimSelect2, setTrimSelect2] = useState(null)
    const [trimPrice, setTrimPrice] = useState(0);

    //옵션
    const [options, setOptions] = useState([])
    const [optionPrice, setOptionPrice] = useState(0)
    const [optionStat, setOptionStat] = useState([])

    //이용방법
    const [useingSelect1, setUseingSelect1] = useState(null)
    const [useingSelect2, setUseingSelect2] = useState(null)
    const [useingSelect3, setUseingSelect3] = useState(null)
    const [useingSelect4, setUseingSelect4] = useState(0)
    const [useingSelect5, setUseingSelect5] = useState(null)
    const [useingSelect6, setUseingSelect6] = useState(null)
    const [useingSelect7, setUseingSelect7] = useState(null)
    const [useingSelect8, setUseingSelect8] = useState('')
    const [useingSelect9, setUseingSelect9] = useState('')

    const [isUsePopupVisible, setIsUsePopupVisible] = useState(false);
    const [isUsePopupVisible2, setIsUsePopupVisible2] = useState(false);

    const handleUseingSelect3 = (value) => {
        const sum = parsePercentage(value) + parsePercentage(!useingSelect5 ? 0 : useingSelect5);
        if (sum > 40) {
            alert('보증금과 선납금의 합은 40%를 넘을 수 없습니다.');
        } else {
            setUseingSelect3(value);
        }
    };

    const handleUseingSelect5 = (value) => {
        const sum = parsePercentage(value) + parsePercentage(!useingSelect3 ? 0 : useingSelect3);
        if (sum > 40) {
            alert('보증금과 선납금의 합은 40%를 넘을 수 없습니다.');
        } else {
            setUseingSelect5(value);
        }
    };

    const parsePercentage = (value) => {
        return (value === '없음' || !value) ? 0 : parseInt(value.replace('%', ''), 10);
    };

    useEffect(() => {
        if (content) {
            const oil = [
                content.lpg === 1 && 'LPG',
                content.gasoline === 1 && '가솔린',
                content.diesel === 1 && '디젤',
                content.hybrid === 1 && '하이브리드',
                content.electric === 1 && '전기',
                content.h2 === 1 && '수소',
            ].filter(Boolean).join(', ');
            setOilStat(oil)
        }
    }, [content])


    const clickFunction = async () => {
        if (infoSelect1 && infoSelect2 && id && content) {
            await estimatedAddAxios({
                car_code: id,
                car_name: content.name,
                enter: content.enter,
                in_color: content.in_color,
                out_color: content.out_color,
                trim1: trimSelect1,
                trim2: trimSelect2,
                options: options.map(option => option.name),
                method: useingSelect1,
                period: useingSelect2,
                deposit: useingSelect3,
                deposit_price: useingSelect4,
                payment_price: useingSelect5,
                age: useingSelect6,
                annual_mileage: useingSelect7,
                name: useingSelect8,
                phone: useingSelect9,
                price: trimPrice + optionPrice,
                type: "빠른 간편 문의/ 한정 특가"
            })
            alert('견적서 신청이 완료되었습니다')
            window.location.href='/'
        } else {
            alert('내용이 입력되지 않았습니다')
        }
    }


    if (!content || !content.trim || !content.color) {
        return (
            <Loading />
        )
    }
    return (
        <div className="mobile_container">
            {isUsePopupVisible && <Mobile_TermsofInformationPopup setPopup={setIsUsePopupVisible}/>}
            {isUsePopupVisible2 && 
                <Mobile_OptionInfoPopup 
                    setPopup={setIsUsePopupVisible2} 
                    trimPrice={trimPrice}
                    trimSelect1={trimSelect1}
                    trimSelect2={trimSelect2}
                    optionPrice={optionPrice}
                    options={options}
                    totalPrice={trimPrice + optionPrice}
                />
            }
            <Mobile_GNB page={'빠른 간편 문의'} />
            <section className="mobile_option_InfoSection">
                <h2>옵션 및 이용조건</h2>
                <span className="carTitle" style={{ alignItems: 'center' }}>
                    <img
                        src={`${process.env.REACT_APP_IMG_URL}/${content.logo_img}.png`}
                        alt="차량 브랜드 로고"
                        onError={(e) => {
                            e.target.onerror = null; // 무한 루프 방지
                            e.target.src = `${process.env.REACT_APP_IMG_URL}/error.png`;
                        }}
                    />
                    <h3>{content.enter} {content.name}</h3>
                </span>
                <p>{content.year}.{content.month} │ {content.category} │ {oilStat}</p>
                <p>{content.electric === 1 ? `총주행거리 ${content.max_cc.toLocaleString()} Km` : `${content.min_cc.toLocaleString()}~${content.max_cc.toLocaleString()}CC`} │ 복합 {content.electric === 1 ? `전비 ${content.max_fuel_efficiency} Km/kWh` : `연비 ${content.min_fuel_efficiency}~${content.max_fuel_efficiency} Km/L`}</p>
                <img
                    src={`${process.env.REACT_APP_IMG_URL}/${content.img}.png`}
                    alt="차량 이미지"
                    onError={(e) => {
                        e.target.onerror = null; // 무한 루프 방지
                        e.target.src = `${process.env.REACT_APP_IMG_URL}/error.png`;
                    }}
                />
            </section>
            <section className="mobile_option_colorSection">
                <span>
                    <h3>외장 색상</h3>
                    <p>{colorStat.name}</p>
                </span>
                <span>
                    {content.color.map((item, _) => (
                        colorStat !== item
                            ? <span style={{ backgroundColor: item.rgb }} onClick={() => setColorStat(item)} />
                            : <span className='mobile_option_colorBtn selected' style={{ backgroundColor: item.rgb }}>
                                <img src={require('../../assets/img/functionIcon/optionClick.png')} alt="색상 선택 됨" />
                            </span>
                    ))}
                </span>
                <p>! 일부 외장색상의 경우 별도의 요금이 발생되오니 문의 바랍니다</p>
            </section>
            <section className="mobile_option_trimSection">
                <h3>세부 모델 선택</h3>
                <button onClick={() => setTrimStat(0)} className={trimStat === 0 && 'selected'}>세부모델</button>
                <button onClick={() => setTrimStat(1)} className={trimStat === 1 && 'selected'}>세부트림</button>
                <span style={{ display: trimStat === 0 ? 'block' : 'none' }}>
                    {Array.from(new Set(content.trim.map(item => item.trim1.trim()))).map((item, _) => (
                        <span onClick={() => { setTrimSelect1(item); setTrimStat(1); setOptions([]); }} className={trimSelect1 === item ? 'selected' : ''}>
                            {trimSelect1 === item
                                ? <img src={require('../../assets/img/functionIcon/optionClick.png')} />
                                : <img src={require('../../assets/img/functionIcon/optionNonClick.png')} />
                            }
                            <p>{item}</p>
                        </span>
                    ))}
                </span>
                <span style={{ display: trimSelect1 && trimStat === 1 ? 'block' : 'none' }}>
                    {content.trim.filter((item) => item.trim1.trim() === trimSelect1).map((item, _) => (
                        <span
                            onClick={() => {
                                setTrimSelect2(item.trim2);
                                setTrimPrice(item.price);
                                setTrimStat(null)
                                setOptions([]);
                                setOptionStat((content.trim.filter(list => list.trim1.trim() === trimSelect1 && list.trim2.trim() === item.trim2))[0].option)
                            }}
                            className={trimSelect2 === item.trim2 ? 'selected' : ''}>
                            {trimSelect2 === item.trim2
                                ? <img src={require('../../assets/img/functionIcon/optionClick.png')} />
                                : <img src={require('../../assets/img/functionIcon/optionNonClick.png')} />
                            }
                            <p>{item.trim2} - {(item.price / 10000).toLocaleString()}만원</p>
                        </span>
                    ))}
                </span>
            </section>
            <section className="mobile_option_optionSection">
                <h3>옵션 추가하기</h3>
                {optionStat.length === 0 && <NoCardList card={'옵션이'} />}
                {trimSelect1 !== null && trimSelect2 !== null
                    ? <span className="mobile_option_optionSelectDiv">
                        {optionStat.map((item, _) => (
                            <div
                                className={options.find(option => option.name === item.name) && "selected"}
                                onClick={() => {
                                    if (options.find(option => option.name === item.name)) {
                                        // item이 options에 이미 존재하는 경우
                                        setOptions(options.filter(option => option.name !== item.name));
                                        setOptionPrice(optionPrice - item.price);
                                    } else {
                                        // item이 options에 존재하지 않는 경우
                                        setOptions([...options, item]);
                                        setOptionPrice(optionPrice + item.price);
                                    }
                                }}
                            >
                                <p>{item.name}</p>
                                <h4>{(item.price / 10000).toLocaleString()}만원</h4>
                                {options.find(option => option.name === item.name) &&
                                    <img src={require('../../assets/img/functionIcon/optionClick.png')} style={{ width: 25, position: 'absolute', right: 15 }} />
                                }
                            </div>
                        ))}
                    </span> : null
                }
            </section>
            <section className="mobile_option_selectedSection">
                <h3>이용조건 선택</h3>
                <h4>이용방법</h4>
                <span>
                    <p className={useingSelect1 === '장기 렌트' ? 'selected' : ''} onClick={() => setUseingSelect1('장기 렌트')}>장기 렌트</p>
                    <p className={useingSelect1 === '리스' ? 'selected' : ''} onClick={() => setUseingSelect1('리스')}>리스</p>
                </span>
                <h4>이용기간</h4>
                <span>
                    <p className={useingSelect2 === '12개월' ? 'selected' : ''} onClick={() => setUseingSelect2('12개월')}>12개월</p>
                    <p className={useingSelect2 === '24개월' ? 'selected' : ''} onClick={() => setUseingSelect2('24개월')}>24개월</p>
                    <p className={useingSelect2 === '36개월' ? 'selected' : ''} onClick={() => setUseingSelect2('36개월')}>36개월</p>
                    <p className={useingSelect2 === '48개월' ? 'selected' : ''} onClick={() => setUseingSelect2('48개월')}>48개월</p>
                    <p className={useingSelect2 === '60개월' ? 'selected' : ''} onClick={() => setUseingSelect2('60개월')}>60개월</p>
                </span>
                <h4>보증금</h4>
                <span>
                    <p className={useingSelect3 === '없음' ? 'selected' : ''} onClick={() => handleUseingSelect3('없음')}>없음</p>
                    <p className={useingSelect3 === '10%' ? 'selected' : ''} onClick={() => handleUseingSelect3('10%')}>10%</p>
                    <p className={useingSelect3 === '20%' ? 'selected' : ''} onClick={() => handleUseingSelect3('20%')}>20%</p>
                    <p className={useingSelect3 === '30%' ? 'selected' : ''} onClick={() => handleUseingSelect3('30%')}>30%</p>
                    <p className={useingSelect3 === '40%' ? 'selected' : ''} onClick={() => handleUseingSelect3('40%')}>40%</p>
                </span>
                <h4>보증금(원)</h4>
                <span>
                    <input placeholder="0" type="number" value={useingSelect4} onChange={event => setUseingSelect4(event.target.value)} />
                </span>
                <h4>선납금</h4>
                <span>
                    <p className={useingSelect5 === '없음' ? 'selected' : ''} onClick={() => handleUseingSelect5('없음')}>없음</p>
                    <p className={useingSelect5 === '10%' ? 'selected' : ''} onClick={() => handleUseingSelect5('10%')}>10%</p>
                    <p className={useingSelect5 === '20%' ? 'selected' : ''} onClick={() => handleUseingSelect5('20%')}>20%</p>
                    <p className={useingSelect5 === '30%' ? 'selected' : ''} onClick={() => handleUseingSelect5('30%')}>30%</p>
                    <p className={useingSelect5 === '40%' ? 'selected' : ''} onClick={() => handleUseingSelect5('40%')}>40%</p>
                </span>
                <h4>보험연령</h4>
                <span>
                    <p className={useingSelect6 === '만 21세 이상' ? 'selected' : ''} onClick={() => setUseingSelect6('만 21세 이상')}>만 21세 이상</p>
                    <p className={useingSelect6 === '만 26세 이상' ? 'selected' : ''} onClick={() => setUseingSelect6('만 26세 이상')}>만 26세 이상</p>
                </span>
                <h4>연간 주행거리</h4>
                <span>
                    <p className={useingSelect7 === '연간 1만km' ? 'selected' : ''} onClick={() => setUseingSelect7('연간 1만km')}>연간 1만km</p>
                    <p className={useingSelect7 === '연간 2만km' ? 'selected' : ''} onClick={() => setUseingSelect7('연간 2만km')}>연간 2만km</p>
                    <p className={useingSelect7 === '연간 3만km' ? 'selected' : ''} onClick={() => setUseingSelect7('연간 3만km')}>연간 3만km</p>
                    <p className={useingSelect7 === '무제한' ? 'selected' : ''} onClick={() => setUseingSelect7('무제한')}>무제한</p>
                </span>
                <h4>개인 정보</h4>
                <span>
                    <input placeholder="이름을 적어주세요" value={useingSelect8} onChange={event => setUseingSelect8(event.target.value)} maxLength={10} />
                    <input placeholder="연락처를 적어주세요" value={useingSelect9} onChange={event => setUseingSelect9(event.target.value)} type="number" maxLength={11} />
                </span>
                <div>
                    <span>
                        <span>
                            {
                                !infoSelect1
                                    ? <img src={require('../../assets/img/functionIcon/optionPage_nonSelectBox.png')} onClick={() => setInfoSelect1(!infoSelect1)} alt="선택 안됨" />
                                    : <img src={require('../../assets/img/functionIcon/optionPage_SelectBox.png')} onClick={() => setInfoSelect1(!infoSelect1)} alt="선택 됨" />
                            }
                            <p>개인정보 수집·이용·제공 동의 <span onClick={() => setIsUsePopupVisible(true)}>(보기)</span></p>
                        </span>
                        <span>
                            {
                                !infoSelect2
                                    ? <img src={require('../../assets/img/functionIcon/optionPage_nonSelectBox.png')} onClick={() => setInfoSelect2(!infoSelect2)} alt="선택 안됨" />
                                    : <img src={require('../../assets/img/functionIcon/optionPage_SelectBox.png')} onClick={() => setInfoSelect2(!infoSelect2)} alt="선택 됨" />
                            }
                            <p>개인정보 제 3자 제공 동의 <span onClick={() => setIsUsePopupVisible(true)}>(보기)</span></p>
                        </span>
                    </span>
                </div>
                {colorStat.length !== 0 && trimSelect1 && trimSelect2 && options && useingSelect1 && useingSelect2 && useingSelect3 && useingSelect5 && useingSelect6 && useingSelect7 && useingSelect8 !== '' && useingSelect9.length >= 10 && infoSelect1 && infoSelect2
                    ? <p className="mobile_option_nextBtn" onClick={clickFunction}>견적서 확인</p>
                    : <p className="mobile_option_nonNextBtn">견적서 확인</p>
                }
            </section>
            <section className="mobile_option_fixedSection">
                <span>
                    <img src={`${process.env.REACT_APP_IMG_URL}/${content.img}.png`} />
                    <span>
                        <p>{content.enter} {content.name}</p>
                        <h3>{((trimPrice + optionPrice) / 10000).toLocaleString()} 만원</h3>
                    </span>
                    <p onClick={() => setIsUsePopupVisible2(true)}>선택 옵션 보기   〉</p>
                </span>
            </section>
            <Mobile_Footer />
        </div>
    )
}

export default Mobile_Option