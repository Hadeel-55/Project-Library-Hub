import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
const ProjectsList = () => {
const { projects,tasks,team,deletProject,addMember,comments}=useContext(ProjectContext);


  return <Row className="mt-5">
    <h3 className="pb-3">({projects.length}) المشاريع</h3>
{projects.map((project)=>{

 const projectTasks =tasks.filter(task => task.projectId === project.id);
 const projectTasksCount  =projectTasks.length;

 const initialMembersUd=project.team || [];

 const toatalUniqueMembers =[
  ...new Set([
    ...initialMembersUd,
    ...projectTasks.flatMap(task=>task.members || [])
  ])
 ]

  const projectTeamCount =toatalUniqueMembers .length;

  

return(
    <Col key={project.id} md={4} xs={12} className="pb-4 ">
        <ProjectCard
        id={project.id}
        title={project.name}
        text={project.description}
        team={projectTeamCount}
        task={projectTasksCount}
       projectColor={project.projectColor}
        members={toatalUniqueMembers}
        onDelete={()=>deletProject(project.id)}
        />
    </Col>
)
})}

  </Row>;
};
export default ProjectsList;
