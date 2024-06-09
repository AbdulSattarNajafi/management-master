import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

const LowPage = () => {
  return <ReusablePriorityPage priority={Priority.Low} />;
};

export default LowPage;
