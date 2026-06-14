import { useContext } from "react";
import TaskRow from "./TaskRow";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Row, Col } from "react-bootstrap";
const UpcomingTasks = () => {
  const { tasks, projects, calculateDayLaft} = useContext(ProjectContext);
return(
  <Row className="mt-3">
    <h5>المهام القادمه</h5>

    {tasks && tasks.map((task) => {
const projectData =projects.find(p=>p.id === task.projectId);
const projectName =projectData ? projectData.name : 'مشروع غر معرف'

const daysLeftMessage =calculateDayLaft(task.taskDate);

return(
      <Col md={12} key={task.id} className="pb-3">
        <TaskRow
          title={task.taskTitle}
          status={task.levelTask || ' غير محدد'}
          projectName={projectName}
          daysLeft={daysLeftMessage}
        />
      </Col>
    )
})}
    <Col></Col>
  </Row>
)
};
export default UpcomingTasks;
