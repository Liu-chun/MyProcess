
import { ADD_TODO } from "./actionType";

export default {
  //  添加一个记录
  addTodo ({commit},row){
    commit(ADD_TODO,{row})
  }
}
