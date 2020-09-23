$(document).ready(function() {
  $("p").click(function() {
    $(this).hide();
    /*$.getJSON("https://api.twitch.tv/kraken/streams/39daph?callback=?").done(function(data) {
        if(data.stream) {
            console.log('online()');
        } else {
            console.log('offline()');
        }
    });*/
  });
});