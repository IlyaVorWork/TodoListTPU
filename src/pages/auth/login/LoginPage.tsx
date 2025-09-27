import type {FunctionComponent} from "react";
import styles from "./LoginPage.module.scss";
import {Button, Card, Flex, Form, Input} from "antd";
import {loginUser} from "../../../features";
import {useAppDispatch} from "../../../shared/lib/store";
import {login} from "../../../entities/user";
import {useNavigate} from "react-router";

const LoginPage: FunctionComponent = () => {

  const [form] = Form.useForm()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onLoginUser = async () => {
    const user = await loginUser(form.getFieldValue('email'), form.getFieldValue('password'))
    dispatch(login(user))
    navigate("/todos")
  }

  return (
    <Flex align={'center'} justify={'center'} style={{height: "100%"}}>
      <Card title="Вход">
        <Form layout="vertical" form={form} style={{width: "400px"}}>
          <Form.Item<string>
            label="Email"
            name="email"
            rules={[{required: true, message: 'Пожалуйста, введите адрес электронной почты'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item<string>
            label="Пароль"
            name="password"
            rules={[{required: true, message: 'Пожалуйста, введите пароль'}]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item>
            <Button block type="primary" onClick={() => onLoginUser()}>Войти</Button>
          </Form.Item>

          <Form.Item>
            Нет аккаунта? <a href="/register">Зарегистрироваться</a>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}

export default LoginPage