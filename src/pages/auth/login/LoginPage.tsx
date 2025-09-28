import type {FunctionComponent} from "react";
import styles from "./LoginPage.module.css";
import {Button, Card, Flex, Form, Input, message} from "antd";
import {loginUser} from "../../../features";
import {useAppDispatch} from "../../../shared/lib/store";
import {login} from "../../../entities/user";
import {useNavigate} from "react-router";
import {FirebaseError} from "firebase/app";

const LoginPage: FunctionComponent = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm()

  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const onLoginUser = async () => {
    try {
      await form.validateFields()

      const user = await loginUser(form.getFieldValue('email'), form.getFieldValue('password'))
      dispatch(login(user))
      navigate("/todos")
    } catch(error) {
      if (error instanceof FirebaseError) {
        messageApi.error("Ошибка авторизации")
      } else {
        // @ts-expect-error Antd form validation error
        messageApi.error(error.errorFields[0].errors[0])
      }
    }
  }

  return (
    <Flex className={styles.content}>
      {contextHolder}
      <Card title="Вход">
        <Form layout="vertical" form={form} className={styles.form}>
          <Form.Item<string>
            label="Email"
            name="email"
            rules={[
              {
                type: 'email',
                message: 'Введенный Email имеет неверный формат',
              },
              {
                required: true,
                message: 'Пожалуйста, введите Email',
              },
            ]}
          >
            <Input/>
          </Form.Item>

          <Form.Item<string>
            label="Пароль"
            name="password"
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пароль',
              },
            ]}
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