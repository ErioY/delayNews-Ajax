function ajax(url, option) {   // option为对象
    var json = option.json === undefined ? false : option.json; // 字符串转换成数组
    // 局部刷新
    var cache = option.cache == undefined ? true : option.cache; // 默认缓存
    var method = option.method || "get";    // 提交方式，默认为 get
    var data = option.data || ""; 
    var sucFn = option.sucFn || function () {};    // 数据获取成功时的函数
    var faiFn = option.faiFn || function () {};   // 数据获取失败时的函数
    var xhr = new XMLHttpRequest();
    if (method == "get") {
        xhr.open(method, (cache ? url + "?" + data + Date.now() : url + "?" + data), true);
        xhr.send();
    } else {
        xhr.open(method, (cache ? url + "?" + Date.now(): url), true);
        xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
        xhr.send(data);
    }
    
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4) {  // 完成
            if (xhr.status == 200) { // 成功且无错误
                sucFn(json ? JSON.parse(xhr.responseText) : xhr.responseText); // 将字符串转换成数组或json
            } else {
                faiFn();
            }
        }
    }
}