import { todoAction } from "../components/function/todoReducer"
import store from "../store/store"

export const setListStatus = (status) => {
    store.dispatch({
        type: todoAction.setListStatus,
        listStatus: status
    })
}