import { useState } from "react";
import { DragEndEvent, DragOverEvent } from "@dnd-kit/core";

import type { BoardData } from "@/types";

export const DAYS = [
  { day: "monday", date: "11/03/2025" },
  { day: "tuesday", date: "12/03/2025" },
  { day: "wednesday", date: "13/03/2025" },
  { day: "thursday", date: "14/03/2025" },
  { day: "friday", date: "15/03/2025" },
  { day: "saturday", date: "16/03/2025" },
  { day: "sunday", date: "17/03/2025" },
];

export function useWeekBoard() {
  const [data, setData] = useState<BoardData>({
    monday: [],
    tuesday: [
      {
        id: "list-1",
        title: "CHEST DAY",
        tasks: [
          { id: "Chest1", title: "Chest 1" },
          { id: "Chest2", title: "Chest 2" },
        ],
      },
    ],
    wednesday: [
      {
        id: "list-2",
        title: "LEG DAY",
        tasks: [
          { id: "leg1", title: "Leg 1" },
          { id: "leg2", title: "Leg 2" },
          { id: "leg3", title: "Leg 3" },
          { id: "leg4", title: "Leg 4" },
        ],
      },
    ],
    thursday: [],
    friday: [],
    saturday: [],
    sunday: [],
  });

  const findGroupDay = (groupId: string) => {
    return DAYS.find((d) => data[d.day].some((g) => g.id === groupId))?.day;
  };

  const findTaskLocation = (taskId: string) => {
    for (const d of DAYS) {
      const day = d.day;
      for (const g of data[day]) {
        const index = g.tasks.findIndex((t) => t.id === taskId);
        if (index !== -1) {
          return { day, groupId: g.id, index };
        }
      }
    }
    return null;
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (String(active.id).startsWith("group:")) {
      const toDay = String(over.id).replace("day:", "");
    }
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    if (String(active.id).startsWith("list:")) {
      const listId = String(active.id).replace("list:", "");
      const toDay = String(over.id).replace("day:", "");
      const fromDay = findGroupDay(listId);
      if (!fromDay || fromDay === toDay) return;

      setData((prev) => {
        const next = structuredClone(prev);
        const listIndex = next[fromDay].findIndex((g) => g.id === listId);
        const [group] = next[fromDay].splice(listIndex, 1);
        next[toDay].push(group);
        return next;
      });
      return;
    }

    if (String(active.id).startsWith("task:")) {
      const taskId = String(active.id).replace("task:", "");
      const from = findTaskLocation(taskId);
      if (!from) return;

      let toDay: string;
      let toGroupId: string;

      if (String(over.id).includes("|")) {
        [toDay, toGroupId] = String(over.id).split("|");
      } else {
        const overTaskId = String(over.id).replace("task:", "");
        const overLocation = findTaskLocation(overTaskId);
        if (!overLocation) return;

        toDay = overLocation.day;
        toGroupId = overLocation.groupId;
      }

      setData((prev) => {
        const next = structuredClone(prev);

        const fromGroup = next[from.day].find((g) => g.id === from.groupId)!;
        const [task] = fromGroup.tasks.splice(from.index, 1);

        const toGroup = next[toDay].find((g) => g.id === toGroupId);
        if (!toGroup) {
          fromGroup.tasks.splice(from.index, 0, task);
          return prev;
        }

        toGroup.tasks.push(task);
        return next;
      });
    }
  };

  const addGroup = (day: string) => {
    const title = prompt("Group title?");
    if (!title) return;
    setData((prev) => ({
      ...prev,
      [day]: [...prev[day], { id: `${day}-${Date.now()}`, title, tasks: [] }],
    }));
  };

  const addTask = (day: string, groupId: string) => {
    const title = prompt("Task title?");
    if (!title) return;
    setData((prev) => {
      const next = structuredClone(prev);
      const group = next[day].find((g) => g.id === groupId)!;
      group.tasks.push({ id: crypto.randomUUID(), title });
      return next;
    });
  };

  return { data, onDragEnd, onDragOver, addGroup, addTask };
}
