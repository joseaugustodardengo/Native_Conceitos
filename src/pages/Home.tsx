import React, { useState } from 'react';

import { Header } from '../components/Header';
import { MyTasksList } from '../components/MyTasksList';
import { TodoInput } from '../components/TodoInput';

interface Task {
  id: number;
  title: string;
  done: boolean;
}

export function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);

  function handleAddTask(newTaskTitle: string) {
    if (newTaskTitle === '') return;

    const task = {
      id: new Date().getTime(),
      title: newTaskTitle,
      done: false
    }
    setTasks([...tasks, task])
  }

  function handleMarkTaskAsDone(id: number) {
    const newTask = tasks.map(task => task.id === id ? {
      ...task,
      done: !task.done
    } : task)
    setTasks(newTask)
  }

  function handleRemoveTask(id: number) {
    const taskFiltered = tasks.filter(task => task.id !== id)
    setTasks(taskFiltered)
  }

  return (
    <>
      <Header />

      <TodoInput addTask={handleAddTask} />

      <MyTasksList
        tasks={tasks}
        onPress={handleMarkTaskAsDone}
        onLongPress={handleRemoveTask}
      />
    </>
  )
}