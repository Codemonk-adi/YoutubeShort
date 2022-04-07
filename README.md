# Youtube Shortner







https://user-images.githubusercontent.com/56336914/162129195-90399150-4d23-43e6-8e66-57092989e468.mp4




This service shortens URLs and provides encryption facility for secure transmission.
A registered user can sign in and enter Text/uploadtext files/paste in the text area and has the option to enter a key for encryption.
upon submission, a shortened url is generated, clicking the link takes the user to the frontend where the time and ip address is logged and the data is decrypted if needed.

If no encrytion is requested the the link takes the user to the youtube video directy

Track route lists all the queries for the user with the ip address and time of access,
delete route deletes the query and the renew route extends the life of the link.

links get deleted after a week using TTL in mongodb.

## Tech Stack

Backend is built using node and express and MongoDB is used to store the user info as well as the query details. Heroku is used to deploy the backend.

React is used in frontend and is deployed on netlify.

## Deployment Link 

Backend: https://my-poly.herokuapp.com/


Frontend: https://polynomial-front.netlify.app/

## Routes 

### Post

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

### Get 


&emsp;/admin/host/:queryid

&emsp;&emsp;&emsp;requries jwt authenticaton : false

&emsp;&emsp;&emsp;response: redirect to URL or Frontend to decrypt/display data


&emsp;/admin/host/tract

&emsp;&emsp;&emsp;requries jwt authenticaton : true

&emsp;&emsp;&emsp;response:[ {id : queryid , timestamp : Time Creation, ExpireAt : Time of expiration, url : shortened link},{...}]




