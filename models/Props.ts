import {TodoList} from "@/models/TodoList";

export type SearchBarProps = {
  onSearch: (text: string) => void;
};

export type TaskInputProps = {
  newTask: string;
  setNewTask: (task: string) => void;
  handleNewTask: () => void;
}

export type ListDetailProps = {
  todoList: TodoList
}