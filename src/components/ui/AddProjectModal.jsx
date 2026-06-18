import { Form, Button } from "react-bootstrap";
import CustomModal from "./CustomModal";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useContext, useState } from "react";
import Select from "react-select";

const AddProjectModal = () => {
  const {
    isProjectModalOpen,
    closeProjectModal,
    addProject,
    projectColors,
    selectedColor,
    setSelectedColor,
  } = useContext(ProjectContext);

  const [projectName, setProjectName] = useState("");
  const [projectDesc, setProjectDesc] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!projectName.trim()) {
      alert("الرجاء إدخال اسم المشروع");
      return;
    }

    addProject({
      name: projectName,
      description: projectDesc,
      projectColor: selectedColor || "#1976d2",
      team: [],
    });

    setProjectName("");
    setProjectDesc("");
    closeProjectModal();
  };

  const customOption = (props) => {
    const { data, innerRef, innerProps } = props;
    return (
      <div
        ref={innerRef}
        {...innerProps}
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          padding: "8px 12px",
          cursor: "pointer",
        }}
      >
        <span
          style={{
            backgroundColor: data.value,
            width: "12px",
            height: "12px",
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
      isOpen={isProjectModalOpen}
      onClose={closeProjectModal}
      title={"اضافة مشروع جديد"}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>اسم المشروع</Form.Label>
          <Form.Control
            type="text"
            placeholder="ادخل اسم المشروع"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>الوصف</Form.Label>
          <Form.Control
            as={"textarea"}
            rows={3}
            value={projectDesc}
            onChange={(e) => setProjectDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>اللون</Form.Label>
          <Select
            options={projectColors}
            getOptionLabel={(Option) => Option.name}
            getOptionValue={(Option) => Option.value}
            onChange={(choice) => setSelectedColor(choice.value)}
            components={{ Option: customOption }}
            placeholder="اختر لون المشروع..."
          />
        </Form.Group>
        <div className="d-flex gap-3 mt-3">
          <Button variant="primary" type="submit">
            إضافة
          </Button>
          <Button
            type="button"
            className="text-primary border-0"
            style={{ backgroundColor: "transparent" }}
            onClick={() => {
              setProjectName("");
              setProjectDesc("");
              closeProjectModal();
            }}
          >
            إلغاء
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};

export default AddProjectModal;
