import React, { useState, useEffect } from 'react';
import '../styles/Partner.css'
import { partnerList } from '../assets/item';

const renderPartnerImages = (list, repeatCount) => {
    const images = list.map((item, index) => (
        <img key={`${item.name}-${index}`} src={require(`../assets/img/partner/${item.img}.png`)} alt={item.name} />
    ));
    return [...Array(repeatCount)].flatMap(() => images); // 리스트 반복
};

export const PartnerSection = () => {
    const [translateValue, setTranslateValue] = useState(0);
    let intervalId;

    // 애니메이션 업데이트 함수
    const updateTransform = (direction) => {
        const element1 = document.querySelector('.partnerSection > span:nth-of-type(1) > span:nth-of-type(1)');
        const element2 = document.querySelector('.partnerSection > span:nth-of-type(1) > span:nth-of-type(2)');

        // 방향에 따라 이동값 변경
        const moveValue = direction === 'right' ? translateValue - 1280 * 0.2 : translateValue + 1280 * 0.2;

        // 요소에 transform 적용
        element1.style.transform = `translateX(${moveValue}px)`;
        element2.style.transform = `translateX(${moveValue}px)`;

        // 상태 업데이트 (translateValue를 업데이트하여 항상 최신 값 유지)
        setTranslateValue(moveValue);
    };

    // 자동 애니메이션 (오른쪽으로 자동 이동)
    const startAutoScroll = () => {
        intervalId = setInterval(() => {
            updateTransform('right'); // 오른쪽으로 이동
        }, 3000); // 3초마다 실행
    };

    // 버튼 클릭 이벤트 핸들러
    const handleButtonClick = (direction) => {
        clearInterval(intervalId); // 버튼 클릭 시 자동 스크롤 멈춤
        updateTransform(direction); // 클릭한 방향으로 이동
        startAutoScroll(); // 다시 자동 스크롤 시작
    };

    // 초기 자동 스크롤 시작
    useEffect(() => {
        startAutoScroll(); // 페이지 로드 시 자동 스크롤 시작
        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 스크롤 중지
    }, [translateValue]); // translateValue가 변경될 때마다 스크롤 재시작

    return (
        <section className="partnerSection">
            <h1>제휴 <span>파트너사</span></h1>
            <span>
                <span>
                    {renderPartnerImages(partnerList.slice(0, ((partnerList.length / 2) + 1)), 50)}
                </span>
                <span>
                    {renderPartnerImages(partnerList.slice(((partnerList.length / 2) + 1), partnerList.length), 50)}
                </span>
            </span>
            <span>
                <button onClick={() => handleButtonClick('left')}>＜</button>
                <button onClick={() => handleButtonClick('right')}>＞</button>
            </span>
        </section>
    );
};











export const Mobile_PartnerSection = () => {
    const [translateValue, setTranslateValue] = useState(0);
    let intervalId;

    // 애니메이션 업데이트 함수
    const updateTransform = (direction) => {
        const element1 = document.querySelector('.mobile_partnerSection > span:nth-of-type(1) > span:nth-of-type(1)');
        const element2 = document.querySelector('.mobile_partnerSection > span:nth-of-type(1) > span:nth-of-type(2)');

        // 방향에 따라 이동값 변경
        const moveValue = direction === 'right' ? translateValue - (document.body.clientWidth * 0.9) * 0.25 : translateValue + (document.body.clientWidth * 0.9) * 0.25;

        // 요소에 transform 적용
        element1.style.transform = `translateX(${moveValue}px)`;
        element2.style.transform = `translateX(${moveValue}px)`;

        // 상태 업데이트 (translateValue를 업데이트하여 항상 최신 값 유지)
        setTranslateValue(moveValue);
    };

    // 자동 애니메이션 (오른쪽으로 자동 이동)
    const startAutoScroll = () => {
        intervalId = setInterval(() => {
            updateTransform('right'); // 오른쪽으로 이동
        }, 3000); // 3초마다 실행
    };

    // 버튼 클릭 이벤트 핸들러
    const handleButtonClick = (direction) => {
        clearInterval(intervalId); // 버튼 클릭 시 자동 스크롤 멈춤
        updateTransform(direction); // 클릭한 방향으로 이동
        startAutoScroll(); // 다시 자동 스크롤 시작
    };

    // 초기 자동 스크롤 시작
    useEffect(() => {
        startAutoScroll(); // 페이지 로드 시 자동 스크롤 시작
        return () => clearInterval(intervalId); // 컴포넌트 언마운트 시 스크롤 중지
    }, [translateValue]); // translateValue가 변경될 때마다 스크롤 재시작

    return (
        <section className="mobile_partnerSection">
            <h1>제휴 <span>파트너사</span></h1>
            <span>
                <span>
                    {renderPartnerImages(partnerList.slice(0, ((partnerList.length / 2) + 1)), 50)}
                </span>
                <span>
                    {renderPartnerImages(partnerList.slice(((partnerList.length / 2) + 1), partnerList.length), 50)}
                </span>
            </span>
            <span>
                <button onClick={() => handleButtonClick('left')}>＜</button>
                <button onClick={() => handleButtonClick('right')}>＞</button>
            </span>
        </section>
    );
};

