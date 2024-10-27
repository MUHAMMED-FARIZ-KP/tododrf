import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList = ({ setTodos }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newProjectName, setNewProjectName] = useState("");

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/projects/');
        setProjects(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching projects:", error);
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleProjectClick = async (projectId, projectName) => {
    try {
      const response = await axios.get(`http://127.0.0.1:8000/projects/${projectId}/todos/`);
      setTodos(response.data, projectId, projectName);
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };

  // Function to handle creating a new project
  const createProject = async () => {
    if (newProjectName.trim() === "") return;
    
    try {
      const response = await axios.post("http://127.0.0.1:8000/projects/", { name: newProjectName });
      setProjects([...projects, response.data]);  // Update project list with the new project
      setNewProjectName("");  // Clear the input field after adding
    } catch (error) {
      console.error("Error creating project:", error);
    }
  };

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="project-list">

      <h2>Projects List</h2>
      {/* New project form */}
      <div className="new-project-form">
        <form action="">
        <input
          type="text"
          placeholder="New Project Name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          required
        />
         <button onClick={createProject}>Add Project</button>
          </form>
        {/* <input
          type="text"
          placeholder="New Project Name"
          value={newProjectName}
          onChange={(e) => setNewProjectName(e.target.value)}
          required
        />
        <button onClick={createProject}>Add Project</button> */}
      </div>
      {projects.map((project) => (
        <div
          className="project-list-item"
          key={project.id}
          onClick={() => handleProjectClick(project.id, project.name)}
        >
          <p className="project-name">{project.name}</p>
        </div>
      ))}

      
    </div>
  );
};

export default ProjectList;
