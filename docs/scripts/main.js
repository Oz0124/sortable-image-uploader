"use strict";var OO=OO||{};OO.Modules=OO.Modules||{},OO.Data=OO.Data||{},OO.Modules.ImageSortComponent=function(){var t=function(t){var e=$('<div class="upload-image"></div>'),i=$('<input class="file-upload-input">').attr("type","file").attr("multiple",!0);i.attr("accept","image/*");var a=$('<button class="btn btn-default upload-button"><span class="glyphicon glyphicon-open"></span> 上傳圖檔</button>');a.attr("disabled",!0),e.append(i),e.append(a),t.append(e);var n=$('<div class="tile-container"><div class="upload-file-info">請拖曳圖檔入內上傳</div></div>'),d=$('<div class="tile-list"></div>'),l=$('<div class="tile ignore-element upload-button"><div class="glyphicon glyphicon-open"></div><div>上傳圖檔</div></div>');l.attr("data-id","upload-file-button"),d.append(l),n.append(d),t.append(n)};return{create:function(e,i,a){t(a);var n=a.find(".tile-container .tile-list"),d=a.find(".upload-image .file-upload-input"),l=a.find(".upload-image .upload-button"),o=function(t,e){$.each(t,function(t,i){var a=$("<div></div>").addClass("tile").attr("data-id",i.id),n=$("<div></div>").addClass("tile-image"),d=$("<div></div>").addClass("tile-bottom"),l=$("<span></span").addClass("tile-index"),o=$("<span></span").addClass("glyphicon glyphicon-trash tile-delete-button");o.data("id",i.id),n.css("background-image","url("+i.imgSrc+")"),l.text(e.children().length+""),d.append(l),d.append(o),a.append(n),a.append(d),e.append(a)})};o(e,n),a.find(".upload-button").click(function(){d.click()}),n.on("click",".tile .tile-delete-button",function(){var t=a.find(".tile-list"),e=$(this).data("id");$.each(t.find(".tile"),function(t,i){e===$(i).attr("data-id")&&$(i).remove()}),$.each(t.find(".tile"),function(t,e){$(e).find(".tile-index").text(t+"")})}),d.fileupload({dropZone:a.find(".tile-container"),autoUpload:!1,replaceFileInput:!1,acceptFileTypes:i.acceptFileTypes||""}).bind("fileuploadchange fileuploaddrop",function(t,e){var a=i.fileSizeLimit,l=!0,r=[];return!(!e||!e.files||e.files.length<1)&&($.each(e.files,function(t,e){e.size/1048576>a&&(l=!1)}),!!l&&($.each(e.files,function(t,e){r.push({id:e.name,imgSrc:window.URL.createObjectURL(e)})}),o(r,n),void d.val("")))});var r=n.get(0),p=[],c=Sortable.create(r,{handle:".tile-image",filter:".ignore-element",dataIdAttr:"data-id",preventOnFilter:!1,onChoose:function(t){c.toArray&&(p=c.toArray())},onEnd:function(t){},onSort:function(t){0===t.newIndex&&c.sort&&c.sort(p),$.each(n.find(".tile"),function(t,e){$(e).find(".tile-index").text(t+"")})}});OO.Data.sortable=c,l.attr("disabled",!1)},getSortArray:function(){var t=[];return OO.Data.sortable&&$.each(OO.Data.sortable.toArray(),function(e,i){0!==e&&t.push(i)}),t}}}(),function(){$("body").on("click",".get-sort-array",function(){alert(JSON.stringify(OO.Modules.ImageSortComponent.getSortArray()))})}(),$(document).ready(function(){var t=$(".upload-product-image");OO.Modules.ImageSortComponent.create([],{fileSizeLimit:1,acceptFileTypes:/^image\/(gif|jpeg|png|bmp)$/},t)});