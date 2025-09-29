import {type FunctionComponent} from "react";
import {priorityColor, priorityOptions, type Task} from "../../../../entities/task/model/task.ts";
import {Form, Modal} from "antd";
import styles from "./TaskModal.module.css"

interface TaskModalProps {
  task: Task;
  isOpen: boolean;
  onClose: () => void;
}

export const TaskModal: FunctionComponent<TaskModalProps> = ({task, isOpen, onClose}) => {

  const {title, description, priority} = task

  return (
    <Modal
      title={title}
      closable={{'aria-label': 'Custom Close Button'}}
      open={isOpen}
      onCancel={() => onClose()}
      footer={<></>}
    >
      <Form>
        <Form.Item<string>
          label="Описание"
          name="description"
        >
          <div className={styles.description}>{description}</div>
        </Form.Item>

        <Form.Item<string>
          label="Приоритет"
          name="priority"
        >
          <div style={{color: priorityColor[priority]}}>
            {priorityOptions.find(el => el.value === priority)!.title}
          </div>
        </Form.Item>
      </Form>
    </Modal>
  )
}