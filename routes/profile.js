const express = require('express');
// use express router
const router = express.Router();
const fetch = require('node-fetch'); // similar to fetch API on the browser
const headers = {
    Authorization: "Bearer " + process.env.BRAWLSTARS_TOKEN
}

router.get('/:playerTag', async (req, res) => {
    try {
        // grab out playerTag from query
        const playerTag = req.params.playerTag;

        const response = await fetch(`${process.env.BRAWLSTARS_API_URL}/players/%23${playerTag}`, { headers });

        const data = await response.json();

        // check if the playerTag is invalid
        if (data.reason && data.reason === "notFound" ){
            return res.status(404).json({
                message: 'Player tag not found.'
            });
        };

        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error.'
        });
    }
});

router.get('/:playerTag/battlelog', async(req, res) => {
    try {
        const playerTag = req.params.playerTag;
        const response = await fetch(`${process.env.BRAWLSTARS_API_URL}/players/%23${playerTag}/battlelog`, { headers });

        const data = await response.json();

        if (data.reason && data.reason === "notFound" ){
            return res.status(404).json({
                message: 'Player tag not found.'
            });
        };

        res.json(data);

    } catch (error) {
        console.error(error);
        res.status(500).json({
            message: 'Server Error.'
        });
    }
});

// export the router
module.exports = router;
