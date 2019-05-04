const models = require('../models');
const Promise = require('bluebird');

module.exports.createSession = (req, res, next) => {
models.Sessions.get({"hash" : req.cookies["shortlyid"]})
.then(data=>{
if(!data){
    req.session = {} 
    models.Sessions.create()
    .then((data)=>{
        //console.log(data);
        return models.Sessions.get({"id" : data.insertId});
    })
    .then((data)=>{
        req.session = data;
       // console.log(req.session);
      // console.log(data.hash.length);
        res.cookies['shortlyid'] = {
            'value' : data.hash
        };
        next();
    });
}else{
    models.Sessions.create()
    .then((data)=>{
        return models.Sessions.get({"hash" : Object.values(req.cookies)[0]});
    })
    .then((data)=>{
        req.session = data;
        res.cookies['shortlyid'] = {
            'value' : data.hash
        };
        next();
    });
}
});
// .then((data)=> {req.session = data
// req.send();}
// );
// next();
};

/************************************************************/
// Add additional authentication middleware functions below
/************************************************************/

