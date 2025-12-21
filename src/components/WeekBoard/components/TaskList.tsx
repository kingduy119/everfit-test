"use client";

import Image from "next/image";
import { TaskListProps } from "@/types";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Task from "./Task";

export default function TaskList({
  day,
  taskList,
  activeId,
  onAddTask,
}: TaskListProps) {
  const { setNodeRef, attributes, listeners, transform, transition, isOver } =
    useSortable({ id: `list:${activeId}` });

  return (
    <div
      style={{
        ...styles.container,
        background: isOver ? "yellow" : "#FFFFFFCC",
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div {...listeners} style={styles.header}>
        <div style={styles.title}>{taskList.title}</div>
        <Image
          src="/icons/three-dot-icon.svg"
          alt="Add"
          width={11}
          height={3}
          style={styles.icon}
        />
      </div>

      <SortableContext
        items={taskList.tasks.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} {...attributes} style={styles.tasksContainer}>
          {taskList.tasks.map((task, index) => (
            <Task key={task.id} task={task} activeId={`${activeId},${index}`} />
          ))}
        </div>
      </SortableContext>
      <div style={styles.bottom}>
        <button style={styles.button} onClick={() => onAddTask(activeId)}>
          +
        </button>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    background: "#FFFFFFCC",
    border: "1px solid #22242626",
    borderRadius: 6,
    padding: 3,
    marginBottom: 8,
    cursor: "grab",
    display: "flex",
    flexDirection: "column",
    gap: 5,
  },
  tasksContainer: {
    display: "flex",
    flexDirection: "column",
    gap: "0.1rem",
  },
  header: {
    display: "flex",
    flexWrap: "nowrap",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: { width: "auto", height: 3 },
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
