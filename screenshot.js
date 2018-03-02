var system = require('system');
var webpage = require('webpage').create();

if (system.args.length === 1) {
    console.log('Url address is required');
    phantom.exit();
}
else{
 
    webpage.viewportSize = { width: 1200, height: 1000};
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
            
           
            for(var heightVar = 0; heightVar < height; heightVar++){
                setTimeout(function(){
                    webpage.scrollPosition = { top: heightVar, left: 0 };
                }, 100);
            }
            //webpage.scrollPosition = { top: height, left: 0 };
    
          //  var d = new Date();
          //  var name = d.now();
            // Wait 10 seconds for images to download
            setTimeout(function(){
                    webpage.scrollPosition = { top: 0, left: 0 };
                  webpage.render('test.png');
                  console.log("Saved file");
                  phantom.exit();
            }, 10000);
        }
    
    });

}

