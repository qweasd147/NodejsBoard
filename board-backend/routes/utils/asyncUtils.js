module.exports.wrapAsyncForReject =
    fn =>
        async (req, res, next) =>
            await fn(req, res, next)
            .catch(next);

/*
module.exports.asyncRequest = (asyncFn, req, res) => asyncFn(req, res).catch(e => {
    res
        .status(500)
        .json({message: e.message})
    console.error(e)
});
*/