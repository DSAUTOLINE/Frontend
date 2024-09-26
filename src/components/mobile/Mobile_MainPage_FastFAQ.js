import React, { useState, useEffect } from "react";
import { fastFAQAxios } from '../../services/Request'

const Mobile_MainPage_FastFAQ = (props) => {
    // 간편 문의 변수
    const [infoSelect1, setInfoSelect1] = useState(false);
    const [infoSelect2, setInfoSelect2] = useState(false);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [car, setCar] = useState('');

    const clickFunction = async () => {
        if (infoSelect1 && infoSelect2 && name !== '' && phone !== '' && car !== '') {
            await fastFAQAxios({
                name: name,
                phone: phone,
                car_name: car,
            });
            alert('상담 신청이 완료되었습니다')
            setCar('')
            setName('')
            setPhone('')
        } else {
            alert('내용이 입력되지 않았습니다')
        }
    };

    return (
        <section className="mobile_main_FastFAQSection">
            <h3>간편하게 문의해보세요</h3>
            <input placeholder="모델" value={car} onChange={(e) => setCar(e.target.value)} />
            <input placeholder="이름" value={name} onChange={(e) => setName(e.target.value)} />
            <input placeholder='연락처("-" 없이 입력)' type="number" maxLength={11} value={phone} onChange={(e) => setPhone(e.target.value)} />
            <span>
                {
                    !infoSelect1
                        ? <img src={require('../../assets/img/functionIcon/optionPage_nonSelectBox.png')} alt="Select Box" onClick={() => setInfoSelect1(!infoSelect1)} />
                        : <img src={require('../../assets/img/functionIcon/optionPage_SelectBox.png')} alt="Selected Box" onClick={() => setInfoSelect1(!infoSelect1)} />
                }
                <p>개인정보 제 3자 제공 동의 <span  onClick={() => props.setTerms(true)}>(보기)</span></p>
            </span>
            <span>
                {
                    !infoSelect2
                        ? <img src={require('../../assets/img/functionIcon/optionPage_nonSelectBox.png')} alt="Select Box" onClick={() => setInfoSelect2(!infoSelect2)} />
                        : <img src={require('../../assets/img/functionIcon/optionPage_SelectBox.png')} alt="Selected Box" onClick={() => setInfoSelect2(!infoSelect2)} />
                }
                <p>개인정보 수집·이용·제공 동의 <span  onClick={() => props.setTerms(true)}>(보기)</span></p>
            </span>
            <div
                style={(infoSelect1 && infoSelect2 && name !== '' && phone !== '' && car !== '') ? null : { backgroundColor: '#dbdbdb', cursor: 'auto' }}
                onClick={clickFunction}
            >
                상담신청하기
            </div>
        </section>
    )
}

export default Mobile_MainPage_FastFAQ