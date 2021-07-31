
import { ADD_TODO } from "./actionType";

export default {
  [ADD_TODO](state,{row}){
    state.list=row
  },

  fiberUpdataSbInput(state,data){
    state.fiber.sbInput = data
  },
  fiberUpdataCardNum(state,data){
    state.fiber.cardNumber = data
  },
}
