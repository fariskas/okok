
  // canvas of what user sees
  var canvasTag = document.querySelector("#canvas_see")
  canvasTag.width = window.innerWidth * 2;
  canvasTag.height = window.innerHeight * 2;
  canvasTag.style.width = window.innerWidth + "px"
  canvasTag.style.height = window.innerHeight + "px"
  var context = canvasTag.getContext("2d")
  // context.scale(2, 2)

  /////////////

  /// fresh canvas for high res version of popup collage
  var canvas_fresh = document.querySelector("#canvas_fresh")
  canvas_fresh.width = window.innerWidth * 2;
  canvas_fresh.height = window.innerHeight * 2;
  canvas_fresh.style.width = window.innerWidth + "px"
  canvas_fresh.style.height = window.innerHeight + "px"
  var context_fresh = canvas_fresh.getContext("2d")

  // popup image size
  var pop_w = 613;
  var pop_h = 449;

  // pixelating sizes
  var size= Math.random();
  var w = canvasTag.width * size;
  var h = canvasTag.height * size;

  // vars for saving states of canvas
  var saved;
  var saved_img;


  // popup   array
  var load_counter = 0;
  var ok_counter = 0
  var ok_images = ["./img/pop_ok_0.png", "./img/pop_ok_1.png", "./img/pop_ok_2.png", "./img/pop_ok_3.png", "./img/pop_ok_4.png", "./img/pop_ok_5.png", "./img/pop_ok_6.png"].map(src => {
    var image = document.createElement("img")
    image.src = src;
    image.onload = function(){
      // console.log('hit')
      if (load_counter == 0) {
        if (!window.innerWidth < 520) {
          draw_once( window.innerWidth - (pop_w/2), window.innerHeight - (pop_h/2), true)
        } else {
          draw_once( window.innerWidth - (pop_w/2), window.innerHeight - (pop_h/2) + 100, true)
        }
        load_counter++;
        console.log('loaded once')
        $('.load').hide();
      }

    }
    
    return image
  })

  var notok_counter = 0
  var notok_images = ["./img/pop_notok_0.png", "./img/pop_notok_1.png", "./img/pop_notok_2.png", "./img/pop_notok_3.png", "./img/pop_notok_4.png",].map(src => {
    var image = document.createElement("img")
    image.src = src
    return image
  })


  /// on canvas click

  $('.btn_okok').click(function() {
    // increase image counter
    ok_counter = ok_counter + 1
    if (ok_counter >= ok_images.length) {
      ok_counter = 0
    }
    // random position for popups
    var rand_x = Math.floor(Math.random() * (window.innerWidth*2 - (pop_w) )  + 1);
    var rand_y = Math.floor(Math.random() * (window.innerHeight*2 - (pop_h) )  + 1);
    // add 1 popup to canvas
    draw_once(rand_x,rand_y,true) 
  })
  $('.btn_notok').click(function() {

    // random position for popups
    var rand_x = Math.floor(Math.random() * (window.innerWidth*2 - (pop_w) )  + 1);
    var rand_y = Math.floor(Math.random() * (window.innerHeight*2 - (pop_h) )  + 1);
    // add 1 popup to canvas
    draw_once(rand_x,rand_y) 

    // increase image counter
    notok_counter = notok_counter + 1
    if (notok_counter >= notok_images.length) {
      notok_counter = 0
    }
  })

  // 


  function draw_once(x,y, okok) {
      // save state of canvas each time
      saved = canvas_fresh.toDataURL("image/png");
      saved_img = new Image();
      saved_img.src = saved;
      // add abit of delay to allow base64 image to load
      // then add to fresh canvas
      setTimeout(function(){ 
        if (okok) {
          context_fresh.drawImage(ok_images[ok_counter], x, y, pop_w, pop_h);  
        } else {
          context_fresh.drawImage(notok_images[notok_counter], x, y, pop_w, pop_h);
        }
        
        // console.log(x,y)
        var factor = 0.5
        $('.virtual_dom').css({
          'top'  : (y*factor)+'px',
          'left' : (x*factor)+'px',
        })
      }, 50);

  }

  // randomizing pixel vals
  setInterval(function(){ 
    size = Math.random();
    w = canvasTag.width * size;
    h = canvasTag.height * size;
  }, 100);


  var render = function () {

    // add bg color to block earlier layers
    context.fillStyle = "#F8BEC1";
    context.fillRect(0, 0, canvasTag.width, canvasTag.height);
    // draw pixelated collage
    context.drawImage(canvas_fresh, 0, 0, w, h);
    context.mozImageSmoothingEnabled = false;
    context.imageSmoothingEnabled = false;
    // scale up pixelated collage to fit canvas
    context.drawImage(canvasTag, 0, 0, w, h, 0, 0, canvasTag.width, canvasTag.height);
    requestAnimationFrame(render);
  }

  render()


  window.onresize = function(event) {
    canvasTag.width = window.innerWidth * 2;
    canvasTag.height = window.innerHeight * 2;
    canvasTag.style.width = window.innerWidth + "px";
    canvasTag.style.height = window.innerHeight + "px";
    canvas_fresh.width = window.innerWidth * 2;
    canvas_fresh.height = window.innerHeight * 2;
    canvas_fresh.style.width = window.innerWidth + "px";
    canvas_fresh.style.height = window.innerHeight + "px";

    ok_counter = 0;
    if (!window.innerWidth < 520) {
      draw_once( window.innerWidth - (pop_w/2), window.innerHeight - (pop_h/2), true)
    } else {
      draw_once( window.innerWidth - (pop_w/2), window.innerHeight - (pop_h/2) + 100, true)
    }
  };


  $('.marquee').marquee({
    //speed in milliseconds of the marquee
    duration: 7000,
    //gap in pixels between the tickers
    gap: 50,
    //time in milliseconds before the marquee will start animating
    delayBeforeStart: 0,
    //'left' or 'right'
    direction: 'left',
    //true or false - should the marquee be duplicated to show an effect of continues flow
    duplicated: true,
    startVisible:false
});



