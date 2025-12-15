


export function apiKeyAuth(req,res,next){
    const ApiKeyHeader = req.header("x-api-key")
    const apikey = process.env.API_KEY
    //om nyckeln saknas i .env då får vi ett serferkonig fel.
    if(!apikey){
        //error
        return res.status(500).json({message: "server error"})
    }
    if(!ApiKeyHeader || ApiKeyHeader !== apikey){
        return res.status(400).json({message: "Wrong Api key"})
    }
    next()
}