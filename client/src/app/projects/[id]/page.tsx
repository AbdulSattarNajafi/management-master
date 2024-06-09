"use client";
import LayoutDashboard from "@/app/layoutDashboard";
import ProjectHeader from "@/app/projects/[id]/ProjectHeader";
import Board from "@/app/projects/[id]/BoardView";
import List from "@/app/projects/[id]/ListView";
import Table from "@/app/projects/[id]/TableView";
import Timeline from "@/app/projects/[id]/TimelineView";
import { useState } from "react";
import ModalNewTask from "../../(components)/ModalNewTask";

type Props = {
  params: { id: string };
};

const Project = ({ params }: Props) => {
  const { id } = params;
  const [activeTab, setActiveTab] = useState("Board");
  const [isModalNewTaskOpen, setIsModalNewTaskOpen] = useState(false);

  return (
    <LayoutDashboard>
      <ModalNewTask
        isOpen={isModalNewTaskOpen}
        onClose={() => setIsModalNewTaskOpen(false)}
      />
      <ProjectHeader activeTab={activeTab} setActiveTab={setActiveTab} />
      {activeTab === "Board" && (
        <Board id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "List" && (
        <List id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Table" && (
        <Table id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
      {activeTab === "Timeline" && (
        <Timeline id={id} setIsModalNewTaskOpen={setIsModalNewTaskOpen} />
      )}
    </LayoutDashboard>
  );
};

export default Project;
