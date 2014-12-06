module.exports = {
    server:{
        port: process.env.PORT || 8080,
    },
    email : 'sample@sample.com', 
    SMTP : {
	    service: 'Gmail',
	    auth: {
	        username: 'sample@sample.com',
	        password: 'kewaoluzy'
	    }
	},
    mongo : {
        host : 'mongodb://localhost:27017/whiteboard'
    }, 
    aws : {
        accessKeyId: 'x', 
        secretAccessKey: 'x',
        region: 'x'
    }
}