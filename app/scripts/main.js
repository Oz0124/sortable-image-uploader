OO.Data = OO.Data || {}; 

(function() {
	
	// get sort order
	$('body').on('click', '.get-sort-array', function () {
		let sortableComponent = OO.Data.sortable;

		if (sortableComponent) {
			console.log(OO.Modules.ImageSortComponent.getSortArray(sortableComponent));
			alert(JSON.stringify(OO.Modules.ImageSortComponent.getSortArray(sortableComponent)));
		}
	});
	

}());

// DOM載入完成
$(document).ready(function(){
	let sortImageContainer = $('.upload-product-image');
	let sortableComponent = null;

	// create component
	sortableComponent = OO.Modules.ImageSortComponent.create([], {
		// 檔案大小限制
		fileSizeLimit: 1,
		// 檔案類型限制
		acceptFileTypes: /^image\/(gif|jpeg|png|bmp)$/
	}, sortImageContainer);

	OO.Data.sortable = sortableComponent;
});
