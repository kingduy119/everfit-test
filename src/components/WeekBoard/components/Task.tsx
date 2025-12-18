import { TaskProps } from "@/types";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

export default function Task({ task }: TaskProps) {
  const { setNodeRef, attributes, listeners, transform, transition } =
    useSortable({ id: `task:${task.id}` });

  return (
    <div
      className="task"
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={{
        transform: CSS.Transform.toString(transform),
        transition,
      }}
    >
      <p className="task-title">{task.title}</p>
      <div className="task-bottom">
        <span>1x</span>
        <span>50 lb x 5</span>
      </div>
    </div>
  );
}
