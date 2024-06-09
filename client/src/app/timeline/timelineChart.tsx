"use client";

import { useState, useMemo } from "react";
import { Gantt, DisplayOption, ViewMode } from "gantt-task-react";
import "gantt-task-react/dist/index.css";
import { useGetProjectsQuery } from "@/state/api";

type TaskType = "task" | "milestone" | "project";

const TimelineChart = () => {
  const { data: projects, isLoading, isError } = useGetProjectsQuery();
  const [displayOptions, setDisplayOptions] = useState<DisplayOption>({
    viewMode: ViewMode.Week,
    locale: "en-US",
  });

  const ganttTasks = useMemo(() => {
    return (
      projects?.map((project) => ({
        start: new Date(project.startDate as string),
        end: new Date(project.endDate as string),
        name: project.name,
        id: `Project-${project.id}`,
        type: "project" as TaskType,
        progress: 50, // assuming a default 50% progress for the template
        isDisabled: false,
        styles: {
          progressColor: "#ffbb54",
          progressSelectedColor: "#ff9e0d",
          backgroundColor: "#fdafe1",
        },
      })) || []
    );
  }, [projects]);

  if (isLoading) return <div>Loading projects...</div>;
  if (isError || !projects || ganttTasks.length === 0)
    return <div>Failed to fetch projects or data is incomplete</div>;

  const handleViewModeChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const newViewMode = event.target.value as ViewMode;
    setDisplayOptions({ ...displayOptions, viewMode: newViewMode });
  };

  return (
    <div className="gant-container p-5 w-[1200px]">
      <header className="mb-4 flex justify-between items-center">
        <h1 className="font-bold text-lg">Project Timeline</h1>
        <div className="inline-block relative w-64">
          <select
            className="block appearance-none w-full bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline"
            value={displayOptions.viewMode}
            onChange={handleViewModeChange}
          >
            <option value={ViewMode.Day}>Day</option>
            <option value={ViewMode.Week}>Week</option>
            <option value={ViewMode.Month}>Month</option>
          </select>
        </div>
      </header>
      <Gantt
        tasks={ganttTasks}
        {...displayOptions}
        columnWidth={displayOptions.viewMode === ViewMode.Month ? 150 : 100}
        listCellWidth="100px"
      />
    </div>
  );
};

export default TimelineChart;
