import React, { useEffect, useState } from 'react'
import '../styles/LogoList.css'
import { enterListAxios } from '../services/Request'
import Loading from "../components/Loading";







export const KoreaLogo = (props) => {
    const stat = props.brandStat;

    const [enterList, setEnterList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await enterListAxios()
            setEnterList(response)
        }
        fetchData()
    }, [])


    if (!enterList) {
        return (
            <Loading />
        )
    }
    return (
        <div className='koreaLogoDiv'>
            {props.all && (
                <div
                    onClick={() => props.setStat('all')}
                    className={stat === 'all' ? 'selectedLogo' : ''}
                >
                    <img src={`${process.env.REACT_APP_IMG_URL}/AllLogo.png`} alt="전체" />
                    <p>전체</p>
                </div>
            )}
            {enterList.filter(list => list.entry === '국산').map((item, _) => (
                <div
                    onClick={() => props.setStat(`${item.enter}`)}
                    className={stat === `${item.enter}` ? 'selectedLogo' : ''}
                >
                    <img src={`${process.env.REACT_APP_IMG_URL}/${item.logo_img}.png`} alt={`${item.enter} 로고`} />
                    <p>{item.enter}</p>
                </div>
            ))}
        </div>
    );
}





export const IncomeLogo = (props) => {
    const stat = props.brandStat;

    const [enterList, setEnterList] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            const response = await enterListAxios()
            setEnterList(response)
        }
        fetchData()
    }, [])


    if (!enterList) {
        return (
            <Loading />
        )
    }
    return (
        <div className='koreaLogoDiv'>
            {props.all && (
                <div
                    onClick={() => props.setStat('all')}
                    className={stat === 'all' ? 'selectedLogo' : ''}
                >
                    <img src={`${process.env.REACT_APP_IMG_URL}/AllLogo.png`} alt="전체" />
                    <p>전체</p>
                </div>
            )}
            {enterList.filter(list => list.entry === '수입').map((item, _) => (
                <div
                    onClick={() => props.setStat(`${item.enter}`)}
                    className={stat === `${item.enter}` ? 'selectedLogo' : ''}
                >
                    <img src={`${process.env.REACT_APP_IMG_URL}/${item.logo_img}.png`} alt={`${item.enter} 로고`} />
                    <p>{item.enter}</p>
                </div>
            ))}
        </div>
    );
}