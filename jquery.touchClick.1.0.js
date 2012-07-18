/**
 * Created by JetBrains WebStorm.
 * User: witmob
 * Date: 12-7-2
 * Time: 下午9:54
 * To change this template use File | Settings | File Templates.
 */
jQuery.fn.touchClick = function (callBack) {
    if (typeof callBack != 'function') {
        console.log('err');
        throw new Error('参数不正确');
    }

    this.each(function (index, el) {
        var touchMoved;
        $(el).on('touchstart touchmove touchend', function (e) {
            if (e.type == 'touchstart') {
                touchMoved = false;
            }
            else if (e.type == 'touchmove') {
                touchMoved = true;
            }
            else if (e.type == 'touchend') {
                if (!touchMoved) {
                    callBack(e);
                }
                touchMoved = false;
            }
        });
    });
};