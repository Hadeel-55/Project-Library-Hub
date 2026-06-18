import { Card, Button, Badge, Form } from "react-bootstrap";
import { FaTrash, FaUsers, FaTasks } from "react-icons/fa";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ProjectContext } from "../../../contexts/ProjectContext";
const BoardTaskCard = ({
  id,
  taskId,
  title,
  text,
  levelTask,
  taskDate,
  members = [],
  taskColor,
  onDelete,
  taskTitle,
  status,
}) => {
  const {
    team: allTeamMember,
    calculateDayLaft,
    setIsCommentModal,
    comments,
    addFile,
    files,
    moveTaskToNextStatus
  } = useContext(ProjectContext);

  const getInitials = (name) => {
    if (!name) return "";
    return name.charAt(0).toUpperCase();
  };

  const getRandomColor = () => {
    const colors = ["#f44336", "#e91e63", "#9c27b0", "#673ab7", "#3f51b5"];
    return colors[Math.floor(Math.random() * colors.length)];
  };
  const getBadgeBg = (priority) => {
    switch (priority) {
      case "عالي":
        return "danger";
      case "متوسط":
        return "warning";
      case "منخفض":
        return "info";
      default:
        return "secondary";
    }
  };

  const currentTaskComments =comments.filter(
    (c) => String(c.taskId) === String(id),
  );

const handleFileChange = (e) => {
  const selectedFiles = Array.from(e.target.files); 
  
  if (selectedFiles.length > 0) {
    selectedFiles.forEach((file) => {
      addFile({
        fileName: file.name,
        taskId: id,
      });
    });
  }
};
const currentTaskFiles=files ? files.filter((f)=>String(f.taskId)=== String(id)):[]

  return (
    <Card
      className="p-3 mb-3 shadow-sm"
      style={{ borderLeft: `5px solid ${taskColor}`, borderRadius: "20px" }}
    >
      <div className="d-flex justify-content-between align-items-center">
        <h5 className="fw-bold" style={{ fontSize: "15px" }}>
          {taskTitle}
        </h5>
        <Button className="bg-transparent border-0 " onClick={onDelete}>
          <FaTrash className="text-danger" />
        </Button>
      </div>
      <small className=" me-auto text-muted mt-1">{text}</small>
      <div className="d-flex gap-2 mt-3 align-items-center">
        <div
          style={{ border: "1px solid gray", fontSize: "13px" }}
          className="rounded-4 px-2 py-1 fw-semibold text-muted d-flex gap-1 align-items-center"
        >
          <Badge bg={getBadgeBg(levelTask)} className="rounded-pill">
            {levelTask || "متوسط"}
          </Badge>
          <span>{calculateDayLaft(taskDate)}</span>
        </div>
      </div>

      <div
        className="d-flex align-items-center mt-3 position-relative"
        style={{ height: "40px" }}
      >
        {!members || !Array.isArray(members) || members.length === 0 ? (
          <small className="text-muted">لا يوجد أعضاء معينين</small>
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
                  right: `${index * 18}px`,
                  zIndex: index,
                }}
              >
                {getInitials(memberData.name)}
              </div>
            );
          })
        )}
      </div>
      <div
        className="mt-3 p-2 bg-light rounded text-start"
        style={{ fontSize: "12px" }}
      >
        {currentTaskComments.map((comment) => (
          <div key={comment.id} className="border-bottom py-1 ">
            💬 {comment.text}
          </div>
        ))}
      </div>

{currentTaskFiles.length > 0 && (
        <div className="mt-2 p-2 rounded text-start" style={{ fontSize: "12px", backgroundColor: "#eef1f6" }}>
          {currentTaskFiles.map((file) => (
            <div key={file.id} className="py-1 text-primary fw-medium">
              📎 {file.fileName}
            </div>
          ))}
        </div>
      )}


      <div className="d-flex justify-content-between align-items-center mt-3 pt-2 border-top flex-wrap gap-2">
        <Button
          onClick={() => setIsCommentModal(id)}
          className=" text-secondary bg-transparent border-0"
          style={{ fontSize: "13px" }}
        >
          💬 تعليق
        </Button>

        <Form className=" text-secondary" style={{ fontSize: "13px" }}>
          <Form.Control
            type="file"
            style={{ display: "none" }}
            id={`file-upload-${id}`}
            onChange={handleFileChange}
            multiple
          />

          <label htmlFor={`file-upload-${id}`} style={{ cursor: "pointer" }}>
            📎 إرفاق ملف
          </label>
        </Form>

        
     {status !== "complete" && (
  <Button
    variant={status === "pending" ? "outline-primary" : "outline-success"}
    size="sm"
    style={{ fontSize: "12px", fontWeight: "600" }}
    onClick={() => moveTaskToNextStatus(id)}
  >
    {status === "pending" ? "⚡ بدء التنفيذ" : "✓ إكمال المهمة"}
  </Button>
)}
      </div>
    </Card>
  );
};
export default BoardTaskCard;
