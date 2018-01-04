var html='<div style="z-index: 99999; position: fixed; width: 200px; height: 70px; top: 20px; right: 20px; background-color: #FCFDFF; opacity: 0.8; border-radius: 10px; display: -webkit-box; -webkit-box-align: center; "> \
    <img src="https://bbs.deepin.org/favicon.ico" style=" max-height: 50px; vertical-align: middle; margin: 0px 10px; "> \
    标签加入队列 \
</div>'
var d=document.createElement("div")
d.innerHTML=html
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    document.body.appendChild(d)
    setTimeout(function(){document.body.removeChild(d)},1000)
})