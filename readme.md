#Whiteboard
Course management system for schools and universities

###Requirements
```
1. Node
2. MongoDB
3. npm package manager  
```

###Installation
```
1. npm install
2. npm install -g supervisor
3. npm install -g grunt-cli
4. bower install
```

###Build
```
grunt build //Builds everything, suitable for production
grunt 		  //build js, css and templates. Suitable for development
```

###Run
```
supervisor -e server  	 //Starts server
supervisor -e js server  //Start server and watch js files for changes
```

###API
All communication to the API should have `Content-Type: application/json; charset=utf-8`

###Author
Alex A.
