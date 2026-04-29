// Current user session
let currentUser = null;
let isEditMode = false;
let editingCardId = null;

const STORAGE_KEY = 'portfolioData';
const CREATOR_PASSWORD = 'creator123';

// Initialize app
document.addEventListener('DOMContentLoaded', () => {
  loadPortfolioData();
});

// ============================================
// LOGIN & AUTHENTICATION
// ============================================

function login(role) {
  if (role === 'creator') {
    showPasswordModal();
  } else {
    setUser('guest');
  }
}

function showPasswordModal() {
  document.getElementById('passwordModal').classList.add('active');
  document.getElementById('passwordInput').value = '';
  document.getElementById('passwordInput').focus();
}

function closePasswordModal() {
  document.getElementById('passwordModal').classList.remove('active');
  document.getElementById('passwordInput').value = '';
}

function verifyPassword() {
  const password = document.getElementById('passwordInput').value;
  if (password === CREATOR_PASSWORD) {
    closePasswordModal();
    setUser('creator');
  } else {
    alert('Incorrect password');
    document.getElementById('passwordInput').value = '';
  }
}

function setUser(role) {
  currentUser = role;
  document.getElementById('loginPage').classList.remove('active');
  document.getElementById('portfolioPage').classList.add('active');
  document.getElementById('userRole').textContent = role.charAt(0).toUpperCase() + role.slice(1);

  if (role === 'creator') {
    document.getElementById('editToggle').style.display = 'block';
    document.getElementById('addCardBtn').style.display = 'block';
  } else {
    document.getElementById('editToggle').style.display = 'none';
    document.getElementById('addCardBtn').style.display = 'none';
    isEditMode = false;
    updateUIForEditMode();
  }
}

function logout() {
  currentUser = null;
  isEditMode = false;
  document.getElementById('portfolioPage').classList.remove('active');
  document.getElementById('loginPage').classList.add('active');
  updateUIForEditMode();
}

// ============================================
// EDIT MODE TOGGLE
// ============================================

function toggleEditMode() {
  if (currentUser !== 'creator') return;
  
  isEditMode = !isEditMode;
  updateUIForEditMode();
}

function updateUIForEditMode() {
  const editToggle = document.getElementById('editToggle');
  
  if (isEditMode) {
    editToggle.textContent = 'Done Editing';
    editToggle.classList.remove('btn-edit');
    editToggle.classList.add('btn-primary');
  } else {
    editToggle.textContent = 'Edit';
    editToggle.classList.remove('btn-primary');
    editToggle.classList.add('btn-edit');
  }

  document.getElementById('heroView').style.display = isEditMode ? 'none' : 'block';
  document.getElementById('heroEdit').style.display = isEditMode ? 'block' : 'none';
  
  document.getElementById('descriptionView').style.display = isEditMode ? 'none' : 'block';
  document.getElementById('descriptionEdit').style.display = isEditMode ? 'block' : 'none';

  // Show edit buttons on cards
  document.querySelectorAll('.card-actions').forEach(actions => {
    actions.style.display = isEditMode ? 'flex' : 'none';
  });

  // Cancel any ongoing form
  cancelCardForm();
}

// ============================================
// HERO SECTION
// ============================================

function loadHeroData() {
  const data = getPortfolioData();
  const hero = data.hero;

  document.getElementById('heroName').textContent = hero.name;
  document.getElementById('heroOccupation').textContent = hero.occupation;
  document.getElementById('heroAge').textContent = hero.age;
  document.getElementById('heroHobbies').textContent = hero.hobbies;

  // Set edit form values
  document.getElementById('editName').value = hero.name;
  document.getElementById('editOccupation').value = hero.occupation;
  document.getElementById('editAge').value = hero.age;
  document.getElementById('editHobbies').value = hero.hobbies;
}

function saveHeroData() {
  const data = getPortfolioData();
  
  data.hero = {
    name: document.getElementById('editName').value,
    occupation: document.getElementById('editOccupation').value,
    age: document.getElementById('editAge').value,
    hobbies: document.getElementById('editHobbies').value,
  };

  savePortfolioData(data);
  loadHeroData();
  alert('Hero section updated!');
}

// ============================================
// DESCRIPTION SECTION
// ============================================

function loadDescription() {
  const data = getPortfolioData();
  document.getElementById('descriptionText').textContent = data.description;
  document.getElementById('descriptionInput').value = data.description;
}

function saveDescription() {
  const data = getPortfolioData();
  const newDescription = document.getElementById('descriptionInput').value;

  if (!newDescription.trim()) {
    alert('Description cannot be empty');
    return;
  }

  data.description = newDescription;
  savePortfolioData(data);
  loadDescription();
  alert('Description updated!');
}

// ============================================
// CARDS (PROJECTS, ACCOMPLISHMENTS, TRAINING)
// ============================================

