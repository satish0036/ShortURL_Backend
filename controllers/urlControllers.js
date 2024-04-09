
const URL = require("../model/urlModel.js")
const ShortUniqueId = require("short-unique-id")


async function generateNewShortUrl(req, res) {
    const uid = new ShortUniqueId({ length: 10 });
    const body = req.body
    const generatedShortId = uid.rnd();

    if (!body || body.url === '') {

        return res.status(400).json({ "error": "Url required" })
    }
    try {
        const shortURL = URL.create({
            shortId: generatedShortId,
            redirectURL: body.url,
            visitHistory: []
        })
        res.json({ id: generatedShortId })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ "error": "Internal server error" });
    }

}


async function handleRedirectUrl(req, res) {
    const UrlId = req.params.id;
    // console.log(UrlId)
    if (!UrlId) {
        return res.status(400).json({ "error": "Id is messing" });
    }
    try {

        const data = await URL.findOneAndUpdate({ shortId: UrlId }, { $push: { visitHistory: { timeStamp: Date.now() } } })
        if (!data) {
            return res.status(404).json({ "error": "Data correspondece to URL not found" });
        }
        res.redirect(data.redirectURL);
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ "error": "Internal server error" });
    }
}

const handleAnalyticsOfURL = async (req, res) => {
    const urlId = req.params.id;
    try {
        const data = await URL.findOne({ shortId: urlId })
        if(!data){
            return res.status(404).json({ "error": "No data found with this link" })
        }
        res.status(200).json({
            totalClick: data?.visitHistory.length,
            analytics: data?.visitHistory
        })
    }
    catch (err) {
        console.log(err)
        return res.status(500).json({ "error": "Internal server error" });
    }
}


module.exports = { handleAnalyticsOfURL, handleRedirectUrl, generateNewShortUrl }

