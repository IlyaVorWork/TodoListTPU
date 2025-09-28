import {type FunctionComponent, useContext} from "react";
import {Button, Flex, Typography} from "antd";
import {PlusOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";
import {FilterTasks} from "../../filter-tasks";
import {TasksFiltersContext} from "../../../../shared/context/TasksFiltersContext";
import styles from "./TaskListHeader.module.css"

const {Title} = Typography;

interface TaskListHeaderProps {
  onOpenNewTaskModal: () => void;
}

export const TaskListHeader: FunctionComponent<TaskListHeaderProps> = ({onOpenNewTaskModal}) => {

  const {setSearchQuery} = useContext(TasksFiltersContext)

  return (
    <Flex vertical className={styles.taskListHeader}>
      <Flex className={styles.headerTop}>
        <Flex className={styles.headerTitle}>
          <Title style={{margin: 0}} level={4}>Список задач</Title>
          <Button icon={<PlusOutlined/>} onClick={() => onOpenNewTaskModal()}/>
        </Flex>
        <FilterTasks/>
      </Flex>
      <Search placeholder="Название задачи..." allowClear onSearch={(query) => setSearchQuery(query.toLowerCase())}/>
    </Flex>
  )
}