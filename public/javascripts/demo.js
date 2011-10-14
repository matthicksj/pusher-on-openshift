$(function() {
  var GAUGE_DEG, bytesToDegrees, gauge_midpoint, gauge_svg, interval, memory_value, updateGauge, _this;
  _this = this;
  GAUGE_DEG = 270;
  gauge_midpoint = Math.floor(GAUGE_DEG / 2);
  memory_value = $('#memory_usage .value');
  ($('#gauge_container')).svg();
  gauge_svg = ($('#gauge_container')).svg('get');
  gauge_svg.load('images/gauge.svg', {
    changeSize: true,
    onLoad: function(svgwrapper) {
      _this.gauge_ptr = $(gauge_svg.getElementById('gauge_pointer'));
      return _this.gauge_bg = gauge_bg.getElementById('gauge_bg');
    }
  });
  bytesToDegrees = function(bytes, limit) {
    return Math.floor(bytes * GAUGE_DEG / limit);
  };
  updateGauge = function(data) {
    var deg, rot;
    deg = bytesToDegrees(data.usage, data.limit);
    deg -= gauge_midpoint;
    rot = "rotate(" + deg + ", 335, 473)";
    //console.log(rot);
    _this.gauge_ptr.stop().animate({
      svgTransform: rot
    }, 500);
    return memory_value.text(Math.floor(data.usage / 1048576));
  };
//  interval = setInterval((function() {
//    var data, limit, usage;
//    limit = 512 * 1048576;
//    usage = Math.random() * limit;
//    data = {
//      'usage': usage,
//      'limit': limit
//    };
//    return updateGauge(data);
//  }), 1000);
//  return ($('#stop')).click(function() {
//    return clearInterval(interval);
//  });

  // Enable pusher logging - don't include this in production
  Pusher.log = function(message) {
    if (window.console && window.console.log) window.console.log(message);
  };

  // Flash fallback logging - don't include this in production
  WEB_SOCKET_DEBUG = true;

  var pusher = new Pusher(PUSHER_KEY);
  var channel = pusher.subscribe(PUSHER_CHANNEL);
  channel.bind(PUSHER_EVENT, updateGauge);

  $(".async").click(function(event) {
      event.preventDefault();
      var url = $(this).attr('href');
      $.get(url);
  });
});
