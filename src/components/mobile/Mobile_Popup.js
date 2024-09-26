import React, { useState, useEffect } from "react";
import '../../styles/mobile/Mobile_Popup.css'
import { mentoringAxios, quickCounselingInsertAxios, quickFAQAxios } from '../../services/Request'
import nonClick from '../../assets/img/functionIcon/optionPage_nonSelectBox.png'
import onClick from '../../assets/img/functionIcon/optionPage_SelectBox.png'
import { TermsofUse, TermsofInformation } from '../TermsScript'
import { LeftIcon, SearchIcon } from '../Icons'




export const Mobile_CarmentoPopup = (props) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [isSelect1, setIsSelect1] = useState(false)
    const [isSelect2, setIsSelect2] = useState(false)

    const onClickYes = async () => {
        if (isSelect1 && isSelect2 && name !== '' && phone.length >= 10) {
            await mentoringAxios({
                mento: props.mento.name,
                name: name,
                phone: phone,
            })
            alert('상담 신청이 완료되었습니다')
            props.setPopup(null);
        } else {
            alert('내용이 입력되지 않았습니다')
        }
    }
    const onClickNo = () => {
        props.setPopup(null);
    }


    return (
        <div className="mobile_popupDimmed">
            <div className="mobile_carmentoPopupDiv">
                <div>
                    <span>
                        <img src={require(`../../assets/img/carmento/${props.mento.img}.jpg`)} />
                    </span>
                    <span>
                        <h2>{props.mento.name}</h2>
                        <p>고객님들이 항상 만족하실 수 있도록 <br />최선을 다하겠습니다.</p>
                    </span>
                </div>
                <div>
                    <span>
                        <h4>이름</h4>
                        <input max={10} value={name} onChange={(e) => setName(e.target.value)} />
                    </span>
                    <span>
                        <h4>연락처</h4>
                        <input type="number" maxLength={11} value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </span>
                    <span>
                        {!isSelect1 ? <img src={nonClick} onClick={() => setIsSelect1(!isSelect1)} /> : <img src={onClick} onClick={() => setIsSelect1(!isSelect1)} />}
                        <p>개인정보 수집 · 이용 · 제공 동의 <span onClick={() => props.setTerms(true)}>(보기)</span></p>
                    </span>
                    <span>
                        {!isSelect2 ? <img src={nonClick} onClick={() => setIsSelect2(!isSelect2)} /> : <img src={onClick} onClick={() => setIsSelect2(!isSelect2)} />}
                        <p>개인정보 제 3자 제공 동의 <span onClick={() => props.setTerms(true)}>(보기)</span></p>
                    </span>
                    <span>
                        <span onClick={onClickNo}>취소</span>
                        <span onClick={onClickYes}>상담 신청하기</span>
                    </span>
                </div>
            </div>
        </div>
    )
}


export const Mobile_TermsofUsePopup = (props) => {
    return (
        <div className="mobile_popupDimmed">
            <div className="mobile_termsPopupDiv">
                <span>
                    <TermsofUse />
                </span>
                <button onClick={() => props.setPopup(false)}>닫기</button>
            </div>
        </div>
    )
}

export const Mobile_TermsofInformationPopup = (props) => {
    return (
        <div className="mobile_popupDimmed">
            <div className="mobile_termsPopupDiv">
                <span>
                    <TermsofInformation />
                </span>
                <button onClick={() => props.setPopup(false)}>닫기</button>
            </div>
        </div>
    )
}


