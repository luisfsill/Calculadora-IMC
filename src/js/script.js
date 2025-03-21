// Função para abrir o modal com a mensagem
function abrirModal(mensagem) {
    document.getElementById("modal-message").innerHTML = mensagem;
    document.getElementById("modal-overlay").style.display = "block";
    document.getElementById("modal").style.display = "block";
    
    // Adicionar classes active para animar a entrada
    setTimeout(() => {
        document.getElementById("modal-overlay").classList.add("active");
        document.getElementById("modal").classList.add("active");
    }, 10);
    
    document.body.style.overflow = "hidden"; // Impede rolagem da página
}

// Função para fechar o modal
function fecharModal() {
    const modal = document.getElementById("modal");
    const overlay = document.getElementById("modal-overlay");
    
    // Remover classes active para animar a saída
    modal.classList.remove("active");
    overlay.classList.remove("active");
    
    // Aguardar a animação terminar antes de esconder os elementos
    setTimeout(() => {
        modal.style.display = "none";
        overlay.style.display = "none";
        document.body.style.overflow = "auto"; // Permite rolagem da página
    }, 300);
}

// Função para mostrar a categoria visual do IMC
function getCategoriaIcon(categoria) {
    let icon = '';
    
    switch(categoria) {
        case 'underweight':
            icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm-3.5-6.5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm7 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm-3.5 3a4 4 0 0 1-3.6-2.2h7.2a4 4 0 0 1-3.6 2.2z"/></svg>';
            break;
        case 'normal':
            icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm-3.5-6.5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm7 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm-3.5 3a4 4 0 0 1-3.6-2.2h7.2a4 4 0 0 1-3.6 2.2z"/></svg>';
            break;
        case 'overweight':
            icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm-3.5-6.5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm7 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm-3.5 5a5 5 0 0 1-4.5-3h9a5 5 0 0 1-4.5 3z"/></svg>';
            break;
        case 'obesity':
            icon = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M12 3a9 9 0 1 0 9 9 9 9 0 0 0-9-9zm0 16a7 7 0 1 1 7-7 7 7 0 0 1-7 7zm-3.5-6.5a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm7 0a1.5 1.5 0 1 1 1.5-1.5 1.5 1.5 0 0 1-1.5 1.5zm-3.5 5a5 5 0 0 1-4.5-3h9a5 5 0 0 1-4.5 3z"/></svg>';
            break;
    }
    
    return icon;
}

// Efeito de digitação para inputs
function aplicarEfeitoDigitacao() {
    const inputs = document.querySelectorAll('input');
    
    inputs.forEach(input => {
        input.addEventListener('focus', () => {
            input.parentElement.classList.add('active');
        });
        
        input.addEventListener('blur', () => {
            if (input.value.length === 0) {
                input.parentElement.classList.remove('active');
            }
        });
    });
}

// Validação de campos com feedback visual
function validarCampo(input, regex, mensagemErro) {
    const valor = input.value;
    const errorElement = input.nextElementSibling.nextElementSibling;
    
    if (valor.length === 0) {
        errorElement.textContent = "Este campo é obrigatório";
        input.classList.add("error");
        return false;
    } else if (!regex.test(valor)) {
        errorElement.textContent = mensagemErro;
        input.classList.add("error");
        return false;
    } else {
        errorElement.textContent = "";
        input.classList.remove("error");
        return true;
    }
}

// Formatação dos campos
function formatarCampos() {
    const pesoInput = document.getElementById('peso');
    const alturaInput = document.getElementById('altura');
    
    // Formatar peso
    pesoInput.addEventListener('input', function() {
        let valor = this.value.replace(/[^\d.,]/g, '');
        valor = valor.replace(/,/g, '.');
        
        // Garantir que só tenha um ponto decimal
        const partes = valor.split('.');
        if (partes.length > 2) {
            valor = partes[0] + '.' + partes.slice(1).join('');
        }
        
        // Limitar a 1 casa decimal
        if (partes.length === 2 && partes[1].length > 1) {
            valor = partes[0] + '.' + partes[1].substring(0, 1);
        }
        
        this.value = valor;
    });
    
    // Formatar altura
    alturaInput.addEventListener('input', function() {
        let valor = this.value.replace(/[^\d.,]/g, '');
        valor = valor.replace(/,/g, '.');
        
        // Garantir que só tenha um ponto decimal
        const partes = valor.split('.');
        if (partes.length > 2) {
            valor = partes[0] + '.' + partes.slice(1).join('');
        }
        
        // Limitar a 2 casas decimais
        if (partes.length === 2 && partes[1].length > 2) {
            valor = partes[0] + '.' + partes[1].substring(0, 2);
        }
        
        this.value = valor;
    });
}

