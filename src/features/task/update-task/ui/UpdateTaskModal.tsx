import {type FunctionComponent, useEffect} from "react";
import {Form, Input, Modal, Select} from "antd";
import TextArea from "antd/es/input/TextArea";
import {priorityColor, priorityOptions, type Task} from "../../../../entities/task";

interface UpdateTaskModalProps {
  task: Task;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  onUpdate: (task: Task) => void;
  onFailure: () => void;
}

export const UpdateTaskModal: FunctionComponent<UpdateTaskModalProps> = ({task, isOpen, setIsOpen, onUpdate, onFailure}) => {

  const [form] = Form.useForm()

  useEffect(() => {
    form.setFieldsValue({
      title: task.title,
      description: task.description,
      priority: task.priority,
    })
  }, [form, isOpen, task]);

  const handleOk = async () => {
    try {
      await form.validateFields()

      onUpdate({
        ...task,
        title: form.getFieldValue('title'),
        description: form.getFieldValue('description') ?? "",
        priority: form.getFieldValue('priority'),
      })
      setIsOpen(false);
    } catch {
      onFailure()
    }
  };

  const handleCancel = () => {
    form.resetFields()
    setIsOpen(false);
  };

  return (
    <Modal
      title="Обновить задачу"
      closable={{ 'aria-label': 'Custom Close Button' }}
      open={isOpen}
      onOk={handleOk}
      okText="Обновить"
      onCancel={handleCancel}
      cancelText="Отмена"
    >
      <Form form={form}>
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