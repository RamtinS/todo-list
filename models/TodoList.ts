export type TodoList = {
  id: number
  title: string;
  completedTasks: string[];
  nonCompletedTasks: string[];
};

export type TodoListMeta = {
  id: number;
  title: string;
};
