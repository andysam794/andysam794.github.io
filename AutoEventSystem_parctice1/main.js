$(function () {
    $("#courseTable").append("<tr><th>場次</th><th>時間</th><th>主題</th></tr>");

    let topicCount = topic.length;
    let millisecsPerDay = 24 * 60 * 60 * 1000;


    // for (let x = 0; x < topicCount; x++) {
    //     $("#courseTable").append(
    //         `<tr><td>${x + 1}</td><td></td><td>${topic[x]}</td></tr>`
    //     )
    // };
    // $("table").empty();
    for (let x = 0; x < topicCount; x++) {
        // toLocalDateString 只顯示年份日期
        let d = new Date(startDate.getTime() + 7 * x * millisecsPerDay)
        $("#courseTable").append(
            `<tr><td>${x + 1}</td><td>${dformat(d).slice(5)}</td><td>${topic[x]}</td></tr>`
        )
    };
    
    $("button").on("click", function () {
        let addDate = new Date($("#date1").val());
        let addClass = $("#class").val();
        topicCount++;
        $("#courseTable").append(
            `<tr><td>${topicCount}</td><td>${dformat(addDate).slice(5)}</td><td>${addClass}</td></tr>`
        );
        $("input").empty();
        $("#class").empty();
    });
    // $("input").on("change", function () {
    //     let firstday = new Date($("input").val())
    //     let newfirstday = new Date(firstday.getTime() + 7 * x * millisecsPerDay)
    //     $("#courseTable").append(
    //         `<tr><td></td><td>${dformat(newfirstday).slice(5)}</td><td></td></tr>`
    //     )
    // })
});
// jquery變動css語法
