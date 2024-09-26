import React, { useEffect, useState } from 'react';
import { SearchIcon, CloseIcon } from './Icons'
import '../styles/GNB.css'
import DSAutoLine from '../assets/img/dsautoline/DSAUTOLINE.png'
import { quickFAQAxios } from '../services/Request';



/**
 * GNB
 * @param {*} props 
 * @returns 
 */
const GNB = (props) => {
    const [searchValue, setSearchValue] = useState('')
    const [searchList, setSearchList] = useState([])
    const [GNBSearchList, setGNBSearchList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await quickFAQAxios(null, null, null)
            setGNBSearchList(response)
        }
        fetchData()
    }, [])


    useEffect(() => {
        const fetchData = () => {
            if (GNBSearchList) {
                setSearchList(
                    GNBSearchList.filter(item =>
                        item.name.toLowerCase().includes(searchValue.toLowerCase())
                    )
                );
            }
        };
        fetchData();
    }, [searchValue, GNBSearchList]);


    return (
        <div className='GNB scrolled'>
            <div className='GNBListDiv'>
                {/* <MenuIcon size={25} color={'white'} /> */}
                <a href='/'><img src={DSAutoLine} alt='DS Auto Line' /></a>
                <span>
                    <a className='listA' href='/QuickFAQ'><p className={props.page === '빠른 간편 문의' ? 'selected' : ''}>빠른 간편 문의</p></a>
                    <a className='listA' href='/HotDeal'><p className={props.page === '한정 특가' ? 'selected' : ''}>한정 특가</p></a>
                    <a className='listA' href='/QuickDeal'><p className={props.page === '즉시 출고' ? 'selected' : ''}>즉시 출고</p></a>
                    <a className='listA' href='/Event'><p className={props.page === '이벤트/프로모션' ? 'selected' : ''}>이벤트/프로모션</p></a>
                    <a className='listA' href='/Review'><p className={props.page === '고객 리뷰' ? 'selected' : ''}>고객 리뷰</p></a>
                    <a className='listA' href='/Enter'><p className={props.page === '회사소개' ? 'selected' : ''}>회사소개</p></a>
                </span>
                <div className='GNBSearchDiv'>
                    <input value={searchValue} onChange={(e) => setSearchValue(e.target.value)} placeholder='차종을 검색하세요' />
                    <span>
                        <SearchIcon size={25} color={'#111'} />
                    </span>
                    {searchValue !== '' &&
                        <div className='GNBSearchListDiv'>
                            {searchList.length === 0 &&
                                <div className='GNBSearchListCard'>
                                    <p style={{color: '#bbb'}}>검색 결과가 없습니다</p>
                                </div>}
                            {searchList.length > 0 && searchList.map((item, idx) => (
                                <div className='GNBSearchListCard'>
                                    <p onClick={() => window.location.href=`/Option/${item.car_code}`}>{item.name}</p>
                                </div>
                            ))}
                            <span>
                                <span onClick={() => setSearchValue('')}>
                                    <CloseIcon size={25} color={'#111'} />
                                </span>
                            </span>
                        </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default GNB