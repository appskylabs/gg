var system = require('system');
var webpage = require('webpage').create();

if (system.args.length === 1) {
    console.log('Url address is required');
    phantom.exit();
}
else{
 
    webpage.viewportSize = { width: 1280, height: 1024};
    webpage.scrollPosition = { top: 0, left: 0 };
    var urlAddress = system.args[1].toLowerCase();
    t = Date.now();
    webpage.open(urlAddress, function(status) {

        if (status !== 'success') {
            console.log('FAIL to load the address');
            pantom.exit();
        } else {
            t = Date.now() - t;
            console.log('Page title is ' + webpage.evaluate(function () {
                return document.title;
            }));
            console.log('Loading time ' + t + ' msec');

            var height = webpage.evaluate(function() {
                return document.body.scrollHeight;
              });
            console.log("Webpage height: " + height);
            console.log("Capturing webpage...");
       
              webpage.scrollPosition = { top: height/3, left: 0 };

              setTimeout(function(){
                  webpage.scrollPosition = { top: height/2, left: 0 };
              }, 2000);
  
              setTimeout(function(){
                  webpage.scrollPosition = { top: height/2 + height/5, left: 0 };
              }, 4000);
  
              setTimeout(function(){
                  webpage.scrollPosition = { top: height-150, left: 0 };
              }, 6000);
    
            setTimeout(function(){
                    webpage.scrollPosition = { top: 0, left: 0 };
                  webpage.render('test.png');
                  console.log("Saved file");
                  phantom.exit();
            }, 9000);
        }
    
    });

}

