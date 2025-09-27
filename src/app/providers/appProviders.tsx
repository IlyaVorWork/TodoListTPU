import type {FunctionComponent, ReactNode} from "react";
import {BrowserRouter} from "react-router";
import { Provider } from 'react-redux';
import {mainStore} from "../stores";

type AppProvidersProps = {
  children: ReactNode;
}

export const AppProviders: FunctionComponent<AppProvidersProps> = ({children}) => {
  return (
    <Provider store={mainStore}>
      <BrowserRouter>
        {children}
      </BrowserRouter>
    </Provider>
  )
}