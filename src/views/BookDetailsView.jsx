import { useParams, Link } from "react-router-dom";
import { Container, Row, Col, Card, Button, Badge } from "react-bootstrap";
import { LibraryContext } from "../contexts/LibraryContext";
import { useContext } from "react";
import { renderStars } from "../components/library/BookCard";
import { FaUserAlt, FaArrowLeft, FaBook, FaCalendar } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import AddReviewModal from "../components/ui/AddReviewModal";

const BookDetailsView = () => {
  const { bookId } = useParams();
  const { library, openReviewModal, isOpenReviewModal, addReviw, deletReview } =
    useContext(LibraryContext);
  const currentBook = library.find((b) => String(b.id) === String(bookId));

  if (!currentBook) {
    return <h3 className="mt-5">...الكتاب غير موجود</h3>;
  }

  const reviewsList = currentBook.reviews || [];
  const reviewsLength = reviewsList.length;

  return (
    <Container>
      <Row className="mt-5">
        <div className=" d-flex justify-content-between">
          <div className="">
            <Link
              to="/library"
              className="text-decoration-none  fw-bold "
              style={{ fontSize: "26px" }}
            >
              {" "}
              <FaArrowLeft /> تفاصيل الكتاب
            </Link>
          </div>
          <div>
            <Button
              onClick={openReviewModal}
              className="btn-sm rounded-3 fw-semibold  d-flex gap-1 align-items-center"
            >
              إضافة مراجعة
              <span style={{ fontSize: "20px", lineHeight: "1" }}>+</span>
            </Button>
          </div>
        </div>
      </Row>
      <Row className="mt-5">
        <Col>
          <Card style={{ height: "400px" }}>
            <Card.Header
              className=" d-flex align-items-center justify-content-center bg-light"
              style={{ width: "100%", height: "300px" }}
            >
              <Card.Img variant="top" />
              <div
                style={{
                  fontSize: "40px",
                  backgroundColor: "#b109c7",
                  color: "white",
                }}
                className="position-absolute fw-bold p-5"
              >
                {currentBook.title.trim().charAt(0).toLowerCase()}
              </div>
            </Card.Header>

            <Card.Body className="">
              <Badge
                className="rounded-pill mb-3 text-white"
                style={{ fontSize: "11px" }}
              >
                {currentBook?.category}
              </Badge>
              <p
                className="d-flex align-items-center gap-1"
                style={{ fontSize: "13px" }}
              >
                {renderStars(currentBook?.rating)}{" "}
                <span className="text-muted small fw-bold">
                  (
                  {currentBook?.rating ? currentBook?.rating.toFixed(1) : "0.0"}
                  )
                </span>
              </p>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <div>
            <Card>
              <div className="p-3">
                <h5 style={{ color: "#b109c7" }}>{currentBook?.title}</h5>
                <p
                  className=" d-flex align-items-center gap-1 mb-1 pt-2"
                  style={{ fontSize: "13px" }}
                >
                  {" "}
                  <FaUserAlt className="text-muted" /> {currentBook?.author}{" "}
                  <span className="fw-bold "> :المؤلف </span>
                </p>
                <p style={{ fontSize: "13px" }} className="mb-2">
                  <BiCategory className="text-muted " />{" "}
                  <span className="fw-bold">التصنيف:</span>{" "}
                  {currentBook?.category}
                </p>

                <p
                  className="d-flex align-items-center gap-1"
                  style={{ fontSize: "13px" }}
                >
                  <FaCalendar className="text-muted " /> {currentBook?.date}{" "}
                  <span className="fw-bold">: تاريخ النشر</span>
                </p>
                <hr />
                <h5 className="fw-bold">الوصف</h5>
                <p className="text-secondary">{currentBook?.description}</p>
              </div>
            </Card>
          </div>
          <div>
            <Card className="mt-3">
              <div className="p-4">
                <h5 className="fw-bold">المراجعات ({reviewsLength})</h5>

                {reviewsLength === 0 ? (
                  <p className="text-muted mt-3">
                    لا توجد مراجعات لهذا الكتاب بعد. كن أول من يضيف مراجعة!
                  </p>
                ) : (
                  reviewsList.map((review) => (
                    <div
                      key={review.id}
                      className="bg-light p-3 mt-3 rounded-3 border-bottom"
                    >
                      <div className="d-flex gap-3 ">
                        <div
                          style={{
                            backgroundColor: "#b109c7",
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                          }}
                          className="d-flex justify-content-center align-items-center text-white fw-bold"
                        >
                          {review.userName.trim().charAt(0).toLowerCase()}
                        </div>

                        <div>
                          <strong className="text-primary">
                            {review.userName}
                          </strong>

                          <div className="my-1 text-warning">
                            {renderStars
                              ? renderStars(review.rating)
                              : `⭐ ${review.rating}`}
                          </div>
                          <p
                            className="mb-0 fw-bold text-secondary"
                            style={{ fontSize: "14px" }}
                          >
                            {review.comment}
                          </p>
                          <small
                            className="text-muted "
                            style={{ fontSize: "12px" }}
                          >
                            {review.date || review.data}
                          </small>
                        </div>

                        <div className="ms-auto">
                          <Button                            
                            variant="outline-danger"
                            size="sm"
                            onClick={() =>
                              deletReview(currentBook.id, review.id)
                            }
                          >
                            حذف
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </Card>
          </div>
        </Col>
      </Row>
      <AddReviewModal bookId={currentBook?.id} bookTitle={currentBook?.title} />
    </Container>
  );
};
export default BookDetailsView;
