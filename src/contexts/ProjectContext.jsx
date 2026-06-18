import { createContext, useState, useEffect } from "react";

export const ProjectContext = createContext();

// useLocalStorage
const useLocalStorage = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    try{
  const savedData = localStorage.getItem(key);
   return savedData ? JSON.parse(savedData) : defaultValue;

    }catch(erroe){
      console.error('Enter reading localStorage key:', key , error);
      return defaultValue;
    }
  });

  useEffect(() => {
    try{
  localStorage.setItem(key, JSON.stringify(state));
    }catch(error){
            console.error('Enter reading localStorage key:', key , error);
    }
  
  }, [key, state]);
  return [state, setState];
};

// ProjectsColor
const projectColors = [
  { name: "أزرق رئيسي", value: "#1976d2" },
  { name: "أخضر غامق", value: "#2e7d32" },
  { name: "برتقالي", value: "#ed6c02" },
  { name: "بنفسجي", value: "#9c27b0" },
  { name: "أحمر", value: "#d32f2f" },
  { name: "أزرق فاتح", value: "#0288d1" },
  { name: "رمادي", value: "#757575" },
  { name: "وردي", value: "#e91e63" },
];
const levelTasks = {
  normal: { name: "متوسط" },
  low: { name: "منخفض" },
  high: { name: "عالي" },
};

export const ProjectContextProvider = ({ children }) => {
  // 1. ProjectCOlor State
  const [selectedColor, setSelectedColor] = useState(projectColors[0].value);
  // 2. Projects State
  const [projects, setProjects] = useLocalStorage("projects", [
    {
      id: 1,
      name: "برمجه",
      description: "انتبه للبيانات الجديده",
      projectColor: "#1976d2",
      team: [1, 2],
    },
    {
      id: 2,
      name: "بيانات",
      description: "يجب ان ينتهي بتاريخ 25/7/2026",
      projectColor: "#2e7d32",
      team: [1, 2, 3],
    },
  ]);

  // Static Configuration States

  const tasksStatas = ["complete", "implementTasks", "totalTasks"];
  //  3. Date State
  const [taskDates, setTaskDates] = useState("");
// 
const taskLifecycle = ["pending", "implementTasks", "complete"];

  
  // calculate Day
  const calculateDayLaft = (taskDate) => {
    if (!taskDate) return "لم يحدد تاريخ";

    const today = new Date();
    const expiryDate = new Date(taskDate);
    today.setHours(0, 0, 0, 0);
    expiryDate.setHours(0, 0, 0, 0);

    const differenceInTime = expiryDate.getTime() - today.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));

    if (differenceInDays < 0) {
      return "منتهية";
    } else if (differenceInDays === 0) {
      return "اليوم النهائي";
    } else {
      return `${differenceInDays} أيام متبقية`;
    }
  };
  // 4. Tasks State
  const [tasks, setTasks] = useLocalStorage("tasks", [
    {
      id: 1,
      projectId: 1,
      taskTitle: "مشروع شركه طيران",
      description: "بناء مشروع لشركه طيران",
      levelTask: "عالي",
      taskDate: "2026-06-25",
      status: "pending",
      comment:"إضافة ملف جديد"
    },
    {
      id: 2,
      projectId: 2,
      taskTitle: "مشروع شركه سيارات",
      description: "بناء مشروع لشركه سيارات",
      levelTask: "منخفض",
      taskDate: "2026-06-30",
      status: "pending",
     comment:"إضافة ملف جديد2"
    },
  ]);

  // 5. Team State
  const [team, setTeam] = useLocalStorage("team", [
    { id: 1, name: "Ali" },
    { id: 2, name: "Mustafa" },
    { id: 3, name: "Muhammed" },
  ]);

  // 6. Comments State
  const [comments, setComments] = useLocalStorage("comments", [
    { id: 1, taskId: 1, text: "لقد بدأت في برمجة الواجهة" },
    { id: 2, taskId: 2, text: "ممتاز، بانتظار التحديث التالي" },
  ]);

// 7. Modal 
const [isProjectModalOpen, setIsProjectModalOpen]=useState(false);

const openProjectModal = () => setIsProjectModalOpen(true);
  const closeProjectModal = () => setIsProjectModalOpen(false);

