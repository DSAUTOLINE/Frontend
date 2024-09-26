import React, { useState, useEffect } from 'react';
import '../styles/FastFAQSticky.css';
import { OptionPagePopUp, TermsofInformationPopup } from '../components/PopUp';
import { fastFAQAxios } from '../services/Request';

const FastFAQSticky = (props) => {
    // 간편 문의 변수
    const [infoSelect1, setInfoSelect1] = useState(false);
    const [infoSelect2, setInfoSelect2] = useState(false);

    // insert
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [car, setCar] = useState('');

    const [load, setLoad] = useState(0);
    const [nextStat, setNextStat] = useState(false);

    const [isUsePopupVisible, setIsUsePopupVisible] = useState(false);
    const [isInformationPopupVisible, setIsInformationPopupVisible] = useState(false);


    const handleOpenInformationPopup = () => {
        setIsInformationPopupVisible(true);
    };

    const handleCloseInformationPopup = () => {
        setIsInformationPopupVisible(false);
    };

    useEffect(() => {
        // 페이지 높이를 업데이트하는 함수
        const updateHeight = () => {
            setLoad(document.documentElement.scrollHeight);
        };

        // 처음 렌더링 시 높이 업데이트
        updateHeight();

        // MutationObserver 설정
        const observer = new MutationObserver(updateHeight);

        // body에 대해 감지할 요소와 설정
        observer.observe(document.body, {
            childList: true,
            subtree: true,
            attributes: true,
        });

        // 컴포넌트 언마운트 시 옵저버를 해제
        return () => {
            observer.disconnect();
        };
    }, []); // 빈 배열로 한번만 실행

    const clickFunction = async () => {
        if (infoSelect1 && infoSelect2 && name !== '' && phone !== '' && car !== '') {
            await fastFAQAxios({
                name: name,
                phone: phone,
                car_name: car,
            });
            alert('상담 신청이 완료되었습니다.')
            setCar('')
            setName('')
            setPhone('')
        } else {
            alert('내용이 입력되지 않았습니다')
        }
    };

    return (
        <section className="mainPage_QuickFAQSection">
            {nextStat && <OptionPagePopUp />}
            {isUsePopupVisible && <TermsofInformationPopup onClose={setIsUsePopupVisible} />}
            {isInformationPopupVisible && <TermsofInformationPopup onClose={setIsUsePopupVisible} />}
            <span>
                <span style={load !== 0 ? { height: document.body.clientHeight - props.height } : null}>
                    <div>
                        <img src={require('../assets/img/dsautoline/DSAUTOLINE.png')} alt="Quick FAQ Icon" />
                        <h1>간편 견적서 상담</h1>
                        <h3>빠르고 간편하게 견적서을 확인해보세요.</h3>
                        <div>
                            <h4>모델</h4>
                            <input value={car} onChange={(e) => setCar(e.target.value)} placeholder='ex) 현대 디 올 뉴 그랜저'/>
                        </div>
                        <div>
                            <h4>이름</h4>
                            <input value={name} onChange={(e) => setName(e.target.value)} placeholder='ex) 홍길동'/>
                        </div>
                        <div>
                            <h4>연락처</h4>
                            <input 
                                value={phone} 
                                onChange={(e) => setPhone(e.target.value)} 
                                maxLength={11} 
                                placeholder='ex) 01012345678'
                                type='number'
                            />
                        </div>
                        <span>
                            {
                                !infoSelect1
                                    ? <img style={{ width: 23, height: 23 }} src={require('../assets/img/functionIcon/optionPage_nonSelectBox.png')} alt="Select Box" onClick={() => setInfoSelect1(!infoSelect1)} />
                                    : <img style={{ width: 23, height: 23 }} src={require('../assets/img/functionIcon/optionPage_SelectBox.png')} alt="Selected Box" onClick={() => setInfoSelect1(!infoSelect1)} />
                            }
                            <p><span>(필수)</span> 개인정보 제 3자 제공 동의 <span onClick={() => { setIsUsePopupVisible(true); document.body.style.overflowY = 'hidden' }}>[보기]</span></p>
                        </span>
                        <span>
                            {
                                !infoSelect2
                                    ? <img style={{ width: 23, height: 23 }} src={require('../assets/img/functionIcon/optionPage_nonSelectBox.png')} alt="Select Box" onClick={() => setInfoSelect2(!infoSelect2)} />
                                    : <img style={{ width: 23, height: 23 }} src={require('../assets/img/functionIcon/optionPage_SelectBox.png')} alt="Selected Box" onClick={() => setInfoSelect2(!infoSelect2)} />
                            }
                            <p><span>(필수)</span> 개인정보 수집ㆍ이용ㆍ제공 동의 <span onClick={() => { setIsUsePopupVisible(true); document.body.style.overflowY = 'hidden' }}>[보기]</span></p>
                        </span>
                        <button
                            onClick={clickFunction}
                        >
                            상담신청하기
                        </button>
                    </div>
                </span>
            </span>
        </section>
    );
};

export default FastFAQSticky;
