import React, { useState, useEffect } from "react";
import GNB from "../components/GNB";
import Footer from "../components/Footer";
import FastFAQSticky from '../components/FastFAQSticky'
import '../styles/ReviewAddPage.css'
import { StarIcon } from "../components/Icons";
import { ReviewAddPagePopUp } from "../components/PopUp";
import { reviewAddAxios, carEnterListAxios, imageUploadAxios } from "../services/Request";
import { imageResize4_3, generateRandomString } from "../utils/imageResize";
import Select from "react-select";
import Loading from "../components/Loading";





const ReviewAddPage = () => {
    const [popupStat, setPopupStat] = useState(false)

    //insert
    const [name, setName] = useState('')
    const [car, setCar] = useState('')
    const [enter, setEnter] = useState('')
    const [starStat, setStarStat] = useState(0)
    const [img, setImg] = useState(null)
    const [comment, setComment] = useState('')


    const [axiosList, setAxiosList] = useState(null)
    const [enterOptions, setEnterOptions] = useState(null)
    const [carOptions, setCarOptions] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await carEnterListAxios()
            setAxiosList(response)
            // 중복을 제거한 제조사 목록을 생성
            setEnterOptions(Array.from(
                new Set(response.map(item => item.enter))
            ).map(enter => ({
                value: enter,
                label: enter
            })));

            // 중복을 제거한 자동차 모델 목록을 생성
            setCarOptions(Array.from(
                new Set(response.map(item => item.name))
            ).map(name => ({
                value: name,
                label: name
            })));
        }
        fetchData()
    }, [])

    const clickFunction = async () => {
        if (name !== '' && car !== '' && enter !== '' && img !== null && starStat >= 1 && comment !== '') {
            const random = generateRandomString(15)
            await reviewAddAxios({
                car_name: car,
                enter: enter,
                name: name,
                img: `review_${random}`,
                star: starStat,
                comment: comment,
            })
            await imageUploadAxios(img, `review_${random}`)
            setPopupStat(true);
            document.body.style.overflowY = 'hidden'
        } else {
            alert('내용이 입력되지 않았습니다')
        }
    }




    if (!axiosList) {
        return (
            <Loading />
        )
    }
    return (
        <>
            {popupStat &&
                <ReviewAddPagePopUp />
            }
            <GNB page={'고객 리뷰'} />
            <FastFAQSticky height={450} />
            <section className="reviewAdd_inputSection">
                <h1>리뷰 작성</h1>
                <p>서비스가 어떠셨나요?? 리뷰로 알려주세요</p>
                <span>
                    <h3>이름</h3>
                    <input maxLength={10} value={name} onChange={(e) => setName(e.target.value)} />
                </span>
                <span>
                    <h3>기업</h3>
                    <Select
                        className="selectItem"
                        onChange={(e) => setEnter(e.value)}
                        options={enterOptions}
                        placeholder="유형 선택"
                        value={enterOptions.filter(function (option) {
                            return option.value === enter;
                        })}
                    />
                    <h3 style={{ marginLeft: 50 }}>차량</h3>
                    <Select
                        className="selectItem"
                        onChange={(e) => setCar(e.value)}
                        options={carOptions}
                        placeholder="유형 선택"
                        value={carOptions.filter(function (option) {
                            return option.value === car;
                        })}
                    />
                </span>
                <span>
                    <h3>별점</h3>
                    {Array.from({ length: 5 }, (_, index) => (
                        <span onClick={() => setStarStat(index + 1)}>
                            <StarIcon
                                key={index}
                                size={31}
                                color={index < starStat ? '#FBDA03' : '#9FA5AB'}
                            />
                        </span>
                    ))}
                </span>
                <span>
                    <h3>사진</h3>
                    <img
                        src={require('../assets/img/popup/imageUpload.png')}
                        alt="이미지 업로드 이미지"
                        onClick={() => document.getElementById('fileInput').click()}
                    />
                    <input
                        id="fileInput"
                        type="file"
                        accept="image/*"
                        style={{ display: 'none' }}
                        onChange={async (e) => {
                            const resizedImage = await imageResize4_3(e);
                            setImg(resizedImage);
                        }}
                    />
                    <p style={{marginLeft: 50}}>{img && `${img.slice(5, 50)}...`}</p>
                </span>
                <span>
                    <h3>내용</h3>
                    <textarea value={comment} onChange={(e) => setComment(e.target.value)} />
                </span>
                <button onClick={clickFunction}>작성 완료</button>
            </section>
            <Footer />
        </>
    )
}


export default ReviewAddPage