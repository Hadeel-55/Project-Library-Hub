import { createContext, useState, useEffect } from "react";

export const ProjectContext = createContext();

// useLocalStorage
const useLocalStorage = (key, defautValue) => {
  const [state, setState] = useState(() => {
    const savedData = localStorage.getItem(key);
    return savedData ? JSON.parse(savedData) : defautValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
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
      taskDate: "2026-06-20",
      status: "implementTasks",
    },
    {
      id: 2,
      projectId: 2,
      taskTitle: "مشروع شركه سيارات",
      description: "بناء مشروع لشركه سيارات",
      levelTask: "منخفض",
      taskDate: "2026-06-22",
      status: "complete",
     
    },
  ]);

  // 5. Team State
  const [team, setTeam] = useLocalStorage("team", [
    { id: 1, name: "Ali" },
    { id: 2, name: "Mustafa" },
    { id: 3, name: "Muhammed" },
  ]);

  // 6. Comments State
  const [comments, setCommentes] = useLocalStorage("comments", [
    { id: 10, taskId: 1, text: "لقد بدأت في برمجة الواجهة" },
    { id: 11, taskId: 1, text: "ممتاز، بانتظار التحديث التالي" },
  ]);


  // Derived States (Counters)
  const totalTasksCount = tasks.length;

  const completedTasksCount = tasks.filter(
    (task) => task.status === "complete",
  ).length;

  const implementTasksCount = tasks.filter(
    (task) => task.status === "implementTasks",
  ).length;

  // --- Functions ---

  const addProject = (newProjectsData) => {
    const newProject = {
      id: Date.now(),
      ...newProjectsData,
    };
    setProjects((prevProjects) => [...prevProjects, newProject]);
  };

  const addTask = (newTasksData, projectId) => {
    const newTasks = {
      id: Date.now(),
      projectId: projectId,
      ...newTasksData,
    };
    setTasks((prevTasks) => [...prevTasks, newTasks]);
  };

  const addMember = (newMemberData) => {
    const isExsit = team.some((member) => member.name === newMemberData.name);
    if (isExsit) {
      return;
    }
    const newMember = {
      id: Date.now(),
      ...newMemberData,
    };
    setTeam((prevTeam) => [...prevTeam, newMember]);
  };

  const deletTask = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));

    setCommentes((prevComments) =>
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

  const addComment = (newCommentData) => {
    const newComment = {
      id: Date.now(),
      ...newCommentData,
    };
    setCommentes((prevComments) => [...prevComments, newComment]);
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
        setCommentes,
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
        setTaskDates
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
