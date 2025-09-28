import {Form, Input, Modal, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import  {type FunctionComponent} from "react";
import {addTask} from "../../api.ts";
import {priorityColor, priorityOptions, type Task} from "../../../../entities/task";
import {useAppSelector} from "../../../../shared/lib/store";

interface AddTaskModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onCreate: (task: Task) => void;
  onFailure: () => void;
}

export const AddTaskModal: FunctionComponent<AddTaskModalProps> = ({isOpen, setIsOpen, onCreate, onFailure}) => {

  const [form] = Form.useForm()
  const user = useAppSelector(state => state.user)

  const handleOk = async () => {
    try {
      await form.validateFields()

      const newTask = await addTask({
        title: form.getFieldValue('title'),
        description: form.getFieldValue('description') ?? "",
        completed: false,
        priority: form.getFieldValue('priority'),
        userId: user.uid,
      } as Task)

      onCreate(newTask!);
      form.resetFields()
      setIsOpen(false);
    } catch {
      onFailure();
    }
  };

  const handleCancel = () => {
    form.resetFields()
    setIsOpen(false);
  };

  return (
    <Modal
      title="Новая задача"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onOk={handleOk}
      okText="Добавить"
      onCancel={handleCancel}
      cancelText="Отмена"
    >
      <Form form={form} initialValues={{priority: 'low'}}>
        <Form.Item<string>
          label="Заголовок"
          name="title"
          rules={[
            {
              required: true,
              message: 'Пожалуйста, введите заголовок задачи',
            },
          ]}
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
          <Select>
            {priorityOptions.map(option => (
              <Select.Option value={option.value} style={{
                color: priorityColor[option.value as keyof typeof priorityColor],
              }}>
                {option.title}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

      </Form>
    </Modal>
  )
}