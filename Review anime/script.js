const animesPrincipais = [
  { id: 'naruto', nome: 'Naruto', imagem: 'https://upload.wikimedia.org/wikipedia/en/9/94/NarutoCoverTankobon1.jpg' },
  { id: 'mha', nome: 'My Hero Academia', imagem: 'https://upload.wikimedia.org/wikipedia/en/f/f9/My_Hero_Academia_Volume_1.png' },
  { id: 'demon', nome: 'Demon Slayer', imagem: 'https://upload.wikimedia.org/wikipedia/en/2/20/Kimetsu_no_Yaiba_volume_1_cover.jpg' }
];

const outrosAnimes = [
  { id: 'onepiece', nome: 'One Piece', imagem: 'https://upload.wikimedia.org/wikipedia/en/2/29/OnePieceVol1Cover.jpg' },
  { id: 'aot', nome: 'Attack on Titan', imagem: 'https://upload.wikimedia.org/wikipedia/en/7/70/Attack_on_Titan_volume_1_cover.jpg' },
  { id: 'deathnote', nome: 'Death Note', imagem: 'https://upload.wikimedia.org/wikipedia/en/6/6f/Death_Note_Vol_1.jpg' }
];

const principaisSection = document.getElementById("principais");
const outrosSection = document.getElementById("outros");
const comentarioBox = document.getElementById("comentario-box");
const comentarioInput = document.getElementById("comentario");
const animeNomeSpan = document.getElementById("anime-nome");
let animeSelecionadoId = null;

function criarCard(anime) {
  const card = document.createElement('div');
  card.className = 'anime-card';

  card.innerHTML = `
    <img src="${anime.imagem}" alt="${anime.nome}" />
    <h3>${anime.nome}</h3>
    <div class="stars" data-id="${anime.id}">
      ${'<span class="star">★</span>'.repeat(5)}
    </div>
    <button onclick="comentar('${anime.id}', '${anime.nome}')">Comentar</button>
  `;

  return card;
}

function carregar() {
  animesPrincipais.forEach(anime => {
    principaisSection.appendChild(criarCard(anime));
  });
  outrosAnimes.forEach(anime => {
    outrosSection.appendChild(criarCard(anime));
  });

  document.querySelectorAll('.stars').forEach(starContainer => {
    const animeId = starContainer.dataset.id;
    const stars = starContainer.querySelectorAll('.star');

    // Restaurar nota salva (se existir)
    const notaSalva = localStorage.getItem('nota_' + animeId);
    if (notaSalva) {
      stars.forEach((s, i) => {
        s.classList.toggle('selected', i < notaSalva);
      });
    }

    // Evento de clique
    stars.forEach((star, index) => {
      star.addEventListener('click', () => {
        stars.forEach((s, i) => {
          s.classList.toggle('selected', i <= index);
        });
        const nota = index + 1;
        localStorage.setItem('nota_' + animeId, nota);
        console.log(`Nota para ${animeId}: ${nota} estrelas`);
      });
    });
  });
}

function comentar(id, nome) {
  animeSelecionadoId = id;
  animeNomeSpan.textContent = nome;
  comentarioBox.style.display = 'block';
  comentarioInput.value = localStorage.getItem(`comentario_${id}`) || '';
}

function salvarComentario() {
  if (animeSelecionadoId) {
    localStorage.setItem(`comentario_${animeSelecionadoId}`, comentarioInput.value);
    alert("Comentário salvo com sucesso!");
    fecharComentario();
  }
}

function fecharComentario() {
  comentarioBox.style.display = 'none';
  animeSelecionadoId = null;
  comentarioInput.value = '';
}

function mostrarSecao(secao) {
  principaisSection.style.display = secao === 'principais' ? 'flex' : 'none';
  outrosSection.style.display = secao === 'outros' ? 'flex' : 'none';
}

window.onload = carregar;
