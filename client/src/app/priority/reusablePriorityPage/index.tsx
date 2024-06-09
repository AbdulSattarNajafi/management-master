"use client";

import {
  Priority,
  Task,
  useGetAuthUserQuery,
  useGetTasksByUserQuery,
} from "@/state/api";
import { useState } from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import Header from "@/app/(components)/Header";
import TaskCard from "@/app/(components)/TaskCard";
import { useAppSelector } from "@/app/redux";
import ModalNewTask from "@/app/(components)/ModalNewTask";

interface ReusablePriorityPageProps {
  priority: Priority;
}

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 70 },
  { field: "title", headerName: "Title", width: 200 },
  { field: "description", headerName: "Description", width: 200 },
  { field: "status", headerName: "Status", width: 130 },
  { field: "priority", headerName: "Priority", width: 120 },
  { field: "startDate", headerName: "Start Date", width: 110 },
  { field: "dueDate", headerName: "Due Date", width: 110 },
  { field: "projectId", headerName: "Project ID", width: 100 },
];

const ReusablePriorityPage = ({ priority }: ReusablePriorityPageProps) => {
  const [view, setView] = useState("list");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);
  const { data: currentUser } = useGetAuthUserQuery({});

  const userId = currentUser?.userDetails?.userId ?? null;

  const {
    data: tasks,
    isLoading,
    isError: isTasksError,
  } = useGetTasksByUserQuery(userId || 0, {
    skip: userId === null,
  });

  const filteredTasks = tasks?.filter(
    (task: Task) => task.priority === priority
  );

  if (isTasksError || !tasks) return <div>Error fetching tasks</div>;

  return (
    <div className="m-5">
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <Header
        name="Priority Page"
        buttonComponent={
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-3"
            onClick={() => setIsModalNewTaskOpen(true)}
          >
            Add Task
          </button>
        }
      />
      <div className="flex justify-start">
        <button
          className={`py-2 px-4 ${
            view === "list" ? "bg-gray-300" : "bg-white"
          } rounded-l`}
          onClick={() => setView("list")}
        >
          List
        </button>
        <button
          className={`py-2 px-4 ${
            view === "table" ? "bg-gray-300" : "bg-white"
          } rounded-r`}
          onClick={() => setView("table")}
        >
          Table
        </button>
      </div>
      {isLoading ? (
        <div>Loading tasks...</div>
      ) : view === "list" ? (
        <div className="grid grid-cols-1 gap-4">
          {filteredTasks?.map((task: Task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </div>
      ) : (
        view === "table" &&
        filteredTasks && (
          <div className="w-full">
            <DataGrid
              rows={filteredTasks}
              columns={columns}
              checkboxSelection
              getRowId={(row) => row.id}
            />
          </div>
        )
      )}
    </div>
  );
};

export default ReusablePriorityPage;
