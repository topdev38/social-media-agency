(function($) {

    "use strict";
    $('.contact-form').submit(function(e){
        e.preventDefault();
        this.submit();
        // this.reset();
        $('#id_name').val('');
        $('#id_email').val('');
        $('#id_message').val('');
        $('.submit-button').prop('disabled', true);
    });
    function Validation($this){
        var value = $this.val();
        if($this.parent().has('span')){ $this.parent().find('span').remove(); }

        if($this.parent().has('.error-message')){ $this.parent().find('.error-message').remove(); }

        if(value.length == 0){ 
            $this.parent().prepend("<span class='fa fa-exclamation error-status'></span>");
            $this.parent().append("<div class='error-message' style='color:red;padding:10px;'>This is a required field</span>");
            $this.removeClass('no-error-element');
            $this.addClass('error-element');
            return false
        }else if(($this.attr('id') == 'id_email' && !value.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/))){
            $this.parent().prepend("<span class='fa fa-exclamation error-status'></span>");
            $this.parent().append("<div class='error-message' style='color:red;padding-10px;'>Please enter a valid email address!</span>");
            $this.removeClass('no-error-element');
            $this.addClass('error-element');
            return false
        }

        $this.parent().prepend("<span class='fa fa-check-circle no-error'></span>");
        $this.removeClass('error-element');
        $this.addClass('no-error-element');
        return true
        
    }
    function FullValidation(){
        if(Validation($('#id_name')) && Validation($('#id_email')) && Validation($('#id_message'))){
            $('.submit-button').removeClass('disable-button');
            $('.submit-button').prop('disabled', false);
            $('.error-message').remove();
        }
        else{
            $('.submit-button').addClass('disable-button');
            $('.submit-button').prop('disabled', true);
            if($('.submit-content').has('.error-message').length==0)
                $('.submit-content').append("<div class='error-message' style='color:red;padding-10px;'>Please correct errors before submitting this form.</span>");

        }
    }
    $('#id_name').keyup(function(){
        Validation($(this));
        FullValidation();
    })
    $('#id_name').focusout(function(){
        Validation($(this));
        FullValidation();
    });
    $('#id_email').keyup(function(){
        Validation($(this));
        FullValidation();
    });
    $('#id_email').focusout(function(){
        Validation($(this));
        FullValidation();
    });
    $('#id_message').keyup(function(){
        Validation($(this));
        FullValidation();
    });
    $('#id_message').focusout(function(){
        Validation($(this));
        FullValidation();
    });
    $('#buttonsearch').click(function(){
        $('#formsearch').slideToggle( "slow",function(){
             $( '#content' ).toggleClass( "moremargin" );
        } );
        $('#searchbox').focus()
        $('.openclosesearch').toggle();
        $('.navbar-nav').toggle();
    });

    // Animated scroll specific section
    if ($("#scroll").length) {
        $('#scroll').on('click', function(e){     
            e.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1000, "easeInOutExpo");
            return false;
        });
    }

    // Animated scroll specific section
    if ($("#scroll").length) {
        $('#scroll').on('click', function(e){     
            e.preventDefault();
            $('html,body').animate({scrollTop:$(this.hash).offset().top}, 1000, "easeInOutExpo");
            return false;
        });
    }

    /*------------------------------------------
        = FUNCTIONS
    -------------------------------------------*/
    // Toggle mobile navigation
    function toggleMobileNavigation() {
        var navbar = $("#navbar");
        var openBtn = $(".navbar-header .open-btn");
        var closeBtn = $("#navbar .close-navbar");
        var navLinks = $("#navbar > ul > li > a");

        openBtn.on("click", function() {
            if (!navbar.hasClass("slideInn")) {
                navbar.addClass("slideInn");
            }
            return false;
        })

        closeBtn.on("click", function() {
            if (navbar.hasClass("slideInn")) {
                navbar.removeClass("slideInn");
            }
            return false;            
        })
        
        // navLinks.on("click", function() {
        //     if (navbar.hasClass("slideInn")) {
        //         navbar.removeClass("slideInn");
        //     }
        //     return false;            
        // })
    }

    toggleMobileNavigation();

    //ACTIVE CURRENT MENU WHILE SCROLLING
    // function for active menuitem
    var sections = $("section"),
        nav = $("#navbar"),
        nav_height = nav.outerHeight(),
        home = nav.find(" > ul > li:first");

    function activeMenuItem() {
        var cur_pos = $(window).scrollTop() + 2;

        sections.each(function() {
            var top = $(this).offset().top - nav_height - 40,
                bottom = top + $(this).outerHeight();

            if (cur_pos >= top && cur_pos <= bottom) {
                nav.find("> ul > li > a").parent().removeClass("current");
                nav.find("a[href='#" + $(this).attr('id') + "']").parent().addClass("current");
            } else if (cur_pos === 2) {
                nav.find("> ul > li > a").parent().removeClass("current");
                home.addClass("current");
            }
        });
    }

    // // smooth-scrolling
    // $(function() {
    //     $("#navbar > ul > li > a:not(.dropdown-toggle)").on("click", function() {
    //         if (location.pathname.replace(/^\//,'') === this.pathname.replace(/^\//,'') && location.hostname === this.hostname) {
    //             var target = $(this.hash);
    //             target = target.length ? target : $("[name=" + this.hash.slice(1) +"]");
    //             if (target.length) {
    //                 $("html, body").animate({
    //                 scrollTop: target.offset().top -90
    //             }, 1000, "easeInOutExpo");
    //                 return false;
    //             }
    //         }

    //         return false;
    //     });
    // });  


    // Parallax background
    function bgParallax() {
        if ($(".parallax").length) {
            $(".parallax").each(function() {
                var height = $(this).position().top;
                var resize     = height - $(window).scrollTop();
                var doParallax = -(resize/5);
                var positionValue   = doParallax + "px";
                var img = $(this).data("bg-image");

                $(this).css({
                    backgroundImage: "url(" + img + ")",
                    backgroundPosition: "50%" + positionValue,
                    backgroundSize: "cover"
                });
            });
        }
    }

    bgParallax();


    // set two coloumn height equial
    function setTwoColEqHeight($col1, $col2) {
        var firstCol = $col1,
            secondCol = $col2,
            firstColHeight = $col1.innerHeight(),
            secondColHeight = $col2.innerHeight();

        if (firstColHeight > secondColHeight) {
            secondCol.css({
                "height": firstColHeight + 1 + "px"
            })
        } else {
            firstCol.css({
                "height": secondColHeight + 1 + "px"
            })
        }
    } 

    // Hero slider background setting
    function sliderBgSetting() {
        if ($(".hero-slider .slide").length) {
            $(".hero-slider .slide").each(function() {
                var $this = $(this);
                var img = $this.find(".slider-bg").attr("src");

                $this.css({
                    backgroundImage: "url("+ img +")",
                    backgroundSize: "cover",
                    backgroundPosition: "center center"
                })
            });
        }
    }


     //Setting hero slider
    function heroSlider() {
        if ($(".hero-slider").length) {
            $(".hero-slider").owlCarousel({
                items: 1,
                autoplay: true,
                loop: true,
                mouseDrag: false,
                smartSpeed: 500,
                navSpeed: 500,
                dotsSpeed: 500
            });
        }
    }

    
    /*** AGENCY HERO SLIDER SETTING ***/
    function owl_carousel_page_numbers(e) {
        var items_per_page = e.page.size;

        if (items_per_page > 1){
            var min_item_index  = e.item.index,
                max_item_index  = min_item_index + items_per_page,
                display_text    = (min_item_index +1) + "-" + max_item_index;
        } else {
            var display_text = (e.item.index - 1);
        } 

        $("#info").html( "<span class='c-slide'>0" + display_text + "</span>" +  " / <span class='all-slide'>0" + e.item.count + "</span>");
    }

    if ($(".agency-slider").length) {
        var owl = $(".agency-slider");
        owl.on("initialized.owl.carousel changed.owl.carousel resized.owl.carousel", function(e) {   
            owl_carousel_page_numbers(e);   
        }).owlCarousel({
            items: 1,
            autoplay: true,
            loop: true,
            mouseDrag: false,
            smartSpeed: 500,
            navSpeed: 500,
            dotsSpeed: 500
        }).on("changed.owl.carousel", function(e) {
            owl_carousel_page_numbers(e);
        });
    }



    /*------------------------------------------
        = HIDE PRELOADER
    -------------------------------------------*/
    function preloader() {
        if($('.preloader').length) {
            $('.preloader').delay(100).fadeOut(100, function() {

                //active wow
                wow.init();

                heroSlider();

                // Add class to hero for animation
                if ($(".hero").length) {
                    var heroTitle = $(".hero .hero-title");
                    heroTitle.addClass("active");
                }

                // Add class to hero slider for animation
                if ($(".hero-slider").length) {
                    var heroTitle = $(".hero-slider");
                    heroTitle.addClass("active-animation");
                }

                // Add a container class in hero slider 
                if ($(".hero-slider-s2").length) {
                    var owlcontl = $(".hero-slider-s2 .owl-controls");
                    owlcontl.addClass("container owl-controls-container");
                }

            });
        }
    }


    /*------------------------------------------
        = STICKY HEADER
    -------------------------------------------*/
    function stickyHeader() {
        if ($(".site-header").length) {
            var navigation = $(".site-header > .navigation"),
                scroll = $(window).scrollTop(),
                top = $(".site-header > .topbar").height();

            if (scroll > top) {
                navigation.addClass("sticky");
            } else {
                navigation.removeClass("sticky");
            }
        }
    }

    // Architect home sticky header
    function stickyHeaderArchitect() {
        if ($(".architect-header").length) {
            var navigation = $(".architect-header > .navigation"),
                scroll = $(window).scrollTop(),
                top = $(".architect-header .navigation").height();

            if (scroll > top) {
                navigation.addClass("sticky");
            } else {
                navigation.removeClass("sticky");
            }       
        }
    }

    // Events home sticky header
    function stickyHeaderEvents() {
        if ($(".events-header").length) {
            var navigation = $(".events-header > .navigation");
            var scroll = $(window).scrollTop();
            var top = $(".events-header .navigation").height();

            if (scroll > top) {
                navigation.addClass("sticky");
            } else {
                navigation.removeClass("sticky");
            }

        }
    }


    /*------------------------------------------
        = TOPBAR LANGUAGE SELECT FUNCTION
    -------------------------------------------*/
    if ($("#language-select").length) {
        $('#language-select').selectpicker();
    }


    /*------------------------------------------
        = SKILL PROGRESS BAR FOR HOME PAGE ONE
    -------------------------------------------*/
    function circularProgressBar() {
        if ($(".skills .dial").length) {
            var $meter = $('.dial');
            $meter.appear();

            $(document.body).on('appear', '.dial', function() {
                var current_item = $(this);

                if (!current_item.hasClass('appeared')) {
                    current_item.addClass('appeared');

                    current_item.each(function() {
                        var $this = $(this);
                    
                        $this.knob({
                            "readOnly" :true,
                            "format" : function (value) {
                                return value + '%';
                            }
                        });

                        var animateValue = $this.attr("value");

                        $({animatedVal: 0}).animate({animatedVal: animateValue}, {
                            duration: 3000,
                            easing: "swing", 
                            step: function() { 
                                $this.val(Math.ceil(this.animatedVal)).trigger("change"); 
                            }
                        }); 

                    });
                }                
            });
        };    
    }

    circularProgressBar();



    /*------------------------------------------
        = FAN FACT COUNT
    -------------------------------------------*/
    if ($(".fun-fact").length || $(".charity-fun-fact ").length) {
        $('.counter').appear();
        $(document.body).on('appear', '.counter', function(e) {
            var $this = $(this),
            countTo = $this.attr('data-count');

            $({ countNum: $this.text()}).animate({
                countNum: countTo
            }, {
                duration: 3000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    }  



    /*------------------------------------------
        = WOW ANIMATION SETTING
    -------------------------------------------*/
    var wow = new WOW({
        boxClass:     'wow',      // default
        animateClass: 'animated', // default
        offset:       0,          // default
        mobile:       true,       // default
        live:         true        // default
    });


    /*------------------------------------------
        = ACTIVE POPUP IMAGE FANCYBOX
    -------------------------------------------*/  
    if ($(".fancybox").length) {
        $(".fancybox").fancybox({
            openEffect  : "elastic",
            closeEffect : "elastic",
            wrapCSS     : "project-fancybox-title-style"
        });
    }


    /*------------------------------------------
        = POPUP VIDEO
    -------------------------------------------*/  
    if ($(".video-btn").length) {
        $(".video-btn").on("click", function(){
            $.fancybox({
                href: this.href,
                type: $(this).data("type"),
                'title'         : this.title,
                helpers     : {  
                    title : { type : 'inside' },
                    media : {}
                },

                beforeShow : function(){
                    $(".fancybox-wrap").addClass("gallery-fancybox");
                }
            });
            return false
        });    
    }


    /*------------------------------------------
        = ACTIVE GALLERY POPUP IMAGE
    -------------------------------------------*/  
    if ($(".popup-gallery").length) {
        $('.popup-gallery').magnificPopup({
            delegate: 'a',
            type: 'image',

            gallery: {
              enabled: true
            },

            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });    
    }


    /*------------------------------------------
        = ACTIVE SINGLE IMAGE POPUP MGPOPUP
    -------------------------------------------*/  
    if ($(".mgf-popup").length) {
        $('.mgf-popup').magnificPopup({
            type: 'image',
            zoom: {
                enabled: true,

                duration: 300,
                easing: 'ease-in-out',
                opener: function(openerElement) {
                    return openerElement.is('img') ? openerElement : openerElement.find('img');
                }
            }
        });    
    }

    if ($(".popup-image").length) {
        $('.popup-image').magnificPopup({
            type: 'image'
        });   
    }



    /*------------------------------------------
        = FUNCTION FORM SORTING GALLERY
    -------------------------------------------*/
    function sortingGallery() {
        if ($(".project-gallery .project-filters").length) {
            var $container = $('.project-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".project-filters li a").on("click", function() {
                $('.project-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingGallery(); 


    /*------------------------------------------
        = TESTIMONIAL SLIDER
    -------------------------------------------*/
    if ($(".testimonials-slider").length) {
        $(".testimonials-slider").owlCarousel({
            autoplay:true,
            smartSpeed:300,
            items:2,
            loop:true,
            autoplayHoverPause:true,
            margin: 30,
            mouseDrag: false,
            responsive: {
                0 : {
                    items: 1
                },

                991 : {
                    items: 1
                },

                992 : {
                    items: 2
                }
            }
        });
    }


    /*------------------------------------------
        = PARTNER SLIDER
    -------------------------------------------*/
    if ($(".partner-slider").length) {
        $(".partner-slider").owlCarousel({
            autoplay:true,
            smartSpeed:300,
            items:4,
            loop:true,
            stagePadding: 60,
            margin: 60,
            autoplayHoverPause:true,
            mouseDrag: false,
            dots: false,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive: {
                0 : {
                    items: 1
                },

                500 : {
                    items: 2
                },

                600 : {
                    items: 3
                },

                992 : {
                    items: 4
                }
            }
        });
    }


    /*------------------------------------------
        = HEADER SEARCH AREA
    -------------------------------------------*/
    if ($(".header-search-area").length) {
        var serachFormBox = $(".header-search-area .header-search-form");
        var openSeachBtn = $(".header-search-area .open-btn");
        
        $(document.body).append(serachFormBox);
        serachFormBox.hide();

        openSeachBtn.on("click", function(e) {
            serachFormBox.slideDown();
            return false;
        });

        serachFormBox.on("click", function() {
            serachFormBox.slideUp();
            return false;
        }).find(".form").on("click", function(e) {
            e.stopPropagation();
        })
    }


    /*------------------------------------------
        = SERVICES STYLE 2 SLIDER
    -------------------------------------------*/
    if ($(".services-s2-slider").length) {
        $(".services-s2-slider").owlCarousel({
            autoplay:true,
            smartSpeed: 100,
            slideBy: 1,
            margin: 15,
            autoplayHoverPause:true,
            mouseDrag: false,
            responsive: {
                0 : {
                    items: 1
                },

                500 : {
                    items: 2
                },

                600 : {
                    items: 3
                },

                992 : {
                    items: 4
                }
            }
        });
    }


    /*------------------------------------------
        = LATEST CAUSES PROGRESS BAR
    -------------------------------------------*/
    function skillProgress() {
        if ($(".progress-bar").length) {
            var $progress_bar = $('.progress-bar');
            $progress_bar.appear();
            $(document.body).on('appear', '.progress-bar', function() {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    var percent = current_item.data('percent');
                    current_item.css('width', percent + '%').addClass('appeared');
                    current_item.parent().append('<span>' + percent + '%' + '</span>');
                }
                
            });
        };
    }

    skillProgress();


    /*------------------------------------------
        = CHART
    -------------------------------------------*/
    function skillChart() {
        if ($("#chart").length) {

            var $chart = $("#chart");
            $chart.appear();
            $(document.body).on('appear', '#chart', function() {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    current_item.addClass('appeared');

                    var ctx = $("#chart");
                    var lineChart = new Chart(ctx, {
                        type: "line",
                        data: {
                            labels: ["May", "June", "July", "Aug"],
                            datasets: [
                                {
                                    label: "Web Elements",
                                    data: [2000, 3500, 2900, 4800, 1000, 8000],
                                    backgroundColor: "rgba(252,206,0, 0.5)",
                                    borderColor: "#fcce00",
                                    borderWidth: 2,
                                    lineTension: 0,
                                    pointRadius: 4,
                                    pointBorderColor: "#081f65",
                                    pointBackgroundColor: "#fff"

                                },

                                {
                                    label: "PSD Themes",
                                    data: [3000, 5000,4000, 6500, 1000, 8000],
                                    backgroundColor: "rgba(99,112,158, 0.5)",
                                    borderColor: "#14296a",
                                    borderWidth: 2,
                                    lineTension: 0,
                                    pointRadius: 4,
                                    pointBorderColor: "#fcce00",
                                    pointBackgroundColor: "#fff"

                                },

                            ]
                        },
                        options: {
                            maintainAspectRatio: false,
                            animation: {
                                duration: 2500,
                            }
                        }
                    });
                }                
            });
        }
    }


    skillChart();


    /*------------------------------------------
        = SERVICES STYLE 2 SLIDER
    -------------------------------------------*/
    if ($(".services-s3-slider").length) {
        $(".services-s3-slider").owlCarousel({
            autoplay:true,
            smartSpeed: 100,
            stagePadding: 10,
            slideBy: 1,
            margin: 30,
            autoplayHoverPause:true,
            mouseDrag: false,
            loop: true,
            responsive: {
                0 : {
                    items: 1
                },

                600 : {
                    items: 2
                },

                992 : {
                    items: 3
                }
            }
        });
    }


    /*------------------------------------------
        = ARCHITECTS PROJECTS SLIDER
    -------------------------------------------*/
    if ($(".architects-projects-slider-wrapper").length) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            draggable: false,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            focusOnSelect: true,
            prevArrow: '<i class="fa fa-arrow-left"></i>',
            nextArrow: '<i class="fa fa-arrow-right"></i>',

            responsive: [
                {
                  breakpoint: 500,
                  settings: {
                    slidesToShow: 3,
                    infinite: true
                  }
                }
            ]

        });
    }    


    /*-------------------------------------------------------
        = ARCHITECTS BLOG IMAGE SETTGING FOR BETTER VIEW
    -----------------------------------------------------*/
    if ($(".architects-blog").length) {
        var post = $(".architects-blog .post");

        post.each(function() {
            var $this = $(this);
            var entryMedia = $this.find(".entry-media");
            var entryMediaPic = entryMedia.find("img").attr("src");

            entryMedia.css({
                backgroundImage: "url("+ entryMediaPic +")",
                backgroundSize: "cover",
                backgroundPosition: "center center"
            })
        })
    }    


    /*------------------------------------------
        = ARCHITECTS TESTIMONIALS SLIDER
    -------------------------------------------*/
    if ($(".architects-testimonial-slider").length) {

        var elem = $(".architects-testimonial-slider");

        var owl = elem.owlCarousel({
            items: 1,
            dotsContainer: '#carousel-custom-dots'
        });

        $(".owl-dot").on("click", function() {
            owl.trigger("to.owl.carousel", [$(this).index(), 300]);
        });
    }


    /*------------------------------------------
        = CONSTRUCTION TEAM SLIDER
    -------------------------------------------*/
    if ($(".construction-team-slider").length) {
        $(".construction-team-slider").owlCarousel({
            smartSpeed:300,
            items:4,
            loop:true,
            autoplayHoverPause:true,
            stagePadding: 10,
            margin: 20,
            mouseDrag: false,
            responsive: {
                0 : {
                    items: 1
                },

                500 : {
                    items: 2
                },

                991 : {
                    items: 3
                },

                1200 : {
                    items: 4
                }
            }
        });
    }


    /*------------------------------------------
        = CONSTRUCTION FUNFACT
    -------------------------------------------*/  
    if ($(".construction-fun-fact").length) {

        $('.counter').appear();

        $(document.body).on('appear', '.counter', function(e) {
            var $this = $(this),
            countTo = $this.attr('data-count');

            $({ countNum: $this.text()}).animate({
                countNum: countTo
            }, {
                duration: 2000,
                easing:'linear',
                step: function() {
                    $this.text(Math.floor(this.countNum));
                },
                complete: function() {
                    $this.text(this.countNum);
                }
            });
        });
    } 


    /*------------------------------------------
        = CHARITY IMPORTANT CAUSES METER
    -------------------------------------------*/
    if ($(".meter3").length) {
        var $meter = $('.meter3');
        $meter.appear();
        $(document.body).on('appear', '.meter3', function() {
            var current_item = $(this);
            if (!current_item.hasClass('appeared')) {
                current_item.addClass('appeared');
                $(".meter3").circleProgress({
                    size: 125,
                    thickness: 7,
                    fill: "#fff",
                    emptyFill: "transparent",
                    lineCap: "round",
                    animation: {
                         duration: 2000
                    }
                }).on('circle-animation-progress', function(event, progress, stepValue) {
                    var $this = $(this);
                    $this.find('span').html(Math.round(100 * stepValue) + '<i>%</i>');
                });
            }                
        });
    }


    /*------------------------------------------
        = CHARITY NEXT EVENT COLCK
    -------------------------------------------*/
    if ($("#event-clock").length) {
        $('#event-clock').countdown('2017/06/31', function(event) {
            var $this = $(this).html(event.strftime(''
            + '<div class="box"><div>%D</div> <span>Days</span> </div>'
            + '<div class="box"><div>%H</div> <span>Hours</span> </div>'
            + '<div class="box"><div>%M</div> <span>Mins</span> </div>'
            + '<div class="box"><div>%S</div> <span>Secs</span> </div>'));
        });
    }

    if ($("#event-clock2").length) {
        $('#event-clock2').countdown('2017/03/31', function(event) {
            var $this = $(this).html(event.strftime(''
            + '<div class="box"><div>%D</div> <span>Days</span> </div>'
            + '<div class="box"><div>%H</div> <span>Hours</span> </div>'
            + '<div class="box"><div>%M</div> <span>Mins</span> </div>'
            + '<div class="box"><div>%S</div> <span>Secs</span> </div>'));
        });
    }


    /*------------------------------------------
        = CHARITY EVENTS SLIDER
    -------------------------------------------*/
    if ($(".charity-events-slider").length) {
        $(".charity-events-slider").owlCarousel({
            smartSpeed: 500,
            items: 1,
            autoplayHoverPause:true,
            mouseDrag: false,
            dots: false,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
        });
    }


    /*------------------------------------------
        = FUNCTION FOR CHARITY SORTING GALLERY
    -------------------------------------------*/
    function sortingCharityGallery() {
        if ($(".charity-gallery .gallery-filters").length) {
            var $container = $('.gallery-container');
            $container.isotope({
                filter:'*',
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false,
                }
            });

            $(".gallery-filters li a").on("click", function() {
                $('.gallery-filters li .current').removeClass('current');
                $(this).addClass('current');
                var selector = $(this).attr('data-filter');
                $container.isotope({
                    filter:selector,
                    animationOptions: {
                        duration: 750,
                        easing: 'linear',
                        queue: false,
                    }
                });
                return false;
            });
        }
    }

    sortingCharityGallery();


    /*------------------------------------------
        = EVENT HOME LOCATION MAP
    -------------------------------------------*/
    function map() {
        var myLatLng = new google.maps.LatLng(40.6700, -73.9400);
        var mapProp = {
            center: myLatLng,
            zoom: 11,
            scrollwheel: false 
        };

        var map = new google.maps.Map(document.getElementById("event-location-map"),mapProp);
        var marker = new google.maps.Marker({
            position:myLatLng,
            icon:'images/events/map-marker.png'
        });

        var contentString = '<div id="map-details">'+
            '<div class="body-content">' +
                '<h4>East CS Auditorium</h4>'+
                '<p>Outreach Operations, 1111 West Jackson Avenue <br />Oxford, MS  38655 </p>'+
            '</div>'+
            '</div>';

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        infowindow.open(map,marker);
        marker.setMap(map);

        map.set('styles',
            [
                {
                    "featureType": "all",
                    "elementType": "labels.text.fill",
                    "stylers": [
                        {
                            "saturation": 36
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 40
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.text.stroke",
                    "stylers": [
                        {
                            "visibility": "on"
                        },
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "all",
                    "elementType": "labels.icon",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "administrative",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        },
                        {
                            "weight": 1.2
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 20
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 21
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.fill",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "geometry.stroke",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 29
                        },
                        {
                            "weight": 0.2
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 18
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 16
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 19
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "color": "#000000"
                        },
                        {
                            "lightness": 17
                        }
                    ]
                }
            ]            
        );        
    };  


    /*------------------------------------------
        = TRANSPORT LOCATION MAP
    -------------------------------------------*/  
    function transportMap() {

        var myLatLng = new google.maps.LatLng(36.169941,-115.139830);
        var mapProp = {
            center: myLatLng,
            zoom: 11,
            scrollwheel: false,
            mapTypeId: google.maps.MapTypeId.ROAD
        };

        var map = new google.maps.Map(document.getElementById("transport-location-map"),mapProp);
        var marker = new google.maps.Marker({
            position:myLatLng,
            icon:'images/transport-map-marker.png'
        });

        marker.setMap(map);

        map.set('styles',
            [
                {
                    "featureType": "administrative",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": "-100"
                        }
                    ]
                },
                {
                    "featureType": "administrative.province",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "off"
                        }
                    ]
                },
                {
                    "featureType": "landscape",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": 65
                        },
                        {
                            "visibility": "on"
                        }
                    ]
                },
                {
                    "featureType": "poi",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "lightness": "50"
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": "-100"
                        }
                    ]
                },
                {
                    "featureType": "road.highway",
                    "elementType": "all",
                    "stylers": [
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "road.arterial",
                    "elementType": "all",
                    "stylers": [
                        {
                            "lightness": "30"
                        }
                    ]
                },
                {
                    "featureType": "road.local",
                    "elementType": "all",
                    "stylers": [
                        {
                            "lightness": "40"
                        }
                    ]
                },
                {
                    "featureType": "transit",
                    "elementType": "all",
                    "stylers": [
                        {
                            "saturation": -100
                        },
                        {
                            "visibility": "simplified"
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "geometry",
                    "stylers": [
                        {
                            "hue": "#ffff00"
                        },
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -97
                        }
                    ]
                },
                {
                    "featureType": "water",
                    "elementType": "labels",
                    "stylers": [
                        {
                            "lightness": -25
                        },
                        {
                            "saturation": -100
                        }
                    ]
                }
            ]
        );        
    }; 



    /*------------------------------------------
        = APP LANDING PRODUCT SLIDER
    -------------------------------------------*/
    if ($(".product-slider-wrapper").length) {
        $('.slider-for').slick({
            slidesToShow: 1,
            slidesToScroll: 1,
            arrows: false,
            fade: true,
            asNavFor: '.slider-nav'
        });
        $('.slider-nav').slick({
            centerMode: true,
            slidesToShow: 5,
            slidesToScroll: 1,
            asNavFor: '.slider-for',
            focusOnSelect: true,

            responsive: [
                {
                  breakpoint: 768,
                  settings: {
                    slidesToShow: 3,
                    infinite: true
                  }
                }
            ]

        });
    }


    /*------------------------------------------
        = APP LANDING TESTIMONIAL SLIDER
    -------------------------------------------*/
    if ($(".app-landing-testimonial-slider").length) {
        $(".app-landing-testimonial-slider").owlCarousel({
            items: 1,
            mouseDrag: false,
            nav: true,
            dots: false,
            navText: ["<i class='fa fa-long-arrow-left'></i>","<i class='fa fa-long-arrow-right'></i>"]
        });
    }


    /*----------------------------------------------------
        = TRANSPORT FAQ ACCRODIAN TOGGLE CALSS
    --------------------------------------------------------*/  
    if ($("#accordion").length) {
        var panelHeading = $("#accordion > div > div > a");
        
        panelHeading.on("click", function() {
            $(".subtitle").addClass('collapsed');
            $(".subcontent").removeClass('in');
            var $this = $(this);
            if (!$this.closest(".panel").hasClass("current")) {
                $this.closest(".panel").addClass("current");
            } else {
                 $this.closest(".panel").removeClass("current");
            }
            
            $this.closest(".panel").siblings().removeClass("current");
        });
    }

    /*------------------------------------------
        = TRANSPORT TESTIMONIAL SLIDER
    -------------------------------------------*/
    if ($(".transport-testimonial-slider").length) {
        $(".transport-testimonial-slider").owlCarousel({
            items: 1,
            mouseDrag: false,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"]
        });
    }


    /*------------------------------------------
        = SEO FEATURED SLIDER
    -------------------------------------------*/
    if ($(".seo-featured-slider").length) {
        $(".seo-featured-slider").owlCarousel({
            autoplay:true,
            items:5,
            loop:true,
            mouseDrag: false,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive: {
                0 : {
                    items: 2
                },

                450 : {
                    items: 3
                },

                991 : {
                    items: 4
                },

                992 : {
                    items: 5
                }
            }
        });
    }


    /*------------------------------------------
        = SEO FEATURED SLIDER
    -------------------------------------------*/
    if ($(".seo-app-slider").length) {
        $(".seo-app-slider").owlCarousel({
            autoplay:true,
            items:1,
            loop:true,
            mouseDrag: false,
        });
    }


    /*------------------------------------------
        = SEO FEATURED SLIDER
    -------------------------------------------*/
    if ($(".seo-team-slider").length) {
        $(".seo-team-slider").owlCarousel({
            items:3,
            loop:true,
            margin: 30,
            mouseDrag: false,
            dots: false,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive: {
                0 : {
                    items: 1
                },

                460 : {
                    items: 2
                },

                991 : {
                    items: 2
                },

                992 : {
                    items: 3
                }
            }
        });
    }


    /*--------------------------------------------------
        = HOSTING PAGE UPLOAD DOWNLOAD PROGRESS BAR
    --------------------------------------------------*/
    function uploadDownloadProgress() {
        if ($(".progress-bar2").length) {
            var $progress_bar = $('.progress-bar2');
            $progress_bar.appear();
            $(document.body).on('appear', '.progress-bar2', function() {
                var current_item = $(this);
                if (!current_item.hasClass('appeared')) {
                    var percent = current_item.data('percent');
                    current_item.append('<span>' + percent + '%' + '</span>').css('width', percent + '%').addClass('appeared');
                }
                
            });
        };
    }

    uploadDownloadProgress();



    /*------------------------------------------
        = HOSTING TESTIMONIAL SLIDER
    -------------------------------------------*/
    if ($(".hosting-testimonial-slider").length) {
        $(".hosting-testimonial-slider").owlCarousel({
            items: 2,
            mouseDrag: false,
            margin: 30,
            nav: true,
            navText: ["<i class='fa fa-angle-left'></i>","<i class='fa fa-angle-right'></i>"],
            responsive: {
                0 : {
                    items: 1
                },

                767 : {
                    items: 1
                },

                992 : {
                    items: 2
                }
            }
        });
    }


    /*-------------------------------------------------------
        = WEDDING PAGE COUNTDOWN CLOCK
    -------------------------------------------------------*/
    if ($("#wedding-count-down-clock").length) {
        $('#wedding-count-down-clock').countdown('2017/04/31', function(event) {
            var $this = $(this).html(event.strftime(''
            + '<div class="box"><h3>%m</h3> <span>Months</span> </div>'
            + '<div class="box"><h3>%D</h3> <span>Days</span> </div>'
            + '<div class="box"><h3>%H</h3> <span>Hours</span> </div>'
            + '<div class="box"><h3>%M</h3> <span>Minutes</span> </div>'
            + '<div class="box"><h3>%S</h3> <span>Seconds</span> </div>'));
        });
    }


    /*------------------------------------------
        = WEDDING STORY MASONRY GRID
    -------------------------------------------*/
    function masonryGridSetting() {
        if ($('.masonry-grid').length) {
            var $grid =  $('.masonry-grid').masonry({
                itemSelector: '.box',
                columnWidth: '.box',
                percentPosition: true
            });

            $grid.imagesLoaded().progress( function() {
                $grid.masonry('layout');
            });
        }
    }

    masonryGridSetting();  


    /*------------------------------------------
        = WEDDING MAP POPUP
    -------------------------------------------*/
    function weddingMapPopup() {
        if ($(".wedding-events .all-events").length) {
            var allEvents = $(".wedding-events .all-events");
            var eventMap = allEvents.find(".event-map");
            var singleEvent = allEvents.find(".event");

            eventMap.hide();

            singleEvent.each(function() {
                var $this = $(this);
                $this.find(".open-map").on("click", function(e) {
                    e.preventDefault();
                    $(this).parent().siblings(".event-map").fadeIn();
                    e.stopPropagation();
                    return false;
                })

                $this.on("click", function(e) {
                    eventMap.fadeOut();
                    return false;
                })
            });
        }
    }


    /*------------------------------------------
        =  WEDDING GALLERY SLIDER
    -------------------------------------------*/
    if ($(".wedding-gallery-slider").length) {

        $(".wedding-gallery-slider").owlCarousel({
            smartSpeed: 300,
            loop: true,
            margin: 10,
            dots: false,
            center: true,
            autoplayHoverPause: true,
            nav: true,
            navText: ["<div><span>P</span><span>R</span><span>E</span><span>V</span></div>","<div><span>N</span><span>E</span><span>X</span><span>T</span></div>"],
            responsive: {
                0 : {
                    items: 2
                },

                600 : {
                    items: 3
                },

                991 : {
                    items: 3
                },

                992 : {
                    items: 5
                }
            }
        });
    }



    /*==========================================================================
        WHEN DOCUMENT LOADING 
    ==========================================================================*/
        $(window).on('load', function() {

            preloader();

            sortingGallery(); 

            sliderBgSetting();

            sortingCharityGallery();

            // Set FAQ section's two col equal height
            
            // Set architects-blog post two coloumn equal height
            if ($(".architects-blog").length) {
                setTwoColEqHeight($(".architects-blog .post .entry-media"), $(".architects-blog .post .entry-body"));
            }

            // Set hosting page hosting-features two coloumn equal height
            if ($(".hosting-features").length) {
                setTwoColEqHeight($(".hosting-features .features-video"), $(".hosting-features .features-list"));
            }

            if ($(".event-contact #event-location-map").length) {
                map();
            }

            // Set transport FAQ section's two col equal height
            // Call the transport map function
            if ($("#transport-location-map").length) {
                transportMap();
            }

            // wedding event map
            weddingMapPopup();

        });



    /*==========================================================================
        WHEN WINDOW SCROLL
    ==========================================================================*/
    $(window).on("scroll", function() {
        
        bgParallax();

        activeMenuItem();

        stickyHeader();

        stickyHeaderArchitect();

        stickyHeaderEvents();

    });

    
    
    /*==========================================================================
        WHEN WINDOW RESIZE
    ==========================================================================*/
    $(window).on("resize", function() {
        // Set architects-blog post two coloumn equal height
        if ($(".architects-blog").length) {
            setTwoColEqHeight($(".architects-blog .post .entry-media"), $(".architects-blog .post .entry-body"));
        }
    });



})(window.jQuery);