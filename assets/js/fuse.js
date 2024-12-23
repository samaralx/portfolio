(function($){

	"use strict";

/* ==========================================================================
   exists - Check if an element exists
   ========================================================================== */		
	
	function exists(e) {
		return $(e).length > 0;
	}

/* ==========================================================================
   isTouchDevice - return true if it is a touch device
   ========================================================================== */

	function isTouchDevice() {
		return !!('ontouchstart' in window) || ( !! ('onmsgesturechange' in window) && !! window.navigator.maxTouchPoints);
	}

/* ==========================================================================
   setDimensionsPieCharts
   ========================================================================== */
	
	function setDimensionsPieCharts() {

		$('.pie-chart').each(function() {

			var $t = $(this),
				n = $t.parent().width(),
				r = $t.attr("data-barSize");
			
			if (n < r) {
				r = n;
			}
			
			$t.css({
				"height": r, 
				"width": r, 
				"line-height": r + "px"
			}).find("i").css({
				"line-height": r + "px",
				"font-size": r / 3
			});
			
		});

	}

/* ==========================================================================
   animatePieCharts
   ========================================================================== */

	function animatePieCharts() {

		if(typeof $.fn.easyPieChart !== 'undefined'){

			$('.pie-chart:in-viewport').each(function() {
	
				var $t = $(this),
					n = $t.parent().width(),
					r = $t.attr("data-barSize"),
					l = "square";
				
				if ($t.attr("data-lineCap") !== undefined) {
					l = $t.attr("data-lineCap");
				} 
				
				if (n < r) {
					r = n;
				}
				
				$t.easyPieChart({
					animate: 1300,
					lineCap: l,
					lineWidth: $t.attr("data-lineWidth"),
					size: r,
					barColor: $t.attr("data-barColor"),
					trackColor: $t.attr("data-trackColor"),
					scaleColor: "transparent",
					onStep: function(from, to, percent) {
						$(this.el).find('.pie-chart-percent span').text(Math.round(percent));
					}
	
				});
				
			});
			
		}

	}

/* ==========================================================================
   animateMilestones
   ========================================================================== */

	function animateMilestones() {

		$('.milestone:in-viewport').each(function() {
			
			var $t = $(this),
				n = $t.find(".milestone-value").attr("data-stop"),
				r = parseInt($t.find(".milestone-value").attr("data-speed"), 10);
				
			if (!$t.hasClass("already-animated")) {
				$t.addClass("already-animated");
				$({
					countNum: $t.find(".milestone-value").text()
				}).animate({
					countNum: n
				}, {
					duration: r,
					easing: "linear",
					step: function() {
						$t.find(".milestone-value").text(Math.floor(this.countNum));
					},
					complete: function() {
						$t.find(".milestone-value").text(this.countNum);
					}
				});
			}
			
		});

	}

/* ==========================================================================
   animateProgressBars
   ========================================================================== */

	function animateProgressBars() {

		$('.progress-bar .progress-bar-outer:in-viewport').each(function() {
			
			var $t = $(this);
			
			if (!$t.hasClass("already-animated")) {
				$t.addClass("already-animated").animate({
					width: $t.attr("data-width") + "%"
				}, 2000);
			}
			
		});

	}

/* ==========================================================================
   enableParallax
   ========================================================================== */

	function enableParallax() {

		// vertical parallax
		if(typeof $.fn.parallax !== 'undefined'){
			
			$('.parallax').each(function() {
	
				var $t = $(this);
				$t.addClass("parallax-enabled").parallax("49%", 0.1, false);
	
			});
			
		}
		
		// horizontal parallax
		if(typeof $.fn.hparallax !== 'undefined'){
		
			$('.horizontal-parallax').each(function() {
	
				var $t = $(this);
				$t.addClass("horizontal-parallax-enabled").hparallax();
	
			});
			
		}
		
		//animated parallax
		if(typeof $.fn.animatedparallax !== 'undefined'){
		
			$('.animated-parallax').each(function() {
	
				var $t = $(this);
				$t.addClass("animated-parallax-enabled").animatedparallax();
	
			});
		
		}

	}

/* ==========================================================================
   handleContactForm - validate and ajax submit contat form
   ========================================================================== */

	function handleContactForm() {
	
		if(typeof $.fn.validate !== 'undefined'){
			
			$('#contact-form').validate({
				errorClass: 'validation-error', // so that it doesn't conflict with the error class of alert boxes
				rules: {
					name: {
						required: true
					},
					email: {
						required: true,
						email: true
					},
					subject: {
						required: true
					},
					message: {
						required: true
					}
				},
				messages: {
					name: {
						required: "Field is required!"
					},
					email: {
						required: "Field is required!",
						email: "Please enter a valid email address"
					},
					subject: {
						required: "Field is required!"
					},
					message: {
						required: "Field is required!"
					}
				},
				submitHandler: function(form) {
					var result;
					$(form).ajaxSubmit({
						type: "POST",
						data: $(form).serialize(),
						url: "assets/php/send.php",
						success: function(msg) {
							
							if (msg === 'OK') {
								result = '<div class="alert success"><i class="fa fa-check-circle-o"></i>The message has been sent!</div>';
								$('#contact-form').clearForm();
							} else {
								result = '<div class="alert error"><i class="fa fa-times-circle"></i>' + msg + '</div>';
							}
							$("#formstatus").html(result);
		
						},
						error: function() {
		
							result = '<div class="alert error"><i class="fa fa-times-circle"></i>There was an error sending the message!</div>';
							$("#formstatus").html(result);
		
						}
					});
				}
			});
			
		}
		
	}


/* ==========================================================================
   handleMobileMenu 
   ========================================================================== */		

	var MOBILEBREAKPOINT = 1299;

	function handleMobileMenu() {

		if ($(window).width() > MOBILEBREAKPOINT) {
			
			$("#mobile-menu").hide();
			$("#mobile-menu-trigger").removeClass("mobile-menu-opened").addClass("mobile-menu-closed");
		
		} else {
			
			if (!exists("#mobile-menu")) {
				
				$("#menu").clone().attr({
					id: "mobile-menu",
					"class": "fixed"
				}).insertAfter("#header");
				
				$("#mobile-menu > li > a, #mobile-menu > li > ul > li > a").each(function() {
					var $t = $(this);
					if ($t.next().hasClass('sub-menu') || $t.next().is('ul') || $t.next().is('.sf-mega')) {
						$t.append('<span class="fa fa-angle-down mobile-menu-submenu-arrow mobile-menu-submenu-closed"></span>');
					}
				});
			
				$(".mobile-menu-submenu-arrow").on("click", function(event) {
					var $t = $(this);
					if ($t.hasClass("mobile-menu-submenu-closed")) {
						$t.removeClass("mobile-menu-submenu-closed fa-angle-down").addClass("mobile-menu-submenu-opened fa-angle-up").parent().siblings("ul, .sf-mega").slideDown(300);
					} else {
						$t.removeClass("mobile-menu-submenu-opened fa-angle-up").addClass("mobile-menu-submenu-closed fa-angle-down").parent().siblings("ul, .sf-mega").slideUp(300);
					}
					event.preventDefault();
				});
				
				$("#mobile-menu li, #mobile-menu li a, #mobile-menu ul").attr("style", "");
				
			}
			
		}

	}

/* ==========================================================================
   showHideMobileMenu
   ========================================================================== */

	function showHideMobileMenu() {
		
		$("#mobile-menu-trigger").on("click", function(event) {
			
			var $t = $(this),
				$n = $("#mobile-menu");
			
			if ($t.hasClass("mobile-menu-opened")) {
				$t.removeClass("mobile-menu-opened").addClass("mobile-menu-closed");
				$n.slideUp(300);
			} else {
				$t.removeClass("mobile-menu-closed").addClass("mobile-menu-opened");
				$n.slideDown(300);
			}
			event.preventDefault();
			
		});
		
	}
	
/* ==========================================================================
   handleAccordionsAndToogles
   ========================================================================== */
   
   function handleAccordionsAndToogles() {
	   
		// accordion
		
		$(".accordion .accordion-item").on("click", function(e) {
			e.preventDefault();
			if($(this).next("div").is(":visible")){
				$(this).removeClass('active').next("div").slideUp("slow");
			} else {
				$('.accordion .accordion-item').removeClass('active');
				$(".accordion .accordion-item-content").slideUp("slow");
				$(this).addClass('active').next("div").slideToggle("slow");
			}
		});
		
		$(".accordion .accordion-item:eq(0)").trigger('click').addClass('active');
		
		// toggle
		
		$(".toggle .toggle-item").on("click", function(e) {
			e.preventDefault();
			$(this).toggleClass('active').next("div").slideToggle("slow");
		});
		
		$(".toggle .toggle-item:eq(0)").trigger('click').addClass('active');
   
   }   
   
/* ==========================================================================
   handleBackToTop
   ========================================================================== */
   
   function handleBackToTop() {
	   
		$('#back-to-top').on("click", function(){
			$('html, body').animate({scrollTop:0}, 'slow');
			return false;
		});
   
   }
   	
/* ==========================================================================
   showHidebackToTop
   ========================================================================== */	
	
	function showHidebackToTop() {
	
		if ($(window).scrollTop() > $(window).height() / 2 ) {
			$("#back-to-top").removeClass('gone').addClass('visible');
		} else {
			$("#back-to-top").removeClass('visible').addClass('gone');
		}
	
	}

/* ==========================================================================
   handleVideoBackground
   ========================================================================== */
   
	var min_w = 0, 					
		video_width_original = 1920,
		video_height_original = 1080,
		vid_ratio = 1920/1080;
   
	function handleVideoBackground() {
	   
		$('.fullwidth-section .fullwidth-section-video').each(function(i){

			var $sectionWidth = $(this).closest('.fullwidth-section').outerWidth(),
				$sectionHeight = $(this).closest('.fullwidth-section').outerHeight();
			
			$(this).width($sectionWidth).height($sectionHeight);

			// calculate scale ratio
			var scale_h = $sectionWidth / video_width_original,
				scale_v = $sectionHeight / video_height_original, 
				scale = scale_h > scale_v ? scale_h : scale_v;

			// limit minimum width
			min_w = vid_ratio * ($sectionHeight+20);
			
			if (scale * video_width_original < min_w) {scale = min_w / video_width_original;}
					
			$(this).find('video').width(Math.ceil(scale * video_width_original +2)).height(Math.ceil(scale * video_height_original +2));
			
		});

	}
   	
/* ==========================================================================
   handleSearch
   ========================================================================== */
   
	function handleSearch() {	
		
		$(document).on('click', '#custom-search-button', function(e) { 
	
			e.preventDefault();			
			$(this).next("div").fadeToggle(400);
			
		});	
		
		$('#custom-search-form').append('<a class="custom-search-form-close" href="#" title="Close Search Box">x</a>');
		
		$(document).on("click", "#custom-search-form-container a.custom-search-form-close", function(e){
			
			e.preventDefault();
			$('#custom-search-form-container').fadeOut(300);
			
		});
		
	 }

/* ==========================================================================
   handleStickyHeader
   ========================================================================== */	 
	
	var stickyHeader = false;
	var stickypoint = 1;
	
	if ($('body').hasClass('sticky-header')){
		stickyHeader = true;
	}		
	
	function handleStickyHeader() {
	
		var b = document.documentElement,
        	e = false;

		function f() {
			
			window.addEventListener("scroll", function (h) {
				
				if (!e) {
					e = true;
					setTimeout(d, 0);
				}
			}, false);
			
			window.addEventListener("load", function (h) {
				
				if (!e) {
					e = true;
					setTimeout(d, 0);
				}
			}, false);
		}
	
		function d() {
			
			var h = c();
			
			if (h >= stickypoint) {
				$('#header').addClass("stuck");
			} else {
				$('#header').removeClass("stuck");
			}
			
			e = false;
		}
	
		function c() {
			
			return window.pageYOffset || b.scrollTop;
			
		}
		
		f();
		
	}

// -------------------------------------------------------------------------------------------------------
//  handleFullScreen
// -------------------------------------------------------------------------------------------------------
	
	function handleFullScreen() {
	
		var x = $(window).height();
		
		$('.fullscreen').css("height", x + "px");
		
	}
	
/* ==========================================================================
   When document is ready, do
   ========================================================================== */
   
	$(document).ready(function(){
		
		// text rotator
		
        if(typeof $.fn.textrotator !== 'undefined'){
		
			$(".text-rotate").textrotator({
			  animation: "dissolve", // You can pick the way it animates when rotating through words. Options are dissolve (default), fade, flip, flipUp, flipCube, flipCubeUp and spin.
			  separator: ",", // If you don't want commas to be the separator, you can define a new separator (|, &, * etc.) by yourself using this field.
			  speed: 4000 // How many milliseconds until the next word show.
			});
		
		}
		
		// Youtube video background
		// https://github.com/pupunzi/jquery.mb.YTPlayer
		
		if(typeof $.fn.mb_YTPlayer !== 'undefined'){
		
			$('.player').mb_YTPlayer();
		
		}
	
		// Superfish - enhance pure CSS drop-down menus
		// http://users.tpg.com.au/j_birch/plugins/superfish/options/
		
		if(typeof $.fn.superfish !== 'undefined'){
			
			$('#menu').superfish({
				delay: 500,
				animation: {opacity:'show',height:'show'},
				speed: 100,
				cssArrows: true
			});
			
		}
		
		// bxSlider - responsive slider
		// http://bxslider.com/options
		
		if(typeof $.fn.bxSlider !== 'undefined'){
			
			$('.image-rotator .slides').bxSlider({
				 mode: 'fade',							// Type of transition between slides: 'horizontal', 'vertical', 'fade'		
				 speed: 200,							// Slide transition duration (in ms)
				 infiniteLoop: true,					// If true, clicking "Next" while on the last slide will transition to the first slide and vice-versa.
				 hideControlOnEnd: false,				// If true, "Next" control will be hidden on last slide and vice-versa. Only used when infiniteLoop: false
				 pager: false,							// If true, a pager will be added
				 pagerType: 'full',						// If 'full', a pager link will be generated for each slide. If 'short', a x / y pager will be used (ex. 1/5)
				 controls: false,						// If true, "Next" / "Prev" controls will be added
				 auto: true,							// If true, slides will automatically transition
				 pause: 4000,							// The amount of time (in ms) between each auto transition
				 autoHover: false,						// Auto show will pause when mouse hovers over slider
				 useCSS: false 							// If true, CSS transitions will be used for animations. False, jQuery animations. Setting to false fixes problem with jQuery 2.1.0 and mode:horizontal
			});
			
			$('.images-slider .slides').bxSlider({
				 mode: 'fade',							// Type of transition between slides: 'horizontal', 'vertical', 'fade'		
				 speed: 500,							// Slide transition duration (in ms)
				 infiniteLoop: true,					// If true, clicking "Next" while on the last slide will transition to the first slide and vice-versa.
				 hideControlOnEnd: false,				// If true, "Next" control will be hidden on last slide and vice-versa. Only used when infiniteLoop: false
				 pager: true,							// If true, a pager will be added
				 pagerType: 'full',						// If 'full', a pager link will be generated for each slide. If 'short', a x / y pager will be used (ex. 1/5)
				 controls: true,						// If true, "Next" / "Prev" controls will be added
				 auto: true,							// If true, slides will automatically transition
				 pause: 4000,							// The amount of time (in ms) between each auto transition
				 autoHover: true,						// Auto show will pause when mouse hovers over slider
				 useCSS: false 							// If true, CSS transitions will be used for animations. False, jQuery animations. Setting to false fixes problem with jQuery 2.1.0 and mode:horizontal
			});
			
			$('.images-slider-2 .slides').bxSlider({
				 mode: 'horizontal',					// Type of transition between slides: 'horizontal', 'vertical', 'fade'		
				 speed: 500,							// Slide transition duration (in ms)
				 infiniteLoop: true,					// If true, clicking "Next" while on the last slide will transition to the first slide and vice-versa.
				 hideControlOnEnd: false,				// If true, "Next" control will be hidden on last slide and vice-versa. Only used when infiniteLoop: false
				 pager: true,							// If true, a pager will be added
				 pagerType: 'full',						// If 'full', a pager link will be generated for each slide. If 'short', a x / y pager will be used (ex. 1/5)
				 controls: false,						// If true, "Next" / "Prev" controls will be added
				 auto: true,							// If true, slides will automatically transition
				 pause: 4000,							// The amount of time (in ms) between each auto transition
				 autoHover: true,						// Auto show will pause when mouse hovers over slider
				 useCSS: false 							// If true, CSS transitions will be used for animations. False, jQuery animations. Setting to false fixes problem with jQuery 2.1.0 and mode:horizontal
			});
			
			$('.testimonial-slider .slides').bxSlider({
				 mode: 'vertical',						// Type of transition between slides: 'horizontal', 'vertical', 'fade'		
				 speed: 200,							// Slide transition duration (in ms)
				 infiniteLoop: true,					// If true, clicking "Next" while on the last slide will transition to the first slide and vice-versa.
				 hideControlOnEnd: false,				// If true, "Next" control will be hidden on last slide and vice-versa. Only used when infiniteLoop: false
				 pager: true,							// If true, a pager will be added
				 pagerType: 'full',						// If 'full', a pager link will be generated for each slide. If 'short', a x / y pager will be used (ex. 1/5)
				 controls: false,						// If true, "Next" / "Prev" controls will be added
				 auto: true,							// If true, slides will automatically transition
				 pause: 4000,							// The amount of time (in ms) between each auto transition
				 autoHover: true,						// Auto show will pause when mouse hovers over slider
				 useCSS: false							// If true, CSS transitions will be used for animations. False, jQuery animations. Setting to false fixes problem with jQuery 2.1.0 and mode:horizontal
			});
			
			$('.features-slider .slides').bxSlider({
				 mode: 'fade',							// Type of transition between slides: 'horizontal', 'vertical', 'fade'		
				 speed: 500,							// Slide transition duration (in ms)
				 infiniteLoop: true,					// If true, clicking "Next" while on the last slide will transition to the first slide and vice-versa.
				 hideControlOnEnd: false,				// If true, "Next" control will be hidden on last slide and vice-versa. Only used when infiniteLoop: false
				 pager: true,							// If true, a pager will be added
				 pagerType: 'full',						// If 'full', a pager link will be generated for each slide. If 'short', a x / y pager will be used (ex. 1/5)
				 controls: true,						// If true, "Next" / "Prev" controls will be added
				 auto: true,							// If true, slides will automatically transition
				 pause: 4000,							// The amount of time (in ms) between each auto transition
				 autoHover: true,						// Auto show will pause when mouse hovers over slider
				 useCSS: false 							// If true, CSS transitions will be used for animations. False, jQuery animations. Setting to false fixes problem with jQuery 2.1.0 and mode:horizontal
			});
			
		}
				
		// Magnific PopUp - responsive lightbox
		// http://dimsemenov.com/plugins/magnific-popup/documentation.html
		
		if(typeof $.fn.magnificPopup !== 'undefined'){
		
			$('.magnificPopup').magnificPopup({
				disableOn: 400,
				closeOnContentClick: true,
				type: 'image'
			});
			
			$('.magnificPopup-gallery').magnificPopup({
				disableOn: 400,
				type: 'image',
				gallery: {
					enabled: true
				}
			});
		
		}

		// EasyTabs - tabs plugin
		// https://github.com/JangoSteve/jQuery-EasyTabs/blob/master/README.markdown
		
		if(typeof $.fn.easytabs !== 'undefined'){
			
			$('.tabs-container').easytabs({
				animationSpeed: 300,
				updateHash: false
			});
			
			$('.vertical-tabs-container').easytabs({
				animationSpeed: 300,
				updateHash: false
			});
		
		}
		
		// gMap -  embed Google Maps into your website; uses Google Maps v3
		// http://labs.mario.ec/jquery-gmap/
		
		if(typeof $.fn.gMap !== 'undefined'){
			
			$('.google-map').each(function() {
				
				var $t = $(this),
					mapZoom = 15,
					mapAddress = $t.attr("data-address"),
					mapCaption = $t.attr("data-caption"),
					mapType = "ROADMAP",
					mapHeight = $t.attr("data-mapheight"),
					popUp = false;
				
				if ($t.attr("data-zoom") !== undefined) {
					mapZoom = parseInt($t.attr("data-zoom"),10);
				}	
				
				if ($t.attr("data-mapHeight") !== undefined) {
					$t.css( "height", mapHeight+'px');
				}
				
				if ($t.attr("data-maptype") !== undefined) {
					mapType = $t.attr("data-maptype");
				} 
				
				if ($t.attr("data-popup") !== undefined) {
					popUp = $t.data("popup");
				} 
				
				$t.gMap({
					maptype: mapType,
					scrollwheel: false,
					zoom: mapZoom,
					markers: [{
						address: mapAddress,
						html: mapCaption,
						popup: popUp
					}],
					controls: {
						panControl: true,
						zoomControl: true,
						mapTypeControl: true,
						scaleControl: false,
						streetViewControl: false,
						overviewMapControl: false
					}
				});
		
			});
			
		}
		
		// Isotope - portfolio filtering
		// http://isotope.metafizzy.co/beta/
		
		if ((typeof $.fn.isotope !== 'undefined') && (typeof $.fn.imagesLoaded !== 'undefined') && ($('.portfolio-isotope').length > 0)) {
			
			// initialize isotope after images are loaded
			
			$('.portfolio-isotope').imagesLoaded( function() {
			
				var container = $('.portfolio-isotope');
					
				container.isotope({
					itemSelector: '.item',
					layoutMode: 'masonry',
					transitionDuration: '0.5s'
				});
		
				$('.portfolio-filter li a').on("click", function () {
					$('.portfolio-filter li a').removeClass('active');
					$(this).addClass('active');
		
					var selector = $(this).attr('data-filter');
					container.isotope({
						filter: selector
					});
		
					return false;
				});
		
				$(window).resize(function () {
		
					container.isotope({ });
				
				});
				
			});
			
			// Load More
			
			var portfolio_track_click = 0,
				portfolio_offset = 0,
				portfolio_items_loaded = 3;
		
			$('.load-more').on("click", function(event) {
				
				event.preventDefault();
				
				$.ajax({					
					type: "POST",
					url: $(this).attr("data-file"),
					dataType: "html",
					cache: false,
					msg : '',
					success: function(data){
						var items  = $(data).filter('.item'),
							length = items.length,
							html   = '';
						if( length > 0 ){

							if( portfolio_offset !== length ){

								for( var i = 0; portfolio_offset < length && i < portfolio_items_loaded; portfolio_offset++, i++ ){
									html += items.eq( portfolio_offset ).prop('outerHTML');
								}

								$('.portfolio-isotope').append(html);

								$('.portfolio-isotope').imagesLoaded( function() {

									$(window).trigger( 'resize' );
									$('.portfolio-isotope').isotope('reloadItems').isotope();

								});
								if( length <= portfolio_items_loaded || portfolio_offset == length ){
									$('.load-more').text('No more Posts to show').css({"cursor":"default"});
								}

								$('.magnificPopup-gallery').magnificPopup({
									disableOn: 400,
									type: 'image',
									gallery: {
										enabled: true
									}
								});	
								
							} else {
								$('.load-more').text('No more Posts to show').css({"cursor":"default"});
							}

						} else {
							$('.load-more').text('No more Posts to show').css({"cursor":"default"});
						}

					}					
				});
				
			});
			
			//
				
		}
		
		// countdown
		
		if (typeof $.fn.countdown !== 'undefined') {
		
			$("#countdown").countdown({ until: new Date(2016, 7-1, 9)}); 
		
		}
		
		//
		
		function doAnimations(elements) {
			var animationEndEvents = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
			elements.each(function() {
				var $t = $(this);
				var animationDelay = $t.data('delay') || '0';
				var animationType = 'animated ' + $t.data('animation');
				$t.css({
					'animation-delay': animationDelay,
					'-webkit-animation-delay': animationDelay
				});
				$t.addClass(animationType).one(animationEndEvents, function() {
					$t.removeClass(animationType);
				});
			});
		}
	
		// slickSlider - responsive slider
		// http://kenwheeler.github.io/slick
		
		if (typeof $.fn.slick !== 'undefined') {

			$('.main-slider').each(function() {
				
				var $t = $(this);
				
				var $slider = $t.find('.main-slider__slides');

				var $slider_config = {
						fade: true,
						speed: 500,
						autoplay: true,
						infinite: true,
						pager: false,
						controls: true	
					};

				$slider.on('init', function(e, slick) {
					var $firstAnimatingElements = $('.slick-slide:first-child').find('[data-animation]');
					doAnimations($firstAnimatingElements);    
				});
				
				$slider.on('beforeChange', function(e, slick, currentSlide, nextSlide) {
					var $animatingElements = $('.slick-slide[data-slick-index="' + nextSlide + '"]').find('[data-animation]');
					doAnimations($animatingElements);    
				});
					
				$slider.slick({
					
					adaptiveHeight: true,
					
					fade: $slider_config.fade,
					cssEase: 'linear',
					
					speed: $slider_config.speed,
					
					autoplay: $slider_config.autoplay,
					
					infinite: $slider_config.infinite,

					arrows: $slider_config.controls,
					appendArrows: $t.find('.main-slider__arrows'),
					prevArrow: '<a class="slick-prev" href="#"><i class="ifc-left"></i></a>',
					nextArrow: '<a class="slick-next" href="#"><i class="ifc-right"></i></a>',
					
					dots: $slider_config.pager,
					appendDots: $t.find('.main-slider__pager')
					
				});
		
			});

		}
		
		//
		
		
		if(stickyHeader && ($(window).width() > 1024)){ 
			handleStickyHeader();
		}
		
		setDimensionsPieCharts();
		
		animatePieCharts();
		animateMilestones();
		animateProgressBars();

		if (!isTouchDevice()) {
			enableParallax();
		}

		handleContactForm();
		
		handleMobileMenu();
		showHideMobileMenu();
		
		handleAccordionsAndToogles();
		
		handleBackToTop();
		showHidebackToTop();
		
		handleFullScreen();
		
		handleVideoBackground();
		
		handleSearch();

	});

/* ==========================================================================
   When the window is scrolled, do
   ========================================================================== */
   
	$(window).scroll(function() {				   
		
		if(stickyHeader && ($(window).width() > 1024)){ 
			handleStickyHeader();
		}
		
		animateMilestones();
		animatePieCharts();
		animateProgressBars();
		
		showHidebackToTop();
		
	});

/* ==========================================================================
   When the window is resized, do
   ========================================================================== */
   
	$(window).resize(function() {
		
		if(stickyHeader && ($(window).width() > 1024)){ 
			handleStickyHeader();
		}	
		
		handleMobileMenu();
		handleFullScreen();
		handleVideoBackground();			
		
	});
	

})(window.jQuery);

// non jQuery scripts below