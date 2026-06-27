import { Card, Badge, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import {
  FaBook,
  FaUserAlt,
  FaCalendar,
  FaStarHalfAlt,
  FaRegStar,
  FaStar,
} from "react-icons/fa";
import { LibraryContext } from "../../contexts/LibraryContext";
import { useContext } from "react";

  export const renderStars = (rating = 0) => {
    return [...Array(5)].map((_, index) => {
      const starValue = index + 1;
      if (starValue <= rating)
        return <FaStar key={index} className="text-warning" />;
      if (starValue - 0.5 <= rating)
        return <FaStarHalfAlt key={index} className="text-warning" />;
      return <FaRegStar key={index} className="text-muted" />;
    });
  };
const BookCard = () => {
  const { filteredBooks, deletBook } = useContext(LibraryContext);



  return (
    <Row className="mt-5 justify-content-center">
      {filteredBooks.map((item, id) => (
        <Col xs={11} md={3} key={item.id || id} className="pb-4  ">
          <Card>
            <Card.Header
              className="position-relative d-flex align-items-center justify-content-center bg-light"
              style={{ width: "100%", height: "150px" }}
            >
              <Card.Img variant="top" />
              <Badge
                className="rounded-pill position-absolute text-white"
                style={{ fontSize: "11px", top: "15px", right: "15px" }}
              >
                {item.category}
              </Badge>
              <FaBook
                style={{ fontSize: "40px", color: "#b109c7" }}
                className="position-absolute"
              />
            </Card.Header>

            <Card.Body>
              <h5>{item.title}</h5>
              <small
                className="text-muted d-flex align-items-center gap-1 pb-2 pt-2"
                style={{ fontSize: "13px" }}
              >
                {" "}
                <FaUserAlt /> {item.author}
              </small>
              <p
                className="d-flex align-items-center gap-1"
                style={{ fontSize: "13px" }}
              >
                <FaCalendar className="text-muted " /> {item.date}
              </p>

              <p>
                
                {renderStars(item.rating)}{" "}
                <span className="text-muted small fw-bold">
                  ({item.rating ? item.rating.toFixed(1) : "0.0"})
                </span>
              </p>
              <div className="d-flex gap-3 align-items-center">
                <Link to={`/library/${item.id}`} className="btn-sm bg-transparent text-primary text-decoration-none ">
                  عرض التفاصيل
                </Link>
                <Button
                  onClick={() => deletBook(item.id)}
                  className="bg-transparent text-danger border-0 "
                >
                  حذف
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  );
};
export default BookCard;
