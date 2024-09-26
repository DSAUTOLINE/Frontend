import React, { useState, useEffect } from 'react';
import '../styles/Admin_Content.css'
import {
    colorGetAxios,
    colorAddAxios,
    colorDeleteAxios,
    optionGetAxios,
    optionDeleteAxios,
    optionAddAxios,
} from '../services/Request';
import NoCardList from './NoCardList'



export function Admin_ColorOption() {
    const [searchValue, setSearchValue] = useState('');
    const [colorName, setColorName] = useState('');
    const [colorRGB, setColorRGB] = useState('');
    const [items, setItems] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await colorGetAxios()
            setItems(response)
        }
        fetchData()
    }, [])


    // 검색어를 포함하는 항목 필터링 (items가 null이 아닐 때만 실행)
    const filteredItems = items ? items.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    ) : [];


    const handleAddColor = async () => {
        if (colorName && colorRGB.slice(0, 1) === '#' && (colorRGB.length === 7 || colorRGB.length === 4)) {
            await colorAddAxios({
                name: colorName,
                rgb: colorRGB,
            })
            setItems([...items, { name: colorName, rgb: colorRGB }]);
            setColorName(''); // 입력 필드 초기화
            setColorRGB(''); // 입력 필드 초기화
        } else {
            alert('내용이 입력되지 않았습니다')
        }
    };


    return (
        <>
            <section className='admin_content_colorAddSection'>
                <div>
                    <h1>외장 색상</h1>
                    <input
                        placeholder='색상을 검색해주세요'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <div className='admin_content_colorCard title'>
                        <p>색상</p>
                        <p>색상명</p>
                        <p>생상 코드</p>
                    </div>
                    <span></span>
                    <div className='admin_content_colorCardList'>
                        {filteredItems.length === 0 && <NoCardList card={'색상이'} />}
                        {filteredItems.map((item, idx) => (
                            <div className='admin_content_colorCard'>
                                <span style={{ backgroundColor: item.rgb }}></span>
                                <p>{item.name}</p>
                                <p>{item.rgb}</p>
                                <button
                                    onClick={async () => {
                                        await colorDeleteAxios(item.seq)
                                        setItems(items.filter(list => list.seq !== item.seq))
                                    }}>
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3>색상명</h3>
                    <input
                        placeholder='ex) 아이스 블루'
                        value={colorName}
                        onChange={(e) => setColorName(e.target.value)}
                    />
                    <h3>색상 코드</h3>
                    <input
                        placeholder='ex) #ededed'
                        value={colorRGB}
                        onChange={(e) => setColorRGB(e.target.value)}
                    />
                    <button onClick={handleAddColor}>추가하기</button>
                </div>
            </section>
        </>
    );
}



export function Admin_Option() {
    const [searchValue, setSearchValue] = useState('');
    const [optionName, setOptionName] = useState('');
    const [optionPrice, setOptionPrice] = useState('');

    const [items, setItems] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await optionGetAxios()
            setItems(response)
        }
        fetchData()
    }, [])


    // 검색어를 포함하는 항목 필터링 (items가 null이 아닐 때만 실행)
    const filteredItems = items ? items.filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
    ) : [];

    const handleAddOption = async () => {
        if (optionName !== '' && optionPrice !== '') {
            await optionAddAxios({
                name: optionName,
                price: optionPrice,
                img: null,
            })
            //await imageUploadAxios(img, `option_${random}`)
            setItems([...items, { name: optionName, price: optionPrice }]);
            setOptionName(''); // 입력 필드 초기화
            setOptionPrice(''); // 입력 필드 초기화
        } else {
            alert('내용이 입력되지 않았습니다')
        }
    };

    return (
        <>
            <section className='admin_content_colorAddSection'>
                <div>
                    <h1>옵션</h1>
                    <input
                        placeholder='옵션을 검색해주세요'
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                    />
                    <div className='admin_content_optionCard title'>
                        <p>옵션명</p>
                        <p>금액</p>
                    </div>
                    <span></span>
                    <div className='admin_content_optionCardList'>
                        {filteredItems.length === 0 && <NoCardList card={'옵션이'} />}
                        {filteredItems.map((item, idx) => (
                            <div className='admin_content_optionCard'>
                                <p>{item.name}</p>
                                <p>{(item.price / 10000).toLocaleString()} 만원</p>
                                <button
                                    onClick={async () => {
                                        await optionDeleteAxios(item.seq)
                                        setItems(items.filter(list => list.seq !== item.seq))
                                    }}>
                                    삭제
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
                <div>
                    <h3>옵션명</h3>
                    <input
                        placeholder='ex) 파노라마 선루프'
                        value={optionName}
                        onChange={(e) => setOptionName(e.target.value)}
                    />
                    <h3>금액</h3>
                    <input
                        placeholder='최소 만원 단위로 0 모두 붙여주세요'
                        value={optionPrice}
                        type='number'
                        onChange={(e) => setOptionPrice(e.target.value)}
                    />
                    <button onClick={handleAddOption}>추가하기</button>
                </div>
            </section>
        </>
    );
}