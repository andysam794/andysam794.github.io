let topic = [
    "尚未開學",
    "國定假日",
    "環境準備",
    "隨機性",
    "重複性",
    "條件判斷"
];


let startDate = new Date();



function setMonthAndDay(startMonth, startDay) {
    //一次設定好月份與日期
    startDate.setMonth(startMonth - 1, startDay);
    // 忽略時分秒
    startDate.setHours(0);
    startDate.setMinutes(0);
    startDate.setSeconds(0);
};
function dformat(a) {
    let month = a.getMonth() + 1;
    let day = a.getDate();
    let year = a.getFullYear();
    return [year, month, day].join("/");
}
setMonthAndDay(7, 5);