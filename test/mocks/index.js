const res = {
    status: () => {},
    send: () => {},
};

const log = {
    warn: () => {},
};

const req = {
    body: {},
    headers: {},
    log,
};

module.exports = {
    res,
    req,
    log,
};
