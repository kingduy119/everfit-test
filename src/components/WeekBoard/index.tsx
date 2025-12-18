"use client";

import { DndContext, closestCorners } from "@dnd-kit/core";
import { DayColumn } from "./components/DayColumn";
import { DAYS, useWeekBoard } from "./methods/useWeekBoard";

export default function WeekBoard() {
  const weekBoard = useWeekBoard();

  return (
    <div className="weekBoard">
      <DndContext
        collisionDetection={closestCorners}
        onDragEnd={weekBoard.onDragEnd}
      >
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(7, 1fr)",
            gap: 12,
          }}
        >
          {DAYS.map((item) => (
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
