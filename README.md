# exchange_office

Steps to run Exchange Office App:


1. 
To get currency data:
in console opened in Exchange_office/beckend folder:   

npm install 

and next

nodemon index.js //on Mac 
or 
npx nodemon index.js //on Windows

2. 
To add user and read user details from local database:
in console opened in Exchange_office folder: 

npm install -g json-server

and next

json-server --watch db.json //on Mac
or
npx json-server --watch db.json //on Windows


3. 
To exchange currencies you have to sign in and setup your currency stock.
