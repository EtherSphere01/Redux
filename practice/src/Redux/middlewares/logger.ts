/* eslint-disable @typescript-eslint/no-unused-vars */

const logger = (state) => (next) => (action) => {
    return next(action);
};

export default logger;
