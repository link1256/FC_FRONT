lu_tab2_init();
	tab9("lu_search_tab2");
	$("#search_sec").selectpicker({
		liveSearch: true
	});
	$("#search_zoning").multiselect({
		buttonClass: 'form-select',
		buttonTextAlignment: 'left',
		buttonWidth: '235px',
		nonSelectedText: '請選擇',
		nSelectedText: '已選擇',
		allSelectedText: '全選',
		includeSelectAllOption: true,
		templates: {
			button: '<button type="button" class="multiselect dropdown-toggle" data-bs-toggle="dropdown"><span class="multiselect-selected-text"></span></button>',
		}
	});
