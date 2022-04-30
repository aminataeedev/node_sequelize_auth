const { port } = process.env;

const corsOptions = {
    origin: `http://localhost:${port}`,
};

module.exports = corsOptions;
