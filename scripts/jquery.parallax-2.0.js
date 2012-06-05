/*
Plugin: jQuery Parallax
Version 2.0
Authors: Ian Lunn, Alex Pearce
Authors URL: [http://www.ianlunn.co.uk/, http://alexpearce.me]
Plugin URL: [http://www.ianlunn.co.uk/plugins/jquery-parallax/, https://github.com/alexpearce/jquery.parallax]

Dual licensed under the MIT and GPL licenses:
http://www.opensource.org/licenses/mit-license.php
http://www.gnu.org/licenses/gpl.html
*/

(function($, window, undefined) {
  // Returns true if the argument is strictly undefined or null
  var isEmpty = function(variable) {
    return (variable === undefined || variable === null);
  }
  
  $.fn.parallax = function(xpos, adjuster, inertia, outerHeight) {
    
    // Setup defaults if arguments aren't specified
    if (isEmpty(xpos)) {
      xpos = "50%";
    }
    if (isEmpty(adjuster)) {
      adjuster = 0;
    }
    if (isEmpty(inertia)) {
      inertia = 0.1;
    }
    if (isEmpty(outerHeight)) {
      outerHeight = true;
    }
    
    // Some handy variables
    var $window      = $(window),
        windowHeight = $window.height(),
        // Position of the scrollbar
        pos          = $window.scrollTop();
    
    var inView = function(pos, elements) {  
      // For each selector, determine whether it's in the viewport and run move the background accordingly
      elements.each(function(idx, element) {
        var $element = $(element),
            top = $element.offset().top,
            height;

        if (outerHeight == true) {
          height = $element.outerHeight(true);
        } else {
          height = $element.height();
        }

        // Above and in view OR
        // full view OR
        // below and in view
        if ((top + height >= pos && top + height - windowHeight < pos) ||
            (top <= pos && (top + height) >= pos && (top - windowHeight) < pos && top + height - windowHeight > pos) ||
            (top + height > pos && top - windowHeight < pos && top > pos)) {
          $element.css("backgroundPosition", newPos(xpos, height, pos, adjuster, inertia));
        }
      });
    };
    
    // Calculates the new position of the background image
    var newPos = function(xpos, windowHeight, pos, adjuster, inertia) {
      return xpos + " " + Math.round((-((windowHeight + pos) - adjuster) * inertia)) + "px";
    };
    
    // Preserve the jQuery chain
    return this.each(function() {
      
      // Cached jQuery element as we'll need `this` inside deeper scopes later
      var $this  = $(this),
          // Element height
          height = $this.height();

      // When the window is scrolled
      $window.on("scroll", function() {
        inView($window.scrollTop(), $this);
      });

      // Call inView initially to prevent a jerk on first scroll
      inView(pos, $this);
      
    });
    
  }
})(jQuery, this);