import { Form, Button } from "react-bootstrap";
import CustomModal from "./CustomModal";
import { ProjectContext } from "../../contexts/ProjectContext";
import { useContext, useState } from "react";
import Select from "react-select";

const AddTaskModal = ({projectId}) => {
  const {
    closeTaskModal,
    
       isTaskOpenModal,
       setIsTaskOpenModal,
     addTask,
    team,
     addMember,
    levelTasks,
     taskLifecycle
  
  } = useContext(ProjectContext);

  const [taskTitle, setTaskTitle] = useState("");
  const [taskDesc, setTaskDesc] = useState("");
  const [selectLevel,setSelectLevel]=useState('');
  const [assignedMember,setAssignedMember]=useState('')

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskTitle.trim()) {
      alert("الرجاء إدخال عنوان المهمة");
      return;
    }

    addTask({
      taskTitle: taskTitle,
      description: taskDesc,
      team: [],
      levelTask:selectLevel,
      status:'pending',
      taskDate:new Date().toISOString().split('T')[0],
      members: assignedMember ? [Number(assignedMember)] : []
    },projectId);


    setTaskTitle("");
    setTaskDesc("");
     closeTaskModal();
     setAssignedMember('')
  };
 

  
const taskOptions = Object.keys(levelTasks).map((key) => ({
  value: key,              
  name: levelTasks[key].name 
}));

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
    
      isOpen={isTaskOpenModal}
      onClose={closeTaskModal}
      title={"إضافة مهمة جديدة"}
    >
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>اسم المهام المضافة</Form.Label>
          <Form.Control
            type="text"
            placeholder="عنوان المهمة"
            value={taskTitle}
            onChange={(e) => setTaskTitle(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>الوصف</Form.Label>
          <Form.Control
            as={"textarea"}
            rows={3}
            value={taskDesc}
            onChange={(e) => setTaskDesc(e.target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>تحديد الأولوية</Form.Label>
          <Select
            options={taskOptions}
            getOptionLabel={(Option) => Option.name}
            getOptionValue={(Option) => Option.value}
            onChange={(choice) => setSelectLevel(choice.name)}
            components={{ Option: customOption }}
            placeholder="الأولوية"
          />
        </Form.Group>
         <Form.Group>
          <Form.Label>تعيين إلى</Form.Label>
          <Select
            options={team}
            getOptionLabel={(Option) => Option.name}
            getOptionValue={(Option) => Option.id}
            onChange={(choice) => setAssignedMember(choice.id)}
            components={{ Option: customOption }}
            placeholder="...اختر الشخص"
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
              setTaskTitle("");
              setTaskDesc("");
               closeTaskModal();
            }}
          >
            إلغاء
          </Button>
        </div>
      </Form>
    </CustomModal>
  );
};

export default AddTaskModal;
