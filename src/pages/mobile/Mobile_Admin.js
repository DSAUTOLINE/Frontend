import React, { useState, useEffect } from "react";
import '../../styles/mobile/Mobile_Admin.css'
import { Mobile_Admin_UserCompletedList, Mobile_Admin_UserIncompleteList } from '../../components/mobile/Mobile_Admin_Content'
import Admin_Login from "../../components/Admin_Login";





const Mobile_Admin = (props) => {
    const [listStat, setListStat] = useState(0)

    return (
        <div className="mobile_container">
            {listStat === 0
                ? <>
                    <div className='admin_headerSection'>
                        <div className='admin_header'>
                            <img src={require('../../assets/img/dsautoline/dsautoline_white.png')} onClick={() => window.location.href = '/'} />
                        </div>
                    </div>
                    <Admin_Login width={'90%'} height={'90%'} setLogin={setListStat}/>
                </>
                : <section className="mobile_admin_listSection">
                    <button onClick={() => setListStat(1)} className={listStat === 1 && 'selected'}>미완료 고객</button>
                    <button onClick={() => setListStat(2)} className={listStat === 2 && 'selected'}>완료 고객</button>
                    {listStat === 1 && <Mobile_Admin_UserIncompleteList />}
                    {listStat === 2 && <Mobile_Admin_UserCompletedList />}
                </section>
            }
        </div>
    )
}

export default Mobile_Admin