

export const todoAction = {
    getData: "getData",
    add: "add",
    delete: "delete",
    update: "update",
    updateID:"update ID",
    checkbox: "click check box",
  };

export const rootReducer = (arr, action)=>{
    switch (action.type) {
      case todoAction.getData: {
        return action.data;
      }
      case todoAction.add: {
        return [
          {
            id: action.id,
            text: action.text,
            isDone: false,
          },
          ...arr,
        ];
      }
      case todoAction.delete: {
        return arr.filter((item) => item.id !== action.id);
      }
      case todoAction.update: {
        return arr.map((todo) => {
          if (todo.id === action.id) {
            return { ...todo, id: action.id, text: action.text };
          } else return todo;
        });
      }
      case todoAction.updateID: {
        return arr.map((todo) => {
          if (todo.id === action.virtualID) {
            return { ...todo, id: action.id };
          } else {
            return todo;
          }
        });
      }
      case todoAction.checkbox: {
        return arr.map((todo) =>
          todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo
        );
      }
      default:
        return arr;
    }
}
