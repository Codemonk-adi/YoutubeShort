# URLshortner




https://user-images.githubusercontent.com/56336914/154789358-a5fe34e4-7d77-4041-9095-29442baf6eac.mp4




This service makes transfering text and code easier and secure, as a bonus it also doubles down as a url shortner.
A registered user can sign in and enter Text/uploadtext files/paste in the text area and has the option to enter a key for encryption.
upon submission, a shortened url is generated, clicking the link takes the user to the frontend where the time and ip address is logged and the data is decryted if needed.

Track route lists all the queries for the user with the ip address and time of access,
delete route deletes the query and the renew route extends the life of the link.

links get deleted after a day using TTL in mongodb.

Tech Stack

Backend is built using node and express and MongoDB is used to store the user info as well as the query details. Heroku is used to deploy the backend.

React is used in frontend and is deployed on netlify.

<b>Deployment Link </b>

Backend: https://consise-farms.herokuapp.com/


Frontend: https://polynomial-front.netlify.app/

<b> Routes </b>

<b>Post</b>

&emsp;/api/signup

&emsp;&emsp;&emsp;requries jwt authenticaton : false

&emsp;&emsp;&emsp;expected parameters: firstName : String, lastName : String, username : Email , password : String

&emsp;&emsp;&emsp;response: token : jwt auth token.


&emsp;/api/login

&emsp;&emsp;&emsp;requries jwt authenticaton : false

&emsp;&emsp;&emsp;expected parameters: username : Email , password : String

&emsp;&emsp;&emsp;response: token : jwt auth token.


&emsp;/admin/generateUrl

&emsp;&emsp;&emsp;requries jwt authenticaton : true

&emsp;&emsp;&emsp;expected parameters: Data : String , key : String

&emsp;&emsp;&emsp;response: URL : String 


&emsp;/admin/host

&emsp;&emsp;&emsp;requries jwt authenticaton : false

&emsp;&emsp;&emsp;expected parameters: queryid : Stirng , key : String

&emsp;&emsp;&emsp;response: Data : text


&emsp;/admin/delete

&emsp;&emsp;&emsp;requries jwt authenticaton : true

&emsp;&emsp;&emsp;expected parameters: queryid : Stirng 

&emsp;&emsp;&emsp;response: status : query status


&emsp;/admin/renew

&emsp;&emsp;&emsp;requries jwt authenticaton : true

&emsp;&emsp;&emsp;expected parameters: queryid : Stirng 

&emsp;&emsp;&emsp;response: status : query status


&emsp;/admin/details

&emsp;&emsp;&emsp;requries jwt authenticaton : true

&emsp;&emsp;&emsp;expected parameters: queryid : Stirng 

&emsp;&emsp;&emsp;response: status : query status

<b> Get </b>


&emsp;/admin/host/:queryid

&emsp;&emsp;&emsp;requries jwt authenticaton : false

&emsp;&emsp;&emsp;response: redirect to URL or Frontend to decrypt/display data


&emsp;/admin/host/tract

&emsp;&emsp;&emsp;requries jwt authenticaton : true

&emsp;&emsp;&emsp;response:[ {id : queryid , timestamp : Time Creation, ExpireAt : Time of expiration, url : shortened link},{...}]


<video src='https://github.com/Codemonk-adi/urlshortner/blob/master/Polynomial-Demo.mp4' width=180/>

![Demo Video](https://github.com/Codemonk-adi/urlshortner/blob/master/Polynomial-Demo.mp4)
![Home Page](https://github.com/Codemonk-adi/urlshortner/blob/master/Home-page.png)
![Signup](https://github.com/Codemonk-adi/urlshortner/blob/master/signup-page.png)

  

