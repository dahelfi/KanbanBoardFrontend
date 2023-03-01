import { CATEGORIES } from "./CategoriesEnum";
import { DEVELOPMENTSTATE } from "./DevelopmentState";
import { PRIORITY } from "./PriorityEnum";

export interface TodoType{
    id?: string;
    created_at: Date | string;
    description: string;
    priority: PRIORITY;
    development_state: DEVELOPMENTSTATE;
    category: CATEGORIES;
    name: string;
    expire_date: Date |string;
}