import { createContext, useState , useEffect } from "react";

export const ProjectContext = createContext();

// useLocalStorage
const useLocalStorage =(key,defautValue)=>{
const [state, setState]=useState(()=>{
const savedData =localStorage.getItem(key);
return savedData ? JSON.parse(savedData) : defautValue;
})

useEffect(()=>{
localStorage.setItem(key,JSON.stringify(state))
},[key,state])
return [state,setState]
}

export const ProjectContextProvider = ({ children }) => {
  // 1. Projects State
  const [projects, setProjects] = useLocalStorage("projects",[
    { id: 1, name: "برمجه", description: "dcsdsd", color: "red" },
    { id: 2, name: "بيانات", description: "dcsdsd", color: "blue" },
  ]);
  
  // 2. Tasks State
  const [tasks, setTasks] = useLocalStorage("tasks",[
    {
      id: 1,
      projectId: 1,
      taskTitle: "مشروع شركه طيران",
      tasksDescription: "بناء مشروع لشركه طيران",
      priority: "عالي",
      taskDate: "20/10/2016",
      statsTask: "totalTasks",
    },
    {
      id: 2,
      projectId: 2,
      taskTitle: "مشروع شركه سيارات",
      tasksDescription: "بناء مشروع لشركه سيارات",
      priority: "منخفص",
      taskDate: "20/10/2016",
      statsTask: "complete",
    },
  ]);

// 3. Team State
const [team,setTeam]=useLocalStorage("team",[
  {id:1,name:'Ali'},
  {id:2,name:'Mustafa'},
  {id:3,name:'Muhammed'},

]);

// 4. Comments State
const [comments,setCommentes]=useLocalStorage("comments",[
  {id: 10,taskId:1, text:'لقد بدأت في برمجة الواجهة'},
  {id: 11,taskId:1, text:'ممتاز، بانتظار التحديث التالي'},
])

// Static Configuration States
  const levelTasks ={
    normal: { name: "عادي" },
    low: { name: "منخفض" },
    high: { name: "عالي" },
  };

  const tasksStatas = [
    "complete",
    "implementTasks",
    "totalTasks",
  ];

// Derived States (Counters)
  const totalTasksCount = tasks.length;

  const completedTasksCount = tasks.filter(
    (task) => task.statsTask === "complete",
  ).length;

  const implementTasksCount = tasks.filter(
    (task) => task.statsTask === "implementTasks",
  ).length;

  // --- Functions ---

  const addProject = (newProjectsData)=>{
    const newProject={
      id:Date.now(),
      ...newProjectsData
    };
    setProjects((prevProjects)=>[...prevProjects,newProject]); 
  }

 const addTask =(newTasksData, projectId)=>{
  const newTasks={
    id:Date.now(),
    projectId:projectId,
    ...newTasksData
  }
  setTasks((prevTasks)=>[...prevTasks,newTasks])
 }

 const addMember=(newMemberData)=>{
 const isExsit =team.some((member)=>member.name === newMemberData.name);
 if(isExsit){
  return;
 }
  const newMember={
    id:Date.now(),
    ...newMemberData
  }
setTeam((prevTeam)=>[...prevTeam,newMember])
}

const deletTask =(taskId)=>{
  setTasks((prevTasks)=>prevTasks.filter((task)=>task.id !== taskId));

  setCommentes((prevComments) => prevComments.filter((comment) => comment.taskId !== taskId));
}

const deletProject=(projectId)=>{
  setProjects((prevProjects)=>prevProjects.filter((project)=>project.id !== projectId) )
  setTasks((prevTasks)=>prevTasks.filter((task)=>task.projectId !== projectId))
}

const addComment=(newCommentData)=>{
  const newComment={
    id:Date.now(),
    ...newCommentData
  }
  setCommentes((prevComments)=>[...prevComments,newComment])
}

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
        tasksStatas
      }}
    >
      {children}
    </ProjectContext.Provider>
  );
};
