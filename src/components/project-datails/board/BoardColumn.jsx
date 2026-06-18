import { Card } from "react-bootstrap";
import BoardTaskCard from "./BoardTaskCard";
import { useContext } from "react";
import { ProjectContext } from "../../../contexts/ProjectContext";
const BoardColumn = ({
  icon: Icon,
  title,
  tasks = [],
  style,
  projectColor,
  cardBg,
}) => {

  const {deletTask  }=useContext(ProjectContext)
  return (
    <Card
      className={'border-0 shadow-sm '}
      style={{ borderRadius: "15px", backgroundColor:` ${cardBg}`}}
    >
      <Card.Header className="d-flex align-items-center gap-2 pt-3  bg-transparent">
        <h5 className=" mb-3 d-flex align-items-center gap-2 justify-content-center">
          <Icon /> {title} ({tasks.length})
        </h5>
      </Card.Header>
      <Card.Body className="p-2">
        {tasks.length === 0 ? (
          <div
            className="text-center text-muted my-4"
            style={{ fontSize: "13px" }}
          >
            لا يوجد مهام حاليا
          </div>
        ) : (
          tasks.map((task) => (
            <BoardTaskCard
              key={task.id}
              id={task.id}
              title={task.title}
               taskTitle={task.taskTitle}
              text={task.description}
              levelTask={task.levelTask}
              taskDate={task.taskDate}
             taskColor={projectColor || task.taskColor}
              members={task.members || []}
             status={task.status}
             cardBg={cardBg}
              onDelete={() => deletTask(task.id)}
            />
          ))
        )}
      </Card.Body>
    </Card>
  );
};
export default BoardColumn;
