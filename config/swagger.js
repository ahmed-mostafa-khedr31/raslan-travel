const path = require("path");
const swaggerJsdoc = require("swagger-jsdoc");

const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Raslan-travel API",
      version: "1.0.0",
      description: "API documentation for Raslan-travel application",
    },
    servers: [
      {
        url: "http://localhost:5000/api",
        description: "Development server",
      },
      {
        url: "https://raslan-travel.vercel.app/api",
        description: "Production server",
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
      schemas: {
        Banner: {
          type: "object",
          properties: {
            banner_image: { type: "string" },
            banner_title: { type: "string" },
            banner_description: { type: "string" },
            banner_button_text: { type: "string" },
            banner_button_link: { type: "string" },
          },
        },
        AboutSection: {
          type: "object",
          properties: {
            about_image: { type: "string" },
            about_title: { type: "string" },
            about_description: { type: "string" },
            about_button_text: { type: "string" },
            about_button_link: { type: "string" },
          },
        },
        Features: {
          type: "object",
          properties: {
            features_image: { type: "string" },
            features_title: { type: "string" },
            features_description: { type: "string" },
            features_button_text: { type: "string" },
            features_button_link: { type: "string" },
          },
        },
        Testimonials: {
          type: "object",
          properties: {
            testimonials_image: { type: "string" },
            testimonials_title: { type: "string" },
            testimonials_description: { type: "string" },
            testimonials_button_text: { type: "string" },
            testimonials_button_link: { type: "string" },
          },
        },
        Contact: {
          type: "object",
          properties: {
            contact_image: { type: "string" },
            contact_title: { type: "string" },
            contact_description: { type: "string" },
            contact_button_text: { type: "string" },
            contact_button_link: { type: "string" },
          },
        },
        Page: {
          type: "object",
          properties: {
            _id: { type: "string" },
            banner: { $ref: "#/components/schemas/Banner" },
            about: { $ref: "#/components/schemas/AboutSection" },
            features: { $ref: "#/components/schemas/Features" },
            testimonials: { $ref: "#/components/schemas/Testimonials" },
            contact: { $ref: "#/components/schemas/Contact" },
          },
        },
        PageResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "success" },
            data: { $ref: "#/components/schemas/Page" },
            error: { type: "string", nullable: true, example: null },
          },
        },
        User: {
          type: "object",
          properties: {
            _id: { type: "string" },
            name: { type: "string", example: "Amr" },
            email: { type: "string", example: "amr@gmail.com" },
            phone: { type: "string", example: "1190723497" },
            role: { type: "string", enum: ["admin", "user"], example: "user" },
            isActive: { type: "boolean", example: true },
            avatar: { type: "string", example: "uploads/man.png" },
          },
        },
        RegisterInput: {
          type: "object",
          required: ["name", "email", "phone", "password", "confirmPassword"],
          properties: {
            name: { type: "string", example: "Amr" },
            email: { type: "string", example: "amr@gmail.com" },
            phone: { type: "string", example: "1190723497" },
            password: { type: "string", example: "Aa#1996#2026" },
            confirmPassword: { type: "string", example: "Aa#1996#2026" },
            role: { type: "string", enum: ["admin", "user"], example: "user" },
            avatar: { type: "string", format: "binary" },
          },
        },
        UpdateUserInput: {
          type: "object",
          properties: {
            name: { type: "string" },
            email: { type: "string" },
            phone: { type: "string" },
            password: { type: "string" },
            confirmPassword: { type: "string" },
            role: { type: "string", enum: ["admin", "user"] },
            avatar: { type: "string", format: "binary" },
          },
        },
        LoginInput: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", example: "amr@gmail.com" },
            password: { type: "string", example: "Aa#1996#2026" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "login successful" },
            data: { $ref: "#/components/schemas/User" },
            token: { type: "string" },
            refreshToken: { type: "string" },
            expiresIn: { type: "string", example: "1h" },
            refreshExpiresIn: { type: "string", example: "7d" },
            error: { type: "string", nullable: true, example: null },
          },
        },
        UsersResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "success" },
            data: {
              type: "object",
              properties: {
                users: {
                  type: "array",
                  items: { $ref: "#/components/schemas/User" },
                },
              },
            },
            total: { type: "integer" },
            page: { type: "integer" },
            limit: { type: "integer" },
            error: { type: "string", nullable: true, example: null },
          },
        },
        UserResponse: {
          type: "object",
          properties: {
            message: { type: "string", example: "success" },
            data: { $ref: "#/components/schemas/User" },
            error: { type: "string", nullable: true, example: null },
          },
        },
        MessageResponse: {
          type: "object",
          properties: {
            message: { type: "string" },
            data: { nullable: true },
            error: { type: "string", nullable: true, example: null },
          },
        },
      },
    },
  },
  apis: [path.join(__dirname, "../routes/*.js").replace(/\\/g, "/")],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

module.exports = swaggerSpec;
