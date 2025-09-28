import {type FunctionComponent, useContext, useEffect, useState} from "react";
import styles from "./TodosPage.module.css";
import {Flex, List, message} from "antd";
import {type Task} from "../../entities/task";
import {
  deleteTask,
  getTasks,
  updateTask,
  TaskListItem,
  AddTaskModal,
  UpdateTaskModal,
  TaskListHeader
} from "../../features";
import {useAppSelector} from "../../shared/lib/store";
import {TasksFiltersContext} from "../../shared/context/TasksFiltersContext";

const TodosPage: FunctionComponent = () => {

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);
  const [isUpdateTaskModalOpen, setIsUpdateTaskModalOpen] = useState(false);
  const [taskToUpdate, setTaskToUpdate] = useState<Task>({} as Task);

  const [isLoading, setIsLoading] = useState(true)
  const [tasks, setTasks] = useState<Task[]>([]);

  const {filter: tasksFilter, searchQuery} = useContext(TasksFiltersContext)
  const user = useAppSelector(state => state.user)

  const [messageApi, contextHolder] = message.useMessage();

  const handleUpdateTask = async (task: Task) => {
    updateTask(task).then((updatedTask) => {
      setTasks(prev => prev.map(todo => {
        if (todo.id === updatedTask!.id) {
          return updatedTask!
        }
        return todo
      }))
      setTaskToUpdate({} as Task)
      messageApi.info("Задача успешно обновлена")
    }).catch(() => {
      messageApi.error("Ошибка при обновлении задачи")
    })
  }

  const handleCreateNewTask = (task: Task) => {
    setTasks(prev => [...prev, task])
    messageApi.info("Задача успешно добавлена")
  }

  const handleOpenEditTaskModal = (task: Task) => {
    setTaskToUpdate(task)
    setIsUpdateTaskModalOpen(true)
  }

  const handleOpenNewTaskModal = () => {
    setIsNewTaskModalOpen(true)
  }

  const handleDeleteTask = async (id: string) => {
    deleteTask(id).then(() => {
      setTasks(prev => prev.filter(todo => todo.id !== id))
      messageApi.info("Задача успешно удалена")
    }).catch(() => {
      messageApi.error("Ошибка при удалении задачи")
    })
  }

  useEffect(() => {
    setIsLoading(true)
    getTasks(user.uid).then((tasks) => {
      setTasks(tasks!)
      setIsLoading(false)
    })
  }, [user]);

  return (
    <Flex className={styles.wrapper}>
      <Flex vertical className={styles.content}>
        {contextHolder}
        <TaskListHeader onOpenNewTaskModal={handleOpenNewTaskModal}/>
        <List
          className={styles.tasksList}
          bordered
          loading={isLoading}
          dataSource={tasks.filter((task) => {
            switch (tasksFilter) {
              case "completed": {
                return task.completed && task.title.toLowerCase().includes(searchQuery)
              }
              case "uncompleted": {
                return !task.completed && task.title.toLowerCase().includes(searchQuery)
              }
              default:
                return task.title.toLowerCase().includes(searchQuery)
            }
          }).toSorted((a, b) => b.createdAt.seconds - a.createdAt.seconds)}
          renderItem={(item) => (
            <TaskListItem task={item} onEditStart={handleOpenEditTaskModal} onUpdate={handleUpdateTask}
                          onDelete={handleDeleteTask}/>
          )}
        />

        <AddTaskModal isOpen={isNewTaskModalOpen} setIsOpen={setIsNewTaskModalOpen} onCreate={handleCreateNewTask}
                      onFailure={() => messageApi.error("Ошибка при добавлении задачи")}/>
        <UpdateTaskModal isOpen={isUpdateTaskModalOpen} setIsOpen={setIsUpdateTaskModalOpen} task={taskToUpdate}
                         onUpdate={handleUpdateTask} onFailure={() => messageApi.error("Ошибка при обновлении задачи")}/>

      </Flex>
    </Flex>
  )
}

export default TodosPage