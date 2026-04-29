import * as Project from '../models/projectModel.js';

// Get all projects
export const getProjects = async (req, res) => {
  try {
    const projects = await Project.getAll();
    res.json({
      success: true,
      data: projects,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch projects',
    });
  }
};

// Get single project
export const getProject = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await Project.getById(id);
    
    if (!project) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }
    
    res.json({
      success: true,
      data: project,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch project',
    });
  }
};

// Create project
export const createProject = async (req, res) => {
  try {
    const { title, description, github_link, live_link } = req.body;
    
    if (!title || !description) {
      return res.status(400).json({
        success: false,
        error: 'Title and description are required',
      });
    }
    
    const projectId = await Project.create({
      title,
      description,
      github_link,
      live_link,
    });
    
    res.status(201).json({
      success: true,
      data: { id: projectId },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create project',
    });
  }
};

// Update project
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, github_link, live_link } = req.body;
    
    const affectedRows = await Project.update(id, {
      title,
      description,
      github_link,
      live_link,
    });
    
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Project updated successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to update project',
    });
  }
};

// Delete project
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;
    
    const affectedRows = await Project.deleteProject(id);
    
    if (affectedRows === 0) {
      return res.status(404).json({
        success: false,
        error: 'Project not found',
      });
    }
    
    res.json({
      success: true,
      message: 'Project deleted successfully',
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete project',
    });
  }
};
