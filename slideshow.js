var nowIndex = 0;
var len = $('.picBox li').length;
var timer;
// 初始化入口函数
function init() {
    // 绑定事件
    bindEvent();
    // 自动轮播
    sliderAuto();
}
init();


function bindEvent() {
    // 按钮绑定事件
    $('.btn a').on('click', function () {
        // 获得按钮上的class类名
        var tar = $(this).attr('class');
        // 调用移动函数
        move(tar);
    });
    // 点击list按钮
    $('.list li').on('click', function () {
        // 获得当前点击li索引
        var i = $(this).index();
        // 调用移动函数
        move(i);
    });
    // 鼠标移入移出
    $('.wrapper-lunbo').on('mouseenter', function () {
        // 鼠标移入清除定时器
        clearTimeout(timer);
    }).on('mouseleave', function () {
        // 鼠标移走继续轮播
        sliderAuto();
    })
}
function sliderAuto() {

    clearTimeout(timer);
    // 自动轮播  延迟2s 向右轮播  相当于点击右键按钮
    timer = setTimeout(function () {
        move('right');
    }, 2000);
}

// 移动函数
function move(dir) {
    // 判断左右按钮
    if (dir == 'right' || dir == 'left') {
        // 方向是右  
        if (dir == 'right') {
            // 索引++  向后轮播
            nowIndex++;
            // 判断当前索引值   超出边界为0
            nowIndex = nowIndex > len - 1 ? 0 : nowIndex;
            // 向右切换一张  再次触发延迟向右展示下一张
            sliderAuto();
        } else {
            // 向前轮播
            nowIndex--;
            // 判断索引边界
            nowIndex = nowIndex < 0 ? len - 1 : nowIndex;
        }
    } else {
        // 如果是点击li小圆点  直接切换当前选中索引
        nowIndex = dir;
    }
    // 移动ul
    $('.picBox').css({
        'left': -nowIndex * 520 + 'px'
    });
    // 每一张图片淡入淡出效果改变opacity
    $('.picBox li').eq(nowIndex).animate({
        'opacity': 1
    }, 800);
    // 其他图片再将opacity变0
    $('.picBox li').not(nowIndex).css('opacity', 0);
    changeStyle();
}

// 切换选中小圆点
function changeStyle() {
    $('.active').removeClass('active');
    $('.list li').eq(nowIndex).addClass('active');
}