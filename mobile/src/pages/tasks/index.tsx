import React, {useEffect, useState} from 'react';
import {TextInput} from 'react-native';

import CheckBox from '@react-native-community/checkbox';
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
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  function updatingTask({index, task}: UpdateTasks): void {
    const newTask = [...tasks];
    newTask[index] = task;
    setTasks(newTask);
  }

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

  const handleEditName = ({id, Title}: EditName): void => {
    const pathEditName = `/tasks/${id}`;

    api
      .put(pathEditName, {Title})
      .then((response) => {
        const index = tasks.findIndex((task) => task.id === id);
        const task = response.data;
        updatingTask({index, task});
      })
      .catch((err) => {
        console.error(err);
      });
  };

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

  const handleAddTask = ({Title}: AddTask): void => {
    const pathAdd = `/tasks`;

    api
      .post(pathAdd, {Title})
      .then((response) => {
        const newTask = response.data;
        setTasks([newTask, ...tasks]);
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
        // onSubmitEditing={(event) => test({text: event.nativeEvent.text})}
        onSubmitEditing={(event) =>
          handleAddTask({Title: event.nativeEvent.text})
        }
        blurOnSubmit
      />
    </>
  );
};

export default Tasks;
