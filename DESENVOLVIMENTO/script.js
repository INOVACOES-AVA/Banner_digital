// Utilitário para alternar visibilidade entre duas seções e dois botões
// Agora com suporte a inserir/remover texto extra ao clicar em "Saber mais"
function setupToggle({
  showBtnId,
  hideBtnId,
  visibleSectionId,
  hiddenSectionId,
  extraText,         // (opcional) texto a ser adicionado quando exibir
  extraSelector      // (opcional) seletor do elemento que recebe o texto
}){
  const btnShow = document.getElementById(showBtnId);
  const btnHide = document.getElementById(hideBtnId);
  const sectionVisible = document.getElementById(visibleSectionId);
  const sectionHidden  = document.getElementById(hiddenSectionId);

  if(!btnShow || !btnHide || !sectionVisible || !sectionHidden) return;

  // Estado inicial: sectionVisible aparece, sectionHidden fica oculta
  sectionVisible.classList.add('is-visible');
  sectionHidden.classList.remove('is-visible');
  btnShow.classList.remove('is-hidden');
  btnHide.classList.add('is-hidden');

  // Utilitário: obtém (ou cria) o alvo para o texto extra
  function getOrCreateExtraTarget() {
    if (!extraSelector) return null;

    let target = document.querySelector(extraSelector);
    if (!target) {
      // cria automaticamente o alvo dentro da seção que será mostrada
      target = document.createElement('div');
      // se o selector for um id (#algo), reaproveita o id
      if (extraSelector.startsWith('#')) {
        target.id = extraSelector.slice(1);
      }
      target.className = 'card__text';
      // insere no final da seção que será exibida (hiddenSection vira visível no "Saber mais")
      sectionHidden.appendChild(target);
    }
    return target;
  }

  // Adiciona o texto extra (evita duplicar)
  function addExtraText() {
    if (!extraText) return;
    const target = getOrCreateExtraTarget();
    if (!target) return;

    // evita duplicação se já foi inserido
    if (target.dataset.injected === 'true') return;

    target.textContent = extraText; // use .innerHTML se quiser HTML rico
    target.dataset.injected = 'true';
  }

  // Remove o texto extra ao fechar (para ficar limpo)
  function removeExtraText() {
    if (!extraSelector || !extraText) return;
    const target = document.querySelector(extraSelector);
    if (!target) return;
    // só limpa se foi injetado por nós
    if (target.dataset.injected === 'true') {
      target.textContent = '';
      delete target.dataset.injected;
    }
  }

  btnShow.addEventListener('click', () => {
    sectionVisible.classList.remove('is-visible');
    sectionHidden.classList.add('is-visible');
    btnShow.classList.add('is-hidden');
    btnHide.classList.remove('is-hidden');

    // adiciona o texto extra quando expande
    addExtraText();
  });

  btnHide.addEventListener('click', () => {
    sectionHidden.classList.remove('is-visible');
    sectionVisible.classList.add('is-visible');
    btnHide.classList.add('is-hidden');
    btnShow.classList.remove('is-hidden');

    // remove o texto extra quando fecha
    removeExtraText();
  });
}

// Calendário: #calendario <-> #informativo_calendario (sem texto extra)
setupToggle({
  showBtnId: 'btn_saber_mais_calendario',
  hideBtnId: 'btn_fechar_calendario',
  visibleSectionId: 'calendario',
  hiddenSectionId: 'informativo_calendario'
});

// Legenda: #cores <-> #conteudo (adiciona texto extra em #texto_das_cores ao abrir)
setupToggle({
  showBtnId: 'btn_saber_mais_legenda',
  hideBtnId: 'btn_fechar_legenda',
  visibleSectionId: 'cores',
  hiddenSectionId: 'conteudo',
  extraText: 'Lorem Ipsum é simplesmente uma simulação de texto da indústria tipográfica e de impressos, e vem sendo utilizado desde o século XVI, quando um impressor desconhecido pegou uma bandeja de tipos e os embaralhou para fazer um livro de modelos de tipos. Lorem Ipsum sobreviveu não só a cinco séculos, como também ao salto para a editoração eletrônica, permanecendo essencialmente inalterado. Se popularizou na década de 60, quando a Letraset lançou decalques contendo passagens de Lorem Ipsum, e mais recentemente quando passou a ser integrado a softwares de editoração eletrônica como Aldus PageMaker.',
  extraSelector: '#texto_das_cores' // se não existir, será criado dentro de #conteudo
});
