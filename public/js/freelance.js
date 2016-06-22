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
                     $(element.element).css('opacity', (1-(percentageScrolled/70)));
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
       

//EVENT functions

            $(window).resize(function(event){
              $('.animate3d').animate3d({
               distance:10,
               rotation: .3
               });
              setToWindowHeight();
            }); 

            $(document).scroll(function(){
               distanceFromTop = $(document).scrollTop();
               fadeShrinkElements.forEach(fadeShrinkAnimation);
            });
   
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
                  $.post('/', dataToSubmit )
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
   
});//end document load