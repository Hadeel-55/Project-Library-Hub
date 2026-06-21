import { useContext } from "react";
import { LibraryContext } from "../../contexts/LibraryContext";
import { BiUser, BiCategory, BiBookOpen } from "react-icons/bi";
import StatCard from "../dashboard/StatCard";
import { Container, Row, Col, Card } from "react-bootstrap";

const BookGrid = ({ title, count, icon: Icon, bgColor, textColor }) => {
  const { library, category, author } = useContext(LibraryContext);
  const statsData = [
    {
      id: 1,
      title: "اجمالي الكتب",
      count: library ? library.length : 0,
      icon: BiBookOpen,
      bgColor: "#ffa60075",
      textColor: "#000000d7",
      iconColor: "#ffb005",
    },
    {
      id: 2,
      title: "تصنيفات",
      count: category ? category.length : 0,
      icon: BiCategory,
      bgColor: "#00c3ff71",
      textColor: "#000000d7",
      iconColor: "#059bff",
    },
    {
      id: 3,
      title: "مؤلفين",
      count: author ? author.length : 0,
      icon: BiUser,
      bgColor: "#ea04ff41",
      textColor: "#000000d7",
      iconColor: "#f705ff",
    },
  ];

  return (
    <Row className="justify-content-center text-center mt-5 ">
      {statsData.map((stat) => (
        <Col key={stat.id} xs={12} md={4} className="pb-3 ">
          <StatCard
            title={stat.title}
            count={stat.count}
            icon={stat.icon}
            bgColor={stat.bgColor}
            textColor={stat.textColor}
            iconColor={stat.iconColor}
          />
        </Col>
      ))}
    </Row>
  );
};
export default BookGrid;
