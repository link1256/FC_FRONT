function openDeleteAlert() {
		$("#DeleteCase").modal("show");
	}

	function closeDeleteAlert() {
		$("#DeleteCase").modal("hide");
	}

	function deleteCase() {
		closeDeleteAlert();
	}
	
	ca_tab1_init();
	tab6("ownerdata_manager");
