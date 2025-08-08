// Utilitário para alternar visibilidade entre duas seções e dois botões
function setupToggle({
  showBtnId, hideBtnId, visibleSectionId, hiddenSectionId
}){
  const btnShow = document.getElementById(showBtnId);
  const btnHide = document.getElementById(hideBtnId);
  const sectionVisible = document.getElementById(visibleSectionId);
  const sectionHidden = document.getElementById(hiddenSectionId);

  if(!btnShow || !btnHide || !sectionVisible || !sectionHidden) return;

  // Estado inicial: sectionVisible aparece, sectionHidden fica oculta
  sectionVisible.classList.add('is-visible');
  sectionHidden.classList.remove('is-visible');
  btnShow.classList.remove('is-hidden');
  btnHide.classList.add('is-hidden');

  btnShow.addEventListener('click', () => {
    sectionVisible.classList.remove('is-visible');
    sectionHidden.classList.add('is-visible');
    btnShow.classList.add('is-hidden');
    btnHide.classList.remove('is-hidden');
  });

  btnHide.addEventListener('click', () => {
    sectionHidden.classList.remove('is-visible');
    sectionVisible.classList.add('is-visible');
    btnHide.classList.add('is-hidden');
    btnShow.classList.remove('is-hidden');
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
