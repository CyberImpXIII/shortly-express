module.exports.parseCookies = (req, res, next) => {
    let holder;
    req.headers.cookie ? holder = req.headers.cookie.split('; ') : holder = [];
    for(let i = 0; i < holder.length; i++){
        let key = holder[i].split('=')[0];
        let value = holder[i].split('=')[1];
        req.cookies[key] = value;
    }
    next();
};
