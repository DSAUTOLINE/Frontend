import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Footer from "../components/Footer";
import GNB from "../components/GNB";
import '../styles/EventDetailPage.css';
import FastFAQSticky from '../components/FastFAQSticky';
import { eventInfoAxios } from '../services/Request';
import { TermsofInformationPopup } from '../components/PopUp';
import Loading from "../components/Loading";
import { fastFAQAxios } from '../services/Request';




const EventDetailPage = () => {
    const { id } = useParams();
    const [content, setContent] = useState(null)
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [infoSelect1, setInfoSelect1] = useState(false);
    const [infoSelect2, setInfoSelect2] = useState(false);
    const [isUsePopupVisible, setIsUsePopupVisible] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const response = await eventInfoAxios(id)
            setContent(response)
        }
        fetchData()
    }, [id])

    const clickFunction = async () => {
        if (infoSelect1 && infoSelect2 && name !== '' && phone !== '') {
            await fastFAQAxios({
                name: name,
                phone: phone,
                car_name: content.title,
                type: '이벤트',
            });
            alert('상담 신청이 완료되었습니다.')
            setName('')
            setPhone('')
        } else {
            alert('내용이 입력되지 않았습니다')
        }
    };


    if (!content) {
        return (
            <Loading />
        )
    }
    return (
        <>
            <GNB stat={true} page={'이벤트/프로모션'} />
            {isUsePopupVisible && <TermsofInformationPopup onClose={setIsUsePopupVisible} />}
            <FastFAQSticky height={600} />
            <div className='edcontainer'>
                <div className='DetailTitleSection'>
                    <h1>{content.title}</h1>
                    <p>{content.start_date} ~ {content.end_date}</p>
                </div>
                <div className='OptionSection'>
                    {/* 여기에 옵션 관련 내용 추가 가능 */}
                </div>
                <div className='ScriptSection'>
                    <img
                        src={`${process.env.REACT_APP_IMG_URL}/${content.img}.png`}
                        alt='이벤트 이미지'
                        onError={(e) => {
                            e.target.onerror = null; // 무한 루프 방지
                            e.target.src = `${process.env.REACT_APP_IMG_URL}/error.png`;
                        }}
                    />
                    {!content.title.includes('퍼스트스테이') &&
                        <span>
                            <span>
                                <div className='eventDetailPage_FastFAQ'>
                                    <img src={require('../assets/img/dsautoline/DSAUTOLINE.png')} />
                                    <p>이름</p>
                                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder='ex) 홍길동' />
                                    <p>연락처</p>
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        maxLength={11}
                                        placeholder='ex) 01012345678'
                                        type='number'
                                    />
                                    <span>
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
                                    </span>
                                    <button onClick={clickFunction}>상담하기</button>
                                </div>
                            </span>
                        </span>
                    }
                </div>
                {content.title.includes('퍼스트스테이') &&
                    <button onClick={() => window.location.href = 'https://first-stay.co.kr/'}>퍼스트스테이 바로가기</button>
                }
                <div className='ButtonSection'>
                    <button className="backButton" onClick={() => window.location.href = '/event'}>목록으로</button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default EventDetailPage;
