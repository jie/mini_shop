class Settings {
  constructor() {
    this.config = {}
  }
  loadConfig(data) {
    this.config = data
  }
}

var settings = new Settings()
export default settings;