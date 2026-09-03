//const can be used too
const myhttp = require("http");

//core node file system has to be loaded
//promises asynchronous 
const cfs = require("fs").promises;

//when a request comes in this function gets calleed
const incomingRequest = ( requested, responded ) => {
        console.log( requested.url );

        // .readFile method of fs literally reads the file and comes from asynchronous promises portion of fs
        //after .readFile completes it runs .then method 
        // inside () create another function that receives contents of the file
        if ( requested.url === '/' ) {
            //dirname is getting the directory name
            cfs.readFile(__dirname + "/homefront.html").then(
                fileinfo => {
                    responded.writeHead( 200, { "Content-Type": "text/html; charset=UTF-8" });
                    //also could break into two separately using .setHeader and then writeHead(200)
                    responded.end(fileinfo); 
                    //end()sends the file contents back and closes the response
                }
            );
        } 
        else {
             cfs.readFile(__dirname + "/animals.json").then(
                fileinfo => {
                    responded.writeHead( 200, { "Content-Type": "application/json; charset=UTF-8" });
                    responded.end(fileinfo); 
                }
            );    

            
        } 

    };
// createServer() takes the argument in this case the function we create to run when a request from the web browser comes in
let mySecondServer = myhttp.createServer( 
    incomingRequest
);

//have to ask http to start listening on a tcp port for incoming http requests
// listen() is a method that takes 2 arguments, one is the tcp port # and the second is the string of the ip address to listen 
mySecondServer.listen( 8080, "127.0.0.1" ); // "127.0.0.1" local host ip