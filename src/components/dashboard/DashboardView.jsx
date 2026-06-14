import { Container, Button } from "react-bootstrap";
import DahboardStats from "./DashboardStats";
import ProjectsList from "./ProjectsList";
import UpcomingTasks from "./UpcomingTasks";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
function DashboardView() {
    const{addProject}=useContext(ProjectContext)
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-primary">لوحة تحكم المشاريع</h2>
        <Button onClick={()=>addProject()} className="btn-sm rounded-3 fw-semibold d-flex gap-1 align-items-center">
          <span style={{ fontSize: "20px" }}>+</span> مشروع جديد
        </Button>
      </div>
      <DahboardStats />
      <ProjectsList />
      <UpcomingTasks />
    </Container>
  );
}
export default DashboardView;
