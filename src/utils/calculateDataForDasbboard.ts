import { DEVELOPMENTSTATE } from "../types/DevelopmentState";
import { PRIORITY } from "../types/PriorityEnum";
import { TodoType } from "../types/TodoType";

export const getTasksInProgress=(todosArray: TodoType[], typeToCalculate: DEVELOPMENTSTATE|PRIORITY)=>{
    let counter: number = 0;

    todosArray.forEach((todoElement: TodoType)=>{
        if(todoElement.development_state === typeToCalculate || todoElement.priority === typeToCalculate){
            counter++;
        }
    })

    return counter;
}