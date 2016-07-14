$(document).ready(function(){
  
   $(document).foundation();
   
   
  //ANIMATIONS 
   
      //typed animation

              var WORDS = $('[data-text]').data().text;

              $(function(){
                  $("[data-text]").typed({
                    strings: WORDS,
                    typeSpeed: 20,
                    startDelay: 2000,
                    backDelay: 750,
                    loop: true
                  });
                  
             }); 

   
      //global variables used my multiple functions
      var windowHeight;
      var fadeShrinkElements = [];
      var distanceFromTop;
   
           //Resizes the .window-height class to the screen height         
               function setToWindowHeight (){
               //set the global window height variable and shrink elements offset from top
                 windowHeight = $(window).height();
                 fadeShrinkElements = [];
                  
                //set the classes to be equal to that height
                 $('.window-height').css('min-height', windowHeight + 'px');
                  
                 $('.fade-animation').each(function(i, element){
                    var a = {
                       element: element,
                       pxFromTop: $(element).parent('div').offset().top,
                    }
                    fadeShrinkElements.push(a);
                 });
               };


          

          //fade-shrink animation  
             function fadeShrinkAnimation(element, index, array){
               //calculate the percentage scrolled through the div    
                   var percentageScrolled = (((distanceFromTop-element.pxFromTop)/windowHeight))*100
                   
                   var elementHeight = $(element.element).outerHeight();
                   
              //only start the animation if it is scrolled more than 5% and
              // if the divs height is screen height.
                   if(percentageScrolled<20 || elementHeight > windowHeight*1.2){
                     $(element.element).css('transform', 'translateX(0%)'); 
                     $(element.element).css('opacity', '1');
                   }
             //dont animate if we have scrolled past the div    
                   else if (percentageScrolled>100){
                     $(element.element).css('transform', 'translateX(100%)');
                     $(element.element).css('opacity', '0.0');
                   } else {
                     var direction = 1;
                     if (index % 2){
                        direction = -1;
                     } 
                        
                     $(element.element).css('transform', 'translateX('+ (percentageScrolled-20) * direction * 4 +'%)');
                     $(element.element).css('opacity', (1-((percentageScrolled-20)/70)));
                   }    
             };

//DOCUMENT LOAD triggers
      
            setToWindowHeight();
            
            $('.animate3d').animate3d({
               distance:   20,
               rotation:   0.3,
               startX:     0,
               startY:     0
            });
            
            var userLoggedIn = readCookie('access_token');
            if (userLoggedIn){
               $('#login').text('Logout');
            }

//EVENT functions
         //Window Resize
            $(window).resize(function(event){
              $('.animate3d').animate3d({
               distance:10,
               rotation: .3
               });
              if ($( window ).width()> 480){
                 setToWindowHeight();
              } 
            }); 
         //Document Scroll
            $(document).scroll(function(){
               distanceFromTop = $(document).scrollTop();
               fadeShrinkElements.forEach(fadeShrinkAnimation);
               (function(){
                  if(distanceFromTop+windowHeight-300>$('.photo-container').offset().top){
                     $('.photo-container').addClass('animated');
                  }
               })()
            });
         //Off Canvas Side Bar
            $('.sub-sites').hide();
            $('.main-site').mouseenter(function(){
               $('.sub-sites').show();
            });
            $('.sub-sites').mouseleave(function(){
               $(this).hide();
            });
            $('#loginForm').hide();
            $('#login').click(function(){
               if($(this).text() === 'Login'){
                  $('#loginForm').slideToggle();
               } else {
                  $(this).text('Login');
                  eraseCookie('access_token');
               }
               
            });
              
            //Login Submission
               $('#loginForm').submit(function(evt){
                  evt.preventDefault();
                  $('#resMessage').remove();
                  var dataToSubmit = $('#loginForm').serializeArray();
                  $.post('/login', dataToSubmit)
                     .done(function(res){
                        if(res.success){
                           $('#loginForm').after('<p id="resMessage">Welcome ' + res.user.name + '!</p>');
                           setTimeout(function(){
                              $('#resMessage').remove();
                              $('#loginForm').slideToggle();
                              $('#login').text('Logout');
                           }, 1000)
                        } else {
                           console.log(res);
                           $('#loginForm').after('<p id="resMessage">'+ res.message + '</p>')
                        }
                     })
                     .fail(function(err){
                        console.log(err);
                        $('#loginForm').after('<p id="resMessage">Login Failed</p>')
                     })
                  $('#loginForm input').val('');
               });
   
         //Contact form submission
            $('#contact').on('submit', function(evt){
               evt.preventDefault();
               var data = $('#contact').find('input, textarea');
               $('#contact').find('span').remove();
               var passed = true;
               
               data.each(function(i, elt){
                  if (elt.value === ''){
                     $(elt).after('<span style="color:red;">'+ $(elt).attr('name') +' is required</span>');
                     passed = false;
                  }
               });
               
               if (passed){
                  var dataToSubmit = $('#contact').serializeArray();
                  $.post('/email', dataToSubmit )
                     .done(function(res){
                        $(data).each(function(i,elt){
                           $(elt).val('');
                        });
                        $('#contact').after('<div class="serverResponse">'+ res.response +'</div>');
                        setTimeout(function(){
                           $('.serverResponse').remove();
                        }, 2000)
                     })
                     .fail(function(){
                        $('#contact').after('<div>Form submission failed.</div>')
                     })
               }  
            });
   
   
   
   
   //cookie management
   function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
   }
   
   function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
   }

   function eraseCookie(name) {
       createCookie(name,"",-1);
   }
   
});//end document load