import './styles/index.css';
import {AppRouter} from "./router";
import {BrowserRouter} from "react-router";

const App = () => {
  return (
    <BrowserRouter>
      <AppRouter />
    </BrowserRouter>);
};

export default App;