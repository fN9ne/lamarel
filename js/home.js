$(document).ready(function () {
	if ($(".services").length > 0) {
		let item = $(".services-tabs__item");
		let service = $(".service");
		item.click(function () {
			id = $(this).attr("data-service");
			assigned_serivce = $(`.service[data-service=${id}]`);
			item.removeClass("_current");
			service.removeClass("_current");
			$(this).addClass("_current");
			assigned_serivce.addClass("_current");
		});
	}
});
