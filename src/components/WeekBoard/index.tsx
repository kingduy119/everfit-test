"use client";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { DayColumn } from "./components/DayColumn";
import { DAYS, useWeekBoard } from "./methods/useWeekBoard";

export default function WeekBoard() {
  const weekBoard = useWeekBoard();

  return (
    <div style={styles.container}>
      <DndContext
        collisionDetection={closestCorners}
        // onDragOver={weekBoard.onDragOver}
        onDragEnd={weekBoard.onDragEnd}
      >
        <div style={styles.grid}>
          {DAYS.map((item, index) => (
            <DayColumn
              key={item.day}
              day={item.day}
              date={item.date}
              taskList={weekBoard.data[item.day]}
              onAddGroup={() => weekBoard.addGroup(item.day)}
              onAddTask={weekBoard.addTask}
            />
          ))}
        </div>
      </DndContext>
    </div>
  );
}

const styles: Record<string, React.CSSProperties> = {
  container: {
    paddingBlock: "3.5rem",
    paddingInline: "4rem",
    height: "100%",
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(7, 1fr)",
    gap: "0.3rem",
    height: "100%",
    overflowY: "hidden",
  },
};
