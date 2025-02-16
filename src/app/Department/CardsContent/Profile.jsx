export default function profile({name,type,pic}){
    return(
        <div className="relative w-[32%]">
            <div className="absolute bottom-0 w-full text-center text-white ">
                <p>{name}</p>
                <p>{type}</p>
            </div>
            <img src={pic}/>
        </div>
    )
}