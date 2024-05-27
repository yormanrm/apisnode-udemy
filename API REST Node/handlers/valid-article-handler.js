const validator = require("validator");

const validParams = (params) => {
    const valid_title = !validator.isEmpty(params.title);
    const valid_content = !validator.isEmpty(params.content);
    if (!valid_title || !valid_content) {
        throw new Error();
    }
}

module.exports = {
    validParams
}