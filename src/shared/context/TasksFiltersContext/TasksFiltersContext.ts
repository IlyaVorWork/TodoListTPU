import {createContext} from 'react';
import type {TasksFilter} from "../../../features";

interface TasksFiltersContext {
  filter: TasksFilter;
  setFilter: (filter: TasksFilter) => void;
  searchQuery: string;
  setSearchQuery: (searchQuery: string) => void;
}

export const TasksFiltersContext = createContext<TasksFiltersContext>({} as TasksFiltersContext)