export const Mobile_QuickDealCardPopup = (props) => {
    const [name, setName] = useState('')
    const [number, setNumber] = useState('')
    // 간편 문의 변수
    const [infoSelect1, setInfoSelect1] = useState(false);
    const [infoSelect2, setInfoSelect2] = useState(false);

    const [isUsePopupVisible, setIsUsePopupVisible] = useState(false);

    return (
        <div className='QuickDeal_Dimmed'>
            {isUsePopupVisible && <TermsofInformation onClose={setIsUsePopupVisible} />}
            <div className='QuickDeal_Section'>
                <div className='QuickDeal_Title'>
                    <h1>즉시 출고 문의</h1>
                    <img src={require('../../assets/img/dsautoline/DSAUTOLINE.png')} />
                </div>
                <div className='QuickDeal_info'>
                    <div className='QuickDeal_input'>
                        <p>모델</p>
                        <h3>{props.item.enter} {props.item.name}</h3>
                    </div>
                    <div className='QuickDeal_input'>
                        <p>이름</p>
                        <input
                            placeholder='ex) 홍길동'
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='QuickDeal_input'>
                        <p>연락처</p>
                        <input
                            placeholder='ex) 01012345678'
                            value={number}
                            type='number'
                            maxLength={11}
                            onChange={(e) => setNumber(e.target.value)}
                        />
                    </div>
                    <div className='QuickDeal_agree'>
                        <span>
                            <p><span>(필수)</span> 개인정보 제 3자 제공 동의 <span onClick={() => { setIsUsePopupVisible(true); document.body.style.overflowY = 'hidden' }}>(보기)</span></p>
                            {
                                !infoSelect1
                                    ? <img style={{ width: 23, height: 23 }} src={require('../../assets/img/functionIcon/optionPage_nonSelectBox.png')} alt="Select Box" onClick={() => setInfoSelect1(!infoSelect1)} />
                                    : <img style={{ width: 23, height: 23 }} src={require('../../assets/img/functionIcon/optionPage_SelectBox.png')} alt="Selected Box" onClick={() => setInfoSelect1(!infoSelect1)} />
                            }
                        </span>
                    </div>
                    <div className='QuickDeal_agree'>
                        <span>
                            <p><span>(필수)</span> 개인정보 수집·이용·제공 동의 <span onClick={() => { setIsUsePopupVisible(true); document.body.style.overflowY = 'hidden' }}>(보기)</span></p>
                            {
                                !infoSelect2
                                    ? <img style={{ width: 23, height: 23 }} src={require('../../assets/img/functionIcon/optionPage_nonSelectBox.png')} alt="Select Box" onClick={() => setInfoSelect2(!infoSelect2)} />
                                    : <img style={{ width: 23, height: 23 }} src={require('../../assets/img/functionIcon/optionPage_SelectBox.png')} alt="Selected Box" onClick={() => setInfoSelect2(!infoSelect2)} />
                            }
                        </span>

                    </div>
                </div>
                <div className='QuickDeal_button_Section'>
                    <button
                        className='Quick_apply'
                        onClick={async () => {
                            if (name !== '' && number !== '' && infoSelect1 && infoSelect2) {
                                await quickCounselingInsertAxios({
                                    car_code: props.item.car_code,
                                    name: name,
                                    phone: number,
                                    type: "즉시 출고",
                                })
                                setName('')
                                setNumber('')
                                alert('문의 신청이 완료되었습니다')
                                props.setPopup(null)
                            } else {
                                alert('내용이 입력되지 않았습니다')
                            }
                        }}
                    >
                        신청하기
                    </button>
                    <button className='Quick_close' onClick={() => { props.setPopup(null); document.body.style.overflowY = 'auto' }}>닫기</button>
                </div>
            </div>
        </div>
    );
}


export const Mobile_OptionInfoPopup = (props) => {
    return (
        <div className="mobile_popupDimmed">
            <div className="mobile_optionPopupDiv">
                <h3>선택 옵션</h3>
                <p>세부 모델 - <span>{(props.trimPrice / 10000).toLocaleString()}</span> 만원</p>
                <p>{props.trimSelect1}</p>
                <p>{props.trimSelect2}</p>
                <div></div>
                <p>옵션 - <span>{(props.optionPrice / 10000).toLocaleString()}</span> 만원</p>
                <span>
                    {props.options.length > 0 && props.options.map((item, _) => (
                        <p>{item.name}</p>
                    ))}
                </span>
                <div></div>
                <span>
                    <p>총 가격</p>
                    <p>{(props.totalPrice / 10000).toLocaleString()} 만원</p>
                </span>
                <span onClick={() => props.setPopup(false)}>Ⅹ</span>
            </div>
        </div>
    )
}


