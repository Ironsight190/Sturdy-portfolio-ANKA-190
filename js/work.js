const workCardsData = [
  {
    image: './img/project-01.png',
    alt: 'Brand refresh preview',
    tag: 'Product Design',
    title: 'Brand refresh for YN Studio',
    description:
      'Refined the visual system, created a polished landing page, and established a strong color contrast for a premium digital experience.',
    meta: ['UI/UX', 'Figma', '2025']
  },
  {
    image: './img/project-02.png',
    alt: 'Dashboard concept',
    tag: 'Web App',
    title: 'Dashboard concept for creators',
    description:
      'Built a clean, dark-themed dashboard layout with clear hierarchy, quick actions, and responsive card modules.',
    meta: ['Design System', 'HTML/CSS', '2025']
  },
  {
    image: './img/project-03.png',
    alt: 'Case study preview',
    tag: 'Portfolio',
    title: 'Interactive project showcase',
    description:
      'Organized case studies into modular cards with strong visual balance and a flexible left-image / right-description layout.',
    meta: ['Creative Direction', 'Responsive Design', '2025']
  }
];

function createWorkCard(card) {
  const article = document.createElement('article');
  article.className = 'work-card';

  article.innerHTML = `
    <div class="work-card-image">
      <img src="${card.image}" alt="${card.alt}" />
    </div>
    <div class="work-card-content">
      <span class="work-card-tag">${card.tag}</span>
      <h3>${card.title}</h3>
      <p>${card.description}</p>
      <div class="work-card-meta">
        ${card.meta.map(item => `<span>${item}</span>`).join('')}
      </div>
    </div>
  `;

  return article;
}

function renderWorkCards(cards, containerId = 'workCards') {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = '';
  cards.forEach(card => container.appendChild(createWorkCard(card)));
}

function addWorkCard(card) {
  workCardsData.push(card);
  renderWorkCards(workCardsData);
}

window.workCardsData = workCardsData;
window.createWorkCard = createWorkCard;
window.renderWorkCards = renderWorkCards;
window.addWorkCard = addWorkCard;

window.addEventListener('DOMContentLoaded', () => {
  renderWorkCards(workCardsData);
});
