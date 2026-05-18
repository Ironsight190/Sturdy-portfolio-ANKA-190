const workCardsData = [
  {
    image: './img/project-soilsentry.png',
    alt: 'SoilSentry project preview',
    tag: 'Hackathon Project',
    title: 'SoilSentry',
    description:
      'Developed a concept for a smart soil analysis device capable of measuring soil contents and mapping results to a general location for monitoring and research purposes. Although the project never reached a functional prototype, it established the foundation for future development.',
    meta: ['Hackomation 2024', 'IoT', 'Hardware Systems']
  },

  {
    image: './img/project-shellguard.png',
    alt: 'ShellGuard monitoring system',
    tag: 'Environmental Technology',
    title: 'ShellGuard',
    description:
      'Designed an independent off-grid monitoring system focused on detecting intruders and anomalies around sea turtle habitats and protected beaches using smart camera technology and environmental monitoring concepts.',
    meta: ['Hackomation 2025', 'Embedded Systems', 'Wildlife Tech']
  },

  {
    image: './img/project-groundguard.png',
    alt: 'GroundGuard prototype preview',
    tag: 'Prototype Development',
    title: 'GroundGuard',
    description:
      'A continuation and improvement of the SoilSentry concept, developed into a working prototype and presented during the Advanced Prototyping Fair at UNASAT on March 24th, 2025. Focused on practical soil monitoring and hardware integration.',
    meta: ['UNASAT 2026', 'Prototyping', 'Electronics']
  },

  {
    image: './img/project-telesur-01.png',
    alt: 'Telesur internship maintenance work',
    tag: 'Internship',
    title: 'Telecommunications Maintenance Internship',
    description:
      'Assisted with preventative and corrective maintenance of telecommunications equipment during internship activities at Telesur, gaining hands-on experience with infrastructure and technical systems.',
    meta: ['Telesur', 'Telecommunications', '2024']
  },

  {
    image: './img/big-profile.jpeg',
    alt: 'Remote monitoring research project',
    tag: 'Graduation Research',
    title: 'Remote DTV Monitoring Research',
    description:
      'Conducted research on the status and possibilities of centrally monitoring DTV transmitters at the Telesur NOC using SNMP technologies and remote monitoring concepts.',
    meta: ['SNMP', 'Network Monitoring', '2025']
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

window.addEventListener('DOMContentLoaded', () => {
  renderWorkCards(workCardsData);
});
