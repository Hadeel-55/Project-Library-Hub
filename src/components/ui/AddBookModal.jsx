import { Form, Button } from "react-bootstrap";
import { LibraryContext } from "../../contexts/LibraryContext";
import { useContext, useState } from "react";
import CustomModal from "./CustomModal";
import { data } from "react-router-dom";
import Select from "react-select";
const AddBookModal = () => {
  const { category, addBook, isOpenAddBookModal, closeAddBookModal } =
    useContext(LibraryContext);

  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");
  const [bookAuthor, setBookAuthor] = useState("");
  const [selectCat, setSelectCat] = useState(null);
  const [descripton, setDescripton] = useState("");

  const handleFromSubmit = (e) => {
    e.preventDefault();

     addBook({
   title,
      author: bookAuthor,
      category: selectCat ? selectCat.name : "",
      date: date || new Date().toISOString().split("T")[0],
      descripton,
     })

     closeAddBookModal();
     setBookAuthor('');
     setSelectCat('');
     setDescripton('');
     setDate('');
  };

  const handleCloseAndRest = () => {
    setTitle("");
    setBookAuthor("");
    setDate("");
    setBookAuthor("");
    setSelectCat(null);
    setDescripton("");
    closeAddBookModal();
  };

  const optionCustum = (props) => {
    const { data, innerRef, innerProps ,isFocused,} = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
     className={`d-flex align-items-center p-2 gap-2 ${
        isFocused ? "bg-light" : ""
      }`}
        style={{cursor:'pointer'}}
      >
        <span
          style={{
           backgroundColor :data.value || '#000000a8',
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            display: "inline-block",
          }}
        ></span>
        <span>{data.name}</span>
      </div>
    );
  };

  return (
    <CustomModal
      isOpen={isOpenAddBookModal}
      onClose={handleCloseAndRest}
      title={"إضافة كتاب جديد"}
    >
      <Form onSubmit={handleFromSubmit}>
        <Form.Group>
          <Form.Label>عنوان الكتاب</Form.Label>
          <Form.Control
            type="text"
            placeholder="عنوان الكتب"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </Form.Group>
        <Form.Group>
          <Form.Control className="mt-3"
            type="text"
            placeholder="المؤلف"
            value={bookAuthor}
            onChange={(e) => setBookAuthor(e.target.value)}
          />
        </Form.Group>

        <Select
          options={category}
          getOptionLabel={(option) => option.name}
          getOptionValue={(option) => option.id}
          value={selectCat}
          onChange={(choice) => setSelectCat(choice)}
          placeholder="اختر التصنيف"
          components={{ Option: optionCustum }}
          className="text-dark mt-3"
        ></Select>
        <Form.Group className="mt-3">
          <Form.Label>تاريخ النشر</Form.Label>
          <Form.Control
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control className="mt-3"
            as='textarea'
            rows={3}
            placeholder="الوصف"
            value={descripton}
            onChange={(e) => setDescripton(e.target.value)}
          />
        </Form.Group>

        <div className="d-flex justify-content-end gap-2 mt-4">
          <Button
            type="submit"
          >
            إضافة
          </Button>
          <Button type="button" variant="light" onClick={handleCloseAndRest}>
            إلغاء
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};
export default AddBookModal;
