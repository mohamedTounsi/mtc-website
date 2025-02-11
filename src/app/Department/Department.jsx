import Card from './Card/card'
import Crystal from "./Icons/Crystal"
import Crystal1 from "./Icons/Crystal1"
import Crystal2 from "./Icons/Crystal2"
import Crystal3 from "./Icons/Crystal3"

export default function departmet(){
    return(
        <div>
            <div className='ml-10'>
                <h1 className="text-5xl">OUR DEPARTMENTS</h1>
                <p className="w-[50%] text-2xl mt-5">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa voluptate laborum culpa fuga vel sapiente nemo fugiat temporibus reiciendis, aut non debitis cum vero quasi, animi repudiandae voluptates reprehenderit incidunt?</p>
            </div>
            <div className='mt-5 flex justify-around flex-wrap'>
                <Card icon={<Crystal/>} title="Media Department" desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa voluptate laborum culpa fuga vel sapiente nemo fugiat temporibus reiciendis,"/>
                <Card icon={<Crystal1/>} title="Media Department" desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa voluptate laborum culpa fuga vel sapiente nemo fugiat temporibus reiciendis,"/>
                <Card icon={<Crystal2/>} title="Media Department" desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa voluptate laborum culpa fuga vel sapiente nemo fugiat temporibus reiciendis,"/>
                <Card icon={<Crystal3/>} title="Media Department" desc="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Ipsa voluptate laborum culpa fuga vel sapiente nemo fugiat temporibus reiciendis,"/>
            </div>
           
        </div>
    )
}