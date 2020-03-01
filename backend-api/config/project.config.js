// -------------------------------------
// Server configuration
// -------------------------------------
const config = {
  server: {
    host: process.env.HOST || 'localhost',
    port: process.env.PORT || 3001,
    secure: false
  }
}

module.exports = config;