// Função principal para calcular o IMC
function calcularIMC() {
    const peso = parseFloat(document.getElementById("peso").value.replace(',', '.'));
    const altura = parseFloat(document.getElementById("altura").value.replace(',', '.'));
    
    // Validação dos dados
    if (isNaN(peso) || isNaN(altura) || peso <= 0 || altura <= 0) {
        abrirModal(`
            <div class="result-icon" style="background: linear-gradient(to bottom right, #3f51b5, #5c6bc0);">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path d="M13 13h-2V7h2v6zm0 4h-2v-2h2v2zm-1-15C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                </svg>
            </div>
            <p>Por favor, insira valores válidos para peso e altura.</p>
        `);
        return;
    }
    
    // Animação de cálculo
    const botaoCalcular = document.querySelector('.btn-calcular');
    botaoCalcular.innerHTML = 'Calculando...';
    botaoCalcular.disabled = true;
    
    // Simulando um processo de cálculo (apenas para efeito visual)
    setTimeout(() => {
        // Calculando o IMC com uma casa decimal
        const imc = (peso / (altura ** 2)).toFixed(1); 
        
        // Determinando a classificação do IMC
        let classificacao = '';
        let categoria = '';
        let descricao = '';
        let corGradiente = '';

        if (imc < 18.5) {
            classificacao = 'abaixo do peso';
            categoria = 'underweight';
            descricao = 'Você está abaixo do peso recomendado. Isso pode indicar subnutrição ou outro problema de saúde.';
            corGradiente = 'linear-gradient(to bottom right, #5c6bc0, #3949ab)';
        } else if (imc >= 18.5 && imc < 25) {
            classificacao = 'com peso normal';
            categoria = 'normal';
            descricao = 'Parabéns! Seu peso está dentro da faixa considerada saudável.';
            corGradiente = 'linear-gradient(to bottom right, #3f51b5, #1a237e)';
        } else if (imc >= 25 && imc < 30) {
            classificacao = 'com sobrepeso';
            categoria = 'overweight';
            descricao = 'Você está com sobrepeso. Um pequeno ajuste na dieta e exercícios pode ajudar.';
            corGradiente = 'linear-gradient(to bottom right, #7986cb, #3f51b5)';
        } else if (imc >= 30 && imc < 35) {
            classificacao = 'com obesidade grau I';
            categoria = 'obesity';
            descricao = 'Você está com obesidade grau I. Considere consultar um profissional de saúde.';
            corGradiente = 'linear-gradient(to bottom right, #9575cd, #673ab7)';
        } else if (imc >= 35 && imc < 40) {
            classificacao = 'com obesidade grau II';
            categoria = 'obesity';
            descricao = 'Você está com obesidade grau II. É importante buscar orientação médica.';
            corGradiente = 'linear-gradient(to bottom right, #7e57c2, #4527a0)';
        } else {
            classificacao = 'com obesidade mórbida';
            categoria = 'obesity';
            descricao = 'Você está com obesidade mórbida. Procure ajuda médica o quanto antes.';
            corGradiente = 'linear-gradient(to bottom right, #9c27b0, #6a1b9a)';
        }

        // Exibindo o resultado no modal com formatação e tabela de referência
        const mensagem = `
            <div class="result-icon" style="background: ${corGradiente}">
                ${getCategoriaIcon(categoria)}
            </div>
            <p>Seu IMC é <strong>${imc}</strong></p>
            <p>Você está <strong>${classificacao}</strong></p>
            <div class="divider"></div>
            <p>${descricao}</p>
        `;
        
        abrirModal(mensagem);
        
        // Restaurar o botão
        botaoCalcular.innerHTML = 'Calcular IMC';
        botaoCalcular.disabled = false;
    }, 800);
}

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    // Adicionar evento para fechar o modal ao clicar no overlay
    document.getElementById('modal-overlay').addEventListener('click', function(e) {
        if (e.target === this) {
            fecharModal();
        }
    });
    
    // Permitir que o usuário pressione Enter para calcular
    document.getElementById('altura').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calcularIMC();
        }
    });
    
    // Inicializar efeitos visuais
    formatarCampos();
    aplicarEfeitoDigitacao();
    
    // Adicionar destaques para inputs
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        const highlight = document.createElement('div');
        highlight.className = 'input-highlight';
        input.parentNode.appendChild(highlight);
        
        const errorSpan = document.createElement('span');
        errorSpan.className = 'error-message';
        input.parentNode.appendChild(errorSpan);
    });
    
    // Adicionar animação ao carregar a página
    document.body.classList.add('loaded');
});