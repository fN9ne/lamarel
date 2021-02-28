$(document).ready(function () {
  if ($(".ask-link").length > 0) {
    $(".ask-link").click(function() {
      $("body").addClass("_lock");
      $(".ask-popup").addClass("_active");
      $(".popup__content").css("bottom", 0);
    });
    $(".popup__close").click(function() {
      $("body").removeClass("_lock");
      $(".popup").removeClass("_active");
    });
  };
  if ($(".order-link").length > 0) {
    $(".order-link").click(function() {
      $("body").addClass("_lock");
      $(".order-popup").addClass("_active");
      $(".popup__content").css("bottom", 0);
    });
    $(".popup__close").click(function() {
      $("body").removeClass("_lock");
      $(".popup").removeClass("_active");
    });
  };
  for (let i = 0; i < $(".popup").length; i++) {
    let touchStart = null;
    let touchPos = null;
    let swipe = null;
    const cnt = $(".popup__content");
    $(".popup__close-mobile").on("touchstart", function (e) { TouchStart(e) });
    $(".popup__close-mobile").on("touchmove", function (e) { TouchMove(e) });
    $(".popup__close-mobile").on("touchend", function () { TouchEnd() });
    function TouchStart(e) {
      touchStart = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
      touchPos = {
        x: touchStart.x,
        y: touchStart.y,
      };
      cnt.addClass("_move");
    };
    function TouchMove(e) {
      touchPos = {
        x: e.changedTouches[0].clientX,
        y: e.changedTouches[0].clientY,
      };
      CheckAction();
      if (swipe <= 0) {
        cnt.css("bottom", swipe);
      }
    };
    function TouchEnd() {
      cnt.removeClass("_move");
      if (CheckAction() < -200) {
        $(".popup").removeClass("_active");
        $("body").removeClass("_lock");
        cnt.css("bottom", "-100vh")
      } else {
        cnt.css("bottom", 0);
      }
      touchStart = null;
      touchPos = null;
    };
    function CheckAction() {
      swipe = touchStart.y - touchPos.y;
      return swipe;
    };
  };
});
