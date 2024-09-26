/**
 * 슬라이더 이벤트 구현
 * @param {*} ref
 */
export const handleNext = (ref) => {
    if (ref.current) {
        ref.current.slickNext(); // 다음 슬라이드로 이동
    }

};
export const handlePrev = (ref) => {
    if (ref.current) {
        ref.current.slickPrev(); // 다음 슬라이드로 이동
    }
};


export const hotDealSlicerSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
};


export const reviewSlicerSettings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
};

