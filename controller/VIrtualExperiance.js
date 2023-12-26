const VitualDB = require("../model/VEModel");
const Products = require("../model/Products");
const getVirtualExperianceFields = async (req, res) => {
    try {
        const virtualExperiance = await VitualDB.find();
        res.json(virtualExperiance);
    } catch (error) {
        res.json({ message: error });
    }
}
const virtualExperianceFilterData = async (req, res) => {
    try {
        const { rooms, activities, budget, flooring, colors, widthOfFlooring } = req.query;
        const filter = {};

        if (colors) filter['colors'] = { $in: colors.split(',') };
        if (rooms) filter['rooms'] = { $in: rooms.split(',') };
        if (widthOfFlooring) filter['widthOfFlooring'] = { $in: widthOfFlooring.split(',') };
        if (activities) filter['activities'] = { $in: activities.split(',') };
        if (flooring) filter['floor'] = { $in: flooring.split(',') };
        if (budget) filter['price'] = { $eq: parseFloat(budget) };


        const data = await Products.find(filter);
        res.json(data);
    } catch (error) {
        res.json({ message: error.message || 'An error occurred' });
    }
};
module.exports = { getVirtualExperianceFields,virtualExperianceFilterData };