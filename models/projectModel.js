import pool from '../config/db.js';

// Get all projects
export const getAll = async () => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects');
    return rows;
  } catch (error) {
    console.error('Error fetching projects:', error);
    throw error;
  }
};

// Get project by ID
export const getById = async (id) => {
  try {
    const [rows] = await pool.query('SELECT * FROM projects WHERE id = ?', [id]);
    return rows[0] || null;
  } catch (error) {
    console.error('Error fetching project:', error);
    throw error;
  }
};

// Create new project
export const create = async (projectData) => {
  const { title, description, github_link, live_link } = projectData;
  try {
    const [result] = await pool.query(
      'INSERT INTO projects (title, description, github_link, live_link) VALUES (?, ?, ?, ?)',
      [title, description, github_link, live_link]
    );
    return result.insertId;
  } catch (error) {
    console.error('Error creating project:', error);
    throw error;
  }
};

// Update project
export const update = async (id, projectData) => {
  const { title, description, github_link, live_link } = projectData;
  try {
    const [result] = await pool.query(
      'UPDATE projects SET title = ?, description = ?, github_link = ?, live_link = ? WHERE id = ?',
      [title, description, github_link, live_link, id]
    );
    return result.affectedRows;
  } catch (error) {
    console.error('Error updating project:', error);
    throw error;
  }
};

// Delete project
export const deleteProject = async (id) => {
  try {
    const [result] = await pool.query('DELETE FROM projects WHERE id = ?', [id]);
    return result.affectedRows;
  } catch (error) {
    console.error('Error deleting project:', error);
    throw error;
  }
};
