/**
 * Created by Sun on 2017/5/7.
 */
window.onload = function () {
    waterfall('main','pin');

    var dataInt={'data':[{'src':'1.jpg'},{'src':'2.jpg'},{'src':'3.jpg'},{'src':'4.jpg'}]};
    window.onscroll = function () {
        if(checkScrollSide()){
            var oParent = document.getElementById('main');
            for(var i = 0;i<dataInt.data.length;i++){
                var oPin = document.createElement('div');
                oPin.className = 'pin';
                oParent.appendChild(oPin);
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oPin.appendChild(oBox);
                var oImg = document.createElement('img');
                oImg.src = 'images/'+dataInt.data[i].src;
                oBox.appendChild(oImg);
            }
            waterfall('main','pin');
        }
    };
};


function waterfall(parent,pin) {
    var oParent = document.getElementById(parent); //获得父级对象
    var aPin = getClassObj(oParent,pin); //获得存储块框pin的数组aPin
    var iPinW = aPin[0].offsetWidth; //一个块框的宽度
    var num = Math.floor(document.documentElement.clientWidth/iPinW);
    var pinHArr = []; //用于存储 每列中所有块框相加的高度
    for(var i=0 ; i< aPin.length ;i++){
        var pinH = aPin[i].offsetHeight;
        if(i<num){
            pinHArr[i] = pinH;
        }else{
            var minH = Math.min.apply(null,pinHArr); //得到数组中的最小值
            var minHIdex = getminHIndex(pinHArr,minH);
            aPin[i].style.position = 'absolute'; //设置绝对位移
            aPin[i].style.top = minH+'px';
            aPin[i].style.left = aPin[minHIdex].offsetLeft+'px';

            pinHArr[minHIdex] += aPin[i].offsetHeight; //更新列的高
        }

    }


}

function getClassObj(parent,className) {
    var obj = parent.getElementsByTagName('*'); //获取父级元素所有子元素
    var pinS = []; //创建一个数组 用于收集子元素
    for(var i =0 ; i<obj.length;i++){
        if(obj[i].className == className){
            pinS.push(obj[i]);
        }
    }
    return pinS;
}

/****
 *获取 pin高度 最小值的索引index
 */
function getminHIndex(arr,minH){
    for(var i in arr){
        if(arr[i]==minH){
            return i;
        }
    }
}

function checkScrollSide() {
    var oParent = document.getElementById('main');
    var aPin = getClassObj(oParent,'pin');
    var lastPinH = aPin[aPin.length-1].offsetTop+ Math.floor(aPin[aPin.length-1].offsetHeight/2);//创建【触发添加块框函数waterfall()】的高度：最后一个块框的距离网页顶部+自身高的一半(实现未滚到底就开始加载)
    var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    var documentH = document.documentElement.clientHeight; //页面高度
    return (lastPinH<scrollTop+documentH)?true:false;
}
