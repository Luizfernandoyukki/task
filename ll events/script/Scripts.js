document.addEventListener('DOMContentLoaded', () => {
    // Código executado após o DOM estar completamente carregado e analisado

    const images = [
        'image/1.gif',
        'image/2.gif',
        'image/3.gif',
        'image/4.gif',
        'image/5.gif'
    ];
    // Array contendo URLs para as imagens

    const imgElements = [
        document.getElementById('image1'),
        document.getElementById('image2'),
        document.getElementById('image3')
    ];
    // Seleciona os elementos de imagem com IDs específicos e os armazena em uma array

    function shuffleImages(arr) {
        // Função para embaralhar um array
        for (let i = arr.length - 1; i > 0; i--) {
            // Itera sobre o array de trás para frente
            const j = Math.floor(Math.random() * (i + 1));
            // Gera um índice aleatório entre 0 e i
            [arr[i], arr[j]] = [arr[j], arr[i]];
            // Troca os elementos nas posições i e j
        }
        return arr;
        // Retorna o array embaralhado
    }

    function updateImages() {
        // Função para atualizar as imagens exibidas
        const shuffledImages = shuffleImages([...images]);
        // Cria uma cópia do array de imagens e o embaralha
        imgElements.forEach((img, index) => {
            // Para cada elemento de imagem
            img.src = shuffledImages[index];
            // Atualiza a fonte da imagem para uma nova imagem embaralhada
        });
    }

    let currentSize = 100;
    // Inicializa o tamanho atual das imagens em 100%

    function increaseImageSize() {
        // Função para aumentar o tamanho das imagens
        currentSize += 3;
        // Aumenta o tamanho em 1%
        imgElements.forEach(img => {
            // Para cada elemento de imagem
            img.style.width = `${currentSize}%`;
            // Atualiza a largura da imagem
            img.style.height = 'auto';
            // Ajusta a altura automaticamente para manter a proporção
        });
        document.getElementById('size-indicator').textContent = `Tamanho: ${currentSize}%`;
        // Atualiza o indicador de tamanho com o valor atual
    }

    document.getElementById('change-image-btn').addEventListener('click', updateImages);
    // Adiciona um ouvinte de evento para o botão de troca de imagens que chama updateImages ao clicar

    document.getElementById('increase-size-btn').addEventListener('click', increaseImageSize);
    // Adiciona um ouvinte de evento para o botão de aumento de tamanho que chama increaseImageSize ao clicar

    const listItems = document.querySelectorAll('.list-group-item');
    // Seleciona todos os itens da lista com a classe 'list-group-item'

    listItems.forEach(item => {
        item.addEventListener('mouseover', (event) => {
            // Adiciona um ouvinte de evento para o mouse sobre cada item da lista
            if (!event.target.classList.contains('hovered')) {
                // Verifica se o item não possui a classe 'hovered'
                const newColor = getRandomColorWithAlpha();
                // Gera uma nova cor de fundo com transparência
                event.target.style.backgroundColor = newColor;
                // Define a cor de fundo do item
                event.target.style.color = '#000';
                // Define a cor do texto como branco
                event.target.classList.add('hovered');
                // Adiciona a classe 'hovered' para rastrear o estado
            }
        });

        item.addEventListener('mouseout', (event) => {
            // Adiciona um ouvinte de evento para o mouse fora de cada item da lista
            if (event.target.classList.contains('hovered')) {
                // Verifica se o item possui a classe 'hovered'
                event.target.classList.remove('hovered');
                // Remove a classe 'hovered' quando o mouse sai do item
            }
        });
    });

    function getRandomColorWithAlpha() {
        // Função para gerar uma cor hexadecimal aleatória com transparência
        const letters = '0123456789ABCDEF';
        // Conjunto de caracteres hexadecimais
        let color = '#';
        // Inicializa a cor como um código hexadecimal
        for (let i = 0; i < 6; i++) {
            // Gera 6 dígitos hexadecimais
            color += letters[Math.floor(Math.random() * 16)];
            // Adiciona um dígito hexadecimal aleatório
        }
        const alpha = (Math.random() * 0.5 + 0.4).toFixed(2);
        // Gera um valor de transparência entre 0.3 e 0.7
        return `${color}${(alpha * 100).toString(16).padStart(2, '0')}`;
        // Retorna a cor com a transparência como um código hexadecimal
    }
});
