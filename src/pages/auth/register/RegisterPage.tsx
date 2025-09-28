import type {FunctionComponent} from "react";
import styles from "./RegisterPage.module.css";
import {Button, Card, Flex, Form, Input, message} from "antd";
import {registerUser} from "../../../features";
import {useNavigate} from "react-router";
import {FirebaseError} from "firebase/app";

const RegisterPage: FunctionComponent = () => {

  const [messageApi, contextHolder] = message.useMessage();
  const [form] = Form.useForm()
  const navigate = useNavigate()

  const onRegisterUser = async () => {
    try {
      await form.validateFields()

      await registerUser(form.getFieldValue('email'), form.getFieldValue('password'))

      navigate("/login")
    } catch(error) {
      if (error instanceof FirebaseError) {
        messageApi.error("Ошибка регистрации")
      }
      // @ts-expect-error Antd form validation error
      messageApi.error(error.errorFields[0].errors[0])
    }
  }

  return (
    <Flex className={styles.content}>
      {contextHolder}
      <Card title="Регистрация">
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
            <Input />
          </Form.Item>

          <Form.Item<string>
            label="Пароль"
            name="password"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Пожалуйста, введите пароль',
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item<string>
            label="Повторите пароль"
            name="confirmPassword"
            hasFeedback
            rules={[
              {
                required: true,
                message: 'Пожалуйста, подтвердите пароль',
              },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('Пароли не совпадают'));
                },
              }),
            ]}
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