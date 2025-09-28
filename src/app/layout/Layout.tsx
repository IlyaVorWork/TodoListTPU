import type {FunctionComponent} from "react";
import {Outlet, useNavigate} from "react-router";
import styles from "./Layout.module.css"
import {Button, Flex} from "antd";
import {LogoutOutlined} from "@ant-design/icons";
import {logoutUser} from "../../features";
import {logout} from "../../entities/user";
import {useAppDispatch, useAppSelector} from "../../shared/lib/store";

export const Layout: FunctionComponent = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  return (
    <>
      <Flex className={styles.layout}>
        <div className={styles.userTag}><span>{user.displayName ?? user.email}</span></div>
        <Button
          icon={<LogoutOutlined/>}
          type="primary"
          onClick={() => {
            if (user.uid) {
              logoutUser().then(() => {
                dispatch(logout())
              })
            } else {
              navigate("/login")
            }
          }}
          className={styles.logoutButton}
        />
      </Flex>
      <Outlet/>
    </>
  )
}