const Home = require("../models/home.model");
const { httpStatus, httpMessage } = require("../utils/httpStatus");
const getHome = async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) home = await Home.create({});
    res.status(httpStatus.OK).json({
      message: httpMessage.SUCCESS,
      data: home,
      error: null,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: "Data fetching failed",
      error: err.message,
      data: null,
    });
  }
};

const postHome = async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) home = await Home.create({});

    const banner = req.body.banner || {};
    const about = req.body.about || {};
    const features = req.body.features || {};
    const testimonials = req.body.testimonials || {};
    const contact = req.body.contact || {};

    home.banner = {
      banner_image: banner.banner_image ?? home.banner?.banner_image ?? "",
      banner_title: banner.banner_title ?? home.banner?.banner_title ?? "",
      banner_description:
        banner.banner_description ?? home.banner?.banner_description ?? "",
      banner_button_text:
        banner.banner_button_text ?? home.banner?.banner_button_text ?? "",
      banner_button_link:
        banner.banner_button_link ?? home.banner?.banner_button_link ?? "",
    };
    home.about = {
      about_image: about.about_image ?? home.about?.about_image ?? "",
      about_title: about.about_title ?? home.about?.about_title ?? "",
      about_description:
        about.about_description ?? home.about?.about_description ?? "",
      about_button_text:
        about.about_button_text ?? home.about?.about_button_text ?? "",
      about_button_link:
        about.about_button_link ?? home.about?.about_button_link ?? "",
    };
    home.features = {
      features_image:
        features.features_image ?? home.features?.features_image ?? "",
      features_title:
        features.features_title ?? home.features?.features_title ?? "",
      features_description:
        features.features_description ??
        home.features?.features_description ??
        "",
      features_button_text:
        features.features_button_text ??
        home.features?.features_button_text ??
        "",
      features_button_link:
        features.features_button_link ??
        home.features?.features_button_link ??
        "",
    };
    home.testimonials = {
      testimonials_image:
        testimonials.testimonials_image ??
        home.testimonials?.testimonials_image ??
        "",
      testimonials_title:
        testimonials.testimonials_title ??
        home.testimonials?.testimonials_title ??
        "",
      testimonials_description:
        testimonials.testimonials_description ??
        home.testimonials?.testimonials_description ??
        "",
      testimonials_button_text:
        testimonials.testimonials_button_text ??
        home.testimonials?.testimonials_button_text ??
        "",
      testimonials_button_link:
        testimonials.testimonials_button_link ??
        home.testimonials?.testimonials_button_link ??
        "",
    };
    home.contact = {
      contact_image: contact.contact_image ?? home.contact?.contact_image ?? "",
      contact_title: contact.contact_title ?? home.contact?.contact_title ?? "",
      contact_description:
        contact.contact_description ?? home.contact?.contact_description ?? "",
      contact_button_text:
        contact.contact_button_text ?? home.contact?.contact_button_text ?? "",
      contact_button_link:
        contact.contact_button_link ?? home.contact?.contact_button_link ?? "",
    };

    await home.save();
    res.status(httpStatus.CREATED).json({
      message: httpMessage.CREATED,
      data: home,
      error: null,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.INTERNAL_SERVER_ERROR,
      error: err.message ?? httpMessage.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

const patchHome = async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) home = await Home.create({});

    const banner = req.body.banner || {};
    const about = req.body.about || {};
    const features = req.body.features || {};
    const testimonials = req.body.testimonials || {};
    const contact = req.body.contact || {};

    home.banner = {
      banner_image: banner.banner_image ?? home.banner?.banner_image ?? "",
      banner_title: banner.banner_title ?? home.banner?.banner_title ?? "",
      banner_description:
        banner.banner_description ?? home.banner?.banner_description ?? "",
      banner_button_text:
        banner.banner_button_text ?? home.banner?.banner_button_text ?? "",
      banner_button_link:
        banner.banner_button_link ?? home.banner?.banner_button_link ?? "",
    };
    home.about = {
      about_image: about.about_image ?? home.about?.about_image ?? "",
      about_title: about.about_title ?? home.about?.about_title ?? "",
      about_description:
        about.about_description ?? home.about?.about_description ?? "",
      about_button_text:
        about.about_button_text ?? home.about?.about_button_text ?? "",
      about_button_link:
        about.about_button_link ?? home.about?.about_button_link ?? "",
    };
    home.features = {
      features_image:
        features.features_image ?? home.features?.features_image ?? "",
      features_title:
        features.features_title ?? home.features?.features_title ?? "",
      features_description:
        features.features_description ??
        home.features?.features_description ??
        "",
      features_button_text:
        features.features_button_text ??
        home.features?.features_button_text ??
        "",
      features_button_link:
        features.features_button_link ??
        home.features?.features_button_link ??
        "",
    };
    home.testimonials = {
      testimonials_image:
        testimonials.testimonials_image ??
        home.testimonials?.testimonials_image ??
        "",
      testimonials_title:
        testimonials.testimonials_title ??
        home.testimonials?.testimonials_title ??
        "",
      testimonials_description:
        testimonials.testimonials_description ??
        home.testimonials?.testimonials_description ??
        "",
      testimonials_button_text:
        testimonials.testimonials_button_text ??
        home.testimonials?.testimonials_button_text ??
        "",
      testimonials_button_link:
        testimonials.testimonials_button_link ??
        home.testimonials?.testimonials_button_link ??
        "",
    };
    home.contact = {
      contact_image: contact.contact_image ?? home.contact?.contact_image ?? "",
      contact_title: contact.contact_title ?? home.contact?.contact_title ?? "",
      contact_description:
        contact.contact_description ?? home.contact?.contact_description ?? "",
      contact_button_text:
        contact.contact_button_text ?? home.contact?.contact_button_text ?? "",
      contact_button_link:
        contact.contact_button_link ?? home.contact?.contact_button_link ?? "",
    };

    await home.save();
    res.status(httpStatus.OK).json({
      message: httpMessage.SUCCESS,
      data: home,
      error: null,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.INTERNAL_SERVER_ERROR,
      error: err.message ?? httpMessage.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

const patchBanner = async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) home = await Home.create({});

    const banner = req.body.banner || req.body;

    home.banner = {
      banner_image: banner.banner_image ?? home.banner?.banner_image ?? "",
      banner_title: banner.banner_title ?? home.banner?.banner_title ?? "",
      banner_description:
        banner.banner_description ?? home.banner?.banner_description ?? "",
      banner_button_text:
        banner.banner_button_text ?? home.banner?.banner_button_text ?? "",
      banner_button_link:
        banner.banner_button_link ?? home.banner?.banner_button_link ?? "",
    };

    await home.save();
    res.status(httpStatus.OK).json({
      message: httpMessage.SUCCESS,
      data: home,
      error: null,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.INTERNAL_SERVER_ERROR,
      error: err.message ?? httpMessage.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

const patchAbout = async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) home = await Home.create({});

    const about = req.body.about || req.body;

    home.about = {
      about_image: about.about_image ?? home.about?.about_image ?? "",
      about_title: about.about_title ?? home.about?.about_title ?? "",
      about_description:
        about.about_description ?? home.about?.about_description ?? "",
      about_button_text:
        about.about_button_text ?? home.about?.about_button_text ?? "",
      about_button_link:
        about.about_button_link ?? home.about?.about_button_link ?? "",
    };

    await home.save();
    res.status(httpStatus.OK).json({
      message: httpMessage.SUCCESS,
      data: home,
      error: null,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.INTERNAL_SERVER_ERROR,
      error: err.message ?? httpMessage.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

const patchFeatures = async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) home = await Home.create({});

    const features = req.body.features || req.body;

    home.features = {
      features_image:
        features.features_image ?? home.features?.features_image ?? "",
      features_title:
        features.features_title ?? home.features?.features_title ?? "",
      features_description:
        features.features_description ??
        home.features?.features_description ??
        "",
      features_button_text:
        features.features_button_text ??
        home.features?.features_button_text ??
        "",
      features_button_link:
        features.features_button_link ??
        home.features?.features_button_link ??
        "",
    };

    await home.save();
    res.status(httpStatus.OK).json({
      message: httpMessage.SUCCESS,
      data: home,
      error: null,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.INTERNAL_SERVER_ERROR,
      error: err.message ?? httpMessage.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

const patchTestimonials = async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) home = await Home.create({});

    const testimonials = req.body.testimonials || req.body;

    home.testimonials = {
      testimonials_image:
        testimonials.testimonials_image ??
        home.testimonials?.testimonials_image ??
        "",
      testimonials_title:
        testimonials.testimonials_title ??
        home.testimonials?.testimonials_title ??
        "",
      testimonials_description:
        testimonials.testimonials_description ??
        home.testimonials?.testimonials_description ??
        "",
      testimonials_button_text:
        testimonials.testimonials_button_text ??
        home.testimonials?.testimonials_button_text ??
        "",
      testimonials_button_link:
        testimonials.testimonials_button_link ??
        home.testimonials?.testimonials_button_link ??
        "",
    };

    await home.save();
    res.status(httpStatus.OK).json({
      message: httpMessage.SUCCESS,
      data: home,
      error: null,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.INTERNAL_SERVER_ERROR,
      error: err.message ?? httpMessage.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

const patchContact = async (req, res) => {
  try {
    let home = await Home.findOne();
    if (!home) home = await Home.create({});

    const contact = req.body.contact || req.body;

    home.contact = {
      contact_image: contact.contact_image ?? home.contact?.contact_image ?? "",
      contact_title: contact.contact_title ?? home.contact?.contact_title ?? "",
      contact_description:
        contact.contact_description ?? home.contact?.contact_description ?? "",
      contact_button_text:
        contact.contact_button_text ?? home.contact?.contact_button_text ?? "",
      contact_button_link:
        contact.contact_button_link ?? home.contact?.contact_button_link ?? "",
    };

    await home.save();
    res.status(httpStatus.OK).json({
      message: httpMessage.SUCCESS,
      data: home,
      error: null,
    });
  } catch (err) {
    res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: httpMessage.INTERNAL_SERVER_ERROR,
      error: err.message ?? httpMessage.INTERNAL_SERVER_ERROR,
      data: null,
    });
  }
};

module.exports = {
  getHome,
  postHome,
  patchHome,
  patchBanner,
  patchAbout,
  patchFeatures,
  patchTestimonials,
  patchContact,
};
