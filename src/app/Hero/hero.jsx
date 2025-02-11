import "./hero.css"
import Glow1 from './glowsFX/glow1'
import Glow2 from './glowsFX/glow2'
import Glow3 from './glowsFX/glow3'
import Glow4 from './glowsFX/glow4'
export default function hero(){
    return (
        <div className="hero h-screen ">
            <div> {/*Glow effects on bg , SVG Format*/}
                <Glow1/>
                <Glow2/>
                <Glow3/>
                <Glow4/>
            </div>
            <img src="/assets/logo.png" className="w-[10%] drop-shadow-[0px_0px_30px_#7d31ff] m-auto pt-[130px]" />
            <div>
                <h1 className="text-center text-[4.8rem] font-tommy">LAUNCH INTO THE TECH <span className="font-tommyOutline">UNIVERSE</span></h1>
                <p className="text-3xl w-[80%] m-auto font-sf ">Join Microsoft Tech Club ISIM Sfax and explore a cosmos where every idea shines,<br></br>
                    and innovation knows no limits.</p>
            </div>
            <a href="#"><button className="text-center  block m-auto mt-8 border-2 p-6 bg-[#7d31ff] bg-opacity-30 border-[#7d31ff] rounded-3xl font-dreams text-[5px] hover:text-[5.5px] transition-all duration-300">GET STARTED</button></a>
            <div className="flex justify-between mt-[7.5%]">
                <div className="flex"> {/* left bottom Corner*/}
                    <div className="ml-5">
                        <h3 className="text-center font-tommy text-xl">Based in sfax,tunisia</h3>
                        <p className="font-dreams text-[3px] opacity-60 ">2012 4:04 GMT+1404C</p>
                    </div>
                    <img src="/assets/map.png" className="w-[40px] h-[40px]" />
                </div>

                <div className="scroll mr-[4%]">
                    <h4 className="font-tommy">scroll</h4>
                    <img src="/assets/scroll.png" className="w-9" />
                </div>

                <div className="mr-5"> {/* right bottom Corner*/}
                    <h3 className="text-center font-sf text-[17px] opacity-60 ">Work availibility</h3>
                    <p className="font-dreams text-[3px] mt-1">UNLIMITED HOURS</p>
                </div>
            </div>

        </div>
    )
}