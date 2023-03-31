
  (function ($) {
    "use strict";

    $(".dragdrop").sortable({
      axis: "x",
      items: ".card",
      revert: true,
      placeholder: "draggable-placeholder",
      forcePlaceholderSize: true,
      opacity: 0.92,
      cursor: "move"
    });
  })(jQuery);

