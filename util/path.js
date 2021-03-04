const path = require('path');

// process    - available in all files
// mainModule - refer to the main module that started this app
// filename   - which file the module is in

// require.main REPLACES process.mainModule (deprecated)
// require.main refers to mainmodule that started this app

module.exports = path.dirname(require.main.filename);