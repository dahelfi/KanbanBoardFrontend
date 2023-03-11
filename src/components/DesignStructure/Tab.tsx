import { ReactElement, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { BLACK, centerItems, DARKBLACK } from "../../constants";
import { DataContext } from "../../Provider/DataProvider";

export interface Props{
    selected: boolean;
    name: string;
    img: ReactElement;
    link: string;
    id: string;
}

export const Tab = (props: Props) => {
  const [hover, setHover] = useState<boolean>(false);
  const dataContext = useContext(DataContext);

  return (
    <Link  onClick={()=>dataContext.setSelectedTabId(props.id)} className={centerItems} to={props.link} onMouseEnter={()=>setHover(true)}  onMouseLeave={()=>setHover(false)} style={{backgroundColor: (props.selected || hover ?  DARKBLACK: BLACK), width: "100%", height: "60px", color: "white", cursor: "pointer", textDecoration: "none"}}>
        <div className="flex justify-content-center align-items-center" style={{width: "40%"}}><img style={{width: "26px", height: "26px"}} src={props.img.toString()}/></div>
        <div className="flex justify-content-start align-items-center" style={{width: "60%"}}>
            <h4>{props.name}</h4>
        </div>
    </Link>
  )
}
