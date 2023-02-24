import { TabType } from "../types/Tab";
import summaryIcon from "../assets/summaryIcon.png"
import boardIcon from "../assets/boardIcon.png"
import addtaskIcon from "../assets/addtaskIcon.png"
import contactIcon from "../assets/contactsIcon.png"
import { generateHash } from "../utils/generateHash";

export const tabsArray: TabType[]= [{
    id: "a2f5hT",
    name: "Summary",
    img: summaryIcon,
    link: "/summary/"
    },
    {
    id: generateHash(4),
    name: "Board",
    img: boardIcon,
    link: "/canban/"
    },
    {
    id: generateHash(4),
    name: "Add Task",
    img: addtaskIcon,
    link: "/addTask/"
    },
    {
    id: generateHash(4),
    name: "Contacts",
    img: contactIcon,
    link: "/contacts/"
}]