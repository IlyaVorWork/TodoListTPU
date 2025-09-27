import type {FunctionComponent} from "react";
import {Outlet, useNavigate} from "react-router";
import styles from "./layout.module.css"
import {FloatButton} from "antd";
import {LoginOutlined, LogoutOutlined} from "@ant-design/icons";
import {logoutUser} from "../../features";
import {logout} from "../../entities/user";
import {useAppDispatch, useAppSelector} from "../../shared/lib/store";

export const Layout: FunctionComponent = () => {

  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const user = useAppSelector(state => state.user)

  return (
    <>
      <div className={styles.userTag}>{user.displayName ?? user.email}</div>
      <FloatButton
        icon={user.uid ? <LogoutOutlined/> : <LoginOutlined/>}
        type="primary"
        tooltip={user.uid ? "Выход" : "Вход"}
        onClick={() => {
          if (user.uid) {
            logoutUser().then(() => {
              dispatch(logout())
            })
          } else {
            navigate("/login")
          }
        }}
        style={{top: "48px", right: "48px"}}
      />
      <Outlet />
    </>
  )
}