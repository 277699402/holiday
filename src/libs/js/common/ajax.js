/**
 * ajax 异步POST
 * @param Url {String}
 * @param JsonParam {{}}
 * @param callback {Function}
 */
function ajaxPost(Url,JsonParam,callback) {
    $.ajax({
        type:"POST",
        url:Url,
        dataType:"json",
        data:JsonParam,
        success:function(data) {
            callback && callback(data);
        }
    });
}

/**
 * ajax 异步GET
 */
function ajaxGet(Url,JsonParam,callback) {
    $.ajax({
        type:"GET",
        url:Url,
        dataType:"json",
        data:JsonParam,
        success:function(data) {
            callback && callback(data);
        }
    });
}

module.exports = {
    post: ajaxPost,
    get: ajaxGet
};