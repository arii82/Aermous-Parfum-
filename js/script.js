const navbar = document.querySelector('.navbar');
const mobileMenu = document.querySelector('.popup-mobilemenu');
const menuBar = document.getElementById('bar');
const close = document.getElementById('close');

mobileMenu.addEventListener('click', (e) => {
    if (e.target.matches('.menu__item')) {
        // disable default behavior
        e.preventDefault();

        // close the side-bar menu
        closeSideMenu();

        // change the location
        window.location.href = e.target.href;
    }
});

function closeSideMenu() {
    const sideMenuToggle = document.querySelector('#close');
    sideMenuToggle.click();
}


if (menuBar) {
    menuBar.addEventListener('click', () => {
        mobileMenu.classList.add('menu-open');
    })
}

if (close) {
    close.addEventListener('click', () => {
        mobileMenu.classList.remove('menu-open');
    })
}

// Navbar Scroll Down
window.onscroll = () => {
    if (document.documentElement.scrollTop > 170) {
      navbar.classList.add("scroll-on");
    } else {
      navbar.classList.remove("scroll-on");
    }
  }

//Main Hero Section Slider
// This code uses jQuery to create a slideshow with previous and next buttons and navigation bullets.
$('.slider').each(function() {
  // Cache the jQuery objects for the slider, slide group, and slides for this slider.
  var $this = $(this);
  var $group = $this.find('.slide_group');
  var $slides = $this.find('.slide');
  // Create an empty array to hold the navigation bullets, and initialize the current slide index and timeout variable.
  var bulletArray = [];
  var currentIndex = 0;
  var timeout;
  
  // This function animates the slide transition to the specified index.
  function move(newIndex) {
    var animateLeft, slideLeft;
    
    // Reset the timeout for the automatic slideshow advance.
    advance();
    
    // If the slide group is already animating or we're already on the specified slide, return without doing anything.
    if ($group.is(':animated') || currentIndex === newIndex) {
      return;
    }
    
    // Update the active state of the navigation bullets based on the new index.
    bulletArray[currentIndex].removeClass('active');
    bulletArray[newIndex].addClass('active');
    
    // Determine the slide positions and animation directions based on the current and new slide indices.
    if (newIndex > currentIndex) {
      slideLeft = '100%';
      animateLeft = '-100%';
    } else {
      slideLeft = '-100%';
      animateLeft = '100%';
    }
    
    // Set the new slide to the correct starting position and make it visible.
    $slides.eq(newIndex).css({
      display: 'block',
      left: slideLeft
    });
    // Animate the slide group to the new position, then clean up the old and new slides and reset the slide group position.
    $group.animate({
      left: animateLeft
    }, function() {
      $slides.eq(currentIndex).css({
        display: 'none'
      });
      $slides.eq(newIndex).css({
        left: 0
      });
      $group.css({
        left: 0
      });
      // Update the current slide index to the new index.
      currentIndex = newIndex;
    });
  }
  
  // This function resets the timeout for the automatic slideshow advance.
  function advance() {
    clearTimeout(timeout);
    timeout = setTimeout(function() {
      if (currentIndex < ($slides.length - 1)) {
        move(currentIndex + 1);
      } else {
        move(0);
      }
    }, 7000);
  }
  
  // Attach click handlers to the previous and next buttons to move to the previous or next slide. 
  $('.next_btn').on('click', function() {
    if (currentIndex < ($slides.length - 1)) {
      move(currentIndex + 1);
    } else {
      move(0);
    }
  });
  
  $('.previous_btn').on('click', function() {
    if (currentIndex !== 0) {
      move(currentIndex - 1);
    } else {
      move($slides.length - 1);
    }
  });
  
  // Create a navigation bullet for each slide, and attach click handlers to move to the corresponding slide.
  $.each($slides, function(index) {
    var $button = $('<a class="slide_btn">&bull;</a>');
    
    if (index === currentIndex) {
      $button.addClass('active');
    }
    $button.on('click', function() {
      move(index);
    }).appendTo('.slide_buttons');
    bulletArray.push($button);
  });
  
  // Start the automatic slideshow advance.
  advance();
});
