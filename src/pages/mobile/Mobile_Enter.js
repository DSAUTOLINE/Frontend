import React, { useState, useEffect } from "react";
import '../../styles/mobile/Mobile_Enter.css'
import Mobile_GNB from "../../components/mobile/Mobile_GNB";
import Mobile_Footer from "../../components/mobile/Mobile_Footer";



const Mobile_Enter = (props) => {
    useEffect(() => {
        const mapAPI = process.env.REACT_APP_MAP_API;

        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${mapAPI}&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    const container = document.getElementById('mobile_map');
                    const options = {
                        center: new window.kakao.maps.LatLng(36.83187125070437, 127.14499934927386),
                        level: 1
                    };
                    const map = new window.kakao.maps.Map(container, options);
                    const markerPosition = new window.kakao.maps.LatLng(36.831875766482334, 127.14499095041695);
                    const marker = new window.kakao.maps.Marker({
                        position: markerPosition,
                    });
                    marker.setMap(map);

                    const infowindow = new window.kakao.maps.InfoWindow({
                        content: '<div style="padding:5px; font-size:15px;">두정상가8길 62-804호</div>',
                    });
                    infowindow.open(map, marker);
                });
            }
        };

    }, []);


    return (
        <div className="mobile_container">
            <Mobile_GNB page={'회사 소개'} />
            <section className="mobile_enter_visionSection">
                <h4>VISION</h4>
                <h3>DS AUTOLINE은<br/>고객님의 마음을 움직입니다.</h3>
                <p>신뢰와 믿음을 바탕으로<br/>고객님의 마음을 움직이겠습니다.</p>
                <span><img src={require('../../assets/img/enter/enter_001.jpg')}/></span>
            </section>
            <section className="mobile_enter_howSection">
                <h4>HOW</h4>
                <h2>DS AUTOLINE은<br/>자동차 금융 서비스 전문 기업입니다.</h2>
                <p>렌트, 리스 분야에서 여러 경험과 노하우, 신뢰와 믿음을 바탕으로 컨설팅을 진행합니다.</p>
                <h3>고객님께 이런 서비스를 제공하겠습니다.</h3>
                <p>
                    - 다양한 파트너사와 직접적, 간접적인 업무 진행을 통하여 유통 <br/>    마진을 줄이겠습니다.
                    <br/><br/>
                    - 고객 최우선적 1대1 심층 상담을 통하여 보다 합리적이고 어디에<br/>    서 쉽게 볼 수 없는 견적서를 드리겠습니다.
                </p>
            </section>
            <section className="mobile_enter_rentSection">
                <h4>RENT</h4>
                <h2>DS AUTOLINE의<br/>장기렌트는 이런 장점이 있습니다.</h2>
                <h3><span>01</span> 낮은 초기비용과 유지 비용</h3>
                <p>낮은 초기 비용과 유지 비용을 통하여 고객님들께서 부담을 덜 가지실 수 있도록 해드립니다.</p>
                <h3><span>02</span> 유지관리의 편의</h3>
                <p>낮은 초기 비용과 유지 비용을 통하여 고객님들께서 부담을 덜 가지실 수 있도록 해드립니다.</p>
                <h3><span>03</span> 개인 사업자, 법인 사업자 비용 처리 가능</h3>
                <p>개인 사업자 고객님과 법인 사업자 고객님들을 모두 생각하여 사업자 비용을 처리하실 수 있도록 지원하고 있습니다.</p>
                <h3><span>04</span> 신용도에 영향 X</h3>
                <p>고객님께서 저희 서비스를 사용을 하여 차량을 받으셔도 고객님의 신용도에는 전혀 영향이 없습니다.</p>
            </section>
            <section className="mobile_enter_rentSection">
                <h4>LEASE</h4>
                <h2>DS AUTOLINE의<br/>리스는 이런 장점이 있습니다.</h2>
                <h3><span>01</span> 낮은 초기비용과 유지 비용</h3>
                <p>낮은 초기 비용과 유지 비용을 통하여 고객님들께서 부담을 덜 가지실 수 있도록 해드립니다.</p>
                <h3><span>02</span> 건강보험료, 재산세 할증 부담 X</h3>
                <p>고객님의 건강보험료와 재산세에 대한 할증을 부담하지 않으셔도 됩니다.</p>
                <h3><span>03</span> 보험 경력 유지</h3>
                <p>고객님께서 서비스를 이용하신 후에도 보험 경력을 변경되지 않고 기존 고객님의 보험 경력이 그대로 유지됩니다.</p>
                <h3><span>04</span> 개인 사업자, 법인 사업자 비용 처리 가능</h3>
                <p>개인 사업자 고객님과 법인 사업자 고객님들을 모두 생각하여 사업자 비용을 처리하실 수 있도록 지원하고 있습니다.</p>
            </section>
            <section className="mobile_enter_procedureSection">
                <h4>PROCEDURE</h4>
                <h2>DS AUTOLINE의<br/>계약 진행 절차는 다음과 같습니다.</h2>
                <p>개인 사업자 고객님과 법인 사업자 고객님들을 모두 생각하여 사업자 비용을 처리하실 수 있도록 지원하고 있습니다.</p>
                <span>
                    <img src={require('../../assets/img/functionIcon/Enter_CheckIcon.png')}/>
                    <p>렌트, 리스 상담을 통한 견적서 발송</p>
                </span>
                <span>
                    <img src={require('../../assets/img/functionIcon/Enter_CheckIcon.png')}/>
                    <p>필요 서류 준비</p>
                </span>
                <span>
                    <img src={require('../../assets/img/functionIcon/Enter_CheckIcon.png')}/>
                    <p>심사 및 승인</p>
                </span>
                <span>
                    <img src={require('../../assets/img/functionIcon/Enter_CheckIcon.png')}/>
                    <p>계약 완료</p>
                </span>
                <span>
                    <img src={require('../../assets/img/functionIcon/Enter_CheckIcon.png')}/>
                    <p>인도지 출고</p>
                </span>
                <span>
                    <img src={require('../../assets/img/functionIcon/Enter_CheckIcon.png')}/>
                    <p>사후 관리</p>
                </span>
            </section>
            <section className="mobile_enter_procedureSection">
                <h4>PROCEDURE</h4>
                <h2>DS AUTOLINE 오시는 길</h2>
                <div><div id="mobile_map"></div></div>
            </section>
            <Mobile_Footer />
        </div>
    )
}

export default Mobile_Enter