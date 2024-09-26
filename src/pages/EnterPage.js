import React, { useEffect } from 'react';
import GNB from "../components/GNB";
import Footer from "../components/Footer";
import '../styles/EnterPage.css';
import FastFAQSticky from '../components/FastFAQSticky'

const EnterPage = () => {

    useEffect(() => {
        const mapAPI = process.env.REACT_APP_MAP_API;

        const script = document.createElement('script');
        script.src = `https://dapi.kakao.com/v2/maps/sdk.js?appkey=${mapAPI}&autoload=false`;
        script.async = true;
        document.head.appendChild(script);

        script.onload = () => {
            if (window.kakao && window.kakao.maps) {
                window.kakao.maps.load(() => {
                    const container = document.getElementById('map');
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
        <>
            <GNB stat={true} page={'회사소개'} />
            <FastFAQSticky height={550}/>
            <div className='enter_container'>

                <div className='Enter_VISIONSection'>
                    <div className='Enter_TitleHead'>
                        <p>VISION</p>
                    </div>
                    <div className='Enter_TitleTextSeciton'>
                        <div className='Enter_TitleText'>
                            <h1>DS AUTOLINE은<br/> 고객님의 마음을 움직입니다.</h1>
                            <p>신뢰와 믿음을 바탕으로<br/> 고객님의 마음을 움직이겠습니다.</p>
                        </div>
                    </div>
                </div>
                <img className='Enter_bannerSection' src={require('../assets/img/enter/enter_001.jpg')}/>  
                <div className='Enter_line'></div>

                <div className='Enter_HOWSection'>
                    <div className='Enter_TitleHead'>
                        <p>HOW</p>
                    </div>
                    <div className='Enter_TitleTextSeciton'>
                        <div className='Enter_TitleText'>
                            <h1>DS AUTOLINE은<br/> 자동차 금융 서비스 전문 기업입니다.</h1>
                            <p>렌트, 리스 분야에서 여러 경험과 노하우, 신뢰와 믿음을<br/> 바탕으로 컨설팅을 진행합니다.</p>
                        </div>
                    </div>
                    <div className='Enter_HOWTextSection'>
                        <h1>고객님께 이런 서비스를 제공하겠습니다.</h1>
                        <p>- 다양한 파트너사와 직접적, 간접적인 업무 진행을 통하여 유통 마진을 줄이겠습니다.</p>
                        <p>- 고객 최우선적 1대1 심층 상담을 통하여 보다 합리적이고 어디에서 쉽게 볼 수 없는 견적서를 드리겠습니다.</p>
                    </div>
                    <div className='Enter_line'></div>
                </div>
                <div className='Enter_RENTSection'>
                    <div className='Enter_TitleHead'>
                        <p>RENT</p>
                    </div>
                    <div className='Enter_TitleTextSeciton'>
                        <div className='Enter_TitleText'>
                            <h1>DS AUTOLINE의<br/> 장기렌트는 이런 장점이 있습니다.</h1>
                        </div>
                    </div>

                    <div className='Enter_RENTTextSection'>
                        <div className='Enter_RENTColumnHead'>
                            <div className='Enter_RENTColumnText'>
                                <h1><span>01</span> 낮은 초기비용과 유지 비용</h1>
                                <p>낮은 초기 비용과 유지 비용을 통하여 고객님들께서 부담을<br/>덜 가지실 수 있도록 해드립니다.</p>
                            </div>
                            <div className='Enter_RENTColumnText'>
                                <h1><span>02</span> 유지 관리의 편의</h1>
                                <p>고객님들께서 차량을 받으신 후에도 유지 관리에 신경을 덜 쓰실 수 있도록<br/>서비스를 지원하고 있습니다.</p>
                            </div>
                        </div>
                        <div className='Enter_RENTColumnHead'>
                            <div className='Enter_RENTColumnText'>
                                <h1><span>03</span> 개인 사업자, 법인 사업자 비용 처리 가능</h1>
                                <p>개인 사업자 고객님과 법인 사업자 고객님들을 모두 생각하여<br/>사업자 비용을 처리하실 수 있도록 지원하고 있습니다.</p>
                            </div>
                            <div className='Enter_RENTColumnText'>
                                <h1><span>04</span> 신용도에 영향 X</h1>
                                <p>고객님께서 저희 서비스를 사용을 하여 차량을 받으셔도<br/>고객님의 신용도에는 전혀 영향이 없습니다.</p>
                            </div>
                        </div>
                    </div>
                    <div className='Enter_line'></div>
                </div>

                <div className='Enter_LEASESection'>
                    <div className='Enter_TitleHead'>
                        <p>LEASE</p>
                    </div>
                    <div className='Enter_TitleTextSeciton'>
                        <div className='Enter_TitleText'>
                            <h1>DS AUTOLINE의<br/> 리스는 이런 장점이 있습니다.</h1>
                        </div>
                    </div>
                    <div className='Enter_RENTTextSection'>
                        <div className='Enter_RENTColumnHead'>
                            <div className='Enter_RENTColumnText'>
                                <h1><span>01</span> 낮은 초기비용과 유지 비용</h1>
                                <p>낮은 초기 비용과 유지 비용을 통하여 고객님들께서 부담을<br/>덜 가지실 수 있도록 해드립니다.</p>
                            </div>
                            <div className='Enter_RENTColumnText'>
                                <h1><span>02</span> 건강보험료, 재산세 할증 부담 X</h1>
                                <p>고객님의 건강보험료와 재산세에 대한 할증을 부담하지 않으셔도 됩니다.</p>
                            </div>
                        </div>
                        <div className='Enter_RENTColumnHead'>
                            <div className='Enter_RENTColumnText'>
                                <h1><span>03</span> 보험 경력 유지</h1>
                                <p>고객님께서 서비스를 이용하신 후에도 보험 경력을 변경되지 않고<br/>기존 고객님의 보험 경력이 그대로 유지됩니다.</p>
                            </div>
                            <div className='Enter_RENTColumnText'>
                                <h1><span>04</span> 개인 사업자, 법인 사업자 비용 처리 가능</h1>
                                <p>개인 사업자 고객님과 법인 사업자 고객님들을 모두 생각하여<br/>사업자 비용을 처리하실 수 있도록 지원하고 있습니다.</p>
                            </div>
                        </div>
                    </div>
                    <div className='Enter_line'></div>
                    
                <div className='Enter_PROCESSSection'>
                    <div className='Enter_TitleHead'>
                        <p>PROCEDURE</p>
                    </div>
                    <div className='Enter_TitleTextSeciton'>
                        <div className='Enter_TitleText'>
                            <h1>DS AUTOLINE은<br/> 계약 진행 절차는 다음과 같습니다.</h1>
                        </div>
                    </div>
                    <div className='Enter_Process'>
                        <div className='process-item'>
                            <img src='/1.png' alt='Process Check' className='process-icon1'/>
                            <p>견적서 발송</p>
                        </div>
                        <img src='/7.png' alt='Process Check' className='process-icon7'/>
                        <div className='process-item'>
                            <img src='/2.png' alt='Process Check' className='process-icon2'/>
                            <p>필요 서류 준비</p>
                        </div>
                        <img src='/7.png' alt='Process Check' className='process-icon7'/>
                        <div className='process-item'>
                            <img src='/3.png' alt='Process Check' className='process-icon3'/>
                            <p>심사 및 승인</p>
                        </div>
                        <img src='/7.png' alt='Process Check' className='process-icon7'/>
                        <div className='process-item'>
                            <img src='/4.png' alt='Process Check' className='process-icon4'/>
                            <p>계약 완료</p>
                        </div>
                        <img src='/7.png' alt='Process Check' className='process-icon7'/>
                        <div className='process-item'>
                            <img src='/5.png' alt='Process Check' className='process-icon5'/>
                            <p>인도지 출고</p>
                        </div>
                        <img src='/7.png' alt='Process Check' className='process-icon7'/>
                        <div className='process-item'>
                            <img src='/6.png' alt='Process Check' className='process-icon6'/>
                            <p>사후 관리</p>
                        </div>
                    </div>
                </div>  
                <div className='Enter_line'></div>
                </div>

                <div className='Enter_WHERESection'>
                    <div className='Enter_TitleHead'>
                        <p>WHERE</p>
                    </div>
                    <div className='Enter_TitleTextSeciton'>
                        <div className="GuideSection">
                            <h1>DS오토라인 오시는 길</h1>
                            <div className='GuideMapSection'>
                                <div id="map"></div>
                            </div>
                        </div>
                    </div>
                </div> 
                <div className='Space'></div>
                
            </div>
            <Footer />
        </>
    );
}

export default EnterPage;
