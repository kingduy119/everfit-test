export type TaskType = {
  id: string;
  title: string;
};

export type ListTask = {
  id: string;
  title: string;
  tasks: TaskType[];
};

export type BoardData = Record<string, ListTask[]>;

export type DayColumnProps = {
  day: string;
  date: string;
  taskList: ListTask[];
  onAddGroup: () => void;
  onAddTask: (day: string, groupId: string) => void;
};

export type TaskListProps = {
  day: string;
  taskList: ListTask;
  onAddTask: (day: string, groupId: string) => void;
};

export type TaskProps = { task: TaskType };
