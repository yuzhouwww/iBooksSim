/**
 * Created by JetBrains WebStorm.
 * User: yuzhou
 * Date: 12-7-17
 * Time: 下午8:49
 * To change this template use File | Settings | File Templates.
 */

$(function () {
    var chapters = [5, 3, 7, 4, 8];
    var chapterPoint = [], currentPoint = 0;
    for (var chapter = 0,pageScroll; chapter < chapters.length; chapter++) {
        console.log(chapter + 1 + '页');
        var chapterDiv = $('<div class="chapter"></div>').html(chapter + 1).css({
            left:(chapter) * 1024
        });

        pageScroll = $('<div class="pageScroll"></div>').appendTo(chapterDiv);
        pageScroll.on('touchstart touchmove touchend', function (e) {
            console.log($(e.target).width());
            if (e.type == 'touchstart') {
                pageScrolling = true;
            }
            else if (e.type == 'touchmove') {

            }
            else if (e.type == 'touchend') {
                pageScrolling = false;
            }
        });
        $('<div class="pageScrollBlank"></div>').appendTo(pageScroll);

        for (var page = 0; page < chapters[chapter]; page++) {
            var pageDiv = $('<div class="page"></div>').appendTo(pageScroll).html((chapter + 1) + '-' + (page + 1)).css({
                left:page * 200
            });
            if (page != 0) {
                pageDiv.css({
                    top:30,
//                    width: 240,
                    height:150
                });
            }
        }
        chapterDiv.appendTo('#chapterScrollContent');
    }

//    setTimeout(function(){
//        $('.pageScroll').on('touchstart touchmove touchend', function (e) {
//            console.log($(e.target).width());
//            if (e.type == 'touchstart') {
//                pageScrolling = true;
//            }
//            else if (e.type == 'touchmove') {
//
//            }
//            else if (e.type == 'touchend') {
//                pageScrolling = false;
//            }
//        });
//    },0);

    var currentIndex = 1, touchBegin, touchLast, lastDistance, totalDistance;
    var pageScrolling;
    $('#chapterScroll').on('touchstart touchmove touchend', function (e) {
//        console.log($(e.target).width());
        if (pageScrolling) {
            return;
        }
        if (e.type == 'touchstart') {
            touchBegin = touchLast = {
                x:e.originalEvent.touches[0].clientX,
                y:e.originalEvent.touches[0].clientY
            };
            $('#chapterScrollContent').css({
                '-webkit-transition-duration':'0s'
            });
        }
        else if (e.type == 'touchmove') {
            lastDistance = {
                x:e.originalEvent.touches[0].clientX - touchLast.x,
                y:e.originalEvent.touches[0].clientY - touchLast.y
            };
            touchLast = {
                x:e.originalEvent.touches[0].clientX,
                y:e.originalEvent.touches[0].clientY
            };
            var left = -currentIndex * 1024 + touchLast.x - touchBegin.x;
            $('#chapterScrollContent').css({
                '-webkit-transform':'translate3d(' + left + 'px,0,0)',
                '-webkit-transition-duration':'0'
            });
        }
        else if (e.type == 'touchend') {
            totalDistance = touchLast.x - touchBegin.x;
            if (totalDistance >= 50 || lastDistance.x > 999) {
                if (currentIndex > 0) {
                    currentIndex -= 1;
                }
            }
            else if (totalDistance < -50 || lastDistance.x < -999) {
                if (currentIndex < chapters.length - 1) {
                    currentIndex += 1;
                }
            }
            goToPage(currentIndex);
        }
//        return false;
    });

    function goToPage(index) {
        $('#chapterScrollContent').css({
            '-webkit-transform':'translate3d(' + (-index) * 1024 + 'px,0,0)',
            '-webkit-transition-duration':'0.5s'
        });
    }

    goToPage(currentIndex);

    console.log('length' + $('.pageScroll').length);


});