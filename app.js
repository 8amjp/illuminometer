/*
 * Illuminometer
 *
 * Copyright 2015 8am.
 * http://8am.jp/
 *
 */

$(function() {
  var c = []; // canvas
  var o = $("canvas").width() * 0.5; //origin
  var t = o * 0.15; //line width
  var r = o - t; // radius
  init();
  
  $(window).on("load orientationchange resize", function(e) {
    layout();
  });

  $(window).on("devicelight", function(e){
    draw(e.originalEvent.value);
  });

  function draw(e) {
    c[1].clearRect(-o, -o, o * 2, o * 2);
    c[1].beginPath();
    c[1].arc(0, 0, r, -90 / 180 * Math.PI, ((360 * e / 1000) - 90) / 180 * Math.PI);
    c[1].stroke();
    c[1].fillText(e, 0, 0);
  }

  function layout() {
    var width = $(window).width();
    var height = $(window).height();
    var s = (height > width) ? width : height;
    $("#dashboard,canvas").width(s).height(s);
  };

  function init() {
    c = [$("canvas").get(0).getContext("2d"), $("canvas").get(1).getContext("2d")];
    $.each(c, function(i, e) {
      e.translate(o, o);
      e.lineWidth = t;
      e.fillStyle = "#E74C3C";
    });
    c[0].strokeStyle = "#000000";
    c[0].beginPath();
    c[0].arc(0, 0, r, 0, 2 * Math.PI);
    c[0].stroke();
    c[0].font = "32px 'PT Sans'";
    c[0].textAlign = "center";
    c[0].textBaseline = "top";
    c[0].fillText("lx", 0, 96);

    c[1].strokeStyle = "#E74C3C";
    c[1].lineCap = "round";
    c[1].font = "160px 'PT Sans'";
    c[1].textAlign = "center";
    c[1].textBaseline = "middle";
    c[1].fillText("0", 0, 0);

    layout();
  }
});
