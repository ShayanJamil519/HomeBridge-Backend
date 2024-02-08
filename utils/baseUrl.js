const environment = process.env.ENVIRONMENT;
let apiUrl;
if (environment === "production") {
  apiUrl = process.env.PRODUCTION_URL;
} else {
  apiUrl = process.env.DEVELOPMENT_URL;
}

module.exports = apiUrl;
