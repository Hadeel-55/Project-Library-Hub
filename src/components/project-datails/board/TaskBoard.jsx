import { Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { ProjectContext } from "../../../contexts/ProjectContext";
import { FaRegCircle, FaRegCheckCircle, FaHourglassHalf } from "react-icons/fa";
import BoardColumn from "./BoardColumn";

const TaskBoard = ({ projectTasks = [], projectColor }) => {
  const pendingTasks = projectTasks.filter(
    (task) => task.status === "pending",
  );
  const implementTasks = projectTasks.filter(
    (task) => task.status === "implementTasks",
  );
  const completeTasks = projectTasks.filter(
    (task) => task.status === "complete",
  );

  const boardColumn = [
    {
      id: 1,
      title: "قيد الانتظار",
      tasksData: pendingTasks,
      icon: FaRegCircle,
      columnColor: "#0e88da98",
      cardBg: "#e3f2fd",
    },
    {
      id: 2,
      title: "قيد التنفيذ",
      tasksData: implementTasks,
      icon: FaHourglassHalf,
      columnColor: "#ee9f289f",
      cardBg: "#fff3e0",
    },
    {
      id: 3,
      title: "مكتمله",
      tasksData: completeTasks,
      icon: FaRegCheckCircle,
      columnColor: "#128b18b9",
      cardBg: "#e8f5e9",
    },
  ];


  return (
    <Row className="justify-content-center text-center mt-5">
      {boardColumn.map((col) => (
        <Col key={col.id} xs={12} md={4} className="pb-3">
          <BoardColumn
            title={col.title}
           
            icon={col.icon}
            tasks={col.tasksData}
            cardBg={col.cardBg}
            projectColor={projectColor}
            style={{
              borderTop: `5px solid ${col.columnColor}`,
              borderRadius: "8px",
              padding: "15px",
            }}
            projectColor={projectColor}
          />
        </Col>
      ))}
    </Row>
  );
};
export default TaskBoard;
