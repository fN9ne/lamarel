$(document).ready(function() {
	/* покраска «работ» */
	for (let i = 0; i < $(".work").length; i++) {
		work = $(".work").eq(i);
		color = work.attr("data-color");
		work.css("background", color);
	};
	/* сохранения пропорций «работы» 1:1 */
	function setSquareItem() {
		width = parseFloat($(".work").css("width"));
		$(".work").css("height", width);
	};
	/* делаем «работу» квадратной по загрузке */
	setSquareItem();
	/* изменение пропорций при изменение ширины окна */
	$(window).on("resize", function() { setSquareItem() });
});