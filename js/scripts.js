function testWebP(callback) {
	var webP = new Image();
	webP.onload = webP.onerror = function () {
		callback(webP.height == 2);
	};
	webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
}
testWebP(function (support) {
	if (support == true) {
		document.querySelector('body').classList.add('webp');
	} else{
		document.querySelector('body').classList.add('no-webp');
	}
});;
// Dynamic Adapt v.1
// HTML data-da="where(uniq class name),position(digi),when(breakpoint)"
// e.x. data-da="item,2,992"
// Andrikanych Yevhen 2020
// https://www.youtube.com/c/freelancerlifestyle

"use strict";

(function () {
	let originalPositions = [];
	let daElements = document.querySelectorAll('[data-da]');
	let daElementsArray = [];
	let daMatchMedia = [];
	//Заполняем массивы
	if (daElements.length > 0) {
		let number = 0;
		for (let index = 0; index < daElements.length; index++) {
			const daElement = daElements[index];
			const daMove = daElement.getAttribute('data-da');
			if (daMove != '') {
				const daArray = daMove.split(',');
				const daPlace = daArray[1] ? daArray[1].trim() : 'last';
				const daBreakpoint = daArray[2] ? daArray[2].trim() : '767';
				const daType = daArray[3] === 'min' ? daArray[3].trim() : 'max';
				const daDestination = document.querySelector('.' + daArray[0].trim())
				if (daArray.length > 0 && daDestination) {
					daElement.setAttribute('data-da-index', number);
					//Заполняем массив первоначальных позиций
					originalPositions[number] = {
						"parent": daElement.parentNode,
						"index": indexInParent(daElement)
					};
					//Заполняем массив элементов 
					daElementsArray[number] = {
						"element": daElement,
						"destination": document.querySelector('.' + daArray[0].trim()),
						"place": daPlace,
						"breakpoint": daBreakpoint,
						"type": daType
					}
					number++;
				}
			}
		}
		dynamicAdaptSort(daElementsArray);

		//Создаем события в точке брейкпоинта
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daBreakpoint = el.breakpoint;
			const daType = el.type;

			daMatchMedia.push(window.matchMedia("(" + daType + "-width: " + daBreakpoint + "px)"));
			daMatchMedia[index].addListener(dynamicAdapt);
		}
	}
	//Основная функция
	function dynamicAdapt(e) {
		for (let index = 0; index < daElementsArray.length; index++) {
			const el = daElementsArray[index];
			const daElement = el.element;
			const daDestination = el.destination;
			const daPlace = el.place;
			const daBreakpoint = el.breakpoint;
			const daClassname = "_dynamic_adapt_" + daBreakpoint;

			if (daMatchMedia[index].matches) {
				//Перебрасываем элементы
				if (!daElement.classList.contains(daClassname)) {
					let actualIndex = indexOfElements(daDestination)[daPlace];
					if (daPlace === 'first') {
						actualIndex = indexOfElements(daDestination)[0];
					} else if (daPlace === 'last') {
						actualIndex = indexOfElements(daDestination)[indexOfElements(daDestination).length];
					}
					daDestination.insertBefore(daElement, daDestination.children[actualIndex]);
					daElement.classList.add(daClassname);
				}
			} else {
				//Возвращаем на место
				if (daElement.classList.contains(daClassname)) {
					dynamicAdaptBack(daElement);
					daElement.classList.remove(daClassname);
				}
			}
		}
		customAdapt();
	}

	//Вызов основной функции
	dynamicAdapt();

	//Функция возврата на место
	function dynamicAdaptBack(el) {
		const daIndex = el.getAttribute('data-da-index');
		const originalPlace = originalPositions[daIndex];
		const parentPlace = originalPlace['parent'];
		const indexPlace = originalPlace['index'];
		const actualIndex = indexOfElements(parentPlace, true)[indexPlace];
		parentPlace.insertBefore(el, parentPlace.children[actualIndex]);
	}
	//Функция получения индекса внутри родителя
	function indexInParent(el) {
		var children = Array.prototype.slice.call(el.parentNode.children);
		return children.indexOf(el);
	}
	//Функция получения массива индексов элементов внутри родителя 
	function indexOfElements(parent, back) {
		const children = parent.children;
		const childrenArray = [];
		for (let i = 0; i < children.length; i++) {
			const childrenElement = children[i];
			if (back) {
				childrenArray.push(i);
			} else {
				//Исключая перенесенный элемент
				if (childrenElement.getAttribute('data-da') == null) {
					childrenArray.push(i);
				}
			}
		}
		return childrenArray;
	}
	//Сортировка объекта
	function dynamicAdaptSort(arr) {
		arr.sort(function (a, b) {
			if (a.breakpoint > b.breakpoint) { return -1 } else { return 1 }
		});
		arr.sort(function (a, b) {
			if (a.place > b.place) { return 1 } else { return -1 }
		});
	}
	//Дополнительные сценарии адаптации
	function customAdapt() {
		//const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	}
}());

