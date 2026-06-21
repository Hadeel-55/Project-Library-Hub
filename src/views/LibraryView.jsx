import { useContext } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { LibraryContext } from "../contexts/LibraryContext";
import AddBookModal from '../components/ui/AddBookModal';
import FilterBar from '../components/library/FilterBar';
import BookGrid from '../components/library/BookGrid';
const LibraryView = () => {
  const { setIsopenAddBookModal } = useContext(LibraryContext);
  return (
    <Container className="mt-5">
      <div className="d-flex justify-content-between align-items-center">
        <h2 className="text-primary">المكتبة الرقمية</h2>
        <Button
          onClick={() => setIsopenAddBookModal(true)}
          className="btn-sm rounded-3 fw-semibold d-flex gap-1 align-items-center"
        >
          <span style={{ fontSize: "20px" }}>+</span> أضافة كتاب
        </Button>
      </div>
      <AddBookModal/>
      <FilterBar/>
      <BookGrid/>
    </Container>
  );
};
export default LibraryView;
