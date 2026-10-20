// Минимальная логика для КР №1: открытие/закрытие модального окна <dialog>
// и базовая обработка отправки форм. Вся вёрстка и оформление — на HTML/CSS.

const orderDialog = document.getElementById('order-dialog');

// ---------- Модальное окно заявки ----------
if (orderDialog) {
  const selectedProductInput = document.getElementById('selected-product');
  const selectedProductLabel = document.getElementById('selected-product-label');
  const dialogSuccess = orderDialog.querySelector('.order-form__success');

  // Любая кнопка с data-product открывает окно и подставляет товар.
  document.querySelectorAll('[data-product]').forEach((button) => {
    button.addEventListener('click', () => {
      const productName = button.dataset.product;
      selectedProductInput.value = productName;
      selectedProductLabel.textContent = productName;
      dialogSuccess.hidden = true;
      orderDialog.showModal();
    });
  });

  // Кнопки «×» и «Отмена».
  orderDialog.querySelectorAll('[data-dialog-close]').forEach((button) => {
    button.addEventListener('click', () => orderDialog.close());
  });

  // Закрытие по клику на затемнённый фон.
  orderDialog.addEventListener('click', (event) => {
    if (event.target === orderDialog) {
      orderDialog.close();
    }
  });
}

// ---------- Формы заявки и обратной связи ----------
document.querySelectorAll('.order-form').forEach((form) => {
  const successMessage = form.querySelector('.order-form__success');

  form.addEventListener('submit', (event) => {
    // Backend пока не подключён — отменяем стандартную отправку.
    event.preventDefault();

    const fields = Array.from(form.elements).filter((element) => element.willValidate);
    fields.forEach((field) => field.removeAttribute('aria-invalid'));

    if (!form.checkValidity()) {
      fields
        .filter((field) => !field.checkValidity())
        .forEach((field) => field.setAttribute('aria-invalid', 'true'));
      form.reportValidity();
      return;
    }

    form.reset();
    if (successMessage) {
      successMessage.hidden = false;
    }
  });

  // При повторном вводе скрываем старое сообщение и подсветку ошибки.
  form.addEventListener('input', (event) => {
    event.target.removeAttribute('aria-invalid');
    if (successMessage) {
      successMessage.hidden = true;
    }
  });
});
