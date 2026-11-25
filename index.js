const labsContainer = document.querySelector('.labs');

function createTechTag(tech) {
   return `<li class="tech-tag tech-tag--${tech.toLowerCase()}">${tech}</li>`;
}

function createLabCard(lab) {
   return `
      <section class="lab-card">
         <p class="lab-card__number">Лабораторна №${lab.number}</p>
         <h2 class="lab-card__title">${lab.title}</h2>
         <ul class="tech-list">${lab.technologies.map(createTechTag).join('')}</ul>
         <p class="lab-card__description">${lab.description}</p>
         <a class="lab-card__link" href="${lab.path}" target="_blank">Відкрити</a>
      </section>
   `;
}

async function renderLabs() {
	const response = await fetch('./assets/labs-data.json');
	const data = await response.json();

   labsContainer.innerHTML = data
      .map(lab => createLabCard(lab))
      .join('');
}

renderLabs();
