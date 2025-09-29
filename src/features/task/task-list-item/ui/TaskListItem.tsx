import type {FunctionComponent} from "react";
import {Button, Checkbox, Flex, List, Typography} from "antd";
import {priorityColor} from "../../../../entities/task";
import type {Task} from "../../../../entities/task";
import {DeleteOutlined, EditOutlined, InfoCircleOutlined} from "@ant-design/icons";
import styles from "./TaskListItem.module.css"

interface TaskProps {
  task: Task
  onSelect: (task: Task) => void
  onEditStart: (task: Task) => void
  onUpdate: (task: Task) => void
  onDelete: (id: string) => void
}

const {Text} = Typography;

export const TaskListItem: FunctionComponent<TaskProps> = ({task, onSelect, onEditStart, onUpdate, onDelete}) => {
  return (
    <List.Item>
      <Flex className={styles.taskListItemContent}>
        <Checkbox checked={task.completed} onChange={(e) => onUpdate({
          ...task,
          completed: e.target.checked
        })}/>
        <Button
          icon={<InfoCircleOutlined/>}
          className={styles.priorityCircle}
          style={{
            backgroundColor: priorityColor[task.priority],
          }}
          onClick={() => onSelect(task)}
        />
        <Text delete={task.completed} className={styles.taskTitle}>{task.title}</Text>
        <Button icon={<EditOutlined/>} onClick={() => onEditStart(task)}/>
        <Button danger icon={<DeleteOutlined/>} onClick={() => onDelete(task.id)}/>
      </Flex>
    </List.Item>
  )
}