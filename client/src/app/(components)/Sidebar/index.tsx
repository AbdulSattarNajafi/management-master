import React, { useState } from "react";
import {
  Home,
  Search,
  Settings,
  Users,
  Briefcase,
  AlertCircle,
  User,
  Menu,
  LucideIcon,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useGetProjectsQuery } from "@/state/api";
import { useAppDispatch, useAppSelector } from "@/app/redux";
import { setIsSidebarCollapsed } from "@/state";

interface SidebarLinkProps {
  href: string;
  icon: LucideIcon;
  label: string;
  isCollapsed: boolean;
}

const SidebarLink = ({
  href,
  icon: Icon,
  label,
  isCollapsed,
}: SidebarLinkProps) => {
  const pathname = usePathname();
  const isActive =
    pathname === href || (pathname === "/" && href === "/dashboard");

  return (
    <Link href={href}>
      <div
        className={`flex cursor-pointer items-center ${
          isCollapsed ? "justify-center py-4" : "justify-start px-8 py-4"
        } gap-3 transition-colors hover:bg-blue-100 hover:text-blue-500 ${
          isActive ? "bg-blue-200 text-white" : ""
        }`}
      >
        <Icon className="h-6 w-6 !text-gray-100" />
        <span
          className={`${
            isCollapsed ? "hidden" : "block"
          } font-medium text-gray-100`}
        >
          {label}
        </span>
      </div>
    </Link>
  );
};

const Sidebar = () => {
  const { data: projects } = useGetProjectsQuery();
  const dispatch = useAppDispatch();
  const isSidebarCollapsed = useAppSelector(
    (state) => state.global.isSidebarCollapsed,
  );
  const [showProjects, setShowProjects] = useState(false);
  const [showPriority, setShowPriority] = useState(false);

  const sidebarClassNames = `fixed flex flex-col ${
    isSidebarCollapsed ? "w-0" : "w-64 md:w-64"
  } bg-gray-900 dark:bg-black text-gray-100 transition-all duration-300 h-full shadow-md z-40 overflow-auto`;

  return (
    <div className={sidebarClassNames}>
      <div className="flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <div>LOGO</div>
          {isSidebarCollapsed ? null : (
            <button
              className="px-3 py-3"
              onClick={() =>
                dispatch(setIsSidebarCollapsed(!isSidebarCollapsed))
              }
            >
              <Menu className="h-4 w-4" />
            </button>
          )}
        </div>
        <nav>
          <SidebarLink
            isCollapsed={isSidebarCollapsed}
            icon={Home}
            label="Home"
            href="/"
          />
          <SidebarLink
            isCollapsed={isSidebarCollapsed}
            icon={Briefcase}
            label="Timeline"
            href="/timeline"
          />
          <SidebarLink
            isCollapsed={isSidebarCollapsed}
            icon={Search}
            label="Search"
            href="/search"
          />
          <SidebarLink
            isCollapsed={isSidebarCollapsed}
            icon={Settings}
            label="Settings"
            href="/settings"
          />

          <SidebarLink
            isCollapsed={isSidebarCollapsed}
            icon={User}
            label="Users"
            href="/users"
          />
          <SidebarLink
            isCollapsed={isSidebarCollapsed}
            icon={Users}
            label="Teams"
            href="/teams"
          />

          <button
            onClick={() => setShowProjects(!showProjects)}
            className="mx-4 mt-5 flex items-center uppercase text-gray-100 dark:text-gray-400"
          >
            <span>Projects</span>
            <span className="ml-2">{showProjects ? "▲" : "▼"}</span>
          </button>
          {showProjects &&
            projects?.map((project) => (
              <SidebarLink
                isCollapsed={isSidebarCollapsed}
                key={project.id}
                icon={Briefcase}
                label={project.name}
                href={`/projects/${project.id}`}
              />
            ))}

          <button
            onClick={() => setShowPriority(!showPriority)}
            className="mx-4 mt-5 flex items-center uppercase text-gray-100 dark:text-gray-400"
          >
            <span>Priority</span>
            <span className="ml-2">{showPriority ? "▲" : "▼"}</span>
          </button>
          {showPriority && (
            <>
              <SidebarLink
                isCollapsed={isSidebarCollapsed}
                icon={AlertCircle}
                label="Urgent"
                href="/priority/urgent"
              />
              <SidebarLink
                isCollapsed={isSidebarCollapsed}
                icon={AlertCircle}
                label="High"
                href="/priority/high"
              />
              <SidebarLink
                isCollapsed={isSidebarCollapsed}
                icon={AlertCircle}
                label="Medium"
                href="/priority/medium"
              />
              <SidebarLink
                isCollapsed={isSidebarCollapsed}
                icon={AlertCircle}
                label="Low"
                href="/priority/low"
              />
              <SidebarLink
                isCollapsed={isSidebarCollapsed}
                icon={AlertCircle}
                label="Backlog"
                href="/priority/backlog"
              />
            </>
          )}
        </nav>
      </div>
    </div>
  );
};

export default Sidebar;
