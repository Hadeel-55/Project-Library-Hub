import { Card } from "react-bootstrap";
const StatCard = ({ title, count, icon: Icon, bgColor ,textColor,iconColor}) => {
  return (
    <Card className="p-3 border-0 text-white"  style={{backgroundColor:bgColor}}>
      <div>
        <div>
          <Icon className="fs-2 mt-2 " color={iconColor} />
        </div>
        <div style={{color:textColor}}>
          <h5 className="fw-bold pt-2 ">{count}</h5>
          <span style={{fontSize:'13px'}} className="fw-semibold" >{title}</span>
        </div>
      </div>
    </Card>
  );
};
export default StatCard;
