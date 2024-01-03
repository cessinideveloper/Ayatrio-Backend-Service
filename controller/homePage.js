const SliderDB = require("../model/Slider");
const MidInfoSectionDB = require("../model/MidSection");
const HeaderInfoDB = require("../model/Header");
const ImgSchemaDB = require("../model/ImgSection");
const ImgGridDB = require("../model/ImgGrid");

// -------------------------------

exports.createImgCircle = async (req, res) => {
  try {
    const imageUrl = req.files
      .filter((file) => file.fieldname === 'image')
      .map((file) => file.location);

    const { ...circles } = req.body;

    const convertToSchemaType = (inputData) => {
      const result = { circles: [] };

      for (const key in inputData) {
        if (inputData.hasOwnProperty(key)) {
          const match = key.match(/^circles\[(\d+)\]\.(\w+)$/);
          if (match) {
            const index = parseInt(match[1]);
            const field = match[2];

            if (!result.circles[index]) {
              result.circles[index] = {};
            }

            result.circles[index][field] = field === 'productPrice' ? Number(inputData[key]) : inputData[key];
          }
        }
      }

      return result;
    };
    const formattedCircles = convertToSchemaType(circles);

    const sliderInstance = new SliderDB({
      imgSrc: imageUrl.join(''),
      circles: formattedCircles,
    });

    await sliderInstance.save();
    res.status(201).json({ message: "Slider created successfully!..." });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getSliderCircle = async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 3;
  const skip = (page - 1) * limit;
  const lastIndex = page * limit;
  try {
    const sliders = await SliderDB.find();
    const length = sliders.length;
    let result = sliders.slice(skip, lastIndex);
    res.status(200).json({ result, length });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.deleteSliderCircle = async (req, res) => {
  const circleId = req.params.circleId;

  try {
    const result = await SliderDB.findOneAndDelete({ _id: circleId });

    if (!result) {
      return res.status(404).json({ message: 'Circle not found' });
    }

    // Fetch updated data after deletion
    const updatedData = await SliderDB.find();

    res.json(updatedData);
  } catch (error) {
    console.error('Error deleting circle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// --------------------

exports.createMidInfoSection = async (req, res) => {
  try {
    const info = await MidInfoSectionDB.create(req.body);
    res.status(201).json({ message: "Mid Section added successfully! " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getMidInfoSection = async (req, res) => {
  try {
    const info = await MidInfoSectionDB.find();
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.deleteMidInfoSection = async (req, res) => {
  const midInfoId = req.params.midInfoId;

  try {
    const result = await MidInfoSectionDB.findOneAndDelete({ _id: midInfoId });

    if (!result) {
      return res.status(404).json({ message: 'Circle not found' });
    }

    // Fetch updated data after deletion
    const updatedData = await MidInfoSectionDB.find();

    res.json(updatedData);
  } catch (error) {
    console.error('Error deleting circle:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// --------------------

exports.createHeaderInfoSection = async (req, res) => {
  try {
    const info = await HeaderInfoDB.create(req.body);
    res.status(201).json({ message: "Header card information  added successfully! " });
  } catch (error) {
    res.status(500).send(error);
  }
}

exports.getHeaderInfoSection = async (req, res) => {
  try {
    const info = await HeaderInfoDB.find();
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
exports.deleteHeaderInfoSection = async (req, res) => {
  const headerId = req.params.headerId;

  try {
    const result = await HeaderInfoDB.findOneAndDelete({ _id: headerId });

    if (!result) {
      return res.status(404).json({ message: 'Header card not found' });
    }

    // Fetch updated data after deletion
    const updatedData = await HeaderInfoDB.find();

    res.json(updatedData);
  } catch (error) {
    console.error('Error deleting header section:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

// --------------------

exports.createImgSection = async (req, res) => {
  try {
    const imageUrl = req.files
      .filter((file) => file.fieldname === 'image')
      .map((file) => file.location);

    const { text } = req.body;
    console.log(text);

    const imageInfo = new ImgSchemaDB({
      img: imageUrl.join(''),
      text
    })
    const imgSection = await imageInfo.save();

    res.status(201).json({ message: "Images Section added successfully! " });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.getImgSection = async (req, res) => {
  try {
    const info = await ImgSchemaDB.find();
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
exports.deleteImgSection = async (req, res) => {
  const imgId = req.params.imgId;

  try {
    const result = await ImgSchemaDB.findOneAndDelete({ _id: imgId });

    if (!result) {
      return res.status(404).json({ message: 'Image not found' });
    }

    // Fetch updated data after deletion
    const updatedData = await ImgSchemaDB.find();

    res.json(updatedData);
  } catch (error) {
    console.error('Error deleting images section:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};


// ----------- img grid --------------

exports.createImgGrid = async (req, res) => {
  try {
    const imgGrid = await ImgGridDB.create(req.body);
    res.status(201).json({ message: "Img grid created successfully!..." });
  } catch (error) {
    res.status(500).json(error);
  }
}

exports.getImgGrid = async (req, res) => {
  try {
    const imgGrid = await ImgGridDB.find();
    res.status(200).json(imgGrid);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

exports.deleteImgGrid = async (req, res) => {
  const imgGridId = req.params.imgGridId;

  try {
    const result = await ImgGridDB.findOneAndDelete({ _id: imgGridId });

    if (!result) {
      return res.status(404).json({ message: 'image not found' });
    }

    // Fetch updated data after deletion
    const updatedData = await ImgGridDB.find();

    res.json(updatedData);
  } catch (error) {
    console.error('Error deleting img:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
