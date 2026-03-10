/**
 * Configura a data limite do nascimento
 * @author Ricardo Leme <ricardo.leme@gmail.com>
 * @since 2026-02-24
 * @version 1.0.0
 * @description Esta função busca o campo data pelo id e aplica o atributo max com o dia atual.
 */
function configuraDataLimite(){
    const limite = new Date().toISOString().split('T')[0]
    const inputNasc = document.getElementById('nascimento')
    if(inputNasc){
        inputNasc.setAttribute('max', limite)
    }
}



//Inicialização
document.addEventListener('DOMContentLoaded', configuraDataLimite)

/**
 * Calcula o IMC
 * @author Ricador Leme
 * @since 2026-02-24
 * @version 1.0.0
 * @description Estafunção calcula o Imc com base no peso e altura fornecidos pelo usuário
 * @param {number} peso - O peso da pessoa em KG
 * @param {number} altura - A altura da pessoa em metros
 * @returns {number} O valor do IMC calculado
 */

function calcularImc(peso, altura) {
    const imc = peso / (altura ** 2)
    return imc
}
// console.log(calcularImc(60, 1.66))

/**
 * Obter a classificação do IMC
 * @author Marcos Almeida
 * @since 2026-02-24
 * @version 1.0.0
 * @description Estafunção calcula o Imc com base no peso e altura fornecidos pelo usuário
 * @param {number} imc - O valor do IMC
 * @returns {string}  classicação do IMC. Ex: Peso Normal, Sobrepeso, etc.
 */

function obterClassificacaoIMC(imc){
    let resultado = ""
    if (imc < 18.5) {
        resultado = "Abaixo do Peso"
    } else if (imc < 25) {
        resultado = "Peso Normal"
    } else if (imc < 30) {
        resultado = "Sobrepeso"
    } else {
        resultado = "Obesidade"
    }
    return resultado
}
// console.log(calcularClassificacaoIMC(18.5))

function processaCalculo(event){
    if (event) event.preventDefault()

    const nome = document.getElementById('nome').value
    const nascimento = document.getElementById('nascimento').value
    const peso = document.getElementById('peso').value
    const altura = document.getElementById('altura').value
    const divresultado = document.getElementById('resultado')

    if (!nome || !nascimento || isNaN(peso) || isNaN(altura)){
        alert('Por favor, preencha todos os campos corretamente')
        return
    }
    const imc = calcularImc(peso, altura)
    const classificacao = obterClassificacaoIMC(imc)
    const idade = calcularIdade(nascimento)

    divresultado.style.display = 'block'
    divresultado.innerHTML = `resultado para <strong>${nome}: </strong> <br>
     IMC: <strong>${imc.toFixed(2)}</strong><br>
     Idade: <strong>${idade}</strong><br>
     Status: <strong>${classificacao}</strong>
    `  
}

function calcularIdade(nascimento) {
    const dataNasc = new Date(nascimento)
    const hoje = new Date
    let idade = hoje.getFullYear() - dataNasc.getFullYear()
    let mes = hoje.getMonth() - dataNasc.getMonth()
    if(mes < 0 || (mes === 0 && hoje.getDate() < dataNasc.getDate())){
        idade--
    }
    return idade
}

document.addEventListener('reset', () => {//arrow function
    const divresultado = document.getElementById('resultado')
    divresultado.innerHTML = ''
    divresultado.style.display = 'none'
})
