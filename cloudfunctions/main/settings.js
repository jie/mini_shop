class Settings {
  constructor() {
    this.config = {}
  }
  loadConfig(data) {
    this.config = data
  }
}

var settings = new Settings()

module.exports = settings