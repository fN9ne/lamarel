$(document).ready(function () {
  let touchStart = null;
  let touchPos = null;
  let swipe = null;
  const cnt = $(".order-popup__content");
  if ($(".order-link").length > 0) {
    $(".order-link").click(function() {
      $("body").addClass("_lock");
      $(".order-popup").addClass("_active");
      cnt.css("bottom", 0);
    });
    $(".order-popup__close").click(function() {
      $("body").removeClass("_lock");
      $(".order-popup").removeClass("_active");
    });
  };
  $(".order-popup__close-mobile").on("touchstart", function (e) { TouchStart(e) });
  $(".order-popup__close-mobile").on("touchmove", function (e) { TouchMove(e) });
  $(".order-popup__close-mobile").on("touchend", function () { TouchEnd() });
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
      $(".order-popup").removeClass("_active");
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
});
