function hideFlashMessage() {
    const flashMessage = document.querySelector('.flash-message');
    if (flashMessage) {
      flashMessage.classList.add('hide');
    }
  }

  setTimeout(hideFlashMessage, 1500);