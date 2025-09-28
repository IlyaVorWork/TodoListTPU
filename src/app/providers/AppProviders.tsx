import type {FunctionComponent, ReactNode} from "react";
import {BrowserRouter} from "react-router";
import {Provider} from 'react-redux';
import {mainStore} from "../stores";
import {TasksFiltersProvider} from "../../shared/context/TasksFiltersContext";

type AppProvidersProps = {
  children: ReactNode;
}

export const AppProviders: FunctionComponent<AppProvidersProps> = ({children}) => {
  return (
    <Provider store={mainStore}>
      <TasksFiltersProvider>
        <BrowserRouter>
          {children}
        </BrowserRouter>
      </TasksFiltersProvider>
    </Provider>
  )
}