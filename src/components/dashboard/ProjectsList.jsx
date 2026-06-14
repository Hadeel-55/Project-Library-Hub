import { useContext } from "react";
import { ProjectContext } from "../../contexts/ProjectContext";
import { Row, Col } from "react-bootstrap";
import ProjectCard from "./ProjectCard";
const ProjectsList = () => {
const { projects,tasks,team,deletProject,}=useContext(ProjectContext);


  return <Row className="mt-5">
    <h3 className="pb-3">({projects.length}) المشاريع</h3>
{projects.map((project)=>{
 const projectTeamCount =project.team ? project.team.length : 0;
 const projectTasksCount =tasks.filter(task => task.projectId === project.id).length;
return(
    <Col key={project.id} md={4} xs={12} className="pb-4 ">
        <ProjectCard
        title={project.name}
        text={project.description}
        team={projectTeamCount}
        task={projectTasksCount}
       projectColor={project.projectColor}
        members={project.team}
        onDelete={()=>deletProject(project.id)}
        />
    </Col>
)
})}

  </Row>;
};
export default ProjectsList;
