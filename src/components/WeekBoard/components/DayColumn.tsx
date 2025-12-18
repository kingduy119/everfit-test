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
          items={taskList.map((g) => `list:${g.id}`)}
          strategy={verticalListSortingStrategy}
        >
          {taskList.map((item) => (
            <TaskList
              key={item.id}
              day={day}
              taskList={item}
              onAddTask={onAddTask}
            />
          ))}
        </SortableContext>
      </div>
    </div>
  );
}
