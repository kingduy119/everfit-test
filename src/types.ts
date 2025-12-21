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
  onAddTask: (activeId: string) => void;
};

export type TaskListProps = {
  day: string;
  activeId: string;
  taskList: ListTask;
  onAddTask: (activeId: string) => void;
};

export type TaskProps = { task: TaskType; activeId: string };
