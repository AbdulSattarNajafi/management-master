import { Task } from "@/state/api";
import { format } from "date-fns";
import Image from "next/image";

const TaskCard = ({ task }: { task: Task }) => (
  <div className="rounded bg-white p-4 shadow dark:bg-dark-secondary dark:text-neutral-500">
    {task.attachments && task.attachments.length > 0 && (
      <div>
        <strong className="dark:text-neutral-400">Attachments:</strong>
        <div className="flex flex-wrap">
          {task.attachments && task.attachments.length > 0 && (
            <Image
              src={`/${task.attachments[0].fileURL}`}
              alt={task.attachments[0].fileName}
              width={400}
              height={200}
              className="my-4 h-auto w-full rounded-md"
            />
          )}
        </div>
      </div>
    )}
    <p>
      <strong className="dark:text-neutral-400">ID:</strong> {task.id}
    </p>
    <p>
      <strong className="dark:text-neutral-400">Title:</strong> {task.title}
    </p>
    <p>
      <strong className="dark:text-neutral-400">Description:</strong>{" "}
      {task.description || "No description provided"}
    </p>
    <p>
      <strong className="dark:text-neutral-400">Status:</strong> {task.status}
    </p>
    <p>
      <strong className="dark:text-neutral-400">Priority:</strong>{" "}
      {task.priority}
    </p>
    <p>
      <strong className="dark:text-neutral-400">Tags:</strong>{" "}
      {task.tags || "No tags"}
    </p>
    <p>
      <strong className="dark:text-neutral-400">Start Date:</strong>{" "}
      {task.startDate ? format(new Date(task.startDate), "P") : "Not set"}
    </p>
    <p>
      <strong className="dark:text-neutral-400">Due Date:</strong>{" "}
      {task.dueDate ? format(new Date(task.dueDate), "P") : "Not set"}
    </p>
    <p>
      <strong className="dark:text-neutral-400">Author:</strong>{" "}
      {task.author ? task.author.username : "Unknown"}
    </p>
    <p>
      <strong className="dark:text-neutral-400">Assignee:</strong>{" "}
      {task.assignee ? task.assignee.username : "Unassigned"}
    </p>
  </div>
);

export default TaskCard;
