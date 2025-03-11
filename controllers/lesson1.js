const daphneRoute = (req, res) => {
    res.send('Hello Daphne');
};

const aboutRoute = (req, res) => {
    res.send('This is the about page');
};

module.exports = {
    daphneRoute,
    aboutRoute
};