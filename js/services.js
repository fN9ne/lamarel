function ibg(){
	let ibg=document.querySelectorAll(".ibg");
	for (var i = 0; i < ibg.length; i++) {
		if(ibg[i].querySelector('img')){
		ibg[i].style.backgroundImage = 'url('+ibg[i].querySelector('img').getAttribute('src')+')';
		}
	}
}
ibg();;
$(document).ready(function() {
	/* изменение высоты */
	function contentHeight() {
		content = $(".portfolio-services__content");
		work = $(".work");
		height = parseFloat(work.css("height"));
		height *= 2;
		if ($(window).width() <= 1120) {
			content.removeAttr("style");
		} else {
			content.css("height", height);
		}
	};
	/* изменение высоты по загрузке страницы */
	contentHeight();
	/* изменение высоты при изменении ширины окна */
	$(window).on("resize", function() {
		contentHeight()
	});
});