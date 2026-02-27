const swaggerJsDocs = require("swagger-jsdoc")
const swaggerUI = require("swagger-ui-express")

const configSwagger = (app) => {
    const swaggerDocument = swaggerJsDocs({
        swaggerDefinition : {
            openapi : "3.0.1" , 
            info : {
                title : "online courses",
                description : "online course apis with expressJs + nodeJs + mongoDB and others",
                version : "1.10.22"
            },
            server : [
                {
                    url : "http://localhost:3000"
                }
            ],
        },
        apis : ["../app.js"]
    })
    const swagger = swaggerUI.setup(swaggerDocument , {})
    app.use("/api-docs" , swaggerUI.serve , swagger)
}

module.exports = configSwagger