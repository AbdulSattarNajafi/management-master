"use client";

import {
  DataGrid,
  GridColDef,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";
import Header from "@/app/(components)/Header";
import Image from "next/image";
import { User, useGetAuthUserQuery } from "@/state/api";
import React from "react";
import { useGetUsersQuery } from "@/state/api";

const CustomToolbar = () => (
  <GridToolbarContainer className="toolbar flex gap-2">
    <GridToolbarFilterButton />
    <GridToolbarExport />
  </GridToolbarContainer>
);

const columns: GridColDef[] = [
  { field: "userId", headerName: "ID", width: 100 },
  { field: "username", headerName: "Username", width: 150 },
  {
    field: "profilePictureUrl",
    headerName: "Profile Picture",
    width: 100,
    renderCell: (params) => (
      <div className="flex w-full h-full justify-center items-center">
        <div className="w-9 h-9">
          <Image
            src={`/${params.value}`}
            alt={params.row.username}
            width={100}
            height={50}
            className="rounded-full h-full object-cover"
          />
        </div>
      </div>
    ),
  },
  { field: "teamId", headerName: "Team ID", width: 120 },
];

const AllUsersTable = () => {
  const { data: users, isLoading, isError } = useGetUsersQuery();

  if (isLoading) return <div>Loading...</div>;
  if (isError || !users) return <div>Error fetching users</div>;

  return (
    <div className="flex flex-col w-full">
      <Header name="Users" />
      <div style={{ height: 650, width: "100%" }}>
        <DataGrid
          rows={users || []}
          columns={columns}
          pagination
          getRowId={(row) => row.userId}
          slots={{
            toolbar: CustomToolbar,
          }}
          className="!border-0 dark:bg-gray-800 dark:text-gray-200"
        />
      </div>
    </div>
  );
};

export default AllUsersTable;
