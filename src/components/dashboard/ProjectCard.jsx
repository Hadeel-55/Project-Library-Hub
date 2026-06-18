import { useContext } from "react";
import { Card, Button } from "react-bootstrap";
import { FaTrash, FaUsers, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import { ProjectContext } from "../../contexts/ProjectContext";
const ProjectCard = ({
  title,
  text,
  team,
  task,
  members = [],
  projectColor,
  onDelete,
  id,
}) => {
  const { team: allTeamMember } = useContext(ProjectContext);

  const getInitials = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  const getRandomColor = () => {
    const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  return (
    <Card
      className="p-3 "
      style={{ borderTop: `5px solid ${projectColor}`, borderRadius: "20px", cursor:'pointer' }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h5>{title}</h5>
        <Button className="bg-transparent border-0 " onClick={onDelete}>
          <FaTrash className="text-danger" />
        </Button>
      </div>
      <small>{text}</small>
      <div className="d-flex gap-2 mt-3 ">
        <div
          style={{ border: "1px solid gray", fontSize: "13px" }}
          className="rounded-4 px-2 py-1 fw-semibold text-muted d-flex gap-1 align-items-center"
        >
          <FaUsers /> {team} عضو
        </div>
        <div
          style={{ border: "1px solid gray", fontSize: "13px" }}
          className="rounded-4 px-2 py-1 fw-semibold text-muted d-flex gap-1 align-items-center"
        >
          <FaTasks /> {task} مهمة
        </div>
      </div>

      <div
        className="d-flex align-items-center mt-3 position-relative"
        style={{ height: "40px" }}
      >
        {!members || !Array.isArray(members) || members.length === 0 ? (
          <small className="text-muted">لا يوجد أعضاء</small>
        ) : (
          members.map((memberId, index) => {
            const memberData = allTeamMember.find((m) => m.id === memberId);
            if (!memberData) return null;

            return (
              <div
                key={memberId}
                title={memberData.name}
                className="d-flex align-items-center justify-content-center text-white rounded-circle fw-bold"
                style={{
                  width: "32px",
                  height: "32px",
                  backgroundColor: getRandomColor(),
                  fontSize: "12px",
                  border: "2px solid white",
                  position: "absolute",
                  left: `${index * 20}px`,
                  zIndex: index,
                }}
              >
                {getInitials(memberData.name)}
              </div>
            );
          })
        )}
      </div>
      <Link to={`/projects/${id}`} className="mt-3 text-decoration-none" style={{fontSize:'14px'}}>عرض التفاصيل</Link>
    </Card>
  );
};
export default ProjectCard;
