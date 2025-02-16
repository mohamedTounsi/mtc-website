import "./style.css";
import Profile from "./Profile";
import { motion } from 'framer-motion';

export default function Media() {
    return (
        <div className="relative pointer-events-none grid grid-cols-5 grid-rows-4 justify-center items-center w-full h-full"> 
        {/*The hexagonal shape are created with grids+NEVER REMOVE THE pointer-events-none tailwind class, or the close button won't work*/}
            <div className="col-[3/4] row-[2/4] w-[70%]">{/*Department*/}
                    <motion.div
                            initial={{ opacity: 0}} 
                            animate={{ opacity: 1}} 
                            transition={{ duration: 1, transition:'easeOut' }}
                    >
                        <img src="/assets/department/Dev.png" alt="Media" className="w-full h-auto" />
                    </motion.div>
            </div>
            <div className="contents">{/*Profiles*/}
                    <div className="col-[2/4] row-[2/3]">
                    <motion.div
                            initial={{ opacity: 0,y:-50}} 
                            animate={{ opacity: 1,y:0}} 
                            transition={{ duration: 1, transition:'easeOut',delay:0.2 }}
                    >
                        <Profile name="Langar" type="CEO" pic="/assets/department/pic-placeholder.png" />
                    </motion.div>
                    </div>


                <div className="col-[3/5] row-[1/3] -mt-[15%]">
                    <motion.div
                            initial={{ opacity: 0,y:-50}} 
                            animate={{ opacity: 1,y:0}} 
                            transition={{ duration: 1, transition:'easeOut',delay:0.8 }}
                    >
                        <Profile name="Langar" type="CEO" pic="/assets/department/pic-placeholder.png" />
                    </motion.div>
                </div>
                <div className="col-[4/6] row-[2/3]">
                    <motion.div
                            initial={{ opacity: 0,y:-50}} 
                            animate={{ opacity: 1,y:0}} 
                            transition={{ duration: 1, transition:'easeOut',delay:1.4 }}
                    >
                        <Profile name="Langar" type="CEO" pic="/assets/department/pic-placeholder.png" />
                    </motion.div>
                </div>
                <div className="col-[4/6] row-[3/4] mt-[3%]">
                    <motion.div
                            initial={{ opacity: 0,y:-50}} 
                            animate={{ opacity: 1,y:0}} 
                            transition={{ duration: 1, transition:'easeOut',delay:2 }}
                    >
                        <Profile name="Langar" type="CEO" pic="/assets/department/pic-placeholder.png" />
                    </motion.div>
                </div>
                <div className="col-[3/5] row-[3/5] mt-[15%]">
                    <motion.div
                            initial={{ opacity: 0,y:-50}} 
                            animate={{ opacity: 1,y:0}} 
                            transition={{ duration: 1, transition:'easeOut',delay:2.6 }}
                    >
                        <Profile name="Langar" type="CEO" pic="/assets/department/pic-placeholder.png" />
                    </motion.div>
                </div>
                <div className="col-[2/4] row-[3/4] mt-[3%]">
                    <motion.div
                            initial={{ opacity: 0,y:-50}} 
                            animate={{ opacity: 1,y:0}} 
                            transition={{ duration: 1, transition:'easeOut',delay:3.2 }}
                    >
                        <Profile name="Langar" type="CEO" pic="/assets/department/pic-placeholder.png" />
                    </motion.div>
                </div>
            </div>
        </div>
    );
}