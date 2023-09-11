$(window).on('load', function () {


	//content toggle action
	$('input[data-content]').each(function () {
		if ($(this).is(':checked')) {
			let selectContent = $(this).attr('data-content');
			$('.frm-content[data-content="' + selectContent + '"]').addClass('active');
		}
	})
	$('input[data-content]').on('click', function () {
		$('.frm-content.active').removeClass('active');
		$('input[data-content]').each(function () {
			if ($(this).is(':checked')) {
				let selectContent = $(this).attr('data-content');
				$('.frm-content[data-content="' + selectContent + '"]').addClass('active');
			}
		})
	})
	$('.btn[data-content]').on('click', function () {
		let dataContent = $(this).attr('data-content');
		$(this).attr('disabled', 'disabled');
		$('.frm-content[data-content="' + dataContent + '"]').slideDown(200);
		return false;
	})


	//file input 
	$('.js-field-file .js-file-button').on('click', function () {
		$(this).parent().find('input').click();
		return false;
	})
	$('.js-field-file input[type=file]').on('change', function () {
		let fileName = ('' + $(this).val());
		//if (fileName.length > 15) {
		//fileName = fileName.substring(0, 15) + '...';
		//}
		if (fileName == "") {
			fileName = $(this).parent().find('.js-file-button').attr('data-title');
			$(this).parent().removeClass('active').find('.js-file-button').find('.button-title').html(fileName);
		} else {
			$(this).parent().addClass('active').find('.js-file-button').find('.button-title').html(fileName);
		}
	});


	//popups
	let popupCurrent;
	$('.js-popup-open').on('click', function () {
		if ($(window).innerWidth() > 1023) {
			if ($(this).hasClass('popup-mobile')) {
				return false;
			}
		}
		$('.js-btn-popup-tgl.active').removeClass('active');
		if ($(this).hasClass('js-btn-popup-tgl')) {
			$(this).addClass('active');
		}
		$('.popup-outer-box').removeClass('active');
		$('body').addClass('popup-open');
		popupCurrent = $(this).attr('data-popup');
		$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
		popupElementsClear()
		popupElementsClose()
		return false;
	})
	$('.js-popup-open-hover').hover(function() {
		$('.popup-outer-box').removeClass('active');
		$('body').addClass('popup-open');
		popupCurrent = $(this).attr('data-popup');
		$('.popup-outer-box[id="' + popupCurrent + '"]').addClass('active');
		popupElementsClear()
		popupElementsClose()
	}, function() {
		
	})
	$('.js-popup-close').on('click', function () {
		$('body').removeClass('popup-open');
		$('.js-btn-popup-tgl.active').removeClass('active');
		$('.popup-outer-box').removeClass('active');
		return false;
	})
	$('.popup-outer-box').on('click', function (event) {
		if (!event.target.closest('.popup-box')) {
			$('body').removeClass('popup-open');
			$('body').removeClass('popup-open-scroll');
			$('.js-btn-popup-tgl.active').removeClass('active');
			$('.popup-outer-box').removeClass('active');
			popupElementsClear()
			popupElementsClose()
			return false;
		}
	})

	
	

	//item-tile-catalog
	if (!!$('.item-tile-catalog').offset()) {
		$('.item-tile-catalog .tile-slider').slick({
			dots: true,
			slidesToShow: 1,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: false,
			nextArrow: false,
		});

	}
	
	
	//main-tiles-slider-box
	if (!!$('.main-tiles-slider-box').offset()) {
		if ($(window).innerWidth() > 1023) {
			$('.main-tiles-slider-box .slider').slick({
				dots: true,
				slidesToShow: 1,
				variableWidth: false,
				infinite: true,
				adaptiveHeight: true,
				rows: 1,
				swipeToSlide: true,
				prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
				nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
				responsive: [
					{
						breakpoint: 1200,
						settings: {}
					},
				]
			});
		}
	}


	//pluses-box
	if (!!$('.pluses-box').offset()) {
		$('.pluses-box .slider').slick({
			dots: true,
			slidesToShow: 1,
			variableWidth: false,
			infinite: true,
			adaptiveHeight: false,
			rows: 1,
			swipeToSlide: true,
			autoplay: false,
			autoplaySpeed: 5000,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev button-main"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next button-main"></span>',
		});

	}


	//gallery slider
	if (!!$('.photos-slider-box.slider-content').offset()) {
		let pSliderContent = $('.photos-slider-box.slider-content .slider-wrap .slider').slick({
			dots: false,
			slidesToShow: 1,
			infinite: true,
			prevArrow: false,
			nextArrow: false,
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-small ico-arrow-prev"></span>',
						nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-small ico-arrow-next"></span>',
						dots: true,
					}
				},
			]
		});
		let pSliderContentPreview = $('.photos-slider-box.slider-content .slider-preview-wrap .slider').slick({
			dots: false,
			slidesToShow: 5,
			vertical: true,
			infinite: false,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-small ico-arrow-up"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-small ico-arrow-down"></span>',
		});
		$('.photos-slider-box.slider-content .slider-wrap .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
			$('.photos-slider-box.slider-content .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$('.photos-slider-box.slider-content .slider-preview-wrap .elm-photo[data-slide="' + currentSlide + '"]').parent().addClass('active');
		});
		$('.photos-slider-box.slider-content .slider-preview-wrap .slider .elm-photo').click(function () {
			let newSlide = $(this).attr('data-slide');
			$('.photos-slider-box.slider-content .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$(this).parent().addClass('active');
			$('.photos-slider-box.slider-content .slider-wrap .slider').slick('slickGoTo', newSlide);
			return false;
		})
	}
	//gallery slider
	if (!!$('.photos-slider-box.slider-popup').offset()) {
		let pSliderContent = $('.photos-slider-box.slider-popup .slider-wrap .slider').slick({
			dots: false,
			slidesToShow: 1,
			infinite: true,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-prev"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-next"></span>',
			responsive: [
				{
					breakpoint: 1024,
					settings: {
						prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-small ico-arrow-prev"></span>',
						nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-small ico-arrow-next"></span>',
						dots: true,
					}
				},
			]
		});
		let pSliderContentPreview = $('.photos-slider-box.slider-popup .slider-preview-wrap .slider').slick({
			dots: false,
			slidesToShow: 5,
			vertical: true,
			infinite: false,
			prevArrow: '<span class="btn-action-ico ico-arrow ico-arrow-small ico-arrow-up"></span>',
			nextArrow: '<span class="btn-action-ico ico-arrow ico-arrow-small ico-arrow-down"></span>',
		});
		$('.photos-slider-box.slider-popup .slider-wrap .slider').on('afterChange', function (event, slick, currentSlide, nextSlide) {
			$('.photos-slider-box.slider-popup .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$('.photos-slider-box.slider-popup .slider-preview-wrap .elm-photo[data-slide="' + currentSlide + '"]').parent().addClass('active');
		});
		$('.photos-slider-box.slider-popup .slider-preview-wrap .slider .elm-photo').click(function () {
			let newSlide = $(this).attr('data-slide');
			$('.photos-slider-box.slider-popup .slider-preview-wrap .sl-wrap.active').removeClass('active');
			$(this).parent().addClass('active');
			$('.photos-slider-box.slider-popup .slider-wrap .slider').slick('slickGoTo', newSlide);
			return false;
		})
		$('.js-popup-open').on('click', function () {
			if ($(this).attr('data-popup') == 'popup-card') {
				pSliderContent.slick('refresh');
				pSliderContentPreview.slick('refresh');
			}
		})
	}


	//#range01
	if (!!$('#range01').offset()) {
		$('#range01').slider({
			range: true,
			min: 189,
			max: 1336,
			values: [189, 1336],
			slide: function (event, ui) {
				$('#range01-min').val(ui.values[0]);
				$('#range01-max').val(ui.values[1]);
			}
		})
		$('#range01-min').val($('#range01').slider('values', 0));
		$('#range01-max').val($('#range01').slider('values', 1));
		$('#range01-min').bind('focusout', function () {
			if ($(this).val() > $('#range01').slider('values', 1)) {
				$(this).val($('#range01').slider('values', 0));
			}
			$('#range01').slider('values', 0, $(this).val());
		})
		$('#range01-max').bind('focusout', function () {
			if ($(this).val() < $('#range01').slider('values', 0)) {
				$(this).val($('#range01').slider('values', 1));
			}
			$('#range01').slider('values', 1, $(this).val());
		})
		$('#range01-min').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				if ($(this).val() > $('#range01').slider('values', 1)) {
					$(this).val($('#range01').slider('values', 0));
				}
				$('#range01').slider('values', 0, $(this).val());
			}
		})
		$('#range01-max').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				if ($(this).val() < $('#range01').slider('values', 0)) {
					$(this).val($('#range01').slider('values', 1));
				}
				$('#range01').slider('values', 1, $(this).val());
			}
		})
		$('#widget').draggable();
	}
	//#range02
	if (!!$('#range02').offset()) {
		$('#range02').slider({
			range: true,
			min: 189,
			max: 1336,
			values: [189, 1336],
			slide: function (event, ui) {
				$('#range02-min').val(ui.values[0]);
				$('#range02-max').val(ui.values[1]);
			}
		})
		$('#range02-min').val($('#range02').slider('values', 0));
		$('#range02-max').val($('#range02').slider('values', 1));
		$('#range02-min').bind('focusout', function () {
			if ($(this).val() > $('#range02').slider('values', 1)) {
				$(this).val($('#range02').slider('values', 0));
			}
			$('#range02').slider('values', 0, $(this).val());
		})
		$('#range02-max').bind('focusout', function () {
			if ($(this).val() < $('#range02').slider('values', 0)) {
				$(this).val($('#range02').slider('values', 1));
			}
			$('#range02').slider('values', 1, $(this).val());
		})
		$('#range02-min').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				if ($(this).val() > $('#range02').slider('values', 1)) {
					$(this).val($('#range02').slider('values', 0));
				}
				$('#range02').slider('values', 0, $(this).val());
			}
		})
		$('#range02-max').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				if ($(this).val() < $('#range02').slider('values', 0)) {
					$(this).val($('#range02').slider('values', 1));
				}
				$('#range02').slider('values', 1, $(this).val());
			}
		})
		$('#widget').draggable();
	}
	//#range03
	if (!!$('#range03').offset()) {
		$('#range03').slider({
			range: true,
			min: 189,
			max: 1336,
			values: [189, 1336],
			slide: function (event, ui) {
				$('#range03-min').val(ui.values[0]);
				$('#range03-max').val(ui.values[1]);
			}
		})
		$('#range03-min').val($('#range03').slider('values', 0));
		$('#range03-max').val($('#range03').slider('values', 1));
		$('#range03-min').bind('focusout', function () {
			if ($(this).val() > $('#range03').slider('values', 1)) {
				$(this).val($('#range03').slider('values', 0));
			}
			$('#range03').slider('values', 0, $(this).val());
		})
		$('#range03-max').bind('focusout', function () {
			if ($(this).val() < $('#range03').slider('values', 0)) {
				$(this).val($('#range03').slider('values', 1));
			}
			$('#range03').slider('values', 1, $(this).val());
		})
		$('#range03-min').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				if ($(this).val() > $('#range03').slider('values', 1)) {
					$(this).val($('#range03').slider('values', 0));
				}
				$('#range03').slider('values', 0, $(this).val());
			}
		})
		$('#range03-max').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				if ($(this).val() < $('#range03').slider('values', 0)) {
					$(this).val($('#range03').slider('values', 1));
				}
				$('#range03').slider('values', 1, $(this).val());
			}
		})
		$('#widget').draggable();
	}
	//#range04
	if (!!$('#range04').offset()) {
		$('#range04').slider({
			range: true,
			min: 0.6,
			max: 341.7,
			step: 0.1,
			values: [0.6, 341.7],
			slide: function (event, ui) {
				$('#range04-min').val(ui.values[0]);
				$('#range04-max').val(ui.values[1]);
			}
		})
		$('#range04-min').val($('#range04').slider('values', 0));
		$('#range04-max').val($('#range04').slider('values', 1));
		$('#range04-min').bind('focusout', function () {
			if ($(this).val() > $('#range04').slider('values', 1)) {
				$(this).val($('#range04').slider('values', 0));
			}
			$('#range04').slider('values', 0, $(this).val());
		})
		$('#range04-max').bind('focusout', function () {
			if ($(this).val() < $('#range04').slider('values', 0)) {
				$(this).val($('#range04').slider('values', 1));
			}
			$('#range04').slider('values', 1, $(this).val());
		})
		$('#range04-min').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				if ($(this).val() > $('#range04').slider('values', 1)) {
					$(this).val($('#range04').slider('values', 0));
				}
				$('#range04').slider('values', 0, $(this).val());
			}
		})
		$('#range04-max').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				if ($(this).val() < $('#range04').slider('values', 0)) {
					$(this).val($('#range04').slider('values', 1));
				}
				$('#range04').slider('values', 1, $(this).val());
			}
		})
		$('#widget').draggable();
	}
	//#range05
	if (!!$('#range05').offset()) {
		$('#range05').slider({
			range: true,
			min: 1.8,
			max: 27.2,
			step: 0.1,
			values: [1.8, 27.2],
			slide: function (event, ui) {
				$('#range05-min').val(ui.values[0]);
				$('#range05-max').val(ui.values[1]);
			}
		})
		$('#range05-min').val($('#range05').slider('values', 0));
		$('#range05-max').val($('#range05').slider('values', 1));
		$('#range05-min').bind('focusout', function () {
			if ($(this).val() > $('#range05').slider('values', 1)) {
				$(this).val($('#range05').slider('values', 0));
			}
			$('#range05').slider('values', 0, $(this).val());
		})
		$('#range05-max').bind('focusout', function () {
			if ($(this).val() < $('#range05').slider('values', 0)) {
				$(this).val($('#range05').slider('values', 1));
			}
			$('#range05').slider('values', 1, $(this).val());
		})
		$('#range05-min').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				if ($(this).val() > $('#range05').slider('values', 1)) {
					$(this).val($('#range05').slider('values', 0));
				}
				$('#range05').slider('values', 0, $(this).val());
			}
		})
		$('#range05-max').bind('keypress', function (e) {
			if (e.keyCode == 13) {
				if ($(this).val() < $('#range05').slider('values', 0)) {
					$(this).val($('#range05').slider('values', 1));
				}
				$('#range05').slider('values', 1, $(this).val());
			}
		})
		$('#widget').draggable();
	}
	
});


