const item = $('.carousel-item');
const arrow = $('.arrow');

for (let i = 0, l = item.length; i < l; i++) {
    $(item[i]).attr('id', `${i}`).css('position', 'relative');
}

$(item).hide();

$('#2').show();

arrow.click(function (e) {
    let visible = $('.carousel-item:visible')[0];
    let visibleWidth = $(visible).width();
    let offsetTop = $(visible).offset().top;
    let offsetLeft = $(visible).offset().left;
    let idVisible = Number($(visible).attr('id'));
    if ($(e.target).hasClass('arrow-left')) {
        let showItem = $(`#${idVisible + 1}`);
        if (idVisible + 1 === item.length) {
            showItem = $(`#0`);
        }
        $(visible).hide();
        $(showItem).show();
        let offsetObj = {top: `${offsetTop}`, left: `${$(window).width()}`};
        $(showItem).offset(offsetObj);
        $(showItem).animate({left: `-=${Number(offsetObj.left) - Number(offsetLeft)}`}, 'slow', function () {
            $(this).css('position', 'static');
        });
    } else if ($(e.target).hasClass('arrow-right')) {
        let showItem = $(`#${idVisible - 1}`);
        if (idVisible - 1 === -1) {
            showItem = $(`#${item.length-1}`);
        }
        $(visible).hide();
        $(showItem).show();
        let offsetObj = {top: `${offsetTop}`, left: `${-(Number(offsetLeft) + visibleWidth)}`};
        $(showItem).offset(offsetObj);
        $(showItem).animate({left: `+=${-Number(offsetObj.left) + Number(offsetLeft)}`}, 'slow', function () {
            $(this).css('position', 'static');
        });
    }
});



