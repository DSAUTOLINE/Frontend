import React, { useState, useEffect } from 'react';
import '../styles/Admin_Sidebar.css'
import { UpIcon, DownIcon, RightIcon } from '../components/Icons'

function Admin_Sidebar(props) {
    const [categoryStat, setCategoryStat] = useState(null)

    const pageStat = props.pageStat;
    const setPageStat = props.setPageStat;


    return (
        <div className="admin_Sidebar_sidebar">
            <div className="menu">
                <span onClick={() => setCategoryStat(categoryStat === 1 ? null : 1)}>
                    <p>빠른 간편 문의</p>
                    <span>
                        {categoryStat === 1
                            ? <UpIcon size={20} color={'#bbb'} />
                            : <DownIcon size={20} color={'#bbb'} />
                        }
                    </span>
                </span>
                {categoryStat === 1 &&
                    <div className='admin_Sidebar_categoryDiv'>
                        <p className={pageStat === 1.1 && 'selected'} onClick={() => setPageStat(1.1)}>차량 추가</p>
                        <p className={pageStat === 1.2 && 'selected'} onClick={() => setPageStat(1.2)}>차량 관리</p>
                    </div>
                }
                <span onClick={() => setCategoryStat(categoryStat === 2 ? null : 2)}>
                    <p>한정 특가</p>
                    <span>
                        {categoryStat === 2
                            ? <UpIcon size={20} color={'#bbb'} />
                            : <DownIcon size={20} color={'#bbb'} />
                        }
                    </span>
                </span>
                {categoryStat === 2 &&
                    <div className='admin_Sidebar_categoryDiv'>
                        <p className={pageStat === 2.1 && 'selected'} onClick={() => setPageStat(2.1)}>차량 추가</p>
                        <p className={pageStat === 2.2 && 'selected'} onClick={() => setPageStat(2.2)}>차량 관리</p>
                    </div>
                }
                <span onClick={() => setCategoryStat(categoryStat === 3 ? null : 3)}>
                    <p>즉시 출고</p>
                    <span>
                        {categoryStat === 3
                            ? <UpIcon size={20} color={'#bbb'} />
                            : <DownIcon size={20} color={'#bbb'} />
                        }
                    </span>
                </span>
                {categoryStat === 3 &&
                    <div className='admin_Sidebar_categoryDiv'>
                        <p className={pageStat === 3.1 && 'selected'} onClick={() => setPageStat(3.1)}>차량 추가</p>
                        <p className={pageStat === 3.2 && 'selected'} onClick={() => setPageStat(3.2)}>차량 관리</p>
                    </div>
                }
                <span onClick={() => setCategoryStat(categoryStat === 4 ? null : 4)}>
                    <p>이벤트</p>
                    <span>
                        {categoryStat === 4
                            ? <UpIcon size={20} color={'#bbb'} />
                            : <DownIcon size={20} color={'#bbb'} />
                        }
                    </span>
                </span>
                {categoryStat === 4 &&
                    <div className='admin_Sidebar_categoryDiv'>
                        <p className={pageStat === 4.1 && 'selected'} onClick={() => setPageStat(4.1)}>이벤트 추가</p>
                        <p className={pageStat === 4.2 && 'selected'} onClick={() => setPageStat(4.2)}>이벤트 관리</p>
                    </div>
                }
                <span onClick={() => { setCategoryStat(null); setPageStat(5) }} className={pageStat === 5 && 'selected'}>
                    <p>리뷰</p>
                    <span>
                        <RightIcon size={25} color={'#bbb'} />
                    </span>
                </span>
                <span onClick={() => setCategoryStat(categoryStat === 6 ? null : 6)}>
                    <p>옵션 관리</p>
                    <span>
                    <span>
                        {categoryStat === 6
                            ? <UpIcon size={20} color={'#bbb'} />
                            : <DownIcon size={20} color={'#bbb'} />
                        }
                    </span>
                    </span>
                </span>
                {categoryStat === 6 &&
                    <div className='admin_Sidebar_categoryDiv'>
                        <p className={pageStat === 6.1 && 'selected'} onClick={() => setPageStat(6.1)}>외장 색상</p>
                        <p className={pageStat === 6.2 && 'selected'} onClick={() => setPageStat(6.2)}>옵션</p>
                    </div>
                }
                <span onClick={() => setCategoryStat(categoryStat === 7 ? null : 7)}>
                    <p>고객 리스트</p>
                    <span>
                        {categoryStat === 7
                            ? <UpIcon size={20} color={'#bbb'} />
                            : <DownIcon size={20} color={'#bbb'} />
                        }
                    </span>
                </span>
                {categoryStat === 7 &&
                    <div className='admin_Sidebar_categoryDiv'>
                        <p className={pageStat === 7.1 && 'selected'} onClick={() => setPageStat(7.1)}>완료 고객</p>
                        <p className={pageStat === 7.2 && 'selected'} onClick={() => setPageStat(7.2)}>미완료 고객</p>
                    </div>
                }
            </div>
        </div>
    );
}

export default Admin_Sidebar;