// Global polyfills for Node.js compatibility in browser
;(function () {
  if (typeof window !== 'undefined') {
    // Provide global object
    window.global = window.global || window

    // Provide process object
    if (!window.process) {
      window.process = {
        env: {},
        browser: true,
        version: '',
        versions: { node: '16.0.0' },
        nextTick: function (fn) {
          setTimeout(fn, 0)
        },
      }
    }

    // Provide Buffer if needed
    if (!window.Buffer) {
      window.Buffer = {
        isBuffer: function () {
          return false
        },
      }
    }
  }
})()
