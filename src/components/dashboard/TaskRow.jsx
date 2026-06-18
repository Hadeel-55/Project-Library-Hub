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
    <div className="d-flex justify-content-between p-2 align-items-center card-lift" style={{fontSize:'14px', borderBottom:'1px solid #0000003f'}}>
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
