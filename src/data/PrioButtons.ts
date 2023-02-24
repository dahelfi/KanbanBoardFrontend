import { PriobuttonType } from "../types/PrioButtonType";
import urgentIcon from "../assets/urgent.png"
import mediumIcon from "../assets/medium.png"
import lowIcon from "../assets/low.png"
import { generateHash } from "../utils/generateHash";
import { PRIORITY } from "../types/PriorityEnum";

export const priorityButtonArray: PriobuttonType[]= [{
    id: generateHash(4),
    name: PRIORITY.URGENT,
    img: urgentIcon,
    },
    {
    id: generateHash(4),
    name: PRIORITY.MEDIUM,
    img: mediumIcon,
    },
    {
    id: generateHash(4),
    name: PRIORITY.LOW,
    img: lowIcon,
    },
]