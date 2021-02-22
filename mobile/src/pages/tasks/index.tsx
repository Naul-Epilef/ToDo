import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';

import CheckBox from '@react-native-community/checkbox';

import api from '../../config/api';

interface Task {
  id: string;
  Title: string;
  Done: boolean;
  created_at: Date;
  updated_at: Date;
}

const Tasks = () => {
  const pathList = '/tasks';

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(generateList, []);

  function generateList() {
    api
      .get(pathList)
      .then((response) => {
        setTasks(response.data);
      })
      .catch((err) => {
        console.error(err);
      });
  }

  function handleSwitch(id: string) {
    const pathSwitch = `/tasks/switch/${id}`;
    api
      .put(pathSwitch)
      .then((response) => {
        // const index = tasks.findIndex((task) => task.id === id);
        // tasks[index] = response.data;
        generateList();
      })
      .catch((err) => {
        console.error(err);
      });
  }

  return (
    <>
      {tasks.map((task) => {
        return (
          <View key={task.id}>
            <CheckBox
              value={task.Done}
              onValueChange={(t) => handleSwitch(task.id)}
            />
            <Text>{task.Title}</Text>
          </View>
        );
      })}
    </>
  );
};

export default Tasks;
