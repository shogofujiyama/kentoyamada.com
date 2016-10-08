var Gallery = function(){
  //init class properties
  this.$slider          =   $('#slider-container ul');
  this.slideCount       =   this.$slider.find('li').length;
  this.singleWidth            =   $('#slider-container').width();
  
  this.createFirstAndLast();
  this.setCurrentPosition(1);
}

Gallery.prototype.init = function(){
  
  var self = this;
  
  $('#slider-nav-prev, #slider-nav-next').bind('click',function(){
    
    var currentPosition = self.getCurrentPosition();
    
    //figure out which button was pushed and set newPosition
    if(this.id.indexOf('prev') > -1){
      newPosition = currentPosition - 1
//      if(newPosition == 0){
 //       newPosition = 'first';
//      }
    }else{
      newPosition = currentPosition + 1
 //     if(newPosition > self.slideCount){
  //      newPosition = 'last';
  //    }
    }
    
    self.moveTo(newPosition);
    
  });
}
Gallery.prototype.createFirstAndLast = function(){
  var self = this;
  var firstElCode = this.$slider.find('li:eq(0)').html();
  var lastElCode = this.$slider.find('li:last-child').html();
  
//  this.$slider.append($('<li rel="last">' + firstElCode + '</li>'));
//  this.$slider.prepend($('<li rel="first">' + lastElCode + '</li>'));
  
  this.$slider.css('left',self.singleWidth * -1);
  
  return true;
}
Gallery.prototype.getCurrentPosition = function(){
  
  return this.$slider.data('currentPosition');
}
Gallery.prototype.setCurrentPosition = function(position){
  
  if(position != null){
    this.$slider.data('currentPosition', position);
    return this.$slider.data('currentPosition');
  }else{
    return false;
  }
}
Gallery.prototype.getLeft = function(newPosition){
  
  var left = ((newPosition) * 982) * -1;
  return left;
}
Gallery.prototype.moveTo = function(newPosition){
  
  var self = this;
  
  // if we are at the first (moving backwards) or the last slide (moving forewards)
  // we need to "fake" a slide to the next slide, and then adjust to set back to the beginning/end
  // this block of code handles the logic for the "fake-out"

	// disabled by adam at nabil's request
//  if(newPosition == 'last'){
//   newPosition = self.slideCount + 1;
//    var callback = function(){
//      self.$slider.css({'left':self.singleWidth * -1});
//      self.setCurrentPosition(1);
//    }
//  }else if(newPosition == 'first'){
//    newPosition = 0
//    var callback = function(){
//      self.$slider.css({'left': self.getLeft(self.slideCount)});
//      self.setCurrentPosition(self.slideCount);
//    }
//  }else{
//    var callback = function(){
//      self.setCurrentPosition(newPosition);
//    }
//  }

  var left = self.getLeft(newPosition)
  
  this.$slider.animate({'left': left}, 'slow', callback);
}

var Footer = function(){
  
  var self = this;
  
  //resize padding on large resolutions
  $(window).bind('resize',function(){
    self.resize();
  });    
}

Footer.prototype.resize = function(){
      
  windowSize = $(window).height();
  
  if(windowSize > 747){
    var newPadding = (windowSize - 747) + 10;
    $('footer').css({'padding-bottom': newPadding});
  }
}

$(document).ready(function(){
  
  //check for gallery and instantiate gallery object
  var gallery = $('#slider-container');
  if(gallery.length){
    gallery = new Gallery();
    gallery.init();
  }
  
  //set header nav widths
  if($('header ul').length){
      var width = 0;
      $('header ul li').each(function(){
        width += $(this).outerWidth(true);
      });
      $('header ul').width(width);
    }
    
  // $('.slideshow').cycle({
    // fx: 'fade' // choose your transition type, ex: fade, scrollUp, shuffle, etc...
//   });
   
  Shadowbox.init({ 
      language: 'en'
      ,players:  ['img', 'html', 'iframe', 'qt', 'wmp', 'swf', 'flv']
      ,overlayOpacity: '0.95' 
  });

    
  var footer = new Footer();
  footer.resize();
    
});