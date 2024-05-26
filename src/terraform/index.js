const TerraformSDK = require('./TerraformSDK');
const bash = require('../bash/index');

module.exports = {
    init: async (context, options = []) => {
        return TerraformSDK.init(bash, context, options);
    },
    plan: async (context, options = [], callback = null) => {
        return TerraformSDK.plan(bash, context, options);
    },
    apply: async (context, options = []) => {
        return TerraformSDK.apply(bash, context, options);
    },
    destroy: async (context, options = []) => {
        return TerraformSDK.destroy(bash, context, options);
    },
    show: async (context, options = [], callback = null) => {
        return TerraformSDK.show(bash, context, options, callback);
    },
    workspace: async (context, options = [], callback = null) => {
        return TerraformSDK.workspace(bash, context, options, callback);
    },
}