import { Project } from "@/state/api";

interface ProjectProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectProps> = ({ project }) => {
  return (
    <div className="p-4 border rounded shadow">
      <h3>{project.name}</h3>
      <p>{project.description}</p>
      <p>Start Date: {project.startDate}</p>
      <p>End Date: {project.endDate}</p>
    </div>
  );
};

export default ProjectCard;
