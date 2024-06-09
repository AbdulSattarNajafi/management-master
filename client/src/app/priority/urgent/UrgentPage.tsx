import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

const UrgentPage = () => {
  return <ReusablePriorityPage priority={Priority.Urgent} />;
};

export default UrgentPage;
