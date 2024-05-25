const chromeCapabilities = {
  browserName: "chrome",
  "goog:chromeOptions": {
    args: [
      "--disable-gpu", // Disable GPU hardware acceleration
      "--window-size=1920,1080", // Set the window size of the browser
      "--no-sandbox", // Disable the sandbox for running Chrome
      "--disable-dev-shm-usage", // Overcome limited resource problems
    ],
    prefs: {
      "download.default_directory": "/path/to/download/directory", // Set default download directory
      "profile.default_content_settings.popups": 0, // Disable popups
      "profile.content_settings.exceptions.automatic_downloads.*.setting": 1, // Allow multiple automatic downloads
    },
    excludeSwitches: ["enable-automation"], // Make Chrome look like non-automated (removes infobar)
    useAutomationExtension: false, // Disable automation extension
  },
};

const firefoxCapabilities = {
  browserName: "firefox",
  "moz:firefoxOptions": {
    args: [
      "--width=1920", // Set the width of the window
      "--height=1080", // Set the height of the window
    ],
    prefs: {
      "browser.download.folderList": 2, // Custom location for downloads
      "browser.download.dir": "/path/to/download/directory", // Set download directory
      "browser.helperApps.neverAsk.saveToDisk": "application/pdf", // MIME types to save to disk without asking
      "pdfjs.disabled": true, // Disable built-in PDF viewer
      "browser.download.manager.showWhenStarting": false, // Do not show the download manager when starting a download
      "browser.download.manager.focusWhenStarting": false, // Don't take focus when starting downloads
      "browser.download.useDownloadDir": true, // Use the directory specified in the `browser.download.dir`
      "browser.tabs.remote.autostart": false, // Disable multi-process tabs to avoid resource issues
      "network.http.phishy-userpass-length": 255, // Extend allowed lengths for username/password in URLs
      "security.fileuri.strict_origin_policy": false, // Loosen same-origin policy in local files
    },
    log: {
      level: "trace", // Set log level (trace, debug, info, warn, error, fatal)
    },
  },
};

module.exports = { chromeCapabilities, firefoxCapabilities };
