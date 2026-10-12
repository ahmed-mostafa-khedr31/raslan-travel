const About = require("../models/about");

const getAbout = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});
    res.status(200).json({
      message: "Data fetched successfully",
      data: about,
      error: null,
    });
  } catch (err) {
    res.status(500).json({
      message: "Data fetching failed",
      error: err.message,
      data: null,
    });
  }
};

const postAbout = async (req, res) => {
  try {
    let aboutData = await About.findOne();
    if (!aboutData) aboutData = await About.create({});

    const banner = req.body.banner || {};
    const about = req.body.about || {};
    const features = req.body.features || {};
    const testimonials = req.body.testimonials || {};
    const contact = req.body.contact || {};

    aboutData.banner = {
      banner_image: banner.banner_image ?? aboutData.banner?.banner_image ?? "",
      banner_title: banner.banner_title ?? aboutData.banner?.banner_title ?? "",
      banner_description:
        banner.banner_description ?? aboutData.banner?.banner_description ?? "",
      banner_button_text:
        banner.banner_button_text ?? aboutData.banner?.banner_button_text ?? "",
      banner_button_link:
        banner.banner_button_link ?? aboutData.banner?.banner_button_link ?? "",
    };
    about.about = {
      about_image: about.about_image ?? aboutData.about?.about_image ?? "",
      about_title: about.about_title ?? aboutData.about?.about_title ?? "",
      about_description:
        about.about_description ?? aboutData.about?.about_description ?? "",
      about_button_text:
        about.about_button_text ?? aboutData.about?.about_button_text ?? "",
      about_button_link:
        about.about_button_link ?? aboutData.about?.about_button_link ?? "",
    };
    aboutData.features = {
      features_image:
        features.features_image ?? aboutData.features?.features_image ?? "",
      features_title:
        features.features_title ?? aboutData.features?.features_title ?? "",
      features_description:
        features.features_description ??
        aboutData.features?.features_description ??
        "",
      features_button_text:
        features.features_button_text ??
        aboutData.features?.features_button_text ??
        "",
      features_button_link:
        features.features_button_link ??
        aboutData.features?.features_button_link ??
        "",
    };
    aboutData.testimonials = {
      testimonials_image:
        testimonials.testimonials_image ??
        aboutData.testimonials?.testimonials_image ??
        "",
      testimonials_title:
        testimonials.testimonials_title ??
        aboutData.testimonials?.testimonials_title ??
        "",
      testimonials_description:
        testimonials.testimonials_description ??
        aboutData.testimonials?.testimonials_description ??
        "",
      testimonials_button_text:
        testimonials.testimonials_button_text ??
        aboutData.testimonials?.testimonials_button_text ??
        "",
      testimonials_button_link:
        testimonials.testimonials_button_link ??
        aboutData.testimonials?.testimonials_button_link ??
        "",
    };
    aboutData.contact = {
      contact_image:
        contact.contact_image ?? aboutData.contact?.contact_image ?? "",
      contact_title:
        contact.contact_title ?? aboutData.contact?.contact_title ?? "",
      contact_description:
        contact.contact_description ??
        aboutData.contact?.contact_description ??
        "",
      contact_button_text:
        contact.contact_button_text ??
        aboutData.contact?.contact_button_text ??
        "",
      contact_button_link:
        contact.contact_button_link ??
        aboutData.contact?.contact_button_link ??
        "",
    };

    await aboutData.save();
    res.status(200).json(aboutData);
  } catch (err) {
    res.status(500).json({ message: "Data save failed", error: err.message });
  }
};

const patchAboutData = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});

    const banner = req.body.banner || {};
    const aboutData = req.body.about || {};
    const features = req.body.features || {};
    const testimonials = req.body.testimonials || {};
    const contact = req.body.contact || {};

    about.banner = {
      banner_image: banner.banner_image ?? home.banner?.banner_image ?? "",
      banner_title: banner.banner_title ?? about.banner?.banner_title ?? "",
      banner_description:
        banner.banner_description ?? about.banner?.banner_description ?? "",
      banner_button_text:
        banner.banner_button_text ?? about.banner?.banner_button_text ?? "",
      banner_button_link:
        banner.banner_button_link ?? about.banner?.banner_button_link ?? "",
    };
    home.about = {
      about_image: about.about_image ?? about.about?.about_image ?? "",
      about_title: about.about_title ?? about.about?.about_title ?? "",
      about_description:
        about.about_description ?? about.about?.about_description ?? "",
      about_button_text:
        about.about_button_text ?? about.about?.about_button_text ?? "",
      about_button_link:
        about.about_button_link ?? about.about?.about_button_link ?? "",
    };
    home.features = {
      features_image:
        features.features_image ?? about.features?.features_image ?? "",
      features_title:
        features.features_title ?? about.features?.features_title ?? "",
      features_description:
        features.features_description ??
        about.features?.features_description ??
        "",
      features_button_text:
        features.features_button_text ??
        about.features?.features_button_text ??
        "",
      features_button_link:
        features.features_button_link ??
        about.features?.features_button_link ??
        "",
    };
    about.testimonials = {
      testimonials_image:
        testimonials.testimonials_image ??
        about.testimonials?.testimonials_image ??
        "",
      testimonials_title:
        testimonials.testimonials_title ??
        about.testimonials?.testimonials_title ??
        "",
      testimonials_description:
        testimonials.testimonials_description ??
        about.testimonials?.testimonials_description ??
        "",
      testimonials_button_text:
        testimonials.testimonials_button_text ??
        about.testimonials?.testimonials_button_text ??
        "",
      testimonials_button_link:
        testimonials.testimonials_button_link ??
        about.testimonials?.testimonials_button_link ??
        "",
    };
    about.contact = {
      contact_image: contact.contact_image ?? home.contact?.contact_image ?? "",
      contact_title:
        contact.contact_title ?? about.contact?.contact_title ?? "",
      contact_description:
        contact.contact_description ?? about.contact?.contact_description ?? "",
      contact_button_text:
        contact.contact_button_text ?? about.contact?.contact_button_text ?? "",
      contact_button_link:
        contact.contact_button_link ?? about.contact?.contact_button_link ?? "",
    };

    await about.save();
    res.status(200).json(about);
  } catch (err) {
    res.status(500).json({ message: "Data update failed", error: err.message });
  }
};