//catalog actions view
if (document.querySelector('.js-button-rows')) {
	document.querySelector('.js-button-rows').addEventListener('click', function (e) {
		document.querySelector('.js-button-tiles').classList.remove('active')
		this.classList.add('active')
		document.querySelector('.catalog-box').classList.add('view-rows')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
	document.querySelector('.js-button-tiles').addEventListener('click', function (e) {
		document.querySelector('.js-button-rows').classList.remove('active')
		this.classList.add('active')
		document.querySelector('.catalog-box').classList.remove('view-rows')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}

//js popup wrap
const togglePopupButtons = document.querySelectorAll('.js-btn-popup-toggle')
const closePopupButtons = document.querySelectorAll('.js-btn-popup-close')
const popupElements = document.querySelectorAll('.js-popup-wrap')
const wrapWidth = document.querySelector('.wrap').offsetWidth
const bodyElem = document.querySelector('body')

function popupElementsClear() {
	document.body.classList.remove('menu-show')
	document.body.classList.remove('filter-show')
	document.body.classList.remove('search-show')
	popupElements.forEach(element => element.classList.remove('popup-right'))
}

function popupElementsClose() {
	togglePopupButtons.forEach(element => {
		if (!element.closest('.no-close')) {
			element.classList.remove('active')
		}
	})
}

function popupElementsContentPositionClass() {
	popupElements.forEach(element => {
		let pLeft = element.offsetLeft
		let pWidth = element.querySelector('.js-popup-block').offsetWidth
		let pMax = pLeft + pWidth;
		if (pMax > wrapWidth) {
			element.classList.add('popup-right')
		} else {
			element.classList.remove('popup-right')
		}
	})
}

for (i = 0; i < togglePopupButtons.length; i++) {
	togglePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		if (this.classList.contains('active')) {
			this.classList.remove('active')
		} else {
			popupElementsClose()
			this.classList.add('active')
			if (this.closest('.popup-menu-wrap')) {
				document.body.classList.add('menu-show')
			}
			if (this.closest('.popup-search-wrap')) {
				document.body.classList.add('search-show')
			}
			if (this.closest('.popup-filter-wrap')) {
				document.body.classList.add('filter-show')
			}
			popupElementsContentPositionClass()
		}
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}
for (i = 0; i < closePopupButtons.length; i++) {
	closePopupButtons[i].addEventListener('click', function (e) {
		popupElementsClear()
		popupElementsClose()
		e.preventDefault()
		e.stopPropagation()
		return false;
	})
}
document.onclick = function (event) {
	if (!event.target.closest('.js-popup-block')) {
		popupElementsClear()
		popupElementsClose()
	}
}
popupElements.forEach(element => {
	if (element.classList.contains('js-popup-select')) {
		let popupElementSelectItem = element.querySelectorAll('.js-popup-block li a')
		if (element.querySelector('.js-popup-block .active')) {
			element.classList.add('select-active')
			let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
			let popupElementButton = element.querySelector('.js-btn-popup-toggle')
			popupElementButton.innerHTML = ''
			popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
		} else {
			element.classList.remove('select-active')
		}
		for (i = 0; i < popupElementSelectItem.length; i++) {
			popupElementSelectItem[i].addEventListener('click', function (e) {
				this.closest('.js-popup-wrap').classList.add('select-active')
				if (this.closest('.js-popup-wrap').querySelector('.js-popup-block .active')) {
					this.closest('.js-popup-wrap').querySelector('.js-popup-block .active').classList.remove('active')
				}
				this.classList.add('active')
				let popupElementActive = element.querySelector('.js-popup-block .active').innerHTML
				let popupElementButton = element.querySelector('.js-btn-popup-toggle')
				popupElementButton.innerHTML = ''
				popupElementButton.insertAdjacentHTML('beforeend', popupElementActive)
				popupElementsClear()
				popupElementsClose()
				if (!this.closest('.js-tabs-nav')) {
					e.preventDefault()
					e.stopPropagation()
					return false
				}
			})
		}
	}
})

//mobile menu
const submenuMenuButton = document.querySelectorAll('.popup-menu-wrap .submenu .btn-submenu')
const submenuButtonBack = document.querySelector('.popup-menu-wrap .btn-submenu-back')
for (i = 0; i < submenuMenuButton.length; i++) {
	submenuMenuButton[i].addEventListener('click', function(e) {
		if (wrapWidth < 1024) {
			this.classList.toggle('opened')
			bodyElem.classList.toggle('submenu-opened')
			e.preventDefault()
			e.stopPropagation()
			return false
		}
	})
}
submenuButtonBack.addEventListener('click', function(e) {
	document.querySelector('.opened').classList.remove('opened')
	bodyElem.classList.remove('submenu-opened')
	e.preventDefault()
	e.stopPropagation()
	return false
})

//button scroll up
let buttonUp = document.getElementById("up");
buttonUp.addEventListener('click', function(e) {
	window.scrollTo({top: 0, behavior: 'smooth'});
	e.preventDefault()
	e.stopPropagation()
})


//js tabs
const tabsNav = document.querySelectorAll('.js-tabs-nav')
const tabsBlocks = document.querySelectorAll('.js-tab-block')

function tabsActiveStart() {
	for (iTab = 0; iTab < tabsBlocks.length; iTab++) {
		if (tabsBlocks[iTab].classList.contains('active')) {
			tabsBlocks[iTab].classList.remove('active')
		}
	}
	for (i = 0; i < tabsNav.length; i++) {
		let tabsNavElements = tabsNav[i].querySelectorAll('[data-tab]')
		for (iElements = 0; iElements < tabsNavElements.length; iElements++) {
			if (tabsNavElements[iElements].classList.contains('active')) {
				let tabsNavElementActive = tabsNavElements[iElements].dataset.tab
				for (j = 0; j < tabsBlocks.length; j++) {
					if (tabsBlocks[j].dataset.tab === tabsNavElementActive) {
						tabsBlocks[j].classList.add('active')
					}
				}
			}
		}
	}
	
}

for (i = 0; i < tabsNav.length; i++) {
	tabsNav[i].addEventListener('click', function (e) {
		if (e.target.closest('[data-tab]')) {
			let tabsNavElements = this.querySelector('[data-tab].active')
			tabsNavElements ? tabsNavElements.classList.remove('active') : false
			e.target.closest('[data-tab]').classList.add('active')
			tabsActiveStart()
			e.preventDefault()
			e.stopPropagation()
			return false
		}
	})
}
tabsActiveStart()

//input range
const rangeInputs = document.querySelectorAll('input[type="range"]')
for (i = 0; i < rangeInputs.length; i++) {
	let target = rangeInputs[i]
	const min = target.min
	const max = target.max
	const val = target.value
	let percentage = (val - min) * 100 / (max - min)
	target.style.backgroundSize = percentage + '% 100%'
	rangeResult = rangeInputs[i].value
	rangeInputs[i].parentNode.querySelector('.field-range-result').textContent = rangeResult
	rangeInputs[i].addEventListener('change', function (e) {
		rangeResult = this.value
		this.parentNode.querySelector('.field-range-result').textContent = rangeResult
	})
}

function handleInputChange(e) {
	let target = e.target
	const min = target.min
	const max = target.max
	const val = target.value
	let percentage = (val - min) * 100 / (max - min)
	target.style.backgroundSize = percentage + '% 100%'
	for (i = 0; i < rangeInputs.length; i++) {
		rangeResult = rangeInputs[i].value
		rangeInputs[i].parentNode.querySelector('.field-range-result').textContent = rangeResult
		rangeInputs[i].addEventListener('change', function (e) {
			rangeResult = this.value
			this.parentNode.querySelector('.field-range-result').textContent = rangeResult
		})
	}
}

rangeInputs.forEach(input => {
	input.addEventListener('input', handleInputChange)
})



//filter toggle
const filterButtonToggle = document.querySelectorAll('.js-filter-toggle')
const filterBox = document.querySelector('.js-filter')
for (i = 0; i < filterButtonToggle.length; i++) {
	filterButtonToggle[i].addEventListener('click', function(e) {
		filterBox.classList.toggle('active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}


//field counter
let fieldCounter = document.getElementsByClassName('frm-field-counter')

function fieldCounterButtons(index) {
	return `
        <button class="btn field-counter-button" data-index="${index}" data-type="plus"></button>
        <button class="btn field-counter-button" data-index="${index}" data-type="minus"></button>
    `
}

function fieldCounterCreator() {
	for (i = 0; i < fieldCounter.length; i++) {
		fieldCounter[i].insertAdjacentHTML('beforeend', fieldCounterButtons(i))
		fieldCounter[i].onclick = function (event) {
			const type = event.target.dataset.type
			const index = event.target.dataset.index
			if (index) {
				const fieldCounterPlus = fieldCounter[index].children[1]
				const fieldCounterMinus = fieldCounter[index].children[2]
				const fieldCounterInput = fieldCounter[index].children[0]
				if (type === 'plus') {
					fieldCounterInput.value = Number(fieldCounterInput.value) + 1
				} else if (type === 'minus') {
					fieldCounterInput.value = Number(fieldCounterInput.value) - 1
				}
				if (Number(fieldCounterInput.value) > 0) {
					fieldCounterMinus.removeAttribute('disabled')
				} else if (Number(fieldCounterInput.value) < 1) {
					fieldCounterMinus.setAttribute('disabled', true)
				}
			}
		}
	}
}

fieldCounterCreator();


//btn tgl
let tglButtons = document.querySelectorAll('.js-btn-tgl')
for (i = 0; i < tglButtons.length; i++) {
	tglButtons[i].addEventListener('click', function (e) {
		this.classList.contains('active') ? this.classList.remove('active') : this.classList.add('active')
		e.preventDefault()
		e.stopPropagation()
		return false
	})
}


//js tab features activate
const buttonTabFeaturesActivate = document.querySelector('.js-tab-features-activate')
const buttonTabFeatureTop = document.querySelector('.tabs-box').offsetTop - 50
buttonTabFeaturesActivate.addEventListener('click', function(e) {
	document.querySelector('.btn-tab[data-tab=card-tab02]').click()
	window.scrollTo({top: buttonTabFeatureTop, behavior: 'smooth'})
	e.preventDefault()
	e.stopPropagation()
	return false
})

