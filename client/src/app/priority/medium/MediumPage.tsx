import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

const MediumPage = () => {
  return <ReusablePriorityPage priority={Priority.Medium} />;
};

export default MediumPage;
