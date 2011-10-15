$(function() {
  // Set default variable values
  var GAUGE_DEG, bytesToDegrees, gauge_midpoint, gauge_svg, interval, memory_value, updateGauge, _this;
  _this = this;
  GAUGE_DEG = 270;
  gauge_midpoint = Math.floor(GAUGE_DEG / 2);
  memory_value = $('#memory_usage .value');



  // Simple conversion function from memory to degrees
  bytesToDegrees = function(bytes, limit) {
    return Math.floor(bytes * GAUGE_DEG / limit);
  };





  // Insert SVG DOM element
  ($('#gauge_container')).svg();
  gauge_svg = ($('#gauge_container')).svg('get');

  // Load SVG into the gauge_svg DOM element
  gauge_svg.load('images/gauge.svg', {
    changeSize: true,
    onLoad: function(svgwrapper) {
      // Make gauge pointer accessible
      _this.gauge_ptr = $(gauge_svg.getElementById('gauge_pointer'));
    }
  });




  // Handle to update function which rotates the gauge pointer
  updateGauge = function(data) {
    var deg, rot;
    deg = bytesToDegrees(data.usage, data.limit);
    deg -= gauge_midpoint;
    rot = "rotate(" + deg + ", 335, 473)";
    
    // Do the rotation animation
    _this.gauge_ptr.stop().animate({
      svgTransform: rot
    }, 500);
    return memory_value.text(Math.floor(data.usage / 1048576));
  };







  // Log events to the console
  Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
  };

  // Bind pusher to the update gauge function
  var pusher = new Pusher(PUSHER_KEY);
  var channel = pusher.subscribe(PUSHER_CHANNEL);
  channel.bind(PUSHER_EVENT, updateGauge);






  // Make AJAX calls for the stop, start, eat memory, etc links
  $(".async").click(function(event) {
      event.preventDefault();
      var url = $(this).attr('href');
      $.get(url);
  });
});
