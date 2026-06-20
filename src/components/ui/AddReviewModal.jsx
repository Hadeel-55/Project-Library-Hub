import { Form, Button } from "react-bootstrap";
import CustomModal from "./CustomModal";
import { useContext, useState } from "react";
import { FaStar, FaRegStar } from "react-icons/fa";
import { LibraryContext } from "../../contexts/LibraryContext";

const AddReviewModal = ({ bookId, bookTitle }) => {
  const { isOpenReviewModal, addReview, closeReviewModal } =
    useContext(LibraryContext);

  const [comment, setComment] = useState("");
  const [userName, setUserName] = useState("");
  const [rating, setRating] = useState(0);

  const handleSubmitReviewModal = (e) => {
    e.preventDefault();

    const newReviwData = {
      userName: userName || "محمد الاحمد",
      comment: comment,
      rating: Number(rating),
    };
    addReview(newReviwData,bookId);
    handleCloseReview();
  };

  const handleCloseReview = () => {
    setComment("");
    setUserName("");
    setRating(5);
    closeReviewModal();
  };

  return (
    <CustomModal
      isOpen={isOpenReviewModal}
      onClose={handleCloseReview}
      title="أضافة مراجعة"
    >
      <Form onSubmit={handleSubmitReviewModal}>
        <div className="mb-3 p-2 bg-light rounded text-secondary small">
          الكتاب : <strong>{bookTitle || "غير محدد"}</strong>
        </div>

        <Form.Group className="mb-3">
          <Form.Label>اسمك</Form.Label>
          <Form.Control
            type="text"
            placeholder="اكتب اسمك (اختياري)"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>
            التقييم : <span className="text-warning fw-bold">{rating}</span>
          </Form.Label>
          <div style={{ direction: "ltr" }}>
            {[...Array(5)].map((_, index) => {
              const starValue = index + 1;
              return (
                <span
                  key={index}
                  onClick={() => setRating(starValue)}
                  style={{ cursor: "pointer", fontSize: "24px" }}
                  className={
                    starValue <= rating ? "text-warning" : "text-muted"
                  }
                >
                  {starValue <= rating ? <FaStar /> : <FaRegStar />}
                </span>
              );
            })}
          </div>
        </Form.Group>

        <Form.Control
          as="textarea"
          rows={3}
          placeholder="تعليقك"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button type="submit">إضافة</Button>
          <Button type="button" variant="light" onClick={handleCloseReview}>
            إلغاء
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};
export default AddReviewModal;
