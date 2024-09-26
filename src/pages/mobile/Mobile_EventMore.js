import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import '../../styles/mobile/Mobile_Event.css'
import Mobile_GNB from "../../components/mobile/Mobile_GNB";
import Mobile_Footer from "../../components/mobile/Mobile_Footer";
import { eventInfoAxios } from '../../services/Request';
import Loading from "../../components/Loading";
import { fastFAQAxios } from '../../services/Request';
import { Mobile_TermsofInformationPopup } from '../../components/mobile/Mobile_Popup'


const Mobile_EventMore = (props) => {
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
        <div className="mobile_container">
            {isUsePopupVisible && <Mobile_TermsofInformationPopup setPopup={setIsUsePopupVisible} />}
            <Mobile_GNB page={'이벤트/프로모션'} />
            <section className="mobile_eventMore_contentSection">
                <h3>{content.title}</h3>
                <p>{content.start_date} ~ {content.end_date}</p>
                <span>
                    <img src={`${process.env.REACT_APP_IMG_URL}/${content.img}.png`} />
                </span>
                {content.title.includes('퍼스트스테이') &&
                    <button onClick={() => window.location.href = 'https://first-stay.co.kr/'}>퍼스트스테이 바로가기</button>
                }
                {!content.title.includes('퍼스트스테이') &&
                    <span className="mobile_eventMore_sticky">
                        <span>
                            <div className='mobile_eventDetailPage_FastFAQ'>
                                <img src={require('../../assets/img/dsautoline/DSAUTOLINE.png')} />
                                <span>
                                    <h4>이름</h4>
                                    <input value={name} onChange={(e) => setName(e.target.value)} placeholder='ex) 홍길동' />
                                    <h4>연락처</h4>
                                    <input
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        maxLength={11}
                                        placeholder='ex) 01012345678'
                                        type='number'
                                    />
                                </span>
                                <span>
                                    {
                                        !infoSelect1
                                            ? <img src={require('../../assets/img/functionIcon/optionPage_nonSelectBox.png')} alt="Select Box" onClick={() => setInfoSelect1(!infoSelect1)} />
                                            : <img src={require('../../assets/img/functionIcon/optionPage_SelectBox.png')} alt="Selected Box" onClick={() => setInfoSelect1(!infoSelect1)} />
                                    }
                                    <p><span>(필수)</span> 개인정보 제 3자 제공 동의 <span onClick={() => setIsUsePopupVisible(true)}>[보기]</span></p>
                                    {
                                        !infoSelect2
                                            ? <img src={require('../../assets/img/functionIcon/optionPage_nonSelectBox.png')} alt="Select Box" onClick={() => setInfoSelect2(!infoSelect2)} />
                                            : <img src={require('../../assets/img/functionIcon/optionPage_SelectBox.png')} alt="Selected Box" onClick={() => setInfoSelect2(!infoSelect2)} />
                                    }
                                    <p><span>(필수)</span> 개인정보 수집ㆍ이용ㆍ제공 동의 <span onClick={() => setIsUsePopupVisible(true)}>[보기]</span></p>
                                    <button onClick={clickFunction}>상담하기</button>
                                </span>
                            </div>
                        </span>
                    </span>
                }
            </section>
            <Mobile_Footer />
        </div>
    )
}

export default Mobile_EventMore