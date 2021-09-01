"use strict";
(function ($) {
  $.fn.initForm = function (options) {

    if (jQuery.validator) {
      jQuery.validator.setDefaults({ success: "valid" });
      this.validate({ rules: { field: { required: true, email: true } } });
    }
    this.submit(function (event) {
      event.preventDefault();
      if (jQuery.validator) {
        if ($(this).valid()) {
          const $form = document.querySelector("#message_form");
          $form.addEventListener("submit", handleSubmit);

          async function handleSubmit(e) {
            const form = new FormData(e.target);
            const response = await fetch(this.action, {
              method: this.method,
              body: form,
              headers: {
                Accept: "application/json",
              },
            });

            if (response.ok) {
              settings.successClean.val("");
              settings.successInvisible.addClass("invisible");
              settings.successGone.addClass("gone");
              settings.successVisible.removeClass("invisible");
              settings.successVisible.removeClass("gone");
              settings.textFeedback.removeClass("gone");
              settings.textFeedback.removeClass("invisible");
              console.log("Request sent successfully");
            } else {
              settings.textFeedback.removeClass("gone");
              settings.textFeedback.removeClass("invisible");
              settings.textFeedback.html("Error al enviar la solicitud.");
              console.log("Could not process AJAX request to server");
            }
          }
        }
      } else {
        $ajax.sendRequest(this);
      }
    });
  };
})(jQuery);
