import type {FunctionComponent} from "react";
import {Button, Checkbox, Flex, List, Typography} from "antd";
import {priorityColor} from "../../../../entities/task";
import type {Task} from "../../../../entities/task";
import {DeleteOutlined, EditOutlined} from "@ant-design/icons";
import styles from "./TaskListItem.module.css"

interface TaskProps {
  task: Task
  onEditStart: (task: Task) => void
  onUpdate: (task: Task) => void
  onDelete: (id: string) => void
}

const {Text} = Typography;

export const TaskListItem: FunctionComponent<TaskProps> = ({task, onEditStart, onUpdate, onDelete}) => {
  return (
    <List.Item>
      <Flex className={styles.taskListItemContent}>
        <Checkbox checked={task.completed} onChange={(e) => onUpdate({
          ...task,
          completed: e.target.checked
        })}/>
        <div
          className={styles.priorityCircle}
          style={{
            backgroundColor: priorityColor[task.priority],
          }}/>
        <Text delete={task.completed} className={styles.taskTitle}>{task.title}</Text>
        <Button icon={<EditOutlined/>} onClick={() => onEditStart(task)}/>
        <Button danger icon={<DeleteOutlined/>} onClick={() => onDelete(task.id)}/>
      </Flex>
    </List.Item>
  )
}