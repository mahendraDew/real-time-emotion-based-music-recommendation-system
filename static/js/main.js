'use strict';

$(window).on('load', function() {
	/*------------------
		Preloder
	--------------------*/
	$(".loader").fadeOut();
	$("#preloder").delay(400).fadeOut("slow");

	if($('.playlist-area').length > 0 ) {
		var containerEl = document.querySelector('.playlist-area');
		var mixer = mixitup(containerEl);
	}

});

(function($) {
	/*------------------
		Navigation
	--------------------*/
	$(".main-menu").slicknav({
        appendTo: '.header-section',
		allowParentLinks: true,
		closedSymbol: '<i class="fa fa-angle-right"></i>',
		openedSymbol: '<i class="fa fa-angle-down"></i>'
	});
	
	$('.slicknav_nav').prepend('<li class="header-right-warp"></li>');
    $('.header-right').clone().prependTo('.slicknav_nav > .header-right-warp');

	/*------------------
		Background Set
	--------------------*/
	// $('.set-bg').each(function() {
	// 	var bg = $(this).data('setbg');
	// 	$(this).css('background-image', 'url(' + bg + ')');
	// });

	
	// $('.hero-slider').owlCarousel({
	// 	loop: true,
	// 	nav: false,
	// 	dots: true,
	// 	mouseDrag: false,
	// 	animateOut: 'fadeOut',
	// 	animateIn: 'fadeIn',
	// 	items: 1,
	// 	autoplay: true
	// });

})(jQuery);



function toggleSignup(){
    console.log("toggle signup has been clicked")
    document.getElementById("login-toggle").style.backgroundColor="#fff";
    document.getElementById("login-toggle").style.color="#222";
    document.getElementById("signup-toggle").style.backgroundColor="#fc0254";
    document.getElementById("signup-toggle").style.color="#fff";
    document.getElementById("login-form").style.display="none";
    document.getElementById("signup-form").style.display="block";
}

function toggleLogin(){
    console.log("toggle login has been clicked")
    document.getElementById("login-toggle").style.backgroundColor="#fc0254";
    document.getElementById("login-toggle").style.color="#fff";
    document.getElementById("signup-toggle").style.backgroundColor="#fff";
    document.getElementById("signup-toggle").style.color="#222";
    document.getElementById("signup-form").style.display="none";
    document.getElementById("login-form").style.display="block";
}
