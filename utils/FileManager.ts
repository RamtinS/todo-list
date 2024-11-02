import * as FileSystem from 'expo-file-system';
import {TodoList, TodoListMeta} from "@/models/TodoList";
import {FileInfo} from "expo-file-system";

const DATA_DIRECTORY = `${FileSystem.documentDirectory}todoLists/`;
const INDEX_FILE = `${DATA_DIRECTORY}index.json`;

/**
 * Function to initialize the data directory for storing lists.
 *
 * @returns {Promise<void>}
 */
export const initializeDirectory: () => Promise<void> = async (): Promise<void> => {
  try {
    const directoryInfo = await FileSystem.getInfoAsync(DATA_DIRECTORY);
    if (!directoryInfo.exists) {
      await FileSystem.makeDirectoryAsync(DATA_DIRECTORY, { intermediates: true });
      console.log('Data directory created successfully');
    } else {
      console.log('Data directory already exists');
    }
  } catch (error) {
    console.error('Failed to initialize the directory:', error);
    throw error;
  }
};

/**
 * Function to initialize the index file for tracking lists.
 *
 * @returns {Promise<void>}
 */
export const initializeIndexFile: () => Promise<void> = async (): Promise<void> => {
  try {
    const fileInfo: FileInfo = await FileSystem.getInfoAsync(INDEX_FILE);
    if (!fileInfo.exists) {
      await FileSystem.writeAsStringAsync(INDEX_FILE, JSON.stringify([]));
      console.log('Index file created successfully');
    } else {
      console.log('Index file already exists');
    }
  } catch (error) {
    console.error('Failed to initialize the index file:', error);
    throw error;
  }
};

/**
 * Function to save an existing list to a file.
 *
 * @param todoList the list to save.
 * @returns {Promise<void>}
 */
export const saveExistingTodoList: (todoList: TodoList) => Promise<void> = async (todoList: TodoList): Promise<void> => {

  try {
    await FileSystem.writeAsStringAsync(`${DATA_DIRECTORY}list${todoList.id}.json`, JSON.stringify(todoList));
  } catch(error) {
    console.error(`Failed to save list with title ${todoList.title} and id ${todoList.id}.`, error);
  }
};

/**
 * Function to save a new list with a unique ID and update the index file.
 *
 * @param {string} title - The title of the new list.
 * @param {string[]} completed - Array of completed tasks.
 * @param {string[]} nonCompleted - Array of non-completed tasks.
 * @returns {Promise<void>}
 */
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

/**
 * Function to load metadata of all lists from the index file.
 *
 * @returns {Promise<TodoListMeta[]>} - Array of lists metadata.
 */
export const loadTodoListMeta: () => Promise<TodoListMeta[]> = async (): Promise<TodoListMeta[]> => {
  try {
    const content: string = await FileSystem.readAsStringAsync(INDEX_FILE);
    return JSON.parse(content) as TodoListMeta[];
  } catch (error) {
    console.error('Could not read index file:', error);
    return []
  }
};

/**
 * Function to load a specific list by ID.
 *
 * @param {number} id - The ID of the list to load.
 * @returns {Promise<TodoList | null>} - The loaded list object or null if not found.
 */
export const loadTodoList: (id: number) => Promise<TodoList | null> = async (id: number): Promise<TodoList | null> => {
  try {
    const content: string = await FileSystem.readAsStringAsync(`${DATA_DIRECTORY}list${id}.json`);
    return JSON.parse(content);
  } catch (error) {
    console.log(`Failed to load todo list with id ${id}:`, error);
    return null;
  }
};

/**
 * Deletes a specific list by ID and removes its entry in the index file.
 *
 * @param {number} id - The ID of the list to delete.
 * @returns {Promise<boolean>} - True if deletion is successful, false otherwise.
 */
export const deleteTodoList: (id: number) => Promise<boolean> = async (id: number): Promise<boolean> => {
  try {
    // Delete file with list.
    await FileSystem.deleteAsync(`${DATA_DIRECTORY}list${id}.json`);

    // Remove entry in index file.
    const indexContent: TodoListMeta[] = await loadTodoListMeta();
    const updatedIndex: TodoListMeta[] = indexContent.filter(item => item.id !== id);
    await FileSystem.writeAsStringAsync(INDEX_FILE, JSON.stringify(updatedIndex));

    return true; // Return success.
  } catch (error) {
    console.log(`Failed to delete todo list with id ${id}:`, error);
    return false;
  }
};

/**
 * Function to generate a new unique ID for a new list.
 *
 * @returns {Promise<number>} - A unique ID based on existing IDs in the index.
 */
const generateId: () => Promise<number> = async (): Promise<number> => {
  const todoListMeta: TodoListMeta[] = await loadTodoListMeta()

  if (todoListMeta.length === 0) {
    return 1;
  }

  const maxId = Math.max(...todoListMeta.map(item => item.id));

  return maxId + 1;
}

/**
 * Function to update the index file by adding a new entry for a created list.
 *
 * @param {string} listName - The title of the new list.
 * @param {number} id - The unique ID of the new list.
 * @returns {Promise<void>}
 */
const updateIndexFile = async (listName: string, id: number): Promise<void> => {
  let indexFileContent: TodoListMeta[] = [];
  const newIndexEntry: TodoListMeta = { id: id, title: listName};

  try {
    const content: string = await FileSystem.readAsStringAsync(INDEX_FILE);
    indexFileContent = JSON.parse(content);
    indexFileContent.push(newIndexEntry);
    await FileSystem.writeAsStringAsync(INDEX_FILE, JSON.stringify(indexFileContent));
  } catch (error) {
    console.error('Failed to update index file.', error);
  }
};

/**
 * Function to create test data if the initialize flag is true.
 *
 * @param {boolean} initialize - Flag to trigger the initialization of test data.
 * @returns {Promise<void>}
 */
export const initializeTestData: (initialize: boolean) => Promise<void> = async (initialize: boolean): Promise<void> => {
  if (initialize) {
    await saveNewTodoList("Chores", ["Take out the trash", "Wash the dishes"], ["Clean the garage", "Mow the lawn"]);
    await saveNewTodoList("Reading List", ["Finish 'Atomic Habits'", "Start 'Sapiens'"], ["Read 'The Power of Habit'", "Browse new books"]);
    await saveNewTodoList("Work Task", ["Finish project report", "Email client"], ["Plan next sprint", "Organize files"]);
  }
}




