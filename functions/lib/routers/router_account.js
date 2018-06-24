var express = require('express');
var Master_functions = require('../dependencies/masterfunctions.js');
var switch_account = require('../switch/switch_router.js');
var switch_account_router = new switch_account();
var router = express.Router();
router.post('/', Master_functions.catchErrors(switch_account_router.switch_account));
module.exports = router;
//# sourceMappingURL=router_account.js.map