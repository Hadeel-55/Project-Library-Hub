import { Form, Row, Col } from "react-bootstrap";
import { LibraryContext } from "../../contexts/LibraryContext";
import { useContext, useState } from "react";
import Select from "react-select";

const FilterBar = () => {
  const {
    filteredBooks,
    category,
    author,
    handleSearchQuery,
    searchQuery,
    setSearchQuery,
  } = useContext(LibraryContext);

  const [cat, setCat] = useState("");
  const [auth, setAuthor] = useState("");

  const optionCustom = (props) => {
    const { data, innerRef, innerProps, isFocused } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        className={`d-flex align-items-center p-2 gap-2 ${
          isFocused ? "bg-light" : ""
        }`}
        style={{ cursor: "pointer" }}
      >
        <span
          style={{
            backgroundColor: "#000000a8",
            width: "8px",
            height: "8px",
            borderRadius: "50%",
            display: "inline-block",
            transition: "background-color 0.2s ease",
          }}
        ></span>
        <span className={isFocused ? "fw-semibold" : ""}>{data.name}</span>
      </div>
    );
  };

  return (
    <Row className="g-3 mt-3">
      <Col md={4}>
        <div className="position-relative d-flex align-items-center">
          <Form.Control
            value={searchQuery || ""}
            onChange={(e) => handleSearchQuery(e.target.value)}
            placeholder="🔍 ابحث عن كتاب..."  
            className="rounded-3 pe-5"
          />

          {searchQuery && (
            <button
              type="button"
              onClick={() => handleSearchQuery("")}
              className="btn-close position-absolute"
              style={{
                right: "15px",
                fontSize: "0.8rem",
                cursor: "pointer",
                zIndex: 5,
              }}
            />
          )}
        </div>
      </Col>
      <Col md={4}>
        <Select
          onChange={(e) => setCat(e)}
          placeholder="جميع التصنيفات"
          options={category}
          value={cat}
          components={{ Option: optionCustom }}
          getOptionLabel={(choise) => choise.name}
          getOptionValue={(choise) => choise.id}
          isClearable
        ></Select>
      </Col>
      <Col md={4}>
        <Select
          onChange={(e) => setAuthor(e)}
          placeholder="جميع المؤلفين"
          options={author}
          value={auth}
          components={{ Option: optionCustom }}
          getOptionLabel={(choise) => choise.name}
          getOptionValue={(choise) => choise.id}
          isClearable
        ></Select>
      </Col>
    </Row>
  );
};
export default FilterBar;
