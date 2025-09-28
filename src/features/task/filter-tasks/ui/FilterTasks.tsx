import {type FunctionComponent, useContext} from "react";
import {Radio} from "antd";
import type {CheckboxGroupProps} from "antd/es/checkbox";
import {TasksFiltersContext} from "../../../../shared/context/TasksFiltersContext";
import styles from "./FilterTasks.module.css"
import { useMediaQuery } from "@uidotdev/usehooks";

const tasksFilterOptions: CheckboxGroupProps<string>['options'] = [
  {label: 'Все', value: 'all'},
  {label: 'Выполненные', value: 'completed'},
  {label: 'Невыполненные', value: 'uncompleted'},
];

export const FilterTasks: FunctionComponent = () => {

  const {filter, setFilter} = useContext(TasksFiltersContext)

  const isMobile = useMediaQuery("(max-width : 480px)");

  return (
    <Radio.Group
      options={tasksFilterOptions}
      onChange={(e) => {
        setFilter(e.target.value)
      }}
      className={styles.tasksFilter}
      value={filter}
      optionType={isMobile ? "default" : "button"}
      buttonStyle="solid"
    />
  )
}
