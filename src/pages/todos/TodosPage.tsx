import {type FunctionComponent, useEffect, useState} from "react";
import styles from "./TodosPage.module.scss";
import {Button, Checkbox, Flex, Form, Input, List, Modal, Select, Typography} from "antd";
import {DeleteOutlined, PlusOutlined} from "@ant-design/icons";
import type {Task} from "../../entities/task";
import {addTask, getTasks} from "../../features/task/api.ts";
import {useAppSelector} from "../../shared/lib/store";
import TextArea from "antd/es/input/TextArea";

const {Text, Title} = Typography;

const priorityColor = {
  "low": "#52c41a",
  "medium": "#faad14",
  "high": "#ff4d4f",
}

const priorityOptions = [
  {
    value: 'low',
    title: "Низкий"
  },
  {
    value: 'medium',
    title: "Средний"
  },
  {
    value: 'high',
    title: "Высокий"
  }
]

const TodosPage: FunctionComponent = () => {

  const [form] = Form.useForm()

  const [isNewTaskModalOpen, setIsNewTaskModalOpen] = useState(false);

  const showModal = () => {
    setIsNewTaskModalOpen(true);
  };

  const handleOk = () => {
    addTask({
      title: form.getFieldValue('title'),
      description: form.getFieldValue('description') ?? "",
      completed: false,
      priority: form.getFieldValue('priority'),
      userId: user.uid,
    } as Task).then(task => {
      setTodos(prev => [...prev, task!])
      form.resetFields()
    })
    setIsNewTaskModalOpen(false);
  };

  const handleCancel = () => {
    setIsNewTaskModalOpen(false);
  };

  const user = useAppSelector(state => state.user)

  const [todos, setTodos] = useState<Task[]>([]);

  useEffect(() => {
    getTasks(user.uid).then((tasks) => {
      setTodos(tasks)
      console.log(tasks)
    })
  }, []);

  return (
    <Flex align={'center'} justify={'center'} style={{height: "100%"}}>
      <List
        style={{
          width: "600px",
          maxHeight: "800px"
        }}
        header={
          <Flex style={{flex: 1}} gap={16} align="center">
            <Title style={{margin: 0}} level={4}>Список задач</Title>
            <Button icon={<PlusOutlined />} onClick={() => showModal()} />
          </Flex>
        }
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <List.Item>
            <Flex style={{flex: 1}} gap={16} align="center">
              <Checkbox checked={item.completed}/>
              <div style={{
                width: '25px',
                height: '25px',
                borderRadius: "100%",
                backgroundColor: priorityColor[item.priority],
              }}/>
              <Text delete={item.completed} style={{width: "calc(100% - 121px)"}}>{item.title}</Text>
              <Button icon={<DeleteOutlined/>}/>
            </Flex>
          </List.Item>
        )}
      />
      <Modal
        title="Новая задача"
        closable={{ 'aria-label': 'Custom Close Button' }}
        open={isNewTaskModalOpen}
        onOk={handleOk}
        okText="Добавить"
        onCancel={handleCancel}
        cancelText="Отмена"
      >
        <Form form={form} initialValues={{priority: 'low'}}>
          <Form.Item<string>
            label="Заголовок"
            name="title"
          >
            <Input placeholder="Заголовок" />
          </Form.Item>

          <Form.Item<string>
            label="Описание"
            name="description"
          >
            <TextArea rows={4} placeholder="Описание" />
          </Form.Item>

          <Form.Item<string>
            label="Приоритет"
            name="priority"
          >
            <Select value={form.getFieldValue('priority')}>
              {priorityOptions.map(option => (
                <Select.Option value={option.value}>{option.title}</Select.Option>
              ))}
            </Select>
          </Form.Item>

        </Form>
      </Modal>
    </Flex>
  )
}

export default TodosPage