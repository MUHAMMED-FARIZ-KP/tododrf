import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProjectList = ({ setTodos }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

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
      setTodos(response.data, projectId, projectName);  // Pass the project ID here
    } catch (error) {
      console.error("Error fetching todos:", error);
    }
  };
  
  

  if (loading) return <p>Loading projects...</p>;

  return (
    <div className="project-list">
      <h2>Projects List</h2>
      {projects.map((project) => (
        <div
          className="project-list-item"
          key={project.id}
          onClick={() => handleProjectClick(project.id, project.name)} // Pass project name
        >
          <p className="project-name">{project.name}</p>
        </div>
      ))}
    </div>
  );
};

export default ProjectList;
