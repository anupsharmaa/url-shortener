const shortid = require("shortid")

const {URL} = require("../models/url")

async function handleGenerateShortUrl(req, res) {
        const body = req.body;
    
        if (!body.url) {
            return res.status(400).json({ msg: "URL is required" });
        }
    
        let shortId;
        let existing;
    
        // Ensure generated shortId is unique
        do {
            shortId = shortid();
            existing = await URL.findOne({ shortId });
        } while (existing);
    
        try {
            await URL.create({
                shortId,
                redirectUrl: body.url,
                visitedHistory: []
            });
    
            return res.json({ id: shortId });
        } catch (error) {
            console.error("Error creating short URL:", error);
            return res.status(500).json({ msg: "Internal Server Error" });
        }
}


async function handleGetRedirectedUrl(req,res){
    //    console.log("Params:", req.params);

       const shortId = req.params.shortId;
       try {
        const entry = await URL.findOneAndUpdate(
            { shortId },
            { $push: { visitedHistory: { timestamp: Date.now() } } }
        );
        // console.log(entry)

        if (!entry) {
            return res.status(404).send("Short URL not found");
        }

        return res.redirect(entry.redirectUrl);
    } catch (error) {
        console.error("Error in handleGetRedirectedUrl:", error);
        return res.status(500).send("Internal Server Error");
    }
}

async function handleGetStats(req,res){

    const shortId = req.params.shortId;
    const result = await URL.findOne({shortId:shortId})
    return res.json({totalClicks: result.visitedHistory.length, analytics: result.visitedHistory})

}

async function handleGetAllUrl(req, res) {
  try {
    const entries = await URL.find({}); // Fetch all documents from the collection

    return res.status(200).json(entries);
  } catch (error) {
    console.error("Error in handleGetAllUrl:", error);
    return res.status(500).send("Internal Server Error");
  }
}


module.exports = { handleGenerateShortUrl, handleGetRedirectedUrl, handleGetStats,  handleGetAllUrl,}