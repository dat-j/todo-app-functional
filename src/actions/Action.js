import { toast } from "react-toastify";
import { todoAction } from "../components/function/todoReducer";
import store from "../store/store";
import axios from "axios";

export const setListStatus = (status) => {
  store.dispatch({
    type: todoAction.setListStatus,
    listStatus: status,
  });
};
export const addTodo = (text) => {
  let virtualID = new Date().valueOf();
  store.dispatch({
    type: todoAction.add,
    text: text,
    id: virtualID,
  });
  toast("Add succesfully!");
  axios
    .post("https://6588fac4324d4171525855f8.mockapi.io/api/todos", {
      id: virtualID,
      text: text,
      isDone: false,
    })

    .then((res) => {
      axios.put(
        "https://6588fac4324d4171525855f8.mockapi.io/api/todos/" + res.data.ids,
        {
          id: res.data.ids,
        }
      );
      store.dispatch({
        type: todoAction.updateID,
        id: res.data.ids,
        virtualID: virtualID,
      });
    })
    .catch((err) => {
      console.log("Error:", err);
    });
};
export const delTodo = (id) => {
  axios
    .delete("https://6588fac4324d4171525855f8.mockapi.io/api/todos/" + id)
    .then((res) => {
      store.dispatch({
        type: todoAction.delete,
        id: id,
      });
    })
    .catch((err) => {
      console.log("Error:", err, "id:", id);
    });
  toast("Remove succesfully!");
};
export const updateTodo = (id, text) => {
  axios
    .put("https://6588fac4324d4171525855f8.mockapi.io/api/todos/" + id, {
      text: text,
    })
    .then((res) => {
      store.dispatch({
        type: todoAction.update,
        id: id,
        text: text,
      });
    })
    .catch((err) => {
      console.log("Error:", err, "id:", id);
    });
  toast("Update succesfully!");
};
export const clickCheckBox = (item) => {
  axios
    .put("https://6588fac4324d4171525855f8.mockapi.io/api/todos/" + item.id, {
      isDone: item.isDone,
    })
    .then((res) => {
      store.dispatch({
        type: todoAction.checkbox,
        id: item.id,
      });
    })
    .catch((err) => {
      console.log("Error:", err, "id:", item.id);
    });
};