/*
let block = document.querySelector('.click');
block.addEventListener("click", function (e) {
	alert('Все ок ;)');
});
*/

/*
//Объявляем переменные
const parent_original = document.querySelector('.content__blocks_city');
const parent = document.querySelector('.content__column_river');
const item = document.querySelector('.content__block_item');
//Слушаем изменение размера экрана
window.addEventListener('resize', move);
//Функция
function move(){
	const viewport_width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	if (viewport_width <= 992) {
		if (!item.classList.contains('done')) {
			parent.insertBefore(item, parent.children[2]);
			item.classList.add('done');
		}
	} else {
		if (item.classList.contains('done')) {
			parent_original.insertBefore(item, parent_original.children[2]);
			item.classList.remove('done');
		}
	}
}
//Вызываем функцию
move();
*/;
$(window).on("load", function () {
	setTimeout(() => {
		$(".preloader").fadeOut(1000);
		$("body").removeClass("_lock");
	}, 2500);
});
$(document).ready(function () {
	if ($(".order-link").length > 0) {
		$(".order-link").click(function() {
			$("body").addClass("_lock");
			$(".order-popup").addClass("_active");
		});
		$(".order-popup__close").click(function() {
			$("body").removeClass("_lock");
			$(".order-popup").removeClass("_active");
		});
	}
	for (let i = 0; i < $(".select").length; i++) {
		let current = $(".select__current");
		let list = $(".select__list");
		let item = $(".select__item");
		let input = $(".select").find("input");
		current.click(function() {
			current.toggleClass("_active");
			list.toggleClass("_active");
		});
		item.click(function() {
			text = $(this).text();
			current.removeClass("_active");
			list.removeClass("_active");
			current.text(text);
			item.removeClass("_hide");
			$(this).addClass("_hide");
			current.addClass("_picked");
			input.val($(this).attr("data-value"));
		});
	};
	if ($(".sidebar").length > 0) {
		let sidebar = $(".sidebar");
		let sidebar_btn = $(".sidebar-menu__btn");
		let sidebar_body = $(".sidebar-menu__body");
		let sidebar_area = $(".sidebar__area");
		let sidebar_item = $(".sidebar__item");
		sidebar_area.click(function () {
			sidebarActions("close");
		});
		sidebar_btn.click(function () {
			sidebarActions("toggle");
		});
		function sidebarActions(action) {
			if (action == "open") {
				sidebar.addClass("_active");
				sidebar_btn.addClass("_active");
				sidebar_body.addClass("_active");
				$("body").addClass("_lock");
			}
			if (action == "close") {
				sidebar.removeClass("_active");
				sidebar_btn.removeClass("_active");
				sidebar_body.removeClass("_active");
				$("body").removeClass("_lock");
			}
			if (action == "toggle") {
				sidebar.toggleClass("_active");
				sidebar_btn.toggleClass("_active");
				sidebar_body.toggleClass("_active");
				$("body").toggleClass("_lock");
			} else {
				console.log(
					"Не корректное значение для функции! | Incorrect value for function!"
					);
			}
		}

		$(window).on("resize", headerScroll);
		function headerScroll() {
			if ($(window).width() <= 768) {
				let lastScroll = 0;
				$(window).on("scroll", function () {
					st = $(this).scrollTop();
					if (st > lastScroll && st > 500) {
						$(".header").addClass("_hide");
						$(".sidebar").addClass("_hide");
					}
					if (st < lastScroll && st < 500) {
						$(".header").removeClass("_hide");
						$(".sidebar").removeClass("_hide");
					}
					lastScroll = st;
				});
			} else {
				$(window).unbind("scroll");
				$(".header").removeClass("_hide");
				$(".sidebar").removeClass("_hide");
			}
		}
		headerScroll();
	}
	if ($(".lang-header").length > 0) {
		let current_cnt = $(".lang-header__current");
		let list = $(".lang-header__list");
		let item = $(".lang-header__item");
		let current;
		function itemMove(mode = "default") {
			if (mode == "default") {
				current = $(".lang-header__item._current");
				current_cnt.append(current);
			}
			if (mode == "reverse") {
				current = current_cnt.find(item);
				list.append(current);
			}
		}
		itemMove();
		/* перемещение | moving */
		item.click(function () {
			item.removeClass("_current");
			itemMove("reverse");
			$(this).addClass("_current");
			itemMove();
		});
		/* визуал | visual */
		current_cnt.click(function () {
			current_cnt.toggleClass("_active");
			list.toggleClass("_active");
		});
		/* скрытие переключалки при нажатии на любоме место */
		$(document).click(function (e) {
			if (!e.target.closest(".lang-header")) {
				current_cnt.removeClass("_active");
				list.removeClass("_active");
			}
		});
	}
});
