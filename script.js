//variaveis
// puxa da div
const caixadePecas = document.getElementById("caixadePecas");
const numerodePecas = 18;
let pecas;

// criar quebra cabeça

function organizarPecas(numero) {
  // array para procurar as pecas e guardar todas elas
  const todasPecas = [];

  // inicializar a contagem das peças
  let j = 1;
  while (j < numero + 1) {
    todasPecas[j] = 0;
    j++;
  }

  // loop para criar e adicionar as peças no array
  j = 1;
  while (j < numero + 1) {
    // chama a função criarPecas com um valor aleatório entre 1 e número
    criarPecas(Math.floor(Math.random() * numero) + 1);
    j++;
  }

  function criarPecas(p) {
    if (p > numero) criarPecas(1);
    else if (todasPecas[p] == 1) criarPecas(p + 1);
    else {
      const peca = document.createElement("div");
      peca.classList.add("grid-piece");
      peca.id = pecasId();
      const img = document.createElement("img");
      img.src = "Peca/" + p + ".jpg";
      peca.appendChild(img);
      caixadePecas.appendChild(peca);
      todasPecas[p] = 1;
    }
  }
}

function pecasId() {
  while (true) {
    const id = Math.floor(Math.random() * 9999) + 1;
    if (document.getElementById("Peca" + id) === null) {
      return "Peca" + id;
    }
  }
}

// chamando uma função para organizar as peças com base no numero de id que ficou em cada uma delas
organizarPecas(numerodePecas);
// Selecionar todos os elementos com a classe grid-piece e armazenando-os na variável pecas
pecas = document.querySelectorAll(".grid-piece");
// ___________________________
// função para tratar o evento arrastar
function arrastar(e) {
  this.style.opacity = "0.5";
  if (this.children.length == 1) {
    e.dataTransfer.clearData();
    e.dataTransfer.setData("text", this.id);
  }
}

function arrastarSobre(e) {
  e.preventDefault();
}

function soltar(e) {
  e.preventDefault();

  const data = e.dataTransfer.getData("text");

  if (data.length != 0) {
    const element = document.getElementById(data);

    if (this.children.length == 0)
      this.appendChild(element.children[0]);
    else if (this.children.length == 1) {
      this.appendChild(element.children[0]);
      element.appendChild(this.children[0]);
      element.style.opacity = "1";
    }
  }
}

function callEvents() {
  pecas.forEach(i => {
    i.addEventListener("dragstart", arrastar);
    i.addEventListener("dragend", function() {
      this.style.opacity = "1"
    });
    i.addEventListener("dragover", arrastarSobre);
    i.addEventListener("drop", soltar);
  });
}
callEvents();