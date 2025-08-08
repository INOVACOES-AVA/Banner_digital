// Utilitário para alternar visibilidade entre duas seções e animar a altura do container
function setupToggle({
  showBtnId, hideBtnId, visibleSectionId, hiddenSectionId
}){
  const btnShow = document.getElementById(showBtnId);
  const btnHide = document.getElementById(hideBtnId);
  const sectionVisible = document.getElementById(visibleSectionId);
  const sectionHidden = document.getElementById(hiddenSectionId);

  if(!btnShow || !btnHide || !sectionVisible || !sectionHidden) return;

  // Container que envolve as seções (o card)
  const container = sectionVisible.closest('.card, .card-legenda');
  if(!container) return;

  // Estado inicial
  sectionVisible.classList.add('is-visible');
  sectionHidden.classList.remove('is-visible');
  btnShow.classList.remove('is-hidden');
  btnHide.classList.add('is-hidden');

  // Garante que a altura inicial acompanhe o conteúdo visível sem travar
  // (não setamos altura fixa inicialmente; só animamos durante a troca)

  function animateHeight(fromEl, toEl){
    // altura atual
    const fromH = fromEl.offsetHeight;

    // fixa a altura atual antes da troca, para permitir transição
    container.style.height = fromH + 'px';

    // faz a troca de visibilidade
    fromEl.classList.remove('is-visible');
    toEl.classList.add('is-visible');

    // mede a altura de destino
    const toH = toEl.offsetHeight;

    // anima para a nova altura
    requestAnimationFrame(() => {
      container.style.height = toH + 'px';
    });

    // ao terminar a transição de altura, libera para 'auto'
    const onEnd = (e) => {
      if(e.propertyName === 'height'){
        container.style.height = '';
        container.removeEventListener('transitionend', onEnd);
      }
    };
    container.addEventListener('transitionend', onEnd);
  }

  btnShow.addEventListener('click', () => {
    animateHeight(sectionVisible, sectionHidden);
    btnShow.classList.add('is-hidden');
    btnHide.classList.remove('is-hidden');
  });

  btnHide.addEventListener('click', () => {
    animateHeight(sectionHidden, sectionVisible);
    btnHide.classList.add('is-hidden');
    btnShow.classList.remove('is-hidden');
  });

  // Recalcula a altura se a janela for redimensionada enquanto uma animação não estiver acontecendo
  window.addEventListener('resize', () => {
    const currentVisible = container.querySelector('.fade-section.is-visible');
    if(currentVisible && !container.style.height){
      // Se não estamos no meio da animação (sem height fixa), nada a fazer
      return;
    }
    if(currentVisible && container.style.height){
      // Se estiver animando, atualiza o alvo para a altura correta
      container.style.height = currentVisible.offsetHeight + 'px';
    }
  });
}

// Calendário: #calendario <-> #informativo_calendario
setupToggle({
  showBtnId: 'btn_saber_mais_calendario',
  hideBtnId: 'btn_fechar_calendario',
  visibleSectionId: 'calendario',
  hiddenSectionId: 'informativo_calendario'
});

// Legenda: #cores <-> #conteudo
setupToggle({
  showBtnId: 'btn_saber_mais_legenda',
  hideBtnId: 'btn_fechar_legenda',
  visibleSectionId: 'cores',
  hiddenSectionId: 'conteudo'
});
