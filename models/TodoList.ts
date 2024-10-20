export type TodoList = {
  title: string;
  completedItems: string[];
  nonCompletedItems: string[];
};


export const addItem = (todoList: TodoList, item: string): TodoList => ({
  ...todoList,
  nonCompletedItems: [...todoList.nonCompletedItems, item],
});

// Function to move an item from non-completed to completed
export const moveToCompleted = (todoList: TodoList, index: number): TodoList => {
  if (index < 0 || index >= todoList.nonCompletedItems.length) {
    throw new RangeError("Index of item is out of range");
  }

  const item = todoList.nonCompletedItems[index];
  return {
    ...todoList,
    nonCompletedItems: todoList.nonCompletedItems.filter((_, i) => i !== index),
    completedItems: [...todoList.completedItems, item],
  };
};

// Function to move an item from completed to non-completed
export const moveToNonCompleted = (todoList: TodoList, index: number): TodoList => {
  if (index < 0 || index >= todoList.completedItems.length) {
    throw new RangeError("Index of item is out of range");
  }

  const item = todoList.completedItems[index];
  return {
    ...todoList,
    completedItems: todoList.completedItems.filter((_, i) => i !== index),
    nonCompletedItems: [...todoList.nonCompletedItems, item],
  };
};


