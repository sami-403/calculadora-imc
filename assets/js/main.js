const form = document.querySelector("#form-imc");
const areaResultado = document.querySelector("#resu-area");

// funcao que redenriza o resultado na tela
function renderResult({ mensagem, imc }) {
  const elementoP = document.createElement("p");
  const classe = imc !== undefined ? "result-valido" : "result-invalido";
  const texto =
    imc !== undefined ? `Seu IMC é ${imc.toFixed(2)} (${mensagem})` : mensagem;

  elementoP.classList.add(classe);
  elementoP.textContent = texto;

  areaResultado.appendChild(elementoP);
}

// funcao que limpa o resultado na tela
function clearResult() {
  areaResultado.innerHTML = "";
}

// funcao que calcula o imc feita separadamente para melhor organizaçao do codigo
function imc(peso, altura) {
  const calc = peso / altura ** 2;

  let mensagem =
    calc < 18.5
      ? "Abaixo do peso"
      : calc <= 24.9
      ? "Peso normal"
      : calc <= 29.9
      ? "Sobrepeso"
      : calc <= 34.9
      ? "Obesidade de grau 1"
      : calc <= 39.9
      ? "Obesidade de grau 2"
      : "Obesidade de grau 3";

  renderResult({ mensagem, imc: calc });
}

// pega os valores dos inputs e faz as validacoes
form.addEventListener("submit", (e) => {
  e.preventDefault();
  clearResult();

  let getPeso = Number(e.target.querySelector("#peso").value.trim());
  let getAltura = Number(e.target.querySelector("#altura").value.trim());

  const pesoInvalido = isNaN(getPeso) || getPeso <= 0 || getPeso > 300;
  const alturaInvalida = isNaN(getAltura) || getAltura <= 0 || getAltura > 3;
  if (pesoInvalido && alturaInvalida) {
    return renderResult({ mensagem: "Entradas inválidas!" });
  }

  if (pesoInvalido) {
    return renderResult({ mensagem: "Peso inválido!" });
  }

  if (alturaInvalida) {
    return renderResult({ mensagem: "Altura inválida!" });
  }

  imc(getPeso, getAltura);

  form.reset();
});
