import { Route, Routes } from 'react-router';
import {TodosPage} from "../../pages/todos";
import {RegisterPage} from "../../pages/auth/register";
import {LoginPage} from "../../pages/auth/login";

const AppRouter = () => {
  return (
    <Routes>
      <Route path="*" element={<TodosPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
    </Routes>
  );
};

export default AppRouter;