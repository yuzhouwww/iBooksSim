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
    for (var chapter = 0; chapter < chapters.length; chapter++) {
        console.log(chapter+1+'页');
        var chapterDiv = $('<div class="chapter"></div>').appendTo('#chapterScrollContent').html(chapter+1).css({
            left:chapter * 1024
        });

        var pageScroll = $('<div class="pageScroll"></div>').appendTo(chapterDiv);
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
    }
    var currentIndex = 0, touchBegin, touchLast, lastDistance, totalDistance;
    var pageScrolling;
    $('#chapterScroll').on('touchstart touchmove touchend', function (e) {
        if(pageScrolling){
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
            $('#chapterScrollContent').css({
                '-webkit-transform':'translate3d(' + (-currentIndex) * 1024 + 'px,0,0)',
                '-webkit-transition-duration':'0.5s'
            });

            $('#pageScrollContainer').css({
                '-webkit-transform':'translate3d(' + (-currentIndex) * 1024 + 'px,0,0)',
                '-webkit-transition-duration':'0.5s'
            });
        }
//        return false;
    });

    console.log('length'+$('.pageScroll').length);
    $('.pageScroll').on('touchstart touchmove touchend', function (e) {
        console.log(this.scrollLeft);
        if(e.type == 'touchstart'){
            pageScrolling = true;
        }
        else if(e.type == 'touchmove'){

        }
        else if(e.type == 'touchend'){
            pageScrolling = false;
        }
    });

});