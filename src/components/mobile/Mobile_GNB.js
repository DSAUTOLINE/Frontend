import React, { useState } from "react";
import '../../styles/mobile/Mobile_GNB.css'
import { SearchIcon } from '../Icons'
import { Mobile_SearchPopup } from "./Mobile_Popup";

const Mobile_GNB = (props) => {
    const [searchStat, setSearchStat] = useState(false)

    return (
        <>
            {searchStat && <Mobile_SearchPopup setPopup={setSearchStat}/>}
            <section className="mobile_GNB_section">
                <div>
                    <img onClick={() => window.location.href='/'} src={require('../../assets/img/dsautoline/DSAUTOLINE.png')} />
                    <span onClick={() => {setSearchStat(true); document.body.style.overflowY='hidden';}}><SearchIcon size={25} color={'#111'} /></span>
                </div>
                <div>
                    <span>
                        <p 
                            style={props.page === '메인' ? {color: '#0064FF'} : null}
                            onClick={() => window.location.href='/'}
                        >메인</p>
                        <p 
                            style={props.page === '빠른 간편 문의' ? {color: '#0064FF'} : null}
                            onClick={() => window.location.href='/QuickFAQ'}
                        >빠른 간편 문의</p>
                        <p 
                            style={props.page === '한정 특가' ? {color: '#0064FF'} : null}
                            onClick={() => window.location.href='/HotDeal'}
                        >한정 특가</p>
                        <p 
                            style={props.page === '즉시 출고' ? {color: '#0064FF'} : null}
                            onClick={() => window.location.href='/QuickDeal'}
                        >즉시 출고</p>
                        <p 
                            style={props.page === '이벤트/프로모션' ? {color: '#0064FF'} : null}
                            onClick={() => window.location.href='/Event'}
                        >이벤트/프로모션</p>
                        <p 
                            style={props.page === '고객 리뷰' ? {color: '#0064FF'} : null}
                            onClick={() => window.location.href='/Review'}
                        >고객 리뷰</p>
                        <p 
                            style={props.page === '회사 소개' ? {color: '#0064FF'} : null}
                            onClick={() => window.location.href='/Enter'}
                        >회사 소개</p>
                    </span>
                </div>
            </section>
        </>
    )
}


export default Mobile_GNB