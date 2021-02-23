import React, {useEffect, useState} from 'react';
import {AppState, TextInput} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
import AsyncStorage from '@react-native-community/async-storage';
import Feather from 'react-native-vector-icons/Feather';

import api from '../../config/api';

import {Line} from './styles';

interface Task {
  id: string;
  Title: string;
  Done: boolean;
  created_at: Date;
  updated_at: Date;
}

interface EditName {
  id: string;
  Title: any;
}

interface UpdateTasks {
  index: number;
  task: Task;
}

interface DeleteTask {
  id: string;
}

interface AddTask {
  Title: string;
}

const Tasks = () => {
  const pathList = '/tasks';

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    api
      .get(pathList)
      .then(async (response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  // UPDATE THE LIST OF TASKS
  async function updatingTask({index, task}: UpdateTasks): Promise<Task[]> {
    const newTasks = [...tasks];
    newTasks[index] = task;

    setTasks(newTasks);

    return newTasks;
  }

  // SWITCH THE CHECKBOX AND SAVE ON DATABASE
  const handleSwitch = (id: string): void => {
    const pathSwitch = `/tasks/switch/${id}`;
    api
      .put(pathSwitch)
      .then((response) => {
        const index = tasks.findIndex((task) => task.id === id);
        const task = response.data as Task;
        updatingTask({index, task});
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // UPDATE THE EDIT TASK ON ASYNCSTORAGE
  const handleEditName = async ({id, Title}: EditName): Promise<void> => {
    try {
      const index = tasks.findIndex((task) => task.id === id);
      const task = tasks[index];
      task.Title = Title;
      const newTasks = updatingTask({index, task});

      await AsyncStorage.setItem('tasks', JSON.stringify(newTasks));
    } catch (err) {
      console.error(err);
    }
  };

  // SAVE THE EDIT TASK ON DATABASE
  const handleEditNameSave = ({id, Title}: EditName): void => {
    const pathEditName = `/tasks/${id}`;
    api
      .put(pathEditName, {Title})
      .then((response) => {
        console.log('The task was edited!');
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // DELETE TASK AND SAVE ON DATABASE
  const handleDeleteTask = ({id}: DeleteTask): void => {
    const pathDelete = `/tasks/${id}`;
    api
      .delete(pathDelete)
      .then((response) => {
        const index = tasks.findIndex((task) => task.id === id);
        const newTask = [...tasks];

        newTask.splice(index);

        setTasks(newTask);

        console.log(response.data.message);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  // ADD A TASK AND SAVE ON DATABASE
  const handleAddTask = ({Title}: AddTask): void => {
    const pathAdd = `/tasks`;

    api
      .post(pathAdd, {Title})
      .then((response) => {
        const newTask = response.data;
        setTasks([...tasks, newTask]);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <>
      {tasks.map((task, index) => {
        return (
          <Line key={index}>
            <CheckBox
              value={task.Done}
              onValueChange={(t) => handleSwitch(task.id)}
            />
            <TextInput
              value={task.Title}
              onChangeText={(Title) => handleEditName({id: task.id, Title})}
              onSubmitEditing={(event) =>
                handleEditNameSave({id: task.id, Title: event.nativeEvent.text})
              }
            />
            <Feather
              name="trash"
              onPress={() => handleDeleteTask({id: task.id})}
            />
          </Line>
        );
      })}
      <TextInput
        placeholder="Adicionar"
        onSubmitEditing={(event) =>
          handleAddTask({Title: event.nativeEvent.text})
        }
        blurOnSubmit
      />
    </>
  );
};

export default Tasks;
