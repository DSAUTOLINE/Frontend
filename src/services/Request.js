import axios from 'axios';


const dbServerUrl = process.env.REACT_APP_DB_SERVER_URL;



/**
 * 한정 특가 페이지 데이터 요청
 * @returns 
 */
export const hotDealAxios = async () => {
    try {
        const response = await axios.get(`${dbServerUrl}/hotDeal`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
}





/**
 * 즉시 출고 페이지 데이터 요청
 * @returns 
 */
export const quickDealAxios = async (entry, enter, category) => {
    let response;
    try {
        if (entry === null && enter === null && category === null) {
            response = await axios.get(`${dbServerUrl}/quickDeal?entry=&enter=&category=`)
        } else if (category === '전체' && enter === 'all') {
            response = await axios.get(`${dbServerUrl}/quickDeal?entry=${entry}&enter=&category=`)
        } else if (category === '전체') {
            response = await axios.get(`${dbServerUrl}/quickDeal?entry=${entry}&enter=${enter}&category=`)
        } else if (enter === 'all') {
            response = await axios.get(`${dbServerUrl}/quickDeal?entry=${entry}&enter=&category=${category}`)
        } else {
            response = await axios.get(`${dbServerUrl}/quickDeal?entry=${entry}&enter=${enter}&category=${category}`)
        }
        return response.data
    } catch (error) {
        // console.log(error)
    }
}





/**
 * 리뷰 페이지
 * @returns 
 */
export const reviewAxios = async (stat) => {
    try {
        const response = await axios.get(`${dbServerUrl}/review?type=${stat}`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
}




/**
 * 리뷰 상세 페이지
 * @returns 
 */
export const reviewInfoAxios = async (nid) => {
    try {
        const response = await axios.get(`${dbServerUrl}/review/${nid}`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
}


/**
 * 리뷰 작성 페이지
 * @returns 
 */
export const reviewAddAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/reviewInsert`, data)
    } catch (error) {
        // console.log(error)
    }
}





/**
 * 빠른 간편 문의 페이지
 * @returns 
 */
export const quickFAQAxios = async (entry, enter, category) => {
    let response;
    try {
        if (entry === null && enter === null && category === null) {
            response = await axios.get(`${dbServerUrl}/quickFAQ?entry=&enter=&category=`)
        } else if (category === '전체' && enter === 'all') {
            response = await axios.get(`${dbServerUrl}/quickFAQ?entry=${entry}&enter=&category=`)
        } else if (category === '전체') {
            response = await axios.get(`${dbServerUrl}/quickFAQ?entry=${entry}&enter=${enter}&category=`)
        } else if (enter === 'all') {
            response = await axios.get(`${dbServerUrl}/quickFAQ?entry=${entry}&enter=&category=${category}`)
        } else {
            response = await axios.get(`${dbServerUrl}/quickFAQ?entry=${entry}&enter=${enter}&category=${category}`)
        }
        return response.data
    } catch (error) {
        // console.log(error)
    }
}



/**
 * 이벤트 페이지
 * @returns 
 */
export const eventAxios = async (type, active) => {
    let response;
    try {
        if (type === null) {
            response = await axios.get(`${dbServerUrl}/event?type=&active=${active}`)
        } else {
            response = await axios.get(`${dbServerUrl}/event?type=${type}&active=${active}`)
        }
        return response.data
    } catch (error) {
        // console.log(error)
    }
}


/**
 * 이벤트 상세 페이지
 * @returns 
 */
export const eventInfoAxios = async (id) => {
    try {

        const response = await axios.get(`${dbServerUrl}/event/${id}`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
}



/**
 * 빠른 간편 상담
 * @returns 
 */
export const fastFAQAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/counseling`, data)
    } catch (error) {
        // console.log(error)
    }
}




/**
 * 옵션 선택 페이지 - 견적서
 * @returns 
 */
export const estimatedAxios = async (id) => {
    try {
        const response = await axios.get(`${dbServerUrl}/estimate/${id}`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
}

/**
 * 옵션 선택 페이지 - 견적서 추가
 * @returns 
 */
export const estimatedAddAxios = async (data) => {
    try {
        const response = await axios.post(`${dbServerUrl}/estimateInsert`, data)
    } catch (error) {
        // console.log(error)
    }
}

/**
 * 즉시 출고 - 견적서
 * @returns 
 */
export const quickDealEstimatedAxios = async (id) => {
    try {
        const response = await axios.get(`${dbServerUrl}/quickEstimate/${id}`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
}



/**
 * 리뷰 작성 페이지 - 차량 이름과 기업 이름 로드
 * @returns 
 */
export const carEnterListAxios = async () => {
    try {
        const response = await axios.get(`${dbServerUrl}/reviewSelect`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
}




/**
 * 이미지 업로드
 * @returns 
 */
export const imageUploadAxios = async (pngUrl, imgName) => {
    // Convert data URL to Blob
    const response = await fetch(pngUrl);
    const blob = await response.blob();

    // Create a FormData object to send the image data
    const formData = new FormData();
    formData.append('file', blob, `${imgName}.png`);

    // Use fetch or axios to send the image to the server
    fetch(`${process.env.REACT_APP_DB_SERVER_URL}/image`, {
        method: 'POST',
        body: formData,
    })
        .then((response) => response.json())
        .then((data) => {
            console.log('Image uploaded successfully:', data);
        })
        .catch((error) => {
            console.error('Error uploading image:', error);
        });
}


/**
 * 메인 페이지 - 인기 차량 리스트 로드
 * @returns 
 */
export const popularListAxios = async () => {
    try {
        const response = await axios.get(`${dbServerUrl}/ranking`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
}



/**
 * 메인 페이지 - 우수 카멘토 상담 신청 POST
 * @returns 
 */
export const mentoringAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/mentoring`, data)
    } catch (error) {
        // console.log(error)
    }
}














//관리자 페이지

/**
 * 관리자 페이지 - 이벤트 추가 POST
 * @returns 
 */
export const eventAddAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/eventInsert`, data)
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 이벤트 삭제 DELETE
 * @returns 
 */
export const eventDeleteAxios = async (data) => {
    try {
        await axios.delete(`${dbServerUrl}/eventDelete/${data}`)
    } catch (error) {
        // console.log(error)
    }
} 




/**
 * 관리자 페이지 - 리뷰 승인/미승인 POST
 * @returns 
 */
export const reviewChangeAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/reviewChange`, data)
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 리뷰 삭제 DELETE
 * @returns 
 */
export const reviewDeleteAxios = async (data) => {
    try {
        await axios.delete(`${dbServerUrl}/reviewDelete/${data}`)
    } catch (error) {
        // console.log(error)
    }
} 




/**
 * 관리자 페이지 - 색상 로드 GET
 * @returns 
 */
export const colorGetAxios = async () => {
    try {
        const response = await axios.get(`${dbServerUrl}/allColor`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 색상 추가 POST
 * @returns 
 */
export const colorAddAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/allColorInsert`, data)
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 색상 삭제 DELETE
 * @returns 
 */
export const colorDeleteAxios = async (data) => {
    try {
        await axios.delete(`${dbServerUrl}/allColorDelete/${data}`)
    } catch (error) {
        // console.log(error)
    }
} 



/**
 * 관리자 페이지 - 옵션 로드 GET
 * @returns 
 */
export const optionGetAxios = async () => {
    try {
        const response = await axios.get(`${dbServerUrl}/alloption`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 색상 추가 POST
 * @returns 
 */
export const optionAddAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/allOptionInsert`, data)
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 색상 삭제 DELETE
 * @returns 
 */
export const optionDeleteAxios = async (data) => {
    try {
        await axios.delete(`${dbServerUrl}/allOptionDelete/${data}`)
    } catch (error) {
        // console.log(error)
    }
} 



/**
 * 관리자 페이지 - 고객 리스트 현황 GET
 * @returns 
 */
export const currentSituationAxios = async () => {
    try {
        const response = await axios.get(`${dbServerUrl}/currentSituation`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
} 


/**
 * 관리자 페이지 - 고객 리스트 로드 GET
 * @returns 
 */
export const userListAxios = async (type, active) => {
    try {
        const response = await axios.get(`${dbServerUrl}/customerList?type=${type}&active=${active}`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 고객 리스트 - 견적서 DELETE
 * @returns 
 */
export const carInquiryDeleteAxios = async (data) => {
    try {
        await axios.delete(`${dbServerUrl}/carInquiryDelete/${data}`)
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 고객 리스트 - 견적서 완료/미완료 POST
 * @returns 
 */
export const carInquiryChangeAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/carInquiryChange`, data)
    } catch (error) {
        // console.log(error)
    }
} 


/**
 * 관리자 페이지 - 고객 리스트 - 간편 상담 DELETE
 * @returns 
 */
export const counselingInquiryDeleteAxios = async (data) => {
    try {
        await axios.delete(`${dbServerUrl}/counselingInquiryDelete/${data}`)
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 고객 리스트 - 간편 상담 완료/미완료 POST
 * @returns 
 */
export const counselingInquiryChangeAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/counselingInquiryChange`, data)
    } catch (error) {
        // console.log(error)
    }
} 


/**
 * 관리자 페이지 - 고객 리스트 - 우수 카멘토 DELETE
 * @returns 
 */
export const mentoInquiryDeleteAxios = async (data) => {
    try {
        await axios.delete(`${dbServerUrl}/mentoInquiryDelete/${data}`)
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 고객 리스트 - 우수 카멘토 완료/미완료 POST
 * @returns 
 */
export const mentoInquiryChangeAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/mentoInquiryChange`, data)
    } catch (error) {
        // console.log(error)
    }
}



/**
 * 관리자 페이지 - 고객 리스트 - 즉시출고 DELETE
 * @returns 
 */
export const quickInquiryDeleteAxios = async (data) => {
    try {
        await axios.delete(`${dbServerUrl}/quickInquiryDelete/${data}`)
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 고객 리스트 - 즉시출고 완료/미완료 POST
 * @returns 
 */
export const quickInquiryChangeAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/quickInquiryChange`, data)
    } catch (error) {
        // console.log(error)
    }
}


/**
 * 관리자 페이지 - 빠른 간편 문의 차량 삭제 DELETE
 * @returns 
 */
export const carFaqDeleteAxios = async (data) => {
    try {
        await axios.delete(`${dbServerUrl}/carFaqDelete/${data}`)
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 한정 특가 차량 삭제 DELETE
 * @returns 
 */
export const hotDealDeleteAxios = async (data) => {
    try {
        await axios.delete(`${dbServerUrl}/hotDealDelete/${data}`)
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 즉시 출고 차량 삭제 DELETE
 * @returns 
 */
export const quickDealDeleteAxios = async (data) => {
    try {
        await axios.delete(`${dbServerUrl}/quickDealDelete/${data}`)
    } catch (error) {
        // console.log(error)
    }
} 









/**
 * 관리자 페이지 - 고객 리스트 - 우수 카멘토 완료/미완료 POST
 * @returns 
 */
export const carInsertAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/carInsert`, data)
    } catch (error) {
        // console.log(error)
    }
} 



/**
 * 관리자 페이지 - 빠른 간편 문의 한정 특가 제외 리스트 로드 GET
 * @returns 
 */
export const faqFilterAxios = async () => {
    try {
        const response = await axios.get(`${dbServerUrl}/faqFilter`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
} 

/**
 * 관리자 페이지 - 한정특가 추가 POST
 * @returns 
 */
export const hotDealInsertAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/hotDealInsert`, data)
    } catch (error) {
        // console.log(error)
    }
} 


/**
 * 관리자 페이지 - 즉시출고 추가 POST
 * @returns 
 */
export const quickDealInsertAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/quickInsert`, data)
    } catch (error) {
        // console.log(error)
    }
} 











/**
 * 즉시 출고 차량 상담 신청 추가 POST
 * @returns 
 */
export const quickCounselingInsertAxios = async (data) => {
    try {
        await axios.post(`${dbServerUrl}/quickCounselingInsert`, data)
    } catch (error) {
        // console.log(error)
    }
} 





/**
 * 기업 로고 -  리스트 로드 GET
 * @returns 
 */
export const enterListAxios = async () => {
    try {
        const response = await axios.get(`${dbServerUrl}/enter`)
        return response.data
    } catch (error) {
        // console.log(error)
    }
} 






/**
 * 관리자 페이지 로그인 POST
 * @returns 
 */
export const loginAxios = async (data) => {
    try {
        const response = await axios.post(`${dbServerUrl}/admin-hash/secure-entry-point/login`, data)
        return response.data
    } catch (error) {
        // console.log(error)
    }
} 