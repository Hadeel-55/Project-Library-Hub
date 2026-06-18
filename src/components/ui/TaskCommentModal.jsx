import { Form, Button } from "react-bootstrap";
import CustomModal from "./CustomModal";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useContext, useState } from "react";
import Select from "react-select";
import { useParams } from "react-router-dom";

const TaskCommentModal = ({ taskId }) => {
  const { isCommentModal, closeCommentModal, addComment , } =
    useContext(ProjectContext);

  const [taskComment, setTaskComment] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskComment.trim()) {
      alert("الرجاء إدخال التعليق");
      return;
    }
    addComment({
      text: taskComment,
      taskId: taskId,
    });

    setTaskComment("");
    closeCommentModal();
  };

  return (
    <CustomModal
      isOpen={Boolean(isCommentModal)}
      onClose={closeCommentModal}
      title={"إضافة تعليق جديد"}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>التعليق</Form.Label>
          <Form.Control
            as={"textarea"}
            rows={3}
            value={taskComment}
            onChange={(e) => setTaskComment(e.target.value)}
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
              setTaskComment("");
              closeCommentModal();
            }}
          >
            إلغاء
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};

export default TaskCommentModal;