export const Mobile_SearchPopup = (props) => {
    const [search, setSearch] = useState('')
    const [searchList, setSearchList] = useState([])
    const [GNBSearchList, setGNBSearchList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await quickFAQAxios(null, null, null)
            setGNBSearchList(response)
        }
        fetchData()
    }, [])


    useEffect(() => {
        const fetchData = () => {
            if (GNBSearchList) {
                setSearchList(
                    GNBSearchList.filter(item =>
                        item.name.toLowerCase().includes(search.toLowerCase())
                    )
                );
            }
        };
        fetchData();
    }, [search, GNBSearchList]);

    return (
        <div className="mobile_searchPopup">
            <span>
                <span onClick={() => { props.setPopup(false); document.body.style.overflowY = 'auto' }}><LeftIcon size={25} color={'#111'} /></span>
                <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder='검색할 내용을 입력해주세요' />
                <span><SearchIcon size={25} color={'#111'} /></span>
            </span>
            <div>
                {searchList.length === 0 &&
                    <div className='GNBSearchListCard'>
                        <p style={{ color: '#bbb' }}>검색 결과가 없습니다</p>
                    </div>}
                {searchList.length > 0 && searchList.map((item, idx) => (
                    <div className='GNBSearchListCard'>
                        <p onClick={() => window.location.href = `/Option/${item.car_code}`}>{item.enter} {item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    )
}




export const Mobile_Admin_UserList_Popup = (props) => {
    return (
        <div className="mobile_popupDimmed">
            <div className="mobile_AdminPopupDiv">
                <h3>상세 정보</h3>
                <div></div>
                <span>
                    <span>
                        <p>신청일</p>
                        <h4>{props.item.created_at.slice(0, 10)}</h4>
                    </span>
                    <span>
                        <p>이름</p>
                        <h4>{props.item.name}</h4>
                    </span>
                    <span>
                        <p>연락처</p>
                        <h4>{props.item.phone}</h4>
                    </span>
                    {props.item.mento === undefined && props.item.type !== '이벤트' &&
                        <span>
                            <p>차종</p>
                            <h4>{props.item.enter} {props.item.car_name}</h4>
                        </span>
                    }
                    {props.item.mento !== undefined && 
                        <span>
                            <p>담당 카멘토</p>
                            <h4>{props.item.mento}</h4>
                        </span>
                    }
                    {props.item.type === '이벤트' &&
                        <span>
                            <p>이벤트명</p>
                            <h4>{props.item.car_name}</h4>
                        </span>
                    }
                    {(props.item.type === '빠른 간편 문의/ 한정 특가' || props.item.type === '즉시 출고') &&
                        <span>
                            <p>세부 모델</p>
                            {props.item.type === '빠른 간편 문의/ 한정 특가'
                                ? <h4>{props.item.trim1} {props.item.trim2}</h4>
                                : <h4>{props.item.info}</h4>
                            }

                        </span>
                    }
                    {props.item.type === '빠른 간편 문의/ 한정 특가' &&
                        <span>
                            <p>옵션</p>
                            {props.item.option.length === 0 && <h4>기본가/오토</h4>}
                            <span>
                                {props.item.option.map((item, _) => (
                                    <h4>{item.name}</h4>
                                ))}
                            </span>
                        </span>
                    }
                    {props.item.type === '빠른 간편 문의/ 한정 특가' &&
                        <span>
                            <p>이용조건</p>
                            <span>
                                <h4><span>이용 방법 -</span> {props.item.method}</h4>
                                <h4><span>이용 기간 -</span> {props.item.period}</h4>
                                <h4><span>보증금 -</span> {props.item.deposit}</h4>
                                <h4><span>보증금(원) -</span> {props.item.deposit_price} 원</h4>
                                <h4><span>선납금 -</span> {props.item.payment_price}</h4>
                                <h4><span>보험 연령 -</span> {props.item.age}</h4>
                                <h4><span>연간 주행거리 -</span> {props.item.annual_mileage}</h4>
                            </span>
                        </span>
                    }
                    {(props.item.type === '빠른 간편 문의/ 한정 특가' || props.item.type === '즉시 출고') &&
                        <span>
                            <p>금액</p>
                            <h4>{(props.item.price / 10000).toLocaleString()} 만원</h4>
                        </span>
                    }
                </span>
                <h5 onClick={() => props.setPopup(null)}>Ⅹ</h5>
            </div>
        </div>
    )
}