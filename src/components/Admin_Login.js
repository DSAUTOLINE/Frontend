import React, { useState } from 'react';
import '../styles/Admin_Content.css'
import { loginAxios } from '../services/Request'



const Admin_Login = (props) => {
    const [id, setID] = useState('')
    const [pw, setPW] = useState('')
    const [count, setCount] = useState(5)

    return (
        <div className="admin_content">
            <div className='admin_content_loginSection'>
                <div className='admin_content_loginDiv' style={{ width: props.width, height: props.height }}>
                    <h2>로그인</h2>
                    <h3>아이디</h3>
                    <input value={id} onChange={(e) => setID(e.target.value)} />
                    <h3>비밀번호</h3>
                    <input value={pw} onChange={(e) => setPW(e.target.value)} />
                    <button
                        onClick={async () => {
                            const response = await loginAxios({ id: id, password: pw })
                            if (response.sc === 200) {
                                alert('DS AUTOLINE님 어서오세요!')
                                if (props.width === '90%') {
                                    props.setLogin(1)
                                } else {
                                    props.setLogin(7.2)
                                }
                            } else {
                                if (count === 0) {
                                    window.location.href='/'
                                }
                                setCount(count - 1)
                                alert(`5회 틀리면 서비스가 잠깁니다. ${count}회 남았습니다.`)
                            }
                        }}
                    >로그인</button>
                </div>
            </div>
        </div>
    );
}

export default Admin_Login;