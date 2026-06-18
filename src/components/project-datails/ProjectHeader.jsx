import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Row, Button } from "react-bootstrap";
import TaskBoard from "./board/TaskBoard";
import { Link } from "react-router-dom";
import { FaArrowLeft} from "react-icons/fa";
const ProjectHeader = ({ title, description, projectName, teamCount }) => {
  const { setIsTaskOpenModal } = useContext(ProjectContext);
  return (
    <Row >
      <div className=" d-flex justify-content-between">
       

        <div className="">
          <Link
            to="/"
            className="text-decoration-none  fw-bold "
            style={{ fontSize: "26px"  }}
          > < FaArrowLeft/> {title}
          </Link>

          <p className="text-muted mb-0 " style={{ fontSize: "13px" }}>
            {description}
          </p>
          
        </div>
         <div>
          <Button
            onClick={() => setIsTaskOpenModal(true)}
            className="btn-sm rounded-3 fw-semibold  d-flex gap-1 align-items-center"
          >
            إضافة مهمة
            <span style={{ fontSize: "20px", lineHeight: "1" }}>+</span>
          </Button>
        </div>
      </div>
    </Row>
  );
};
export default ProjectHeader;
