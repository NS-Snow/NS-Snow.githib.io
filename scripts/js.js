function toggle_info1(){
    const invisable = document.getElementById("introduce");
    invisable.classList.toggle("invisible");
}
function toggle_info2(){
    const invisable2 = document.getElementById("introduce2");
    invisable2.classList.toggle("invisible");
}
function toggle_info3(){
    const invisable2 = document.getElementById("introduce3");
    invisable2.classList.toggle("invisible");
}
function toggle_info4(){
    const invisable2 = document.getElementById("introduce4");
    invisable2.classList.toggle("invisible");
}
function toggle_info6(){
    const invisable2 = document.getElementById("introduce6");
    invisable2.classList.toggle("invisible");
}
// 設定TIMER按鈕 開始暫停 清除

var stopwatch=function(){
    //start
    var startAT=0;
    //everytime
    var laptime=0 ;

    // 清除
    this.reset=function(){
        startAT=laptime=0
    };

    //開始

    var now=function(){
    return(new Date().getTime());
    };

    this.start=function(){
        startAT=startAT?startAT : now();
    };



    //暫停
    this.stop=function(){
        //              情況一                  情況二
        laptime=startAT?laptime+now()-startAT : laptime;
        startAT = 0;
    };

    //總共經歷的時間
    this.time=function(){
        return laptime+(startAT ? now()-startAT:0);
    }
};



// 設定格式 時分秒 顯示到HTML

var x = new stopwatch();
var time;
var clocktimer;

    // 時、分、秒 幾位數 格式
    function pad (num, size){
        var s = "00" + num;
        return s.substr(s.length - size);
    }

    //時、分、秒、毫秒 時間計算
    
    function formatTime(time){
        var h = m = s = ms = 0;
        // 停止的時間
        var newTime="";

        //hr

        h = Math.floor(time/(60*60*1000));
        time = time%(60*60*1000);
        //min
        m = Math.floor(time/(60*1000));
        time = time%(60*1000);

        //sec
        ms = time % 1000 ;
        s = Math.floor(time/1000);

        //顯示時間計算結果，套用稅格式上
        newTime = pad(h ,2)+":"+pad(m,2)+":"+pad(s,2)+":"+pad(ms,3);
        return newTime;
    }
    
    //顯示結果放到HTML上

    function show(){
        time=document.getElementById("time");
        update();

    }

    function update(){
        time.innerHTML=formatTime(x.time());
    }

    function start(){
        clocktimer=setInterval("update()",1);
        x.start();
    }

    function stop(){
        x.stop();
        clearInterval(clocktimer);
    }
    function reset(){
        stop();
        x.reset();
        update();
    }
//設定鍵盤運作
var pressed = true;
document.body.onkeyup=function(e){
    //按下空白建 ** keycode.info
    if(e.keyCode==32){
        if(pressed){
            start();
            pressed=false;
        }else{
            stop();
            pressed=true;
        }
    }

    if (e.keyCode==67){
        reset();
    }

}



function updateTime() {
    var time = new Date();
    var dname = time.getDay(),
        mo = time.getMonth(),
        yr = time.getFullYear(),
        dnum = time.getDate(),
        hr = time.getHours(),
        min = time.getMinutes(),
        sec = time.getSeconds(),
        pe = "AM";

    // 抓AM或PM
    if (hr >= 12) {
        pe = "PM";
    } else {
        pe = "AM"
    }

    // 轉換成兩位數
    Number.prototype.pad = function(digits) {
        for (var n = this.toString(); n.length < digits; n = 0 + n);
        return n;
    }

    var months = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];
    var week = ["星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"];
    var ids = ["dayname", "month", "daynum", "year", "hour", "minutes", "seconds", "period"];
    var values = [week[dname], months[mo], dnum.pad(2), yr, hr.pad(2), min.pad(2), sec.pad(2), pe];

    for (var i = 0; i < ids.length; i++)
        document.getElementById(ids[i]).firstChild.nodeValue = values[i];

}

function startTime() {
    updateTime();
    window.setInterval("updateTime()", 1);
}




// 
const hourHand = document.querySelector('[data-hour-hand]')
const minuteHand = document.querySelector('[data-minute-hand]')
const secondHand = document.querySelector('[data-second-hand]')

// 

function setClock() {
    var currentDate = new Date()
    var secondsRatio = currentDate.getSeconds() / 60
    var minutesRatio = (secondsRatio + currentDate.getMinutes()) / 60
    var hoursRatio = (minutesRatio + currentDate.getHours()) / 12
    setRotation(secondHand, secondsRatio)
    setRotation(minuteHand, minutesRatio)
    setRotation(hourHand, hoursRatio)
}

// 
function setRotation(element, rotationRatio) {
    element.style.setProperty('--rotation', rotationRatio * 360)
}

setInterval(setClock, 1000)

setClock()