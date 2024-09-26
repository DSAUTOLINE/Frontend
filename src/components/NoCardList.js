import '../styles/NoCardList.css'



const NoCardList = (props) => {
    return (
        <>
            <div className='noCardListDiv'>
                <h2>{props.card} 존재하지 않습니다</h2>
            </div>
        </>
    )
}


export default NoCardList