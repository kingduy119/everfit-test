"use client";

import { useDroppable } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import type { DayColumnProps } from "../../../types";
import TaskList from "./TaskList";

export function DayColumn({
  day,
  date,
  taskList,
  onAddGroup,
  onAddTask,
}: DayColumnProps) {
  const dayNumber = date.split("/")[0];
  const { setNodeRef, isOver } = useDroppable({ id: `column:${day}` });

  return (
    <div style={styles.container}>
      <p style={styles.dayText}>{day.substring(0, 3)}</p>

      <div
        style={{
          ...styles.columns,
          background: isOver ? "#e6f7ff" : "#f3f5f8",
        }}
      >
        <div style={styles.header}>
          <div style={styles.day}>{dayNumber}</div>
          <button style={styles.button} onClick={onAddGroup}>
            +
          </button>
        </div>

        <div style={styles.taskList} ref={setNodeRef}>
          <SortableContext
            items={taskList.map((g) => `list:${g.id}`)}
            strategy={verticalListSortingStrategy}
          >
            {taskList.map((item, index) => (
              <TaskList
                key={item.id}
                day={day}
                activeId={`${day},${index}`}
                taskList={item}
                onAddTask={onAddTask}
              />
            ))}
          </SortableContext>
        </div>
      </div>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    display: "flex",
    flexDirection: "column",
  },
  dayText: {
    color: "#728096",
    textAlign: "center",
    textTransform: "uppercase",
    fontStyle: "normal",
    fontWeight: 600,
    fontSize: "10px",
    lineHeight: "14px",
  },
  columns: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
    //
    border: "1px solid #ddd",
    borderRadius: "8px",
    paddingBlock: "0.3rem",
    paddingInline: "0.3rem",
    // backgroundColor: "#f3f5f8",
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px",
  },
  taskList: {
    flex: "1",
    minHeight: 0,
    height: "100%",
  },
  day: {
    color: "#728096",
    fontWeight: 600,
    fontSize: "11px",
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
