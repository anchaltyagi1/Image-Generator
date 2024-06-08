const imageModel = require("../models/imageModel");
const fetch = require("node-fetch");

const generateImage = async (req, res) => {
  try {
    const response = await fetch(
      "https://api.unsplash.com/photos/random",
      {
        method: "GET",
        headers: {
          Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }

    const result = await response.json();
    const url = result.urls.full; // Ensure `url` is declared properly

    const image = new imageModel({
      query: "random",
      image: url,
    });
    await image.save();

    res.status(200).json({
      status: "success",
      message: "Image generated successfully",
      data: {
        url,
      },
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
};

const getImages = async (req, res) => {
  try {
    const images = await imageModel.find();
    res.status(200).json({
      status: "success",
      message: "Images retrieved successfully",
      data: images,
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({
      status: "error",
      message: e.message,
    });
  }
};

module.exports = { generateImage, getImages };
