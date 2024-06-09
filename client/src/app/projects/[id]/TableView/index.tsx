import React from "react";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useGetTasksQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { useAppSelector } from "@/app/redux";

export interface TableViewProps {
  id: string;
  setIsModalNewTaskOpen: (isOpen: boolean) => void;
}

const columns: GridColDef[] = [
  {
    field: "title",
    headerName: "Title",
    width: 100,
  },
  {
    field: "description",
    headerName: "Description",
    width: 200,
  },
  {
    field: "status",
    headerName: "Status",
    width: 130,
    renderCell: (params) => (
      <span className="inline-flex rounded-full bg-green-100 px-2 text-xs font-semibold leading-5 text-green-800">
        {params.value}
      </span>
    ),
  },
  { field: "priority", headerName: "Priority", width: 75 },
  { field: "tags", headerName: "Tags", width: 130 },
  { field: "startDate", headerName: "Start Date", width: 130 },
  { field: "dueDate", headerName: "Due Date", width: 130 },
  {
    field: "author",
    headerName: "Author",
    width: 150,
    renderCell: (params) => params.value.username || "Unknown",
  },
  {
    field: "assignee",
    headerName: "Assignee",
    width: 150,
    renderCell: (params) => params.value.username || "Unassigned",
  },
];

const TableView = ({ id, setIsModalNewTaskOpen }: TableViewProps) => {
  const isDarkMode = useAppSelector((state) => state.global.isDarkMode);
  const {
    data: tasks,
    isLoading,
    error,
  } = useGetTasksQuery({ projectId: Number(id) });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred while fetching tasks</div>;

  return (
    <div style={{ height: 540, width: "100%" }} className="px-4 pb-8 xl:px-6">
      <div className="py-5">
        <Header
          name="Table"
          buttonComponent={
            <button
              className="flex items-center rounded bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
              onClick={() => setIsModalNewTaskOpen(true)}
            >
              Add Task
            </button>
          }
          isSmallText
        />
      </div>
      <DataGrid
        rows={tasks || []}
        columns={columns}
        className="border border-gray-200 bg-white shadow dark:border-stroke-dark dark:bg-dark-secondary dark:text-gray-200"
        sx={{
          "& .MuiDataGrid-columnHeaders": {
            color: `${isDarkMode ? "#e5e7eb" : ""}`,
            '& [role="row"] > *': {
              backgroundColor: `${isDarkMode ? "#1d1f21" : "white"}`,
              borderColor: `${isDarkMode ? "#2d3135" : ""}`,
            },
          },
          "& .MuiIconButton-root": {
            color: `${isDarkMode ? "#a3a3a3" : ""}`,
          },
          "& .MuiTablePagination-root": {
            color: `${isDarkMode ? "#a3a3a3" : ""}`,
          },
          "& .MuiTablePagination-selectIcon": {
            color: `${isDarkMode ? "#a3a3a3" : ""}`,
          },
          "& .MuiDataGrid-cell": {
            border: "none",
          },
          "& .MuiDataGrid-row": {
            borderBottom: `1px solid ${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
          },
          "& .MuiDataGrid-withBorderColor": {
            borderColor: `${isDarkMode ? "#2d3135" : "#e5e7eb"}`,
          },
        }}
      />
    </div>
  );
};

export default TableView;
