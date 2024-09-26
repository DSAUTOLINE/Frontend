import React from 'react';
import ReactLoading from 'react-loading';

const Loading = () => (
    <div style={{width: '100vw', height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
        <ReactLoading type={'bars'} color={'#0064FF'} height={300} width={150} />
        <h3 style={{fontSize: 16, fontWeight: 400, color: '#767676', margin: 0}}>데이터 로딩중입니다. 약간의 시간이 소요될 수 있습니다.</h3>
    </div>
);

export default Loading;