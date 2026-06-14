import { Badge,Card } from "react-bootstrap";

const TaskRow = ({ title, status, projectName, date ,daysLeft }) => {
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

  return (
    <div className="d-flex justify-content-between border-1 p-2 align-items-center" style={{boxShadow:'1px 1px 2px ',fontSize:'14px'}}>
      <div >
        <h6>{title}</h6>
        <div className="text-secondary d-flex gap-1">
        <span >{projectName}</span>
        <span >•</span>
        <span >{daysLeft}</span>
        <span>{date}</span>
        </div>
      </div>
      <div>
        <Badge bg={getBadgeBg(status)} className="rounded-pill">
          {status}
        </Badge>
      </div>
    </div>
  );
};
export default TaskRow;
