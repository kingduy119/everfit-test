"use client";

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

const splitTaskList = (id: string) => {
  const [day, list, task] = id.split(",");
  return { day, list: Number(list), task: Number(task) };
};

type TaskLocateType = {
  day: string;
  list: number;
  task: number;
};

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

  const setTaskListToColumn = (from: TaskLocateType, to: TaskLocateType) => {
    setData((prev) => {
      const state = structuredClone(prev);
      const [taskList] = state[from.day].splice(from.list, 1);
      state[to.day].push(taskList);
      return state;
    });
  };

  const setTask = (from: TaskLocateType, to: TaskLocateType) => {
    setData((prev) => {
      const state = structuredClone(prev);
      const [tasks] = state[from.day][from.list].tasks.splice(from.task, 1);
      state[to.day][to.list].tasks.push(tasks);
      return state;
    });
  };

  const onDragOver = (event: DragOverEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    console.log(`activeId=>${activeId}`);
    console.log(`overId=>${overId}`);
  };

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const activeId = String(active.id);
    const overId = String(over.id);

    if (activeId.startsWith("list:") && overId.startsWith("column:")) {
      const from = splitTaskList(activeId.replace("list:", ""));
      const to = splitTaskList(overId.replace("column:", ""));
      setTaskListToColumn(from, to);
    } else if (activeId.startsWith("task:") && overId.startsWith("list:")) {
      const from = splitTaskList(activeId.replace("task:", ""));
      const to = splitTaskList(overId.replace("list:", ""));
      setTask(from, to);
    } else if (activeId.startsWith("task:") && overId.startsWith("task:")) {
      const from = splitTaskList(activeId.replace("task:", ""));
      const to = splitTaskList(overId.replace("task:", ""));
      setTask(from, to);
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

  const addTask = (activeId: string) => {
    const from = splitTaskList(activeId);
    const title = prompt("Task title?");
    if (!title) return;

    setData((prev) => {
      const state = structuredClone(prev);
      state[from.day][from.list].tasks.push({ id: crypto.randomUUID(), title });
      return state;
    });
  };

  return { data, onDragEnd, onDragOver, addGroup, addTask };
}
