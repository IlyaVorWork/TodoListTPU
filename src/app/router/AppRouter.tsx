import {Route, Routes} from 'react-router';
import {TodosPage} from "../../pages/todos";
import {RegisterPage} from "../../pages/auth/register";
import {LoginPage} from "../../pages/auth/login";
import {Layout} from "../layout";
import {WithAuth} from "../with-auth";

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<WithAuth/>}>
        <Route element={<Layout/>}>
          <Route path="*" element={<TodosPage/>}/>
        </Route>
      </Route>
      <Route path="/login" element={<LoginPage/>}/>
      <Route path="/register" element={<RegisterPage/>}/>
    </Routes>
  );
};