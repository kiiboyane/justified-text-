# justified-text-

This restful API allows you to easily create an account which will be
associated to a Json web token (JWT) that expires after 24 hours. Once you login
again another token will be generated and stored in your cookies.After you login , you can simply start justifying your text , as long as it does not surpass 80000
characters per day . The link for the API is as followed : (I used an aws EC2 instance )
http://ec2-18-212-167-80.compute-1.amazonaws.com/
Talking tech :
    The API was build using Nodejs , express to be specific and it was tested using Chai. (some unit tests and authentication tests). The code is pushed to github :
    https://github.com/kiiboyane/justified-textIf you want to check the justifying function , check the folder work . The test are under the folder test . 
    Requests :
    * POST to /api/justify with a text/plain body, checks for the token in your cookies
    for authentication then returns the text justified with status 200 , 402 Payment
    required , 401 if no token is provided or 404 if there is no user corresponding to
    that token.
    * POST to /api/signup and a Json body { username : “kiibo” , password: “password” } , creates an account with those credentials and returns a JWT in a
    httponly cookie . 
    * POST to /api/signin with the credentials json body as above , checks if the user
    exists and sends a JWT in a httponly cookie .
    * POST to /api/token with the credentials json body as above , checks if the user
    exists and sends a JWT in a httponly cookie and a json response with the
    token . 
    * GET to /api/getuser with a cookie named “x-access-token” and a token value , checks if the token exists and sends the user’s information without the password
