function response( sts, msg, aftrows, data = null){
    return {
        status: sts,
        massage: msg,
        affected_rows: aftrows,
        data: data,
        timesstamp: new Date().getTime()
    };
}

module.exports = {
    response
};