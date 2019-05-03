const parseCookies = (req, res, next) => {
    req.headers.cookie ? req.cookie = req.headers.cookie.split('; ') : res.end(); 
    
};

module.exports = parseCookies;