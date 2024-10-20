
export type SearchBarProps = {
  onSearch: (text: string) => void;
};

export type TaskInputProps = {
  newTask: string;
  setNewTask: (task: string) => void;
  handleNewTask: () => void;
}