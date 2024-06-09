import ReusablePriorityPage from "../reusablePriorityPage";
import { Priority } from "@/state/api";

const HighPage = () => {
  return <ReusablePriorityPage priority={Priority.High} />;
};

export default HighPage;
