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
        $('<div class="chapter"></div>').appendTo('#chapterScrollContent').html(chapter).css({
            left:chapter * 1024
        });
        for (var page = 0; page < chapters[chapter]; page++) {
            var pageDiv = $('<div class="page"></div>').appendTo('#pageScrollContent').html((chapter + 1) + '-' + (page + 1)).css({
                left:currentPoint + page * 200
            });
            if (page != 0) {
                pageDiv.css({
                    top:30,
                    height:150
                });
            }
        }

        chapterPoint.push(currentPoint);

        if (chapters[chapter] < 6) {
            $('<div class="blank"></div>').appendTo('#chapterScrollContent').css({
                left:currentPoint + page * 200 + 200,
                width:1024 - chapters[chapter] * 200
            });
            currentPoint += 1024;
        }
        else {
            currentPoint += chapters[chapter] * 200;
        }
    }
    var currentIndex = 0, touchBegin, touchLast, lastDistance, totalDistance;
    $('#chapterScroll').on('touchstart touchmove touchend', function (e) {
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

            $('#pageScroll').animate({scrollLeft:chapterPoint[currentIndex]}, 300);
        }
        return false;
    });

    $('#pageScroll').on('touchend', function (e) {
        console.log(this.scrollLeft);
        if (this.scrollLeft < chapterPoint[currentIndex]) {
            if (currentIndex > 0) {
                currentIndex -= 1;
                $('#pageScroll').animate({scrollLeft:chapterPoint[currentIndex]}, 300);
                e.preventDefault();
            }
        }
        $('#chapterScrollContent').css({
            '-webkit-transform':'translate3d(' + (-currentIndex) * 1024 + 'px,0,0)',
            '-webkit-transition-duration':'0.5s'
        });
    });
});