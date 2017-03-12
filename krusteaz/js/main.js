'use strict';
$(document).ready(function(){
  var hash = window.location.hash;
  // see if we are mobile 
  var isMobile = ($(window).width() < 1025);
  if (isMobile) {
    setHeroContainerHeight();
    $(".hero-button, .hotspot").addClass('hover');
  }
  $(window).on('resize', function() {
    // check and update isMobile on every resize event
    isMobile = ($(window).width() < 1025);
    if (isMobile) {
      setHeroContainerHeight();
      $(".hero-button").addClass('hover');
    } else {
      // edge-case: the user opens the browser from "mobile" to "desktop"
      $("#main-image-container").css("left", 0);
      $(".hero-button, .hotspot").removeClass('hover');
    }
  });


  function setHeroContainerHeight() {
    
    var vwidth = $(window).width();
    var minwidth = 300;
    var maxwidth = 767;
    var minperc = 335;
    var maxperc = 776;
    var maxheight = 760;

    var maxw = maxwidth - minwidth;
    var maxp = maxperc - minperc;
    var sliver = (maxp / maxw); 
    var wdiff = (maxwidth - vwidth);

    var newpercent = (wdiff * sliver);
    var pixels = (Math.round(maxperc - newpercent) > maxheight) ? maxheight : Math.round(maxperc - newpercent);
    var newheight = (vwidth>767 && vwidth<1145) ? "50%" : pixels + "px";
    console.log("setting height: " + newheight);
    $(".hero-container").css('padding-bottom', newheight);
    $("#mobile-splash").css('height', newheight);
    var height = parseInt(parseInt(parseInt(window.currentheight) - 35) * .93);
    $(".splash-container").css('height', newheight );
    window.currentheight = newheight;
  };

 
  
 /**
   * Handle routing and deep linking
   */
  // var route = function(page) {
  //   if (page === currentpage) return;
  //   $("." + currentpage + "-page-content").fadeOut(300, function() {
  //     if (page == 'home' ) {
  //       $('#carousel').css('width', '910px').slick('slickGoTo', 0).slick('slickPlay');
  //     }
  //     $("." + page + "-page-content").fadeIn(300);
  //     currentpage = page;
  //     window.location.hash = (page === 'home') ? '' : page;
  //   });
  // };


  /**
   * Set up the page elements
   

  var herodata = window.herodata = {
    // Baking
    "girls-night": {'overlaps': ['tailgating', 'brunch'], 'url': "http://www.krusteaz.com/recipes/chocolate-espresso-muffins"},
    "bake-sale": {'overlaps': ['brunch', 'movie-night'], 'url': "http://www.krusteaz.com/recipes/blueberry-lemon-cream-bars"},
    "cheat-day": {'overlaps': ['housewarming', 'road-trip'], 'url': "http://www.krusteaz.com/recipes/almond-doodles"},
    "tailgating": {'overlaps': ['brunch', 'movie-night'], 'url': "http://www.krusteaz.com/recipes/bacon-wrapped-chipotle-muffins"},
    "movie-night": {'overlaps': ['tailgating', 'brunch'], 'url': "http://www.krusteaz.com/products/breads/italian-herb-flatbread-mix"},
    "office-treats": {'overlaps': [], 'url': "http://www.krusteaz.com/recipes/cinnamon-apple-pecan-crumb-cake"},
    "breakfast-night": {'overlaps': ['office-treats', 'housewarming', 'cheat-day'], 'url': "http://www.krusteaz.com/recipes/blueberry-banana-pancakes"},
    "game-night": {'overlaps': ['movie-night', 'road-trip', 'housewarming'], 'url': "http://www.krusteaz.com/recipes/cornbread-spinach-bites"},
    "baby-shower": {'overlaps': ['brunch', 'movie-night', 'road-trip'], 'url': "http:1//blog.hwtm.com/2015/07/lemon-almond-pound-cake-almond-flower-glaze/"},
    "housewarming": {'overlaps': ['movie-night', 'road-trip', 'cheat-day'], 'url': "http://www.krusteaz.com/recipes/pumpkin-cheesecake"},
    "brunch": {'overlaps': ['tailgating'], 'url': "http://www.krusteaz.com/recipes/santa-fe-waffles"},
    "road-trip": {'overlaps': ['road-trip', 'housewarming'], 'url': "http://www.krusteaz.com/recipes/jolty-scotchies"},
    // Cookies
    "triple-chocolate": {'overlaps': ['gingerbread', 'double-peanut-butter', 'brown-sugar-oatmeal'], 'url': "http://www.krusteaz.com/recipes/toffee-cookie-bars"},
    "snickerdoodles": {'overlaps': ['double-peanut-butter', 'shortbread', 'brown-sugar-oatmeal'], 'url': "http://doughmesstic.com/2015/08/27/stuffed-toffee-snickerdoodle-cookies/"},
    "butter-vanilla":{'overlaps': ['cookie-heaven', 'pumpkin-spice'], 'url': "http://www.krusteaz.com/recipes/iced-sugar-cutout-cookies"},
    "double-peanut-butter": {'overlaps': ['brown-sugar-oatmeal', 'shortbread', 'meyer-lemon'], 'url': "http://lizventures.com/2015/08/double-peanut-butter-cookie-banana-pudding/"},
    "brown-sugar-oatmeal": {'overlaps': ['pumpkin-spice', 'shortbread', 'meyer-lemon'], 'url': "http://www.krusteaz.com/recipes/fruit-nut-monster-cookies"},
    "oatmeal-scotchies": {'overlaps': ['pumpkin-spice'], 'url': "http://www.krusteaz.com/recipes/carrots-butterscotch-cookie-cups"},
    "gluten-free": {'overlaps': ['brown-sugar-oatmeal', 'double-peanut-butter', 'gingerbread', 'meyer-lemon'], 'url': "http://www.krusteaz.com/recipes/gluten-free-brownie-crackle-cookies"},
    "pumpkin-spice": {'overlaps': ['double-peanut-butter', 'shortbread', 'brown-sugar-oatmeal'], 'url': "http://www.krusteaz.com/recipes/zesty-pumpkin-cookies"},
    "gingerbread": {'overlaps': ['double-peanut-butter', 'shortbread','brown-sugar-oatmeal', 'meyer-lemon'], 'url': "http://www.krusteaz.com/recipes/cutout-gingerbread-cookies"},
    "shortbread": {'overlaps': ['pumpkin-spice'], 'url': "http://www.krusteaz.com/recipes/raspberry-thumbprints"},
    "cookie-heaven": {'overlaps': ['pumpkin-spice','shortbread'], 'url': "http://www.bakeorbreak.com/2014/12/toasted-coconut-white-chocolate-cookies/"},
    "meyer-lemon": {'overlaps': ['shortbread', 'pumpkin-spice'], 'url': "http://www.krusteaz.com/recipes/crispy-gold-star-day-cookies"}
  } 

  // inject the urls into the mobile slides
  $(".mobile-carousel-slide", "#mobile-carousel").each(function(){
    var mcid = $(this).data('id');
    if (mcid.indexOf('splash') === -1){
      $(this).html('<a href="' + herodata[mcid].url + '" target="_blank" class="mobile-slide-link">&nbsp;</a>');
    }
  });
*/
  window.t = setTimeout(function() {
    
    $(".splash-container").fadeOut(300);
    
  }, 2000);


  /**
   * Handle the rollovers
   */
  $(".hero-container").hover( 
    function(){
      //Mouseover function
      //console.log('mouseover');
      $(this).find(".hero-rollover").animate({'top': "-=7"}, 1000);
    },
    function() {
      //Mouseout function
      //console.log('mouseout');
      $(this).find(".hero-rollover").animate({'top': "+=7"}, 1000, function() {
        //$(this).dequeue();
      });
    });

  /** 
   * Handle the ESC key to close the overlay
   */
  $(window).on('keyup', function(e) {
    if (e.which === 27) {
      $(".hero-image").fadeOut(500);
      $(".hotspot").show();
      $(".carousel-slide").removeClass("hacktive");
    }
    return true;
  });

  /**
   * force external links to open in a new window
   */
  $("a[target='_blank'").on('click', function(e){
    e.preventDefault();
	var tag = $(this).data('tag');
	fireDoubleClick(tag);
    window.open($(this).attr('href'));
  });
  
  $(".social-icons div span").on('click', function(e){
    e.preventDefault();
	var tag = $(this).data('tag');
	fireDoubleClick(tag);
  });

  
	function fireDoubleClick(tag) {
	 	  var axel = Math.random() + '';
	 	  var a = axel * 10000000000000;
	 	  $('body').append('<iframe src="https://5156820.fls.doubleclick.net/activityi;src=5156820;type=krust0;cat='+tag+';ord=1;num=1?' + a + '?" width="1" height="1" frameborder="0" style="display:none"></iframe>');
	}

});
