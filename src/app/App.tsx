import './styles/App.css';
import {AppRouter} from "./router";
import {AppProviders} from "./providers/appProviders.tsx";
import {Flex, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";
import {firebaseApp} from "../shared/lib/firebase";

const App = () => {

  if (!firebaseApp) {
    return (
      <Flex align={'center'} justify={'center'} style={{height: "100%"}}>
        <Spin indicator={<LoadingOutlined spin/>} size="large"/>
      </Flex>
    )
  }

  return (
    <AppProviders>
      <AppRouter />
    </AppProviders>
  );
};

export default App;