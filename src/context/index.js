let context = {};

module.exports = {
    set: ({
        name,
        absolutePath
    }) => {
        context = {name, absolutePath};
    },
    get: () => {
        return context;
    }
}