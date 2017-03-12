  $(document).ready(function() {
      var $f1 = $("#font-size1");
      var $f2 = $("#font-size2");
      var $f3 = $("#font-size3");
      var $overlay = $("#overlay");
      var $mcontent = $(".m-content");
      var $uform = $("#upload-form");
      var $epd = $("#exit-page-dialog");
      var hash = window.location.hash;
      var travelTo = '';

      /**
       * Handle routing and deep linking
       */
      var currentpage = 'home';
      route = function(page) {
        if (page === currentpage) return;
        if (page === '') page = 'home';
        var isMobile = $("#mobile-menu").css('display') == 'block';
        $("." + currentpage + "-page-content").fadeOut(300, function() {
          if (page == 'home' ) {
            var width = (isMobile) ? "100%" : "910px";
            $('#carousel').css('width', width).slick('slickGoTo', 0).slick('slickPlay');
            $(".gallery-page-content").hide();
          }
          if (page == 'pledge') $(".gallery-page-content").show();

          $('body').removeClass(currentpage);
          $('body').addClass(page)


          $("." + page + "-page-content").fadeIn(300);
          $('#nav-links-container li').removeClass('active');
          $("#" + page + "-link").addClass('active');
          currentpage = page;
          window.location.hash = (page === 'home') ? '' : page;
          window.scrollTo(0,0);
        });
      };
      /**
       * Set up the page elements
       */

      // copy the safety info from the page to the overlay
      $("#overlay-safety-info").html($('#safety-info-text').html());
      $("#safety-rollover").on('mouseover', function() {
        $mcontent.hide();
        $("#overlay-safety-info").show();
        $overlay.fadeIn(300);
        return true;
      });

      /* handle mobile navigation */
      if ($("#mobile-menu").css('display') == 'block') {
        $("#nav-links").hide();
        $("#nav-links li, #safety-rollover").on('click', function() {
          $("#nav-links").slideToggle(300);
          return true;
        });
      }
      $("#mobile-menu").on('click', function(e) {
        e.preventDefault();
        $("#nav-links").slideToggle(300, function(){});
      });


      /* handle accessibility */
      $f1.on('click', function(e) {
        e.preventDefault();
        $('body').addClass('font-size1').removeClass('font-size2').removeClass('font-size3');
      });

      $f2.on('click', function(e) {
        e.preventDefault();
        $('body').removeClass('font-size1').addClass('font-size2').removeClass('font-size3');
      });
      $f3.on('click', function(e) {
         e.preventDefault();
       $('body').removeClass('font-size1').removeClass('font-size2').addClass('font-size3');
      });    

      /**
       * Handle buttons 
       */
      $('.close-modal').on('click', function(e) {
        e.preventDefault();
        $overlay.fadeOut(300);
        return false;
      });
      $(".close-gallery").on('click', function(e) {
        e.preventDefault();
        route('pledge');
      });
      $('.upload-button, .upload-link').on('click', function(e) {
        e.preventDefault();
        $mcontent.hide();
        $uform.show();
        $overlay.fadeIn(300);
      });

      $("#gallery-full-screen").on('click', function() {
        route('gallery');
      });

      /**
       * Handle external links
       */
      $("a[target='_blank']").on('click', function(e) {
        e.preventDefault();
        travelTo = $(this).attr("href");
        console.log(travelTo);
        $mcontent.hide();
        $epd.show();
        $overlay.fadeIn(300);
      });
      $("#travel-continue").on('click', function(e) {
        e.preventDefault();
        if (travelTo != '') {
          window.open(travelTo).focus();
        }
        $overlay.fadeOut(300);
      });

      /** 
       * Handle the ESC key to close the overlay 
       */
      $(window).on('keyup', function(e) {
        if (e.which === 27) {
          $overlay.fadeOut(300);
        }
        return true;
      })

      /**
       * Handle form validation and submission
       */
      $("#form_submit").on('click', function(e) {
        result = validateForm($('#uform'));
        if (result.errors.length > 0) {
          console.log(result.errors);
          for (i in result.errors) {
            $("#" + result.errors[i] + "-error").addClass('error').removeClass('hide-error').show();
          }
        }
        //console.log('valid - ajax it!')
      });

      $("input, select", "#uform").on('change', function() {
        console.log($(this).attr('id'));
        $("#" + $(this).attr('id') + "-error").removeClass('error').addClass('hide-error');
      });

      validateForm = function(form) {
        var ret = true;
        var pic = $("input[name='pic']", form).val();
        var pfor = $("#preserve_for_select", form).val();
        var diag = $("input[name='diagnosed']:checked", form);
        var relationship = $("input[name='relationship']:checked", form);
        var terms = $("input[name='accept_terms']:checked", form);
        var fname = $("#first_name", form).val();
        var lname = $("#last_name", form).val();
        var email = $("#email", form).val();
        var city = $("#location", form).val();
        var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/; // email validation
        var values = {'pic': pic, 'pfor': pfor, 'diag': diag, 'relationship': relationship, 'terms': terms, 'first_name':fname, 'last_name': lname, 'email': email, 'location': city };
        var errors = [];

        if (pfor === '') {
          errors.push('preserve_for_select');
        }
        if (fname === '') {
          errors.push('first_name');
        }
        if (lname === '') {
          errors.push('last_name');
        } 
        if (email === '' || !filter.test(email)) {
          errors.push('email');
        }
        if (city === '') {
          errors.push('location');
        }
        if (diag.length<1) {
          errors.push('diagnosed');
        }
        if (relationship.length<1) {
          errors.push('relationship');
        }
        if (terms.length<1) {
          errors.push('accept_terms');
        }
        if (pic === undefined || pic === '') {
          errors.push('pic');
        }
        console.log(pic);
        return {'values': values, 'errors': errors};
      };


      /**
       * Handle previewing the upload image before submission
       */
      function readURL(input) {
        if (input.files && input.files[0]) {
          var reader = new FileReader();
          reader.onload = function (e) {
              $('#preview-image').attr('src', e.target.result);
          }
          reader.readAsDataURL(input.files[0]);
        }
      }

      $("#file-upload").change(function(){
          readURL(this);
          $("#pic-error").addClass('error').removeClass('hide-error').hide();
      });       

      /**
       * Set up the carousel
       */
      $('#carousel').slick({
        dots: true,
        arrows: false,
        autoplay: true,
        autoplaySpeed: 5000,
        infinite: true,
        speed: 500,
        pauseOnHover:true,
        slidesToShow: 1,
        slidesToScroll: 1,
        draggable:false,
        dotsClass:'slider-nav-dots slick-dots',
        swipeToSlide:true,
        swipe:false,
        mobileFirst: true,
        /*responsive: [
        {
            breakpoint: 1024,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              dots: false
            }
        },
        {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2
            }
        },
        {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              dots:true
            }
        }
      ]*/
      });
      /**
       * Set up the gallery
       */
      for (var i=1; i<50; i++) {
        $("#gallery-list").append('<li class="gallery-image-container" data-preserve-for="I preserve for my family" data-person="Jan, San Francisco" data-occupation="Caregiver" style="background: #fff url(img/gallery/ipf_pledge_photo_' + i + '.jpg) center center no-repeat;background-size:contain;" >&nbsp;</li>');
      }
      setThumbnail = function (e, callback) {
        var elm = $(e.target);
        var t = $("#thumbnail-container");
        var g = $("#gallery-container");
        var thumb = $(t);
        var gallery = $(g);
        $("#thumbnail-image").css('background-image', elm.css('background-image')).css('background-repeat', "no-repeat").css('background-size', "contain");
        $("#thumbnail-preserve-for").html(elm.attr('data-preserve-for'));
        $("#thumbnail-person").html(elm.attr('data-person'));
        $("#thumbnail-occupation").html(elm.attr('data-occupation'));
        //console.log(thumb);

        var twidth = thumb.outerWidth();
        var theight = thumb.outerHeight();
        var gwidth = gallery.outerWidth();
        var gheight = gallery.outerHeight();
        var posx = elm[0].offsetLeft - (elm[0].offsetWidth /2) ;
        var posy = elm[0].offsetTop - (elm[0].offsetHeight /2) - 25;
        var posx = (posx < 0) ? 0 : (posx + twidth) > gwidth ? gwidth - twidth : posx;
        var posy = (posy < 0) ? 0 : (posy + theight) > gheight ? gheight - theight : posy;
        //console.log("x: " + posx + "; y:" + posy + "; gwidth:" + gwidth);
        thumb.css('left', posx + "px").css('top', posy + "px").fadeIn(300);
        if ('function' === typeof(callback)) callback();
      };
      $(".gallery-image-container").on('click', function(e) {
        e.preventDefault();
        $("#thumbnail-container").fadeOut(300, function(){
          setThumbnail(e, function () {
            $("#thumbnail-container").fadeIn(300);
          });
        });
       });

      $(".close-thumbnail").on('click', function() {
        console.log('here');
        $("#thumbnail-container").fadeOut(300);
      });

      /**
       * Handle deep links if present
       */
       if (hash !== '') {
         route(hash.replace("#", ''));
         console.log(hash);
       }

  });

