


export function apiKeyAuth(req,res,next){
     if (req.method === "OPTIONS") {
    return next();
  }
    const clientkey = req.get("x-api-key")
    const apikey = process.env.API_KEY
     if (!clientkey) return res.status(401).json({ message: "Api-key required" });
    if (clientkey.trim() !== apikey.trim())
    return res.status(401).json({ message: "Invalid key" });
    
    //om nyckeln saknas i .env då får vi ett serferkonig fel.
    if(!apikey){
        //error
        return res.status(500).json({message: "server error"})
    }
    if(!clientkey){
        return res.status(401).json({message: "Api-key required"})
    }
   
    next()

    
}