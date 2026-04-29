// API Base URL
const API_BASE = '/api';

// Load projects on page load
document.addEventListener('DOMContentLoaded', () => {
  loadProjects();
  setupContactForm();
});

// Fetch and display all projects
async function loadProjects() {
  try {
    const response = await fetch(`${API_BASE}/projects`);
    const result = await response.json();

    if (result.success) {
      displayProjects(result.data);
    } else {
      displayError('Failed to load projects');
    }
  } catch (error) {
    console.error('Error loading projects:', error);
    displayError('Error loading projects');
  }
}

// Display projects on page
function displayProjects(projects) {
  const container = document.getElementById('projects-container');
  
  if (projects.length === 0) {
    container.innerHTML = '<p>No projects yet. Check back soon!</p>';
    return;
  }

  container.innerHTML = projects
    .map(
      (project) => `
    <div class="project-card">
      <h3>${project.title}</h3>
      <p>${project.description}</p>
      <div class="project-links">
        ${project.github_link ? `<a href="${project.github_link}" target="_blank">GitHub</a>` : ''}
        ${project.live_link ? `<a href="${project.live_link}" target="_blank">Live Demo</a>` : ''}
      </div>
    </div>
  `
    )
    .join('');
}

// Setup contact form submission
function setupContactForm() {
  const form = document.getElementById('contact-form');
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    try {
      // TODO: Create /api/messages endpoint to handle contact form
      const response = await fetch(`${API_BASE}/messages`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (result.success) {
        alert('Message sent successfully!');
        form.reset();
      } else {
        alert('Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      alert('Error sending message');
    }
  });
}

// Helper function to display errors
function displayError(message) {
  const container = document.getElementById('projects-container');
  container.innerHTML = `<p style="color: red;">${message}</p>`;
}
