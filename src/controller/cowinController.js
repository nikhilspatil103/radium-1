const axios = require('axios')


const getLondonWether = async function(req,res){
    try{
        let option={
            methos:"get",
            url :`http://api.openweathermap.org/data/2.5/weather?q=${req.query.q}&appid=ce6b270038df640c6cb716205417bc5e`
        }
        let response= await axios(option)
        res.status(200).send({status:true, temp : response.data.main.temp})
    }catch(err){
        res.status(500).send({status:false, msg:err.message})
    }
}

const sortCities = async function(req,res){
    try{
         let  city=["Bengaluru","Mumbai", "Delhi", "Kolkata", "Chennai", "London", "Moscow"]
         let final=[]
        for(i=0;i<city.length; i++){
            let option={
                methos:"get",
                url :`http://api.openweathermap.org/data/2.5/weather?q=${city[i]}&appid=ce6b270038df640c6cb716205417bc5e` 
            }
            let response= await axios(option)
           final.push({"city": city[i], "temp" : response.data.main.temp})
        }
        let sortedCities= final.sort(function(a,b) {return a.temp-b.temp})
        res.status(200).send({status :true,data : sortedCities})
    }catch(err){
        res.status(500).send({status:false, msg:err.message})
    }
}

module.exports={
    getLondonWether,sortCities
}