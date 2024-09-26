import { 
    IoIosMenu,
    IoIosSearch,
    IoMdClose,
    IoIosArrowForward,
    IoIosArrowBack,
    IoMdStar,
    IoIosAlbums,
} from 'react-icons/io'
import { 
    SlArrowDown, 
    SlArrowUp,
} from "react-icons/sl";



/**
 * 메뉴 아이콘
 * @param {*} props 
 * @returns 
 */
export const MenuIcon = (props) => {
    return (
        <IoIosMenu size={props.size} color={props.color}/>
    )
}


/**
 * 검색 아이콘
 * @param {*} props 
 * @returns 
 */
export const SearchIcon = (props) => {
    return (
        <IoIosSearch size={props.size} color={props.color}/>
    )
}




/**
 * X 아이콘
 * @param {*} props 
 * @returns 
 */
export const CloseIcon = (props) => {
    return (
        <IoMdClose size={props.size} color={props.color}/>
    )
}



/**
 * up 아이콘
 * @param {*} props 
 * @returns 
 */
export const UpIcon = (props) => {
    return (
        <SlArrowUp size={props.size} color={props.color}/>
    )
}




/**
 * down 아이콘
 * @param {*} props 
 * @returns 
 */
export const DownIcon = (props) => {
    return (
        <SlArrowDown size={props.size} color={props.color}/>
    )
}

/**
 * left 아이콘
 * @param {*} props 
 * @returns 
 */
export const LeftIcon = (props) => {
    return (
        <IoIosArrowBack size={props.size} color={props.color}/>
    )
}


/**
 * right 아이콘
 * @param {*} props 
 * @returns 
 */
export const RightIcon = (props) => {
    return (
        <IoIosArrowForward  size={props.size} color={props.color}/>
    )
}


/**
 * star 아이콘
 * @param {*} props 
 * @returns 
 */
export const StarIcon = (props) => {
    return (
        <IoMdStar  size={props.size} color={props.color}/>
    )
}





/**
 * 알림 아이콘
 * @param {*} props 
 * @returns 
 */
export const NoticeIcon = (props) => {
    return (
        <IoIosAlbums   size={props.size} color={props.color}/>
    )
}