// 8. taskModal
const [isTaskOpenModal,setIsTaskOpenModal ]=useState(false);
const openTaskModal =()=>setIsTaskOpenModal(true);
const closeTaskModal=()=>setIsTaskOpenModal(false);

// 9. Comment MOdal

const[isCommentModal ,setIsCommentModal]=useState(null);
const openCommentModal=()=>setIsCommentModal(true);
const closeCommentModal=()=>setIsCommentModal(null);


// File State
const [files, setFiles]=useLocalStorage('files',[

])

  // Derived States (Counters)
  const totalTasksCount = tasks.length;
const pendingTasksCount = tasks.filter((task) => task.status === "pending").length;
  const completedTasksCount = tasks.filter(
    (task) => task.status === "complete",
  ).length;

  const implementTasksCount = tasks.filter(
    (task) => task.status === "implementTasks",
  ).length;

  // --- Functions ---

// 1. add project
  const addProject = (newProjectsData) => {
    setProjects((prevProjects) => {
      const newProject = {
        id: `project-${Date.now()}-${prevProjects.length}-${Math.floor(Math.random() * 10000)}`,
        ...newProjectsData,
      };
      return [...prevProjects, newProject];
    });
  };

  // 2. add task
  const addTask = (newTasksData, projectId) => {
    setTasks((prevTasks) => {
      const newTasks = {
        id: `task-${Date.now()}-${prevTasks.length}-${Math.floor(Math.random() * 10000)}`,
        projectId: projectId,
        status: "pending",
        ...newTasksData,
        
      };
      return [...prevTasks, newTasks];
    });
  };

// Next status

const moveTaskToNextStatus =(taskId)=>{

  setTasks((prevTasks)=>
  prevTasks.map((task)=>{
    if(task.id === taskId){
      const currentIndex =taskLifecycle.indexOf(task.status);

      if(currentIndex !== -1 && currentIndex < taskLifecycle.length -1){
        return{
          ...task,
          status:taskLifecycle[currentIndex + 1]
        };
      }
    }
    return task;
  })
)
}


  // 3. add member
  const addMember = (newMemberData) => {
    const isExsit = team.some((member) => member.name === newMemberData.name);
    if (isExsit) {
      return; 
    }
    
    setTeam((prevTeam) => {
      const newMember = {
        id: `member-${Date.now()}-${prevTeam.length}-${Math.floor(Math.random() * 10000)}`,
        ...newMemberData,
      };
      return [...prevTeam, newMember];
    });
  };

  // 4. add comment
  const addComment = (newCommentData) => {
    setComments((prevComments) => {
      const newComment = {
        id: `comment-${Date.now()}-${prevComments.length}-${Math.floor(Math.random() * 10000)}`,
        ...newCommentData,
      };
      return [...prevComments, newComment];
    });
  };

  // add files

  const addFile=(newFileData)=>{
    setFiles((prevFiles)=>{
      const newFile ={
        id:`file-${Date.now()}-${prevFiles.length}-${Math.floor(Math.random()* 10000)}`,
        ...newFileData
      };
      return[...prevFiles, newFile]
    })
  }

  const deletTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    setComments((prevComments) =>
      prevComments.filter((comment) => comment.taskId !== taskId),
    );
  };

  const deletProject = (projectId) => {
    setProjects((prevProjects) =>
      prevProjects.filter((project) => project.id !== projectId),
    );
    setTasks((prevTasks) =>
      prevTasks.filter((task) => task.projectId !== projectId),
    );
  };


  return (
    <ProjectContext.Provider
      value={{
        projects,
        setProjects,
        tasks,
        setTasks,
        team,
        setTeam,
        comments,
        setComments,
        totalTasksCount,
        completedTasksCount,
        implementTasksCount,
        addProject,
        addTask,
        addMember,
        deletTask,
        deletProject,
        addComment,
        levelTasks,
        tasksStatas,
        projectColors,
        calculateDayLaft,
        taskDates,
        setTaskDates,
      isProjectModalOpen,
       openProjectModal,
       closeProjectModal,
       setIsProjectModalOpen,
       selectedColor,
       setSelectedColor,
       closeTaskModal,
       openTaskModal,
       isTaskOpenModal,
       setIsTaskOpenModal,
       openCommentModal,
       setIsCommentModal,
       closeCommentModal,
       isCommentModal,
       addFile,
       files,
        setFiles,
        taskLifecycle,
        moveTaskToNextStatus
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
