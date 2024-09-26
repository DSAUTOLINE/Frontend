import React, { useState, useEffect } from 'react'
import '../styles/PopUp.css'
import { mentoringAxios, quickCounselingInsertAxios } from '../services/Request'
import { StarIcon } from './Icons'
import { TermsofUse, TermsofInformation } from '../components/TermsScript';
import imageUpload from '../assets/img/popup/imageUpload.png'
import nonClick from '../assets/img/functionIcon/optionPage_nonSelectBox.png'
import onClick from '../assets/img/functionIcon/optionPage_SelectBox.png'




export const OptionPagePopUp = (props) => {
    return (
        <>
            <div className="popupDimmed">
                <div className="popupDiv">
                    <img src={require('../assets/img/popup/popupIcon.png')} />
                    <h2>사용해주셔서 감사합니다</h2>
                    <p>카카오톡으로 연락드리겠습니다</p>
                    <span onClick={() => window.location.href = '/'}>닫기</span>
                </div>
            </div>

        </>

    )
}

export const EventAddPopUp = (props) => {
    return (
        <>
            <div className="popupDimmed">
                <div className="popupDiv">
                    <img src={require('../assets/img/popup/popupIcon.png')} />
                    <h2>이벤트가 추가되었습니다</h2>
                    <p>메인 페이지, 관리자 페이지에서  확인 가능합니다.</p>
                    <span onClick={() => window.location.href = '/event'}>닫기</span>
                </div>
            </div>

        </>

    )
}

export const CarAddPopUp = (props) => {
    return (
        <>
            <div className="popupDimmed">
                <div className="popupDiv">
                    <img src={require('../assets/img/popup/popupIcon.png')} />
                    <h2>차량이 추가되었습니다</h2>
                    <p>메인 페이지, 관리자 페이지에서  확인 가능합니다.</p>
                    <span onClick={() => window.location.href = '/'}>닫기</span>
                </div>
            </div>

        </>

    )
}

export const HotDealCarAddPopUp = (props) => {
    return (
        <>
            <div className="popupDimmed">
                <div className="popupDiv">
                    <img src={require('../assets/img/popup/popupIcon.png')} />
                    <h2>차량이 추가되었습니다</h2>
                    <p>메인 페이지, 관리자 페이지에서  확인 가능합니다.</p>
                    <span onClick={() => props.setPopupStat(false)}>닫기</span>
                </div>
            </div>

        </>

    )
}

export const ReviewPagePopUp = (props) => {
    const [starStat, setStarStat] = useState(0)

    return (
        <>
            <div className="reviewPopupDimmed">
                <div className="reviewPopupDiv">
                    <div>
                        <h1>리뷰 작성 시<br />확인해주세요!!</h1>
                        <p>리뷰 확인 후 필터링 또는 삭제 조치 될 수도 있습니다</p>
                        <span>
                            <h3>1</h3>
                            <p>사진 필수 포함<br /><span>차량 사진을 업로드해주세요</span></p>
                        </span>
                        <span>
                            <h3>2</h3>
                            <p>욕설 금지<br /><span>내용에 욕설을 사용하지 마세요</span></p>
                        </span>
                        <span>
                            <h3>3</h3>
                            <p>상업적 게시물 금지<br /><span>상업적인 게시물은 삭제됩니다</span></p>
                        </span>
                    </div>
                    <div>
                        <span>
                            <span>
                                <p>이름</p>
                                <input />
                            </span>
                            <span>
                                <p>차량명</p>
                                <input placeholder='ex) 기아 K3' />
                            </span>
                        </span>
                        <span>
                            <span>
                                <p>별점</p>
                                {Array.from({ length: 5 }, (_, index) => (
                                    <span onClick={() => setStarStat(index + 1)}>
                                        <StarIcon
                                            key={index}
                                            size={31}
                                            color={index < starStat ? '#FBDA03' : '#9FA5AB'}
                                        />
                                    </span>
                                ))}
                            </span>
                            <span>
                                <p style={{ width: 273 }}>사진</p>
                                <img src={imageUpload} />
                            </span>
                        </span>
                        <h2>내용</h2>
                        <textarea />
                        <span>
                            <p onClick={() => { props.setPopupStat(false); document.body.style.overflow = 'auto'; }}>작성 취소</p>
                            <p onClick={() => { document.body.style.overflow = 'auto'; window.location.href = '/'; }}>작성 완료</p>
                        </span>

                    </div>
                </div>
            </div>
        </>
    )
}




