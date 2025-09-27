import {type FunctionComponent, useEffect} from "react";
import {useAppDispatch, useAppSelector} from "../../shared/lib/store";
import {getAuth} from "firebase/auth";
import {login} from "../../entities/user";
import {Outlet, useNavigate} from "react-router";
import {Flex, Spin} from "antd";
import {LoadingOutlined} from "@ant-design/icons";

export const WithAuth: FunctionComponent = () => {

  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const user = useAppSelector(state => state.user)

  useEffect(() => {
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
      if (user) {
        dispatch(login(user))
      } else {
        navigate("/login")
      }
    })

  }, [dispatch, navigate]);

  if (!user.uid) {
    return (
      <Flex align={'center'} justify={'center'} style={{height: "100%"}}>
        <Spin indicator={<LoadingOutlined spin/>} size="large"/>
      </Flex>
    )
  }

  return (
    <>
      <Outlet/>
    </>
  )
}