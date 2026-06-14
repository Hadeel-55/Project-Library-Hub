import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { FiClipboard, FiCheckCircle, FiClock } from "react-icons/fi";
import StatCard from "./StatCard";
import { Container, Row, Col, Card } from "react-bootstrap";
const DahboardStats = () => {
  const { totalTasksCount, completedTasksCount, implementTasksCount } =
    useContext(ProjectContext);

  const statsData = [
    {
      id: 1,
      title: "اجمالي المهام",
      count: totalTasksCount,
      icon: FiClipboard,
      bgColor: "#0e88da",
    },
    {
      id: 2,
      title: "مهام مكتملة",
      count: completedTasksCount,
      icon: FiCheckCircle,
      bgColor: "#128b18",
    },
    {
      id: 3,
      title: "مهام قيد التنفيذ",
      count: implementTasksCount,
      icon: FiClock,
      bgColor: "#ee9f28",
    },
  ];
  return (
   
      <Row className="justify-content-center text-center mt-5">
        {statsData.map((stat) => (
          <Col key={stat.id} xs={12} md={4} className="pb-3">
            <StatCard
              title={stat.title}
              count={stat.count}
              icon={stat.icon}
              bgColor={stat.bgColor}
            />
          </Col>
        ))}
      </Row>
  
  );
};
export default DahboardStats;
