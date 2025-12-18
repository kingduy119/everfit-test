import Image from "next/image";
import { TaskListProps } from "@/types";
import {
  SortableContext,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";

export default function TaskList({ day, taskList, onAddTask }: TaskListProps) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: `list:${taskList.id}` });

  const droppableId = `${day}|${taskList.id}`;
  const boxRef = useDroppable({ id: droppableId });

  return (
    <div
      className="taskList"
      ref={setNodeRef}
      {...attributes}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <div
        className="groupBox"
        ref={boxRef.setNodeRef}
        style={{ background: boxRef.isOver ? "#e6f7ff" : "transparent" }}
      >
        <div className="groupBox-header" {...listeners}>
          <div className="groupBox-title">{taskList.title}</div>
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

        <div className="groupBox-bottom">
          <button
            className="addButton"
            onClick={() => onAddTask(day, taskList.id)}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
