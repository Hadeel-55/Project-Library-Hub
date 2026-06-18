import { useParams, Link } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import ProjectHeader from "./ProjectHeader";
import TaskBoard from "./board/TaskBoard";
import AddTaskModal from "../ui/AddTaskModal";
import TaskCommentModal from "../ui/TaskCommentModal";
const ProjectDetailsView = () => {
  const { id } = useParams();
  const { projects, tasks,isCommentModal } = useContext(ProjectContext);
  const currentProject = projects.find((p) => String(p.id) === String(id));
  const projectTasks = tasks.filter((t) => String(t.projectId) === String(id));

  if (!currentProject) {
    return (
      <div className="container text-center mt-5">
        <h3>عذراً، هذا المشروع غير موجود! 😢</h3>
        <Link to="/" className="btn btn-primary mt-3">
          العودة للوحة التحكم
        </Link>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <ProjectHeader
        projectName={currentProject.name}
        title={currentProject.name}
        description={currentProject.description}
        projectColor={currentProject.projectColor}
        teamCount={currentProject.team ? currentProject.team.length : 0}
      />

      <hr className="my-4" />

      <TaskBoard projectTasks={projectTasks}
      projectColor={currentProject.projectColor} />
      <AddTaskModal projectId={currentProject.id} />
      {isCommentModal && <TaskCommentModal taskId={isCommentModal} />}
    </div>
  );
};

export default ProjectDetailsView;
