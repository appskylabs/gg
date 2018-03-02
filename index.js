const express = require('express')
var phantomjs = require('phantomjs-prebuilt')
var path = require('path')
const url = require('url');
var childProcess = require('child_process')
var binPath = phantomjs.path
const app = express();
const router = express.Router();

app.use('/api', router);

// from top level path e.g. localhost:3000, this response will be sent
router.get('/getScreenshot', (request, response) => {
    

    var urlParts = url.parse(request.url, true);
    var parameters = urlParts.query;
    var urlTest = parameters.url;
    
     var childArgs = [
        path.join(__dirname, 'screenshot.js'),
        urlTest
      ]
       
      childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
        // handle results
        console.log("something happened: \n" + stdout);
        response.json({message: 'Got screenshot of ' + urlTest});
      })
});


app.listen(process.env.PORT || 3000, () => console.log('Listening on port'));

