const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    banner: {
      banner_image: { type: String, default: "" },
      banner_title: { type: String, default: "" },
      banner_description: { type: String, default: "" },
      banner_button_text: { type: String, default: "" },
      banner_button_link: { type: String, default: "" },
    },
    about: {
      about_image: { type: String, default: "" },
      about_title: { type: String, default: "" },
      about_description: { type: String, default: "" },
      about_button_text: { type: String, default: "" },
      about_button_link: { type: String, default: "" },
    },
    features: {
      features_image: { type: String, default: "" },
      features_title: { type: String, default: "" },
      features_description: { type: String, default: "" },
      features_button_text: { type: String, default: "" },
      features_button_link: { type: String, default: "" },
    },
    testimonials: {
      testimonials_image: { type: String, default: "" },
      testimonials_title: { type: String, default: "" },
      testimonials_description: { type: String, default: "" },
      testimonials_button_text: { type: String, default: "" },
      testimonials_button_link: { type: String, default: "" },
    },
    contact: {
      contact_image: { type: String, default: "" },
      contact_title: { type: String, default: "" },
      contact_description: { type: String, default: "" },
      contact_button_text: { type: String, default: "" },
      contact_button_link: { type: String, default: "" },
    },
  },
  { versionKey: false },
);

module.exports = mongoose.model("Home", homeSchema);
