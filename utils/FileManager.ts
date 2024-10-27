import * as FileSystem from 'expo-file-system';
import {TodoList, TodoListMeta} from "@/models/TodoList";

const DATA_DIRECTORY = `${FileSystem.documentDirectory}todoLists/`;
const INDEX_FILE = `${DATA_DIRECTORY}index.json`;

export const initializeDirectoryAndIndex: () => Promise<void> = async (): Promise<void> => {
  const directoryInfo = await FileSystem.getInfoAsync(DATA_DIRECTORY);
  const fileInfo = await FileSystem.getInfoAsync(INDEX_FILE);

  if (!directoryInfo.exists) {
    await FileSystem.makeDirectoryAsync(DATA_DIRECTORY, { intermediates: true });
  }

  if (!fileInfo.exists) {
    await FileSystem.writeAsStringAsync(INDEX_FILE, JSON.stringify([]));
  }
};

export const saveExistingTodoList: (todoList: TodoList) => Promise<void> = async (todoList: TodoList): Promise<void> => {

  try {
    await FileSystem.writeAsStringAsync(`${DATA_DIRECTORY}list${todoList.id}.json`, JSON.stringify(todoList));
  } catch(error) {
    console.error(`Failed to save list with title ${todoList.title} and id ${todoList.id}.`, error);
  }
};

export const saveNewTodoList: (title: string, completed: string[],  nonCompleted: string[]) => Promise<void> =
  async (title: string, completed: string[],  nonCompleted: string[]): Promise<void> => {

    try {
      const newId: number = await generateId();

      const newTodoList: TodoList = {
        id: newId,
        title: title.trim(),
        completedTasks: completed,
        nonCompletedTasks: nonCompleted,
      };

      await FileSystem.writeAsStringAsync(`${DATA_DIRECTORY}list${newTodoList.id}.json`, JSON.stringify(newTodoList));
      await updateIndexFile(title, newId);
    } catch(error) {
      console.error(`Failed to save new list with title ${title}.`, error);
    }
  };

export const loadTodoListMeta = async (): Promise<TodoListMeta[]> => {
  try {
    const content = await FileSystem.readAsStringAsync(INDEX_FILE);
    return JSON.parse(content) as TodoListMeta[];
  } catch (error) {
    console.error('Could not read index file:', error);
    return []
  }
};

export const loadTodoList = async (id: number): Promise<TodoList | null> => {
  try {
    const content: string = await FileSystem.readAsStringAsync(`${DATA_DIRECTORY}list${id}.json`);
    return JSON.parse(content);
  } catch (error) {
    console.log(`Failed to load todo list with id ${id}:`, error);
    return null;
  }
};

export const deleteTodoList = async (id: number): Promise<boolean> => {
  try {
    // Delete file with list.
    await FileSystem.deleteAsync(`${DATA_DIRECTORY}list${id}.json`);

    // Remove entry in index file.
    const indexContent: TodoListMeta[] = await loadTodoListMeta();
    const updatedIndex = indexContent.filter(item => item.id !== id);
    await FileSystem.writeAsStringAsync(INDEX_FILE, JSON.stringify(updatedIndex));
    return true;
  } catch (error) {
    console.log(`Failed to delete todo list with id ${id}:`, error);
    return false;
  }
};

const generateId = async (): Promise<number> => {
  const todoListMeta: TodoListMeta[] = await loadTodoListMeta()

  if (todoListMeta.length === 0) {
    return 1;
  }

  const maxId = Math.max(...todoListMeta.map(item => item.id));

  return maxId + 1;
}

const updateIndexFile = async (listName: string, id: number): Promise<void> => {
  let indexFileContent: TodoListMeta[] = [];
  const newIndexEntry: TodoListMeta = { id: id, title: listName};

  try {
    const content = await FileSystem.readAsStringAsync(INDEX_FILE);
    indexFileContent = JSON.parse(content);
    indexFileContent.push(newIndexEntry);
    await FileSystem.writeAsStringAsync(INDEX_FILE, JSON.stringify(indexFileContent));
  } catch (error) {
    console.error('Failed to update index file.', error);
  }
};

export const initializeTestData: (initialize: boolean) => Promise<void> = async (initialize: boolean): Promise<void> => {
  if (initialize) {
    await saveNewTodoList("Chores", ["Take out the trash", "Wash the dishes"], ["Clean the garage", "Mow the lawn"]);
    await saveNewTodoList("Reading List", ["Finish 'Atomic Habits'", "Start 'Sapiens'"], ["Read 'The Power of Habit'", "Browse new books"]);
    await saveNewTodoList("Work Task", ["Finish project report", "Email client"], ["Plan next sprint", "Organize files"]);
  }
}




