var OO = OO || {};
OO.Modules = OO.Modules || {};
OO.Data = OO.Data || {};

OO.Modules.ImageSortComponent = (function() {

	// 初始化element
	let _init = function (container) {
		// upload image
		let uploadImageDiv = $('<div class="upload-image"></div>');
		let uploadInput = $('<input class="file-upload-input">').attr('type', 'file').attr('multiple', true);
		uploadInput.attr('accept', 'image/*');
		let uploadButton = $('<button class="btn btn-default upload-button"><span class="glyphicon glyphicon-open"></span> 上傳圖檔</button>');
		uploadButton.attr('disabled', true);

		uploadImageDiv.append(uploadInput);
		uploadImageDiv.append(uploadButton);
		container.append(uploadImageDiv);

		// sort list
		let tileContainer = $('<div class="tile-container"><div class="upload-file-info">請拖曳圖檔入內上傳</div></div>');
		let tileList = $('<div class="tile-list"></div>');
		let uploadTile = $('<div class="tile ignore-element upload-button"><div class="glyphicon glyphicon-open"></div><div>上傳圖檔</div></div>');
		uploadTile.attr('data-id', 'upload-file-button');

		tileList.append(uploadTile);

		tileContainer.append(tileList);
		container.append(tileContainer);
		
	};
	
	// 
	let create = function (data, options, container) {
		_init(container);

		let tileList = container.find('.tile-container .tile-list');
		let uploadFileInput = container.find('.upload-image .file-upload-input');
		let uploadButton = container.find('.upload-image .upload-button');

		let markSortTile = function (dataArray, listcontainer) {
			$.each(dataArray, function (index, item) {
				let tileDiv = $('<div></div>').addClass('tile').attr('data-id', item.id);
				let tileImageDiv = $('<div></div>').addClass('tile-image');
				let tileBottomDiv = $('<div></div>').addClass('tile-bottom');
				let tileTitleSpan = $('<span></span').addClass('tile-index');
				let tileDeleteSpan = $('<span></span').addClass('glyphicon glyphicon-trash tile-delete-button');
				tileDeleteSpan.data('id', item.id);

				tileImageDiv.css('background-image', 'url(' + item.imgSrc + ')');

				tileTitleSpan.text(listcontainer.children().length + '');
				tileBottomDiv.append(tileTitleSpan);
				tileBottomDiv.append(tileDeleteSpan);

				tileDiv.append(tileImageDiv);
				tileDiv.append(tileBottomDiv);

				listcontainer.append(tileDiv);
			});
		};

		markSortTile(data, tileList);

		container.find('.upload-button').click(function () {
			uploadFileInput.click();
		});
		
		tileList.on('click', '.tile .tile-delete-button', function () {
			let tileListDiv = container.find('.tile-list');
			let id = $(this).data('id');

			$.each(tileListDiv.find('.tile'), function (index, item) {
				if (id === $(item).attr('data-id')) {
					$(item).remove();
				}
			});

			// 更新順序編號
			$.each(tileListDiv.find('.tile'), function (index, item) {
				$(item).find('.tile-index').text(index + '');
			});
		});

		// upload input event
		uploadFileInput.fileupload({
				dropZone: container.find('.tile-container'),
				autoUpload: false,
				replaceFileInput: false,
				acceptFileTypes: options.acceptFileTypes || ''
			})
			.bind('fileuploadchange fileuploaddrop', function (e, data) {
				let fileSizeLimit = options.fileSizeLimit;
				let pass = true;
				let dataArray = [];

				if (!data || (!data.files) || (data.files.length < 1)) {
					return false;
				}

				// 檢查檔案大小
				$.each(data.files, function (index, item) {
					if ((item.size / (1024 * 1024)) > fileSizeLimit) {
						pass = false;
					}
				});

				if (!pass) {
					return false;
					alert('檔案大小超過限制!');
				}

				$.each(data.files, function (index, item) {
					dataArray.push({
						id: item.name,
						imgSrc: window.URL.createObjectURL(item)
					});
				});

				markSortTile(dataArray, tileList);

				uploadFileInput.val('');
			});

		// create sortable
		let element = tileList.get(0);
		let preOrder = [];
		let sortable = Sortable.create(element, {
			handle: '.tile-image',
			filter: '.ignore-element',
			dataIdAttr: 'data-id',
			preventOnFilter: false,
			onChoose: function (evt) {
				console.log('onChoose');
				console.log(evt);
				// 紀錄移動前的順序，以便之後回復
				if (sortable.toArray) {
					preOrder = sortable.toArray();
				}
			},
			onEnd: function (evt) {
				console.log('onEnd');
				console.log(evt);
			},			
			onSort: function (evt) {
				// 如果拖動到上傳圖檔tile之前，就回復先前順序
				if (evt.newIndex === 0) {
					if (sortable.sort) {
						sortable.sort(preOrder);						
					}
				}		

				// 更新順序編號
				$.each(tileList.find('.tile'), function (index, item) {
					$(item).find('.tile-index').text(index + '');
				});		
			}

		});

		OO.Data.sortable = sortable;

		uploadButton.attr('disabled', false);
	};

	let getSortArray = function () {
		let array = [];
		if (OO.Data.sortable) {
			$.each(OO.Data.sortable.toArray(), function (index, item) {
				if (index !== 0) {
					array.push(item);
				}
			});

		}
		
		return array;
	};

	return {
		create: create,
		getSortArray: getSortArray
	};

}());

(function() {
	
	// test
	$('body').on('click', '.get-sort-array', function () {
		console.log(OO.Modules.ImageSortComponent.getSortArray());
		alert(JSON.stringify(OO.Modules.ImageSortComponent.getSortArray()));
	});
	

}());

// DOM載入完成
$(document).ready(function(){
	let sortImageContainer = $('.upload-product-image');

	OO.Modules.ImageSortComponent.create([], {
		fileSizeLimit: 1,
		acceptFileTypes: /^image\/(gif|jpeg|png|bmp)$/
	}, sortImageContainer);

});
