


const validate= function (req, res, next) {
    //res.setHeader('isFreeApp' , Boolean )
    let appUser=req.headers.isfreeapp

    if(!appUser){
        res.send("Missing Mandatory header")   
    }else {
        if(appUser==='true'){
            appUser= true
        }else {
            appUser=false
        }
       req.isFreeAppUser = appUser
       next()
    }
     
}


module.exports.validate= validate