export const CarmentoPopUp = (props) => {
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')

    const [isSelect1, setIsSelect1] = useState(false)
    const [isSelect2, setIsSelect2] = useState(false)

    const [isUsePopupVisible, setIsUsePopupVisible] = useState(false);

    const onClickYes = async () => {
        if (isSelect1 && isSelect2 && name !== '' && phone.length >= 10 && props.mento) {
            await mentoringAxios({
                mento: props.mento.name,
                name: name,
                phone: phone,
            })
            props.setCheckPopup(true);
            props.setCarmentoPopup(false);
        } else {
            alert('내용이 입력되지 않았습니다')
        }
    }
    const onClickNo = () => {
        props.setCarmentoPopup(false);
        document.body.style.overflow = 'auto'
    }

    return (
        <>
            {isUsePopupVisible && <TermsofInformationPopup onClose={setIsUsePopupVisible} />}
            <div className='carmentoDimmed'>
                <div>
                    <div>
                        <span>
                            <img src={require(`../assets/img/carmento/${props.mento.img}.jpg`)} />
                        </span>
                        <span>
                            <h2>{props.mento.name}</h2>
                            <p>고객님들이 항상 만족하실 수 있도록 <br />최선을 다하겠습니다.</p>
                        </span>
                    </div>
                    <div>
                        <h2>우수 카멘토에게 상담 받아보세요</h2>
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
                            <p>개인정보 수집 · 이용 · 제공 동의 <span onClick={() => setIsUsePopupVisible(true)} >(보기)</span></p>
                        </span>
                        <span>
                            {!isSelect2 ? <img src={nonClick} onClick={() => setIsSelect2(!isSelect2)} /> : <img src={onClick} onClick={() => setIsSelect2(!isSelect2)} />}
                            <p>개인정보 제 3자 제공 동의 <span onClick={() => setIsUsePopupVisible(true)}>(보기)</span></p>
                        </span>
                        <span>
                            <span onClick={onClickNo}>취소</span>
                            <span onClick={onClickYes}>상담 신청하기</span>
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}


export const ReviewAddPagePopUp = (props) => {
    return (
        <>
            <div className="popupDimmed">
                <div className="popupDiv">
                    <img src={require('../assets/img/popup/popupIcon.png')} />
                    <h2>리뷰를 작성해주셔서 감사합니다</h2>
                    <p>해당 리뷰는 적정 심사 후 홈페이지에 업로드 됩니다.</p>
                    <span onClick={() => window.location.href = '/Review'}>닫기</span>
                </div>
            </div>
        </>
    )
}

export const TermsofUsePopUp = (props) => {
    return (
        <>
            <div className="terms_infoDimmed">
                <div className="terms_infoDiv">
                    <span>
                        <TermsofUse />
                    </span>
                    <button onClick={() => { props.onClose(false); document.body.style.overflowY = 'auto' }}>닫기</button>
                </div>
            </div>
        </>
    )
}

export const TermsofInformationPopup = (props) => {
    return (
        <div className="terms_infoDimmed">
            <div className="terms_infoDiv">
                <span>
                    <TermsofInformation />
                </span>
                <button onClick={() => { props.onClose(false); document.body.style.overflowY = 'auto' }}>닫기</button>
            </div>
        </div>
    );
};



export const QuickDealCarCard_Popup = (props) => {
    const [popupName, setPopupName] = useState('')
    const [popupNumber, setPopupnumber] = useState('')
    // 간편 문의 변수
    const [infoSelect1, setInfoSelect1] = useState(false);
    const [infoSelect2, setInfoSelect2] = useState(false);

    const [isUsePopupVisible, setIsUsePopupVisible] = useState(false);

    return (
        <div className='QuickDeal_Dimmed'>
            {isUsePopupVisible && <TermsofInformationPopup onClose={setIsUsePopupVisible} />}
            <div className='QuickDeal_Section'>
                <div className='QuickDeal_Title'>
                    <h1>즉시 출고 문의</h1>
                    <img src={require('../assets/img/dsautoline/DSAUTOLINE.png')} />
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
                            value={popupName}
                            onChange={(e) => setPopupName(e.target.value)}
                        />
                    </div>
                    <div className='QuickDeal_input'>
                        <p>연락처</p>
                        <input
                            placeholder='ex) 01012345678'
                            value={popupNumber}
                            type='number'
                            maxLength={11}
                            onChange={(e) => setPopupnumber(e.target.value)}
                        />
                    </div>
                    <div className='QuickDeal_agree'>
                        <span>
                            <p><span>(필수)</span> 개인정보 제 3자 제공 동의 <span onClick={() => { setIsUsePopupVisible(true); document.body.style.overflowY = 'hidden' }}>[보기]</span></p>
                            {
                                !infoSelect1
                                    ? <img style={{ width: 23, height: 23 }} src={require('../assets/img/functionIcon/optionPage_nonSelectBox.png')} alt="Select Box" onClick={() => setInfoSelect1(!infoSelect1)} />
                                    : <img style={{ width: 23, height: 23 }} src={require('../assets/img/functionIcon/optionPage_SelectBox.png')} alt="Selected Box" onClick={() => setInfoSelect1(!infoSelect1)} />
                            }
                        </span>

                    </div>
                    <div className='QuickDeal_agree'>
                        <span>
                            <p><span>(필수)</span> 개인정보 수집·이용·제공 동의 <span onClick={() => { setIsUsePopupVisible(true); document.body.style.overflowY = 'hidden' }}>[보기]</span></p>
                            {
                                !infoSelect2
                                    ? <img style={{ width: 23, height: 23 }} src={require('../assets/img/functionIcon/optionPage_nonSelectBox.png')} alt="Select Box" onClick={() => setInfoSelect2(!infoSelect2)} />
                                    : <img style={{ width: 23, height: 23 }} src={require('../assets/img/functionIcon/optionPage_SelectBox.png')} alt="Selected Box" onClick={() => setInfoSelect2(!infoSelect2)} />
                            }
                        </span>

                    </div>
                </div>
                <div className='QuickDeal_button_Section'>
                    <button
                        className='Quick_apply'
                        onClick={async () => {
                            if (popupName !== '' && popupNumber !== '' && infoSelect1 && infoSelect2) {
                                await quickCounselingInsertAxios({
                                    car_code: props.item.car_code,
                                    name: popupName,
                                    phone: popupNumber,
                                    type: "즉시 출고",
                                })
                                setPopupName('')
                                setPopupnumber('')
                                alert('문의 신청이 완료되었습니다')
                                document.body.style.overflowY='auto'
                                props.setPopup(null)
                            } else {
                                alert('내용이 입력되지 않았습니다')
                            }
                        }}
                    >
                        문의하기
                    </button>
                    <button className='Quick_close' onClick={() => { props.setPopup(null); document.body.style.overflowY = 'auto' }}>닫기</button>
                </div>
            </div>
        </div>
    );
}