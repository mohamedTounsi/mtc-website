"use client"

import { useState } from 'react';
import Arrow from "../Icons/Arrow";
import Media from "../CardsContent/Media"
import Logistics from '../CardsContent/Logistics';
import Hr from '../CardsContent/Hr';
import Dev from '../CardsContent/Dev';
import { motion } from 'framer-motion';

export default function Card({ icon, title, desc, index }) {
    const [isPopupVisible, setPopupVisible] = useState(false);

    const togglePopup = () => {
        setPopupVisible(!isPopupVisible);
    };

    return (
        <div className="w-[18%]">
            <div>
                <div className="relative">
                    {/* added this to make the icon resize and not fixed , without this div the icon size will be fixed */}
                    <div className="absolute pl-[28%] pt-[28%]">{icon}</div>
                </div>
                <img src="/assets/department/card-bg.png" className="rounded-t-xl" />
            </div>
            <div className="realtive"></div>
            <div className="relative z-2 h-[60%]">
                {/* Background layer */}
                <div className="absolute inset-0 bg-[#1B1616] bg-opacity-90 z-0" style={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 85%)" }} />
                {/* Content layer */}
                <h2 className="relative z-10 text-xl pt-5 ml-5">{title}</h2>
                <p className="relative z-10 mt-5 ml-5">{desc}</p>
                <button onClick={togglePopup} className="relative z-10 bg-[#12082A] border-2 border-purple-500 rounded-[100%] w-[24%] h-[21%] mt-[14%] ml-4 hover:w-[26%] hover:h-[23%] transition-all duration-200">
                    <Arrow />
                </button>
            </div>
            {isPopupVisible && index === "0" && (
                <div className="fixed inset-0 w-[100%] bg-black bg-opacity-50 z-50">
                    <div className='absolute ml-[72%] mt-[5%]'>
                        <button onClick={togglePopup} className=' text-purple-500 font-dreams text-[3px] p-[20%] border-2 rounded-2xl border-purple-500 '>Close</button>
                    </div>                    
                    <div className="ml-[5.5%]">
                        <Media/>
                    </div>
                </div>
            )}
            {isPopupVisible && index === "1" && (
                <div className="fixed inset-0 w-[100%] bg-black bg-opacity-50 z-50">
                    <div className='absolute ml-[72%] mt-[5%]'>
                        <button onClick={togglePopup} className=' text-purple-500 font-dreams text-[3px] p-[20%] border-2 rounded-2xl border-purple-500 '>Close</button>
                    </div>
                    <div className="ml-[5.5%]">
                        <Logistics/>
                    </div>
                </div>
            )}
            {isPopupVisible && index === "2" && (
                <div className="fixed inset-0 w-[100%] bg-black bg-opacity-50 z-50">
                    <div className='absolute ml-[72%] mt-[5%]'>
                        <button onClick={togglePopup} className=' text-purple-500 font-dreams text-[3px] p-[20%] border-2 rounded-2xl border-purple-500 '>Close</button>
                    </div>
                    <div className="ml-[5.5%]">
                        <Hr/>
                    </div>
                </div>
            )}
            {isPopupVisible && index === "3" && (
                <div className="fixed inset-0 w-[100%] bg-black bg-opacity-50 z-50">
                    <div className='absolute ml-[72%] mt-[5%]'>
                        <button onClick={togglePopup} className=' text-purple-500 font-dreams text-[3px] p-[20%] border-2 rounded-2xl border-purple-500 '>Close</button>
                    </div>
                    <div className="ml-[5.5%]">
                        <Dev/>
                    </div>
                </div>
            )}
        </div>
    );
}