import {type ReactNode, useState} from "react";
import type {TasksFilter} from "../../../features";
import {TasksFiltersContext} from "./TasksFiltersContext.ts";

interface TasksFiltersProviderProps {
  children: ReactNode;
}

export const TasksFiltersProvider = ({ children }: TasksFiltersProviderProps) => {
  const [filter, setFilter] = useState<TasksFilter>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  return (
    <TasksFiltersContext.Provider value={{ filter, setFilter, searchQuery, setSearchQuery }}>
      {children}
    </TasksFiltersContext.Provider>
  );
};