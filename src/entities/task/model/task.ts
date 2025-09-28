type Timestamp = {
  seconds: number;
  nanoseconds: number;
}

export type Task = {
  id: string;
  title: string,
  description: string,
  completed: boolean,
  priority: Priority,
  createdAt: Timestamp,
  updatedAt: Timestamp,
  userId: string
}

export type Priority = 'low' | 'medium' | 'high'

export const priorityColor = {
  "low": "#52c41a",
  "medium": "#faad14",
  "high": "#ff4d4f",
}

export const priorityOptions = [
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