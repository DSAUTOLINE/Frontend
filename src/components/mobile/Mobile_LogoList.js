import React, { useState, useEffect } from "react";
import '../../styles/mobile/Mobile_QuickFAQ.css'
import { enterListAxios } from "../../services/Request";
import Loading from "../../components/Loading";


export const Mobile_LogoList = (props) => {
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
        <>
            <section className="mobile_logoListSection">
                <button
                    className={props.categoryStat === '국산' && 'selected'}
                    onClick={() => { props.setCategoryStat('국산'); props.setBrandStat(props.all ? 'all' : '기아')}}
                >국산 브랜드</button>
                <button
                    className={props.categoryStat === '수입' && 'selected'}
                    onClick={() => { props.setCategoryStat('수입'); props.setBrandStat(props.all ? 'all' : 'BMW')}}
                >수입 브랜드</button>
                <span>
                    {props.all &&
                        <div
                            onClick={() => props.setBrandStat('all')}
                            className={props.brandStat === 'all' && 'selected'}
                        >
                            <span>
                                <img src={`${process.env.REACT_APP_IMG_URL}/AllLogo.png`} alt="전체" />
                            </span>
                            <p>전체</p>
                        </div>
                    }
                    {props.categoryStat === '국산'
                        ? enterList.filter(list => list.entry === '국산').map((item, _) => (
                            <div
                                onClick={() => props.setBrandStat(`${item.enter}`)}
                                className={props.brandStat === `${item.enter}` && 'selected'}
                            >
                                <span>
                                    <img src={`${process.env.REACT_APP_IMG_URL}/${item.logo_img}.png`} alt={`${item.enter} 로고`} />
                                </span>
                                <p>{item.enter}</p>
                            </div>
                        ))
                        : enterList.filter(list => list.entry === '수입').map((item, _) => (
                            <div
                                onClick={() => props.setBrandStat(`${item.enter}`)}
                                className={props.brandStat === `${item.enter}` && 'selected'}
                            >
                                <span>
                                    <img src={`${process.env.REACT_APP_IMG_URL}/${item.logo_img}.png`} alt={`${item.enter} 로고`} />
                                </span>
                                <p>{item.enter}</p>
                            </div>
                        ))
                    }
                </span>
            </section>
        </>
    )
}