import { TodoType } from "../types/TodoType";

export const findSearchedElement =(todo: TodoType, searchValue: string)=>{
    if(searchValue.length < 1){
        return true;
    } else if(todo.name.includes(searchValue)|| todo.description.includes(searchValue)){
        return true;
    }else{
        return false;
    }
}