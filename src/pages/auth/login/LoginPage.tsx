import type {FunctionComponent} from "react";
import styles from "./LoginPage.module.scss";
import {Button, Card, Flex, Form, Input} from "antd";
import {loginUser} from "../../../features";

const LoginPage: FunctionComponent = () => {

  const [form] = Form.useForm()

  const onLoginUser = async () => {
    console.log(form.getFieldValue('email'), form.getFieldValue('password'))
    const user = await loginUser(form.getFieldValue('email'), form.getFieldValue('password'))
    console.log(user)
  }

  return (
    <Flex align={'center'} justify={'center'} style={{height: "100%"}}>
      <Card title="Регистрация">
        <Form layout="vertical" form={form}>
          <Form.Item<string>
            label="Email"
            name="email"
            rules={[{required: true, message: 'Пожалуйста, введите адрес электронной почты'}]}
          >
            <Input />
          </Form.Item>

          <Form.Item<string>
            label="Пароль"
            name="password"
            rules={[{required: true, message: 'Пожалуйста, введите пароль'}]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={() => onLoginUser()}>Зарегистрироваться</Button>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}

export default LoginPage