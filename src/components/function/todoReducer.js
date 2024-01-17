

export const initialState = {
  test : 1,
  listStatus:'all',
  todos:[]
}

export const todoReducer = (state = initialState, action) => {
  switch (action.type) {
    case todoAction.getData: {
      return {
        ...state,
        todos: action.data,
      };
    }
    case todoAction.add: {
      return {
        ...state,
        todos: [
          ...state.todos,
          {
            id: action.id,
            text: action.text,
            isDone: false,
          },
        ],
      };
    }
    case todoAction.delete: {
      return {
        ...state,
        todos: state.todos.filter((item) => item.id !== action.id),
      };
    }
    case todoAction.update: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, text: action.text };
          } else return todo;
        }),
      };
    }
    case todoAction.updateID: {
      return {
        ...state,
        todos: state.todos.map((todo) => {
          if (todo.id === action.virtualID) {
            return { ...todo, id: action.id };
          } else {
            return todo;
          }
        }),
      };
    }
    case todoAction.checkbox: {
      return {
        ...state,
        todos: state.todos.map((todo) =>
          todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo
        ),
      };
    }
    case todoAction.setListStatus:{
      return {...state, listStatus: action.listStatus}
    }
    default: {
      return state;
    }
  }
};


export const filterByStatus = (arr, status) => {
  switch (status) {
    case filterStatus.notDone:
      return arr.filter((item) => !item.isDone);
    case filterStatus.done:
      return arr.filter((item) => item.isDone);
    case filterStatus.all:
      return arr;
  }
};
export const filterItemLeft = (arr) => {
  return arr?.filter((item) => !item.isDone);
}

export const todoAction = {
  getData: "getData",
  add: "add",
  delete: "delete",
  update: "update",
  updateID:"update ID",
  checkbox: "click check box",
  setListStatus: "set list filter status"
};
//filter
export const filterStatus = {
  all: "all",
  done: "done",
  notDone: "notDone"
};