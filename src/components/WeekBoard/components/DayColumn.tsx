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
  const { setNodeRef } = useDroppable({ id: `day:${day}` });

  return (
    <div>
      <p className="dayText">{day.substring(0, 3)}</p>
      <div className="column" ref={setNodeRef}>
        <div className="columnHeader">
          <div className="dayNumber">{dayNumber}</div>
          <button className="addButton" onClick={onAddGroup}>
            +
          </button>
        </div>

        <SortableContext
          items={taskList.map((g) => `group:${g.id}`)}
          strategy={verticalListSortingStrategy}
        >
          {taskList.map((group) => (
            <TaskList
              key={group.id}
              day={day}
              taskList={group}
              onAddTask={onAddTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
