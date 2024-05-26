// todo: do not use promisify, make a promise inside the sdk
// todo: build a factory to build this.
// todo: remove console.log dependency, receiving logger by injection
// todo: add hability to run command stream, by chunks.
// todo: add context so this project can run isolated from the terraform folder

const util = require('util');
const exec = util.promisify(require('child_process').exec);

const run = async (command, context, options = []) => {
    const {
        errorHandler,
        callback,
        debug
    } = options

    try {
        if(debug)
            console.info(`RUNNING COMMAND: ${command} ON ${context.absolutePath}`);

        const cmd = `cd ${context.absolutePath} && ${command}`;
        const { stdout, stderr } = await exec(cmd);

        if(stderr)
            throw new Error(`Error executing the command ${command}:: \r\n ${stderr}`);

        if(callback) {
            if(debug)
                console.log('CALLING CALLBACK \r\n');

            return callback(stdout);
        }

        return stdout;

    } catch (e) {
        if(debug)
            console.error('ERROR', e);

        if(errorHandler)
            throw errorHandler(e);

        throw new Error(e);
    }
}

module.exports = {
    run
}