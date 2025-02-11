
import Arrow from "../Icons/Arrow"


export default function card({icon,title,desc}){
    return(
        <div className="w-[18%] " >
                <div>
                    <div className="relative" >{/* added this to make the icon resize and not fixed , without this div the icon size will be fixed*/}
                        <div className="absolute pl-[28%] pt-[28%]">{icon}</div>
                    </div>
                    <img src="/assets/department/card-bg.png" className="rounded-t-xl"/>
                </div>
                <div className="realtive">
                    
                </div>
                <div className="relative z-2 h-[60%]">
                    {/* Background layer */}
                    <div className="absolute inset-0 bg-[#1B1616] bg-opacity-90 z-0" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 85%)" }}/>
                    
                    {/* Content layer */}
                    <h2 className="relative z-10 text-xl pt-5 ml-5">{title}</h2>
                    <p className="relative z-10 mt-5 ml-5">{desc}</p>
                    <button className="relative z-10 bg-[#12082A] border-2 border-purple-500 rounded-[100%] w-[28%] h-[25%] mt-[14%] ml-4 hover:w-[4.5%] hover:h-[9%] transition-all duration-300"><Arrow /></button>
                </div>
        </div>
    )
}