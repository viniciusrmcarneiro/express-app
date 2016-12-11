const res = {
    status: () => {},
    send: () => {},
};

const log = {
    warn: () => {},
};

const req = {
    body: {},
    log,
};

module.exports = {
    res,
    req,
    log,
};
