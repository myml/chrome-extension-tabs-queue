"use strict";function reIndex(e,t,n){var a=document.getElementById("url-list");-1===n?(bgPage.removeItem(queueId,e.value),a.removeChild(e)):bgPage.moveItemInQueue(queueId,t,n);for(var i=a.getElementsByClassName("list-item"),l=0;l<i.length;l++)i[l].value=l}function onClearQueues(){bgPage.clearQueues(),window.close()}function onClearItems(){bgPage.clearItems(queueId),window.close()}function onSwitchChanged(e){bgPage.setActive(e.target.checked)}function onRestore(){bgPage.restoreSavedQueues(),window.close()}function onQueueListClick(e){e.stopPropagation(),e.preventDefault();var t=e.target.parentNode;if("item-url"===e.target.className){var n=!1;(e.ctrlKey||e.metaKey||1==e.button)&&(n=!0),bgPage.openUrlInTab(queueId,e.target.textContent,n,!n);var a=t.getElementsByClassName("item-lock")[0];a&&"false"===a.getAttribute("data-checked")&&reIndex(t,t.value,-1)}else"list-item-btn"===e.target.className&&"list-item-remove"===e.target.getAttribute("data-type")&&reIndex(t,t.value,-1)}function onSavedListClick(e){if(e.stopPropagation(),"list-item-btn"===e.target.className){var t=e.target.parentNode.value;"list-item-restore"===e.target.getAttribute("data-type")?bgPage.restoreQueue(t):"list-item-remove"===e.target.getAttribute("data-type")&&bgPage.removeQueue(t),window.close()}}function toggleListItemButton(e){for(var t=e.target.getElementsByClassName("list-item-btn"),n=0;n<t.length;n++)t[n].style.display="none"===t[n].style.display?"inline":"none"}function toggleClearConfirm(e){var t=document.querySelectorAll('[data-for="'+e.target.getAttribute("id")+'"]')[0];t&&(e.target.style.visibility="hidden"!==e.target.style.visibility?"hidden":"visible",t.style.display="none"!==t.style.display?"none":"inline-block")}function onConfirmDialogClick(e){var t=document.getElementById(e.currentTarget.getAttribute("data-for")),n={target:t};"clearNo"===e.target.getAttribute("name")?toggleClearConfirm(n):"clearYes"===e.target.getAttribute("name")&&("buttonClearItems"===t.id?onClearItems():"buttonClearQueues"===t.id&&onClearQueues())}function toggleLock(e){var t=e.target.parentNode,n=!1;"false"===e.target.getAttribute("data-checked")&&(n=!0),e.target.setAttribute("data-checked",n.toString());var a=n?"images/lock-enabled.png":"images/lock-disabled.png";e.target.setAttribute("src",a),bgPage.setLock(queueId,t.value,n)}function createItem(e,t,n){var a=document.createElement("li");a.setAttribute("class","list-item");var i=document.createElement("span");i.setAttribute("class","handle"),i.textContent="☰  ";var l=document.createElement("img");l.setAttribute("class","item-lock"),l.setAttribute("data-checked",n.toString()),n?l.setAttribute("src","images/lock-enabled.png"):l.setAttribute("src","images/lock-disabled.png"),l.addEventListener("click",toggleLock);var o=document.createElement("span");o.setAttribute("class","item-url"),o.textContent=t;var r=document.createElement("span");return r.setAttribute("class","list-item-btn"),r.setAttribute("data-type","list-item-remove"),r.textContent="x",r.style.display="none",a.appendChild(i),a.appendChild(l),a.appendChild(l),a.appendChild(o),a.appendChild(r),a.value=e,a.addEventListener("mouseenter",toggleListItemButton),a.addEventListener("mouseleave",toggleListItemButton),a}function loadSavedQueues(){for(var e=bgPage.queues,t=document.getElementById("savedQueuesList"),n=document.getElementById("savedQueuesInfo"),a=0,i=null,l=0;l<e.length;l++)if(e[l].window===bgPage.DEFAULT_ID){a++,i=document.createElement("li"),i.setAttribute("value",l);var o=document.createElement("h3");o.textContent="Queue "+a+" :: "+e[l].items.length+" items",o.setAttribute("class","left");var r=document.createElement("span");r.setAttribute("class","list-item-btn"),r.setAttribute("data-type","list-item-restore"),r.textContent="o",r.style.display="none";var s=document.createElement("span");s.setAttribute("class","list-item-btn"),s.setAttribute("data-type","list-item-remove"),s.textContent="x",s.style.display="none",i.appendChild(o),i.appendChild(r),i.appendChild(s),i.addEventListener("mouseenter",toggleListItemButton),i.addEventListener("mouseleave",toggleListItemButton),t.appendChild(i)}t.addEventListener("click",onSavedListClick),0===a&&(n.textContent="No saved queues")}function onQueueToLimit(){bgPage.queueToLimit(queueId),window.close()}function getBackgroundInfo(){chrome.windows.getLastFocused(function(e){queueId=e.id;var t=document.getElementById("urlListInfo"),n=document.getElementById("url-list"),a=bgPage.getQueue(queueId).items;if(a.length>0){Sortable.create(n,{animation:150,handle:".handle",onEnd:function(e){reIndex(null,e.oldIndex,e.newIndex)}}),t.textContent="Queue in this window";for(var i=0;i<a.length;i++)n.appendChild(createItem(i,a[i].url,a[i].locked));n.addEventListener("click",onQueueListClick)}else t.textContent="Queue is empty"}),loadSavedQueues(),document.getElementById("buttonRestoreAll").addEventListener("click",onRestore);var e=document.getElementById("myonoffswitch");e.checked=bgPage.isActive,document.getElementById("buttonClearQueues").addEventListener("click",toggleClearConfirm),document.getElementById("buttonClearItems").addEventListener("click",toggleClearConfirm),document.getElementById("queueToLimit").addEventListener("click",onQueueToLimit);for(var t=document.getElementsByClassName("dialog-clear"),n=0;n<t.length;n++)t[n].addEventListener("click",onConfirmDialogClick),t[n].style.display="none";e.addEventListener("change",onSwitchChanged)}var bgPage=chrome.extension.getBackgroundPage(),queueId=null;document.addEventListener("DOMContentLoaded",getBackgroundInfo);