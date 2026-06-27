// ==========================================
// FORÇA O SITE A COMEÇAR SEMPRE NO TOPO
// ==========================================
if ('scrollRestoration' in history) {
    history.scrollRestoration = 'manual';
}
window.scrollTo(0, 0);



document.addEventListener('DOMContentLoaded', () => {
    const btnIniciar = document.getElementById('btn-iniciar');
    const telaEntrada = document.getElementById('tela-entrada');
    const musica = document.getElementById('musica-romantica');
    
    // Procura por todos os "banners" que contêm o texto e a foto
    const cardsMensagem = document.querySelectorAll('.mensagem-card');

    // 1. Início do Site e Música
    btnIniciar.addEventListener('click', () => {
        telaEntrada.style.opacity = '0';
        setTimeout(() => {
            telaEntrada.style.visibility = 'hidden';
        }, 1200);

        musica.play().catch(error => {
            console.log("Autoplay bloqueado:", error);
        });
    });

    // 2. Revelação Suave das Mensagens e Fotos ao rolar a página
    const opcoesObserver = {
        root: null, 
        threshold: 0.25, // Ativa quando 25% do banner aparece na tela
        rootMargin: "0px 0px -5% 0px" 
    };

    const observadorDeScroll = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('aparecer');
            }
        });
    }, opcoesObserver);

    // Monitora cada banner individualmente
    cardsMensagem.forEach(card => {
        observadorDeScroll.observe(card);
    });
});

// Efeito da linha de caligrafia sendo desenhada ao rolar a página
window.addEventListener('scroll', () => {
    // Calcula o tamanho total da página menos a parte que já está visível
    const alturaTotal = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    
    // Pega a posição atual da rolagem
    const scrollAtual = document.documentElement.scrollTop;
    
    // Faz a regra de três para descobrir a porcentagem da página rolada
    const porcentagem = (scrollAtual / alturaTotal) * 100;
    
    // Aplica essa porcentagem na altura da nossa linha de caligrafia
    document.getElementById('linha-desenho').style.height = porcentagem + '%';
});

// ==========================================
// ANIMAÇÃO DO QUADRO FINAL (GRAN FINALE)
// ==========================================
const observerQuadroFinal = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        // Quando o quadro final entrar na tela, adiciona a classe 'aparecer'
        if (entry.isIntersecting) {
            entry.target.classList.add('aparecer');
        }
    });
});

// Pede para o JS ficar "olhando" a caixa do quadro final
const quadroFinal = document.querySelector('.quadro-final');
if (quadroFinal) {
    observerQuadroFinal.observe(quadroFinal);
}

// Exemplo de como deve ficar o seu evento de clique no botão
const botaoAbrir = document.querySelector('.botao-abrir'); // Ajuste o nome da classe do seu botão

// Garante que o scroll comece travado quando a página abre
document.body.classList.add('scroll-bloqueado');

// Lógica de clique do botão
botaoAbrir.addEventListener('click', () => {
    // 1. Remove a trava de scroll para permitir a leitura
    document.body.classList.remove('scroll-bloqueado');
    
    // 2. Garante que a página comece exatamente no topo
    window.scrollTo({
        top: 0,
        behavior: 'instant' 
    });

    // 3. Opcional: Se você estiver usando a biblioteca 'AOS' ou 'ScrollReveal'
    // que parece ser o caso pelo seu código, tente disparar um refresh:
    // AOS.refresh(); 
});