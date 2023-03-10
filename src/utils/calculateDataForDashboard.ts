import { DEVELOPMENTSTATE } from "../types/DevelopmentState";
import { PRIORITY } from "../types/PriorityEnum";
import { TodoType } from "../types/TodoType";

export const getTasksInState=(todosArray: TodoType[], typeToCalculate: DEVELOPMENTSTATE|PRIORITY)=>{
    let counter: number = 0;

    todosArray.forEach((todoElement: TodoType)=>{
        if(todoElement.development_state === typeToCalculate || todoElement.priority === typeToCalculate){
            counter++;
        }
    })

    return counter;
}

export const calculateLatestUrgentTodo = (todosArray: TodoType[])=>{
    let filteredUrgentArray: TodoType[] = filterUrgentelementsFromArray(todosArray);
    let returnObject= {
        dateLatestUrgentElement: "No date available",
        textUrgentElement: "No urgent Todos available at the moment"
    }

    if(filteredUrgentArray.length > 0){
        let smallestDate: number = parseInt(filteredUrgentArray[0].expire_date.toString());
       filteredUrgentArray.forEach((urgentElement: any, index: number)=>{
        
        
            if(smallestDate > parseInt(urgentElement.expire_date)){
                smallestDate = parseInt(urgentElement.expire_date);
            }
       })

       returnObject.dateLatestUrgentElement = smallestDate.toString();
       returnObject.textUrgentElement = "Upcoming Deadline"

    }
    
    return returnObject;
}

const filterUrgentelementsFromArray = (todosArray: TodoType[])=>{
    let temporaryArray: TodoType[] = [];

    todosArray.forEach((todoElement: TodoType, index: number)=>{
        if( todoElement.priority === PRIORITY.URGENT){
           temporaryArray.push(todosArray[index])
        }
    })

    return temporaryArray;
}