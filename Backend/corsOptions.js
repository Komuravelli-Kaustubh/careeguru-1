const allowedOrigins = ['http://localhost:5001',
                        'http://localhost:3000',];

const corsOptions = {
    origin: (origin, callback)=>{
        if(allowedOrigins.indexOf(origin)!==-1||!origin)
        callback(null, true);
        else callback(new Error("Not allowed in cors"));
    }
}

module.exports = corsOptions;