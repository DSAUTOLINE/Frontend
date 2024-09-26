/**
 * 메인 페이지 - 한정 특가 및 즉시 출고에 사용
 * @returns 카드 크기
 */
export const mainResize = () => {
    if (document.body.clientWidth < 700) {
        return (((document.body.clientWidth * 0.95) - 0) / 1);
    } else if (document.body.clientWidth < 1070) {
        return (((document.body.clientWidth * 0.95) - 30) / 2);
    } else if (document.body.clientWidth < 1450) {
        return (((document.body.clientWidth * 0.95) - 60) / 3);
    } else if (document.body.clientWidth < 1700) {
        return (((document.body.clientWidth * 0.95) - 90) / 4);
    } else {
        return (((document.body.clientWidth * 0.95) - 120) / 5);
    }
};


/**
 * 빠른 간편 문의에 사용
 * @returns 카드 크기
 */
export const quickResize = () => {
    // ~ 989 : 2개 
    // 990 ~ 1239 : 3개
    // 1240 ~ : 4개
    // 1500 ~ : 5개
    if (window.innerWidth < 500) {
        return (((window.innerWidth * 0.95) - 0) / 1);
    } else if (window.innerWidth < 990) {
        return (((window.innerWidth * 0.95) - 51) / 2);
    } else if (window.innerWidth < 1450) {
        return (((window.innerWidth * 0.95) - 83) / 3);
    } else if (window.innerWidth < 1929) {
        return (((window.innerWidth * 0.95) - 115) / 4);
    } else {
        return (((window.innerWidth * 0.95) - 147) / 5);
    }
};





/**
 * 메인 페이지 - 우수 카멘토
 * @returns 카드 크기
 */
export const carmentoResize = () => {
    if (window.innerWidth < 850) {
        return (((window.innerWidth * 0.95) - 45) / 2);
    } else if (window.innerWidth < 1150) {
        return (((window.innerWidth * 0.95) - 75) / 3);
    } else if (window.innerWidth < 1400) {
        return (((window.innerWidth * 0.95) - 105) / 4);
    } else if (window.innerWidth < 1650) {
        return (((window.innerWidth * 0.95) - 135) / 5);
    } else {
        return ((window.innerWidth * 0.95) - 165) / 6;
    }

};



/**
 * 메인 페이지 - 인기 차량 리스트
 * @returns 카드 크기
 */
export const popularResize = () => {
    if (window.innerWidth < 500) {
        return 1
    } else if (window.innerWidth < 990) {
        return  2
    } else if (window.innerWidth < 1450) {
        return  3
    } else if (window.innerWidth < 1929) {
        return 4
    } else {
        return 5
    }
};