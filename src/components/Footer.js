import '../styles/Footer.css'
import dsautoline_white from '../assets/img/dsautoline/dsautoline_white.png'
import { TermsofInformationPopup, TermsofUsePopUp } from '../components/PopUp';
import React, { useState } from 'react';



/**
 * Footer
 * @param {*} props 
 * @returns 
 */
const Footer = (props) => {
    const [isUsePopupVisible1, setIsUsePopupVisible1] = useState(false);
    const [isUsePopupVisible2, setIsUsePopupVisible2] = useState(false);


    return (
        <footer className='footerSection'>
            <div>
                <span>
                    <p onClick={() => {setIsUsePopupVisible1(true); document.body.style.overflowY='hidden'}}>이용약관</p>
                    {isUsePopupVisible1 && <TermsofUsePopUp onClose={setIsUsePopupVisible1} />}
                    <span></span>
                    <p onClick={() => {setIsUsePopupVisible2(true); document.body.style.overflowY='hidden'}}>개인정보처리방침</p>
                    {isUsePopupVisible2 && <TermsofInformationPopup onClose={setIsUsePopupVisible2} />}
                </span>
            </div>
            <div>
                <span>
                    <img src={dsautoline_white}/>
                    <span>
                        <h3>(주) 디에스오토라인</h3>
                        <p>대표: 노주영     |     주소: 천안시 서북구 두정상가8길 62. 804호     |     대표번호: 070-7542-8515</p>
                        <p>통신판매업신고: 2024-충남천안-2107     |     사업자등록번호: 218-86-03131</p>
                    </span>
                    <div>
                        <span onClick={() => window.location.href='https://www.instagram.com/ds_autoline/?hl=ko'}>
                            <img src={require('../assets/img/functionIcon/instagramIcon.png')}/>
                        </span>
                        {/* <span></span> */}
                    </div>
                </span>
            </div>
            <div>
                <p>COPYRIGHT @2024 DSAUTOLINE CO, LTD ALL RIGHTS RESERVED.</p>
            </div>
        </footer>
    )
}

export default Footer