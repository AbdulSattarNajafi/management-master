import { useState } from "react";
import { Priority, Status, useCreateTaskMutation } from "@/state/api";
import { format } from "date-fns";
import Modal from "@/app/(components)/Modal";

interface ModalNewTaskProps {
  isOpen: boolean;
  onClose: () => void;
}

const ModalNewTask = ({ isOpen, onClose }: ModalNewTaskProps) => {
  const [createTask] = useCreateTaskMutation();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<Status>(Status.ToDo);
  const [priority, setPriority] = useState<Priority>(Priority.Backlog);
  const [tags, setTags] = useState("");
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [authorUserId, setAuthorUserId] = useState("");
  const [assignedUserId, setAssignedUserId] = useState("");

  const handleCreateTask = async () => {
    await createTask({
      title,
      description,
      status,
      priority,
      tags: tags,
      startDate: format(startDate!, "yyyy-MM-dd"),
      dueDate: format(dueDate!, "yyyy-MM-dd"),
      authorUserId: parseInt(authorUserId),
      assignedUserId: parseInt(assignedUserId),
    });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} name="Create New Task">
      <div className="mb-2 mt-4">
        <input
          type="text"
          placeholder="Title"
          className="w-full rounded border p-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>
      <div className="mb-2">
        <textarea
          placeholder="Description"
          className="w-full rounded border p-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </div>
      <div className="mb-2 grid grid-cols-2 gap-2">
        <select
          className="mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
          value={status}
          onChange={(e) =>
            setStatus(Status[e.target.value as keyof typeof Status])
          }
        >
          <option value="">Select Status</option>
          <option value={Status.ToDo}>To Do</option>
          <option value={Status.WorkInProgress}>Work In Progress</option>
          <option value={Status.UnderReview}>Under Review</option>
          <option value={Status.Completed}>Completed</option>
        </select>
        <select
          className="mb-4 block w-full rounded border border-gray-300 px-3 py-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
          value={priority}
          onChange={(e) =>
            setPriority(Priority[e.target.value as keyof typeof Priority])
          }
        >
          <option value="">Select Priority</option>
          <option value={Priority.Urgent}>Urgent</option>
          <option value={Priority.High}>High</option>
          <option value={Priority.Medium}>Medium</option>
          <option value={Priority.Low}>Low</option>
          <option value={Priority.Backlog}>Backlog</option>
        </select>
      </div>
      <div className="mb-2">
        <input
          type="text"
          placeholder="Tags (comma separated)"
          className="w-full rounded border p-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
        />
      </div>
      <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <input
          type="date"
          className="w-full rounded border p-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
          value={startDate ? format(startDate, "yyyy-MM-dd") : ""}
          onChange={(e) => setStartDate(e.target.valueAsDate)}
        />
        <input
          type="date"
          className="w-full rounded border p-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
          value={dueDate ? format(dueDate, "yyyy-MM-dd") : ""}
          onChange={(e) => setDueDate(e.target.valueAsDate)}
        />
      </div>
      <div className="mb-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
        <input
          type="text"
          placeholder="Author User ID"
          className="w-full rounded border p-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
          value={authorUserId}
          onChange={(e) => setAuthorUserId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Assigned User ID"
          className="w-full rounded border p-2 dark:border-dark-tertiary dark:bg-dark-tertiary dark:text-white dark:focus:outline-none"
          value={assignedUserId}
          onChange={(e) => setAssignedUserId(e.target.value)}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          className={`rounded bg-blue-primary px-4 py-2 font-bold text-white hover:bg-blue-600`}
          onClick={handleCreateTask}
        >
          Create Task
        </button>
      </div>
    </Modal>
  );
};

export default ModalNewTask;
