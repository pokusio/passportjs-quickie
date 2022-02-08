(function(d, s, id){
   var js, fjs = d.getElementsByTagName(s)[0];
   if (d.getElementById(id)) {return;}
   js = d.createElement(s); js.id = id;
   js.src = "//connect.facebook.net/en_US/sdk.js";
   fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

window.fbAsyncInit = function() {
  FB.init({
    appId : '1616853315289008',
    xfbml : true,
    version : 'v2.8'
  });
};

$(document).ready(function() {
  $('.btn-facebook').click(function() {
    FB.getLoginStatus(function(response) {
      if (response.status === 'connected') {
        console.log('Already Logged In.');
      }
      else {
        FB.login();
      }
    });
  });
});
