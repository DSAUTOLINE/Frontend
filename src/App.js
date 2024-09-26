import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

//PC
import MainPage from './pages/MainPage';
import EventPage from './pages/EventPage';
import EventDetailPage from './pages/EventDetailPage';
import EnterPage from './pages/EnterPage';
import QuickFAQPage from './pages/QuickFAQPage';
import HotDealPage from './pages/HotDealPage';
import QuickDealPage from './pages/QuickDealPage';
import OptionPage from './pages/OptionPage';
import ReviewPage from './pages/ReviewPage';
import ReviewMorePage from './pages/ReviewMorePage';
import ReviewAddPage from './pages/ReviewAddPage';
import AdminPage from './pages/AdminPage';


//Mobile
import Mobile_MainPage from './pages/mobile/Mobile_MainPage';
import Mobile_HotDeal from './pages/mobile/Mobile_HotDeal';
import Mobile_Event from './pages/mobile/Mobile_Event';
import Mobile_EventMore from './pages/mobile/Mobile_EventMore';
import Mobile_Review from './pages/mobile/Mobile_Review';
import Mobile_ReviewAdd from './pages/mobile/Mobile_ReviewAdd';
import Mobile_ReviewMore from './pages/mobile/Mobile_ReviewMore';
import Mobile_QuickFAQ from './pages/mobile/Mobile_QuickFAQ';
import Mobile_QuickDeal from './pages/mobile/Mobile_QuickDeal';
import Mobile_Option from './pages/mobile/Mobile_Option'
import Mobile_Enter from './pages/mobile/Mobile_Enter';
import Mobile_Admin from './pages/mobile/Mobile_Admin';

function App() {
	useEffect(() => {
		document.body.style.overflowX = 'hidden';
	}, [])

	const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

	return (
		<Router>
			<div>
				<Routes>
					{/* 메인 페이지 */}
					<Route path="/" element={isMobile ? <Mobile_MainPage /> : <MainPage />} />

					{/* 이벤트 페이지 */}
					<Route path="/Event" element={isMobile ? <Mobile_Event /> : <EventPage />} />
					<Route path="/Event/:id" element={isMobile ? <Mobile_EventMore /> : <EventDetailPage />} />

					{/* 회사소개 페이지 */}
					<Route path="/Enter" element={isMobile ? <Mobile_Enter /> : <EnterPage />} />

					{/* 빠른 간편 문의 페이지 */}
					<Route path='/QuickFAQ' element={isMobile ? <Mobile_QuickFAQ /> : <QuickFAQPage />} />

					{/* 한정 특가 페이지 */}
					<Route path='/HotDeal' element={isMobile ? <Mobile_HotDeal /> : <HotDealPage />} />

					{/* 즉시 출고 페이지 */}
					<Route path='/QuickDeal' element={isMobile ? <Mobile_QuickDeal /> : <QuickDealPage />} />

					{/* 옵션 선택 페이지 */}
					<Route path='/Option/:id' element={isMobile ? <Mobile_Option /> : <OptionPage />} />

					{/* 리뷰 페이지 */}
					<Route path='/Review' element={isMobile ? <Mobile_Review /> : <ReviewPage />} />
					<Route path='/ReviewMore/:id' element={isMobile ? <Mobile_ReviewMore /> : <ReviewMorePage />} />
					<Route path='/ReviewAdd' element={isMobile ? <Mobile_ReviewAdd /> : <ReviewAddPage />} />

					{/* 관리자 페이지 */}
					<Route path='/zyNQVJcTYyiNwS4or4oJ' element={isMobile ? <Mobile_Admin /> : <AdminPage />} />

				</Routes>
			</div>
		</Router>
	);
}

export default App;