const patchBanner = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});

    const banner = req.body.banner || req.body;

    about.banner = {
      banner_image: banner.banner_image ?? about.banner?.banner_image ?? "",
      banner_title: banner.banner_title ?? about.banner?.banner_title ?? "",
      banner_description:
        banner.banner_description ?? about.banner?.banner_description ?? "",
      banner_button_text:
        banner.banner_button_text ?? about.banner?.banner_button_text ?? "",
      banner_button_link:
        banner.banner_button_link ?? about.banner?.banner_button_link ?? "",
    };

    await about.save();
    res.status(200).json(about);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Banner update failed", error: err.message });
  }
};

const patchAbout = async (req, res) => {
  try {
    let aboutData = await About.findOne();
    if (!about) about = await About.create({});

    const about = req.body.about || req.body;

    about.about = {
      about_image: about.about_image ?? about.about?.about_image ?? "",
      about_title: about.about_title ?? about.about?.about_title ?? "",
      about_description:
        about.about_description ?? about.about?.about_description ?? "",
      about_button_text:
        about.about_button_text ?? about.about?.about_button_text ?? "",
      about_button_link:
        about.about_button_link ?? about.about?.about_button_link ?? "",
    };

    await about.save();
    res.status(200).json(about);
  } catch (err) {
    res
      .status(500)
      .json({ message: "About update failed", error: err.message });
  }
};

const patchFeatures = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});

    const features = req.body.features || req.body;

    about.features = {
      features_image:
        features.features_image ?? about.features?.features_image ?? "",
      features_title:
        features.features_title ?? about.features?.features_title ?? "",
      features_description:
        features.features_description ??
        about.features?.features_description ??
        "",
      features_button_text:
        features.features_button_text ??
        about.features?.features_button_text ??
        "",
      features_button_link:
        features.features_button_link ??
        about.features?.features_button_link ??
        "",
    };

    await about.save();
    res.status(200).json(about);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Features update failed", error: err.message });
  }
};

const patchTestimonials = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});

    const testimonials = req.body.testimonials || req.body;

    about.testimonials = {
      testimonials_image:
        testimonials.testimonials_image ??
        about.testimonials?.testimonials_image ??
        "",
      testimonials_title:
        testimonials.testimonials_title ??
        about.testimonials?.testimonials_title ??
        "",
      testimonials_description:
        testimonials.testimonials_description ??
        about.testimonials?.testimonials_description ??
        "",
      testimonials_button_text:
        testimonials.testimonials_button_text ??
        about.testimonials?.testimonials_button_text ??
        "",
      testimonials_button_link:
        testimonials.testimonials_button_link ??
        about.testimonials?.testimonials_button_link ??
        "",
    };

    await about.save();
    res.status(200).json(about);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Testimonials update failed", error: err.message });
  }
};

const patchContact = async (req, res) => {
  try {
    let about = await About.findOne();
    if (!about) about = await About.create({});

    const contact = req.body.contact || req.body;

    about.contact = {
      contact_image:
        contact.contact_image ?? about.contact?.contact_image ?? "",
      contact_title:
        contact.contact_title ?? about.contact?.contact_title ?? "",
      contact_description:
        contact.contact_description ?? about.contact?.contact_description ?? "",
      contact_button_text:
        contact.contact_button_text ?? about.contact?.contact_button_text ?? "",
      contact_button_link:
        contact.contact_button_link ?? about.contact?.contact_button_link ?? "",
    };

    await about.save();
    res.status(200).json(about);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Contact update failed", error: err.message });
  }
};

module.exports = {
  getAbout,
  postAbout,
  patchAboutData,
  patchBanner,
  patchAbout,
  patchFeatures,
  patchTestimonials,
  patchContact,
};
