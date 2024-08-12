const Banner = require('../models/banner.model');

// Get banner details
exports.getBanner = async (req, res) => {
    try {
        const banner = await Banner.getBanner();
        res.json(banner);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// Update banner details
exports.updateBanner = async (req, res) => {
    const { description, timer, link, visible } = req.body;
    try {
        await Banner.updateBanner(description, timer, link, visible);
        res.status(201).json({ message: 'Banner updated successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
