import type {FunctionComponent} from "react";
import styles from "./RegisterPage.module.scss";
import {Button, Card, Flex, Form, Input} from "antd";
import {registerUser} from "../../../features";
import * as z from "zod";

const ValidateRegisterIputs = z.object({
  email: z.email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  path: ['confirmPassword'],
  message: "Пароли не совпадают"
});

//TODO: Валидация регисьрации

const RegisterPage: FunctionComponent = () => {

  const [form] = Form.useForm()

  const onRegisterUser = async () => {
    console.log(form.getFieldValue('email'), form.getFieldValue('password'))
    const user = await registerUser(form.getFieldValue('email'), form.getFieldValue('password'))
    console.log(user)
  }

  return (
    <Flex align={'center'} justify={'center'} style={{height: "100%"}}>
      <Card title="Регистрация">
        <Form layout="vertical" form={form} style={{width: "400px"}}>
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

          <Form.Item<string>
            label="Повторите пароль"
            name="confirmPassword"
            rules={[{required: true, message: 'Пожалуйста, повторите пароль'}]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item>
            <Button type="primary" onClick={() => onRegisterUser()}>Зарегистрироваться</Button>
          </Form.Item>

          <Form.Item>
            Уже есть аккаунт? <a href="/login">Войти</a>
          </Form.Item>
        </Form>
      </Card>
    </Flex>
  )
}

export default RegisterPage