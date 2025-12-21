"use client";

import { TaskProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ task, activeId }: TaskProps) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: `task:${activeId}` });

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        ...styles.task,
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <p style={styles.title}>{task.title}</p>
      <div style={styles.taskBottom}>
        <span>1x</span>
        <span>50 lb x 5</span>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  task: {
    backgroundColor: "#ffffffcc",
    border: "1px solid #22242626",
    borderRadius: 6,
    padding: 3,
    cursor: "grab",
  },
  title: {
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "13px",
    lineHeight: "18px",
    textAlign: "right",
    color: "#000000",
  },
  taskBottom: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    color: "#919cad",

    fontStyle: "normal",
    fontWeight: 700,
    fontSize: "10px",
    lineHeight: "14px",
  },
};
