const swaggerJsDocs = require("swagger-jsdoc");
const swaggerUI = require("swagger-ui-express");

const configSwagger = (app) => {
  const swaggerDocument = swaggerJsDocs({
    definition: {
      openapi: "3.0.0",
      info: {
        title: "Online Course Platform API",
        description: "Complete REST API documentation for Online Course Platform built with Node.js, Express.js, MongoDB. Features include authentication with JWT & refresh tokens, course management, user management, comments, articles, and more.",
        version: "1.0.0",
        contact: {
          name: "API Support",
          email: "support@courseplatform.com"
        },
        license: {
          name: "MIT",
          url: "https://opensource.org/licenses/MIT"
        }
      },
      servers: [
        {
          url: "http://localhost:3000",
          description: "Development server"
        },
        {
          url: "https://api.courseplatform.com",
          description: "Production server"
        }
      ],
      tags: [
        { name: "Authentication", description: "User authentication and authorization endpoints" },
        { name: "Users", description: "User management operations" },
        { name: "Courses", description: "Course management and enrollment" },
        { name: "Categories", description: "Course category management" },
        { name: "Comments", description: "Course and article comments" },
        { name: "Articles", description: "Educational articles and blog posts" },
        { name: "Orders", description: "Course purchase orders" },
        { name: "Discounts", description: "Discount codes and promotions" },
        { name: "Tickets", description: "Support ticket system" },
        { name: "Notifications", description: "User notifications" },
        { name: "Contacts", description: "Contact form submissions" },
        { name: "Newsletter", description: "Newsletter subscriptions" },
        { name: "Menu", description: "Navigation menu management" },
        { name: "Search", description: "Search functionality" }
      ],
      components: {
        securitySchemes: {
          bearerAuth: {
            type: "http",
            scheme: "bearer",
            bearerFormat: "JWT",
            description: "Enter your JWT token in the format: Bearer {token}"
          },
          cookieAuth: {
            type: "apiKey",
            in: "cookie",
            name: "accessToken",
            description: "JWT token stored in httpOnly cookie"
          }
        },
        schemas: {
          User: {
            type: "object",
            properties: {
              _id: { type: "string", example: "507f1f77bcf86cd799439011" },
              username: { type: "string", example: "john_doe" },
              name: { type: "string", example: "John Doe" },
              email: { type: "string", format: "email", example: "john@example.com" },
              phoneNumber: { type: "string", example: "09123456789" },
              role: { type: "string", enum: ["USER", "ADMIN"], example: "USER" },
              createdAt: { type: "string", format: "date-time" },
              updatedAt: { type: "string", format: "date-time" }
            }
          },
          Course: {
            type: "object",
            properties: {
              _id: { type: "string", example: "507f1f77bcf86cd799439011" },
              title: { type: "string", example: "Complete React Course" },
              description: { type: "string", example: "Learn React from scratch" },
              price: { type: "number", example: 299000 },
              discount: { type: "number", example: 20 },
              cover: { type: "string", example: "course-cover.jpg" },
              instructor: { type: "string", example: "507f1f77bcf86cd799439011" },
              category: { type: "string", example: "507f1f77bcf86cd799439011" },
              status: { type: "string", enum: ["draft", "published"], example: "published" },
              createdAt: { type: "string", format: "date-time" }
            }
          },
          Error: {
            type: "object",
            properties: {
              message: { type: "string", example: "Error message" },
              error: { type: "string", example: "Detailed error information" }
            }
          },
          Success: {
            type: "object",
            properties: {
              message: { type: "string", example: "Operation successful" },
              data: { type: "object" }
            }
          }
        },
        responses: {
          UnauthorizedError: {
            description: "Access token is missing or invalid",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
                example: { message: "Access token required!" }
              }
            }
          },
          NotFoundError: {
            description: "Resource not found",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
                example: { message: "Resource not found!" }
              }
            }
          },
          ValidationError: {
            description: "Validation error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
                example: { message: "Validation failed", errors: [] }
              }
            }
          },
          ServerError: {
            description: "Internal server error",
            content: {
              "application/json": {
                schema: { $ref: "#/components/schemas/Error" },
                example: { message: "Internal server error!" }
              }
            }
          }
        }
      }
    },
    apis: ["./routes/v1/*.js", "./app.js"]
  });

  const options = {
    explorer: true,
    customCss: '.swagger-ui .topbar { display: none }',
    customSiteTitle: "Course Platform API Documentation"
  };

  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerDocument, options));
};

module.exports = configSwagger;
