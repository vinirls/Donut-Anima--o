(function () {
    var preTag = document.getElementById('donut');

    // Ângulos, raios e contantes
    var A = 1;
    var B = 1;
    var R1 = 1;
    var R2 = 2;
    var K1 = 150;
    var K2 = 5;

    // Função para renderizar quadro ASCII
    function renderAsciiFrame() {
        var b = []; // Array to stay acii chars
        var z = []; // Array to store depth values

        var width = 280; // Width of frame
        var height = 160; // Height of frame

        A += 0.07; // Increament angle a
        B += 0.03; // Increament angle b
        // Seno e cosseno dos ângulos
        var cA = Math.cos(A),
            sA = Math.sin(A),
            cB = Math.cos(B),
            sB = Math.sin(B);

        // Inicializar matrizes com ângulos padrão
        for (var k = 0; k < width * height; k++) {
            // Definir caractere ascii padrão
            b[k] = k % width == width - 1 ? '\n' : ' ';
            // Definir profundidade padrão
            z[k] = 0;
        }

        // Gerar o quadro ascii
        for (var j = 0; j < 6.28; j += 0.07) {
            var ct = Math.cos(j); // Cosine of j
            var st = Math.sin(j); // Sin of j

            for (var i = 0; i < 6.28; i += 0.02) {
                var sp = Math.sin(i); // Sin of i
                cp = Math.cos(i), // Cosine of i
                    h = ct + 2, // Cálculo de altura
                    // Cálculo da distância
                    D = 1 / (sp * h * sA + st * cA + 5),
                    // Variável temporária
                    t = sp * h * cA - st * sA;

                // Calcular coordenadas de caracteres ascii
                var x = Math.floor(width / 2 + (width / 4) * D * (cp * h * cB - t * sB));
                var y = Math.floor(height / 2 + (height / 4) * D * (cp * h * sB + t * cB));

                // Calcular o índice na matriz
                var o = x + width * y;
                // Calcular o índice de caracteres ascii
                var N = Math.floor(8 * ((st * sA - sp * ct * cA) * cB - sp * ct * sA - st * cA - cp * ct * sB));

                // Atualize o caractere ASCII e a profundidade se as condições forem atendidas
                if (y < height && y >= 0 && x >= 0 && x < width && D > z[o]) {
                    z[o] = D;
                    // Atualize o caractere ascii com base no index
                    b[o] = '.,-~:;=!*#$@'[N > 0 ? N : 0];
                }

            }

        }

        // Atualize o elemento html com o quadro ascii
        preTag.innerHTML = b.join('');

    }

    // Função para iniciar a animação
    function startAsciiAnimation() {
        // Comece chamando renderAsciiAnimation a cada 50ms
        window.asciiIntervalId = setInterval(renderAsciiFrame, 50);
    }

    renderAsciiFrame(); // Renderizar o quadro ASCII inicial
    // Adicionar ouvinte de evento para iniciar a animação quando a página for carregada
    if (document.all) {
        // Para versões mais antigas do Internet Explorer
        window.attachEvent('onload', startAsciiAnimation);
    } else {
        // Para navegadores modernos
        window.addEventListener('load', startAsciiAnimation, false);
    }

    // Adicionar ouvinte de eventos para atualizar o quadro ascii quando a janela for redimensionada
    window.addEventListener('resize', renderAsciiFrame);
})();