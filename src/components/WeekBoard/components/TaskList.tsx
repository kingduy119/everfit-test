import Image from "next/image";
import { TaskListProps } from "@/types";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Task from "./Task";

export default function TaskList({ day, taskList, onAddTask }: TaskListProps) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: `list:${taskList.id}` });

  const droppableId = `${day}|${taskList.id}`;

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      style={{
        ...styles.container,
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div style={styles.header} {...listeners}>
        <div style={styles.title}>{taskList.title}</div>
        <Image
          src="/icons/three-dot-icon.svg"
          alt="Add"
          width={11}
          height={3}
        />
      </div>

      <SortableContext
        items={taskList.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        {taskList.tasks.map((task) => (
          <Task key={task.id} task={task} />
        ))}
      </SortableContext>

      <div style={styles.bottom}>
        <button
          style={styles.button}
          onClick={() => onAddTask(day, taskList.id)}
        >
          +
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    backgroundColor: "#FFFFFFCC",
    border: "1px solid #22242626",
    borderRadius: 6,
    padding: 3,
    marginBottom: 8,
    cursor: "grab",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  header: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
  },
  title: {
    color: "#5a57cb",
    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "10px",
    lineHeight: "14px",
    textTransform: "uppercase",
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  bottom: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    width: "12px",
    height: "12px",
    borderRadius: "50%",
    backgroundColor: "#9ca3af",
    color: "#ffffff",
    border: "none",
    padding: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "10px",
    fontWeight: 700,
    lineHeight: 1,
  },
};
