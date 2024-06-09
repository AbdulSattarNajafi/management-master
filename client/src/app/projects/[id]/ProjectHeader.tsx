"use client";

import {
  Grid3x3,
  List,
  Clock,
  Table,
  User,
  Filter,
  Share2,
  PlusSquare,
} from "lucide-react";
import { useGetAuthUserQuery } from "@/state/api";
import Header from "@/app/(components)/Header";
import { useState } from "react";
import ModalNewProject from "./ModalNewProject";
import { cn } from "@/lib/utils";

interface TabButtonProps {
  name: string;
  icon: React.ReactNode;
  setActiveTab: (tabName: string) => void;
  activeTab: string;
}

const TabButton = ({ name, icon, setActiveTab, activeTab }: TabButtonProps) => {
  const isActive = activeTab === name;

  return (
    <button
      className={cn(
        "relative flex items-center gap-2 px-1 py-2 text-gray-500 after:absolute after:-bottom-[9px] after:left-0 after:h-[1px] after:w-full hover:text-blue-600 dark:text-neutral-500 dark:hover:text-white sm:px-2 lg:px-4",
        isActive && "text-blue-600 after:bg-blue-600 dark:text-white",
      )}
      onClick={() => setActiveTab(name)}
    >
      {icon}
      {name}
    </button>
  );
};

interface ProjectHeaderProps {
  activeTab: string;
  setActiveTab: (tabName: string) => void;
}

const ProjectHeader = ({ activeTab, setActiveTab }: ProjectHeaderProps) => {
  const { data: currentUser } = useGetAuthUserQuery({});
  console.log("currentUser:", currentUser);
  const [isModalNewProjectOpen, setIsModalNewProjectOpen] = useState(false);

  const isSuperadminOrOwner =
    currentUser?.userRole === "SuperAdmin" ||
    currentUser?.userRole === "ProductOwner" ||
    currentUser?.userRole === "ProjectManager";
  console.log("isSuperadminOrOwner:", isSuperadminOrOwner);

  return (
    <div className="px-4 xl:px-6">
      <ModalNewProject
        isOpen={isModalNewProjectOpen}
        onClose={() => setIsModalNewProjectOpen(false)}
      />

      <div className="py-6 lg:py-8">
        <Header
          name="Product Design Development"
          buttonComponent={
            isSuperadminOrOwner && (
              <button
                className="flex items-center rounded-md bg-blue-primary px-3 py-2 text-white hover:bg-blue-600"
                onClick={() => setIsModalNewProjectOpen(true)}
              >
                <PlusSquare className="mr-2 h-5 w-5" /> New Boards
              </button>
            )
          }
        />
      </div>

      <div className="flex flex-wrap-reverse gap-2 border-y border-gray-200 pb-[8px] pt-2 dark:border-stroke-dark md:items-center">
        <div className="flex flex-1 items-center gap-2 md:gap-4">
          <TabButton
            name="Board"
            icon={<Grid3x3 className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="List"
            icon={<List className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Timeline"
            icon={<Clock className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
          <TabButton
            name="Table"
            icon={<Table className="h-5 w-5" />}
            setActiveTab={setActiveTab}
            activeTab={activeTab}
          />
        </div>
        <div className="flex items-center gap-2">
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Filter className="h-5 w-5" />
          </button>
          <button className="text-gray-500 hover:text-gray-600 dark:text-neutral-500 dark:hover:text-gray-300">
            <Share2 className="h-5 w-5" />
          </button>
          <div className="relative">
            <input
              type="text"
              placeholder="Search Task"
              className="rounded-md border py-1 pl-10 pr-4 focus:outline-none dark:border-dark-secondary dark:bg-dark-secondary dark:text-white"
            />
            <Grid3x3 className="absolute left-3 top-2 h-4 w-4 text-gray-400 dark:text-neutral-500" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
