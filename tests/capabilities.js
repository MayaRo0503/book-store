const { Browser } = require("selenium-webdriver");

const chromeCapabilities = {
  browserName: Browser.CHROME,
  "goog:chromeOptions": {
    args: [
      "--disable-gpu",
      "--window-size=1920,1080",
      "--no-sandbox",
      "--disable-dev-shm-usage",
    ],
    prefs: {
      "download.default_directory": "/path/to/download/directory",
      "profile.default_content_settings.popups": 0,
      "profile.content_settings.exceptions.automatic_downloads.*.setting": 1,
    },
    excludeSwitches: ["enable-automation"],
    useAutomationExtension: false,
  },
};

const firefoxCapabilities = {
  browserName: Browser.FIREFOX,
  "moz:firefoxOptions": {
    args: ["--width=1920", "--height=1080"],
    prefs: {
      "browser.download.folderList": 2,
      "browser.download.dir": "/path/to/download/directory",
      "browser.helperApps.neverAsk.saveToDisk": "application/pdf",
      "pdfjs.disabled": true,
      "browser.download.manager.showWhenStarting": false,
      "browser.download.manager.focusWhenStarting": false,
      "browser.download.useDownloadDir": true,
      "browser.tabs.remote.autostart": false,
      "network.http.phishy-userpass-length": 255,
      "security.fileuri.strict_origin_policy": false,
    },
    log: {
      level: "trace",
    },
  },
};

module.exports = { chromeCapabilities, firefoxCapabilities };
