import { PriobuttonType } from "../types/PrioButtonType";
import urgentIcon from "../assets/urgent.png"
import mediumIcon from "../assets/medium.png"
import lowIcon from "../assets/low.png"
import { generateHash } from "../utils/generateHash";
import { PRIORITY } from "../types/PriorityEnum";

export const priorityButtonArray: PriobuttonType[]= [{
    id: "(!mB",
    name: PRIORITY.URGENT,
    img: urgentIcon,
    },
    {
    id: "7Kn!",
    name: PRIORITY.MEDIUM,
    img: mediumIcon,
    },
    {
    id: "h84K",
    name: PRIORITY.LOW,
    img: lowIcon,
    },
]