function loadCards() {
  const data = getPortfolioData();
  const container = document.getElementById('cardsContainer');
  container.innerHTML = '';

  if (data.cards.length === 0) {
    container.innerHTML = '<p style="grid-column: 1/-1; text-align: center; color: #999;">No cards yet. Click "Add Card" to create one.</p>';
    return;
  }

  data.cards.forEach(card => {
    container.appendChild(createCardElement(card));
  });
}

function createCardElement(card) {
  const cardDiv = document.createElement('div');
  cardDiv.className = 'card';
  
  cardDiv.innerHTML = `
    <span class="card-category">${card.category}</span>
    <h3 class="card-title">${card.title}</h3>
    <p class="card-description">${card.description}</p>
    <div class="card-actions" style="display: ${isEditMode ? 'flex' : 'none'}">
      <button class="btn btn-edit-card" onclick="editCard('${card.id}')">Edit</button>
      <button class="btn btn-delete" onclick="deleteCard('${card.id}')">Delete</button>
    </div>
  `;

  return cardDiv;
}

function showAddCardForm() {
  editingCardId = null;
  document.getElementById('cardFormTitle').textContent = 'Add New Card';
  document.getElementById('cardCategory').value = 'Project';
  document.getElementById('cardTitle').value = '';
  document.getElementById('cardDescription').value = '';
  document.getElementById('cardFormContainer').style.display = 'block';
}

function editCard(cardId) {
  const data = getPortfolioData();
  const card = data.cards.find(c => c.id === cardId);

  if (!card) return;

  editingCardId = cardId;
  document.getElementById('cardFormTitle').textContent = 'Edit Card';
  document.getElementById('cardCategory').value = card.category;
  document.getElementById('cardTitle').value = card.title;
  document.getElementById('cardDescription').value = card.description;
  document.getElementById('cardFormContainer').style.display = 'block';

  // Scroll to form
  document.getElementById('cardFormContainer').scrollIntoView({ behavior: 'smooth' });
}

function saveCard() {
  const title = document.getElementById('cardTitle').value.trim();
  const description = document.getElementById('cardDescription').value.trim();
  const category = document.getElementById('cardCategory').value;

  if (!title || !description) {
    alert('Title and description are required');
    return;
  }

  const data = getPortfolioData();

  if (editingCardId) {
    // Edit existing card
    const card = data.cards.find(c => c.id === editingCardId);
    if (card) {
      card.title = title;
      card.description = description;
      card.category = category;
    }
  } else {
    // Add new card
    const newCard = {
      id: Date.now().toString(),
      category,
      title,
      description,
    };
    data.cards.push(newCard);
  }

  savePortfolioData(data);
  loadCards();
  cancelCardForm();
  alert(editingCardId ? 'Card updated!' : 'Card added!');
}

function deleteCard(cardId) {
  if (confirm('Are you sure you want to delete this card?')) {
    const data = getPortfolioData();
    data.cards = data.cards.filter(c => c.id !== cardId);
    savePortfolioData(data);
    loadCards();
    alert('Card deleted!');
  }
}

function cancelCardForm() {
  editingCardId = null;
  document.getElementById('cardFormContainer').style.display = 'none';
  document.getElementById('cardTitle').value = '';
  document.getElementById('cardDescription').value = '';
}

// ============================================
// LOCAL STORAGE
// ============================================

function getPortfolioData() {
  const stored = localStorage.getItem(STORAGE_KEY);
  
  if (stored) {
    return JSON.parse(stored);
  }

  // Default data
  return {
    hero: {
      name: 'John Doe',
      occupation: 'Full Stack Developer',
      age: '24',
      hobbies: 'Coding, Gaming, Reading',
    },
    description: 'Welcome to my portfolio! I\'m a passionate developer interested in creating beautiful and functional web applications.',
    cards: [
      {
        id: '1',
        category: 'Project',
        title: 'Portfolio Website',
        description: 'A personal portfolio built with vanilla JavaScript and localStorage. Features login, edit mode, and CRUD operations.',
      },
      {
        id: '2',
        category: 'Accomplishment',
        title: 'Year 1 Completion',
        description: 'Successfully completed Year 1 of Software Engineering at UNASAT with excellent grades.',
      },
      {
        id: '3',
        category: 'Training',
        title: 'Web Development Bootcamp',
        description: 'Completed a comprehensive web development training covering HTML, CSS, JavaScript, and databases.',
      },
    ],
  };
}

function savePortfolioData(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function loadPortfolioData() {
  loadHeroData();
  loadDescription();
  loadCards();
}

// Close modals with Escape key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePasswordModal();
  }
});

// Handle Enter key in password modal
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter' && document.getElementById('passwordModal').classList.contains('active')) {
    verifyPassword();
  }
});
