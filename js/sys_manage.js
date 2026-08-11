function sys_ini_page(i)
{
	// 前兩個有下拉要跳過
	if (i == 1 || i == 2) {
		return;
	}
	$("#dropdowntrig").removeClass("active");
	$("#dropdowntrig2").removeClass("active");
	$('#dropdowntrig_ul').hide();
	$('#dropdowntrig_ul2').hide();
	$(".tab_body_content").removeClass("active");
	$(".tab_body_content.tab" + i).addClass("active");
	$(".tab_body_content").empty();
	$(".tab_body_content.tab" + i).load("./views/sys_manage_tab" + i + ".html"); 
}
function sys_ini_drop_page(type) {
	if (type == "sys_log" || type == "download_log") {
		$("#dropdowntrig").removeClass("active");
		$("#dropdowntrig2").addClass("active");
	}
	else {
		$("#dropdowntrig2").removeClass("active");
		$("#dropdowntrig").addClass("active");
	}
	
	$(".tab_body_content").empty();
	$(".tab_body_content.tab_" + type).load("./views/sys_manage_" + type + ".html");
	
	setTimeout(function() {
		$(".tab_body_content").removeClass("active");
		$(".tab_body_content.tab_" + type).addClass("active");
	}, 200);
	
	$('#dropdowntrig_ul').hide();
	$('#dropdowntrig_ul2').hide();
}
function sys_ini_drop()
{
	var wntrigshow = false;
	$("#dropdowntrig").click(function() {
		if (!wntrigshow) {
			wntrigshow = true;
			wntrigshow2 = false;
			$("#dropdowntrig_ul").show();
			$("#dropdowntrig_ul2").hide();
		}
		else {
			wntrigshow = false;
			$("#dropdowntrig_ul").hide();
		}
	});
	var wntrigshow2 = false;
	$("#dropdowntrig2").click(function() {
		if (!wntrigshow2) {
			wntrigshow2 = true;
			wntrigshow = false;
			$("#dropdowntrig_ul2").show();
			$("#dropdowntrig_ul").hide();
		}
		else {
			wntrigshow2 = false;
			$("#dropdowntrig_ul2").hide();
		}
	});
}

// 使用者管理START
function get_sys_manage(research) {
	
	var name = $("#sys_user_name").val();
	var unit = $("#sys_unit").val();
	var group = $("#sys_group").val();
	
	var post = {};
	
	if (name != "")
		post.Name = name;
	if (unit != "")
		post.DepName = unit;
	if (group != "-1")
		post.GroupId = group;
	
	WaitingShow(true);
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/GetAccountList",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			setTimeout(function() { WaitingShow(false); }, 900);
			setTimeout(function() {
				if (d != null) {
					var group = d.groups;
					var account = d.accounts;
					var dept = d.depts;
					
					if (!research) {
						$("#sys_group").empty();
						$("#sys_group").append('<option value="-1">請選擇</option>');
						$("#add_user_group").empty();
						$("#add_user_group").append('<option value="-1">請選擇</option>');
						for (var i = 0; i < group.length; i++) {
							$("#sys_group").append('<option value="' + group[i].sid + '">' + htmlEncode(group[i].name) + '</option>');
							$("#add_user_group").append('<option value="' + group[i].sid + '">' + htmlEncode(group[i].name) + '</option>');
						}
						
						$("#add_user_dept").empty();
						$("#add_user_dept").append('<option value="-1">請選擇</option>');
						for (var i = 0; i < dept.length; i++) {
							$("#add_user_dept").append('<option value="' + dept[i].did + '">' + htmlEncode(dept[i].name) + '</option>');
						}
					}
					
					$("#account_list_body").empty();
					var dd = d.accounts;
					for (var i = 0; i < dd.length; i++) {
						var tstr = '<tr>';
						tstr += '<td>' + (i + 1) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].name) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].account) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].unitName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].depName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].groupName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].updateTime) + '</td>';
						
						if (dd[i].state == "1")
							tstr += '<td>' + '<div class="custom-switch form-switch"><input class="form-check-input" type="checkbox" onchange="sys_account_update_state(this, \'' + dd[i].sno + '\');" checked /></div>' + '</td>';
						else
							tstr += '<td>' + '<div class="custom-switch form-switch"><input class="form-check-input" type="checkbox" onchange="sys_account_update_state(this, \'' + dd[i].sno + '\');" /></div>' + '</td>';
						
						tstr += '<td>' + '<button type="button" class="btn btn-success" onclick="sys_add_newuser(' + dd[i].sno + ');">編輯</button>' + '</td>';
						tstr += '</tr>';
						
						$("#account_list_body").append(tstr);
					}
				}
			}, 50);
		}
	});
}
function sys_account_update_state(that, sid) {
	var state = that.checked == true ? "1" : "0";
	var post = {};
	post.Sno = sid;
	post.State = state;
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/UpdateAccountStatus",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			if (d == "OK")
				alert("更新成功.")
			else
				alert("更新失敗.")
		}
	});
}
function sys_manage_clear() {
	$("#sys_user_name").val('');
	$("#sys_unit").val('');
	$("#sys_group").val('-1');
	
	get_sys_manage(true);
}
function CloseAddEditUserModal() {
	$("#AddNewUser").modal("hide");
}
function sys_add_newuser(type) {
	if (!type) {
		$("#add_edit_user_modal").empty();
		$("#add_edit_user_modal").append("新增使用者");
		$("#add_edit_sid").val("");
		$("#add_user_name").val("");
		$("#add_user_account").val("");
		$("#add_user_pass").val("");
		$("#add_user_mail").val("");
		$("#add_user_unit").val("");
		$("#add_user_dept").val("-1");
		$("#add_user_group").val("-1");
		
		$("#AddNewUser").modal("show");
		$("#add_user_btn").show();
		$("#edit_user_btn").hide();
	}
	else {
		var post = {};
		post.Sno = type;
		
		$.ajax({
			url: ApiRequestURL + "SyetemManagement/GetTargetAccount",
			type: "Post",
			data: post,
			async: false,
			success: function(data) {
				var d = data.data;
				$("#add_edit_user_modal").empty();
				$("#add_edit_user_modal").append("編輯使用者");
				if (d != null) {
					$("#add_edit_sid").val(d.sid);
					$("#add_user_name").val(d.name);
					$("#add_user_account").val(d.account);
					$("#add_user_pass").val(d.password);
					$("#add_user_mail").val(d.mail);
					$("#add_user_unit").val(d.depName);
					$("#add_user_dept").val(d.did);
					$("#add_user_group").val(d.groupId);
					
					$("#AddNewUser").modal("show");
					$("#add_user_btn").hide();
					$("#edit_user_btn").show();
				}
			}
		});
	}
}
function sys_user_account_add() {
	var post = {};
	post.Name = $("#add_user_name").val();
	post.Account = $("#add_user_account").val();
	post.Password = $("#add_user_pass").val();
	post.DepName = $("#add_user_unit").val();
	post.Mail = $("#add_user_mail").val();
	post.GroupId = $("#add_user_group").val();
	post.Did = $("#add_user_dept").val();
	
	if (post.Name == '') {
		alert('請輸入使用者名稱.');
		return;
	}
	if (post.Account == '') {
		alert('請輸入帳號.');
		return;
	}
	if (post.Password == '') {
		alert('請輸入密碼.');
		return;
	}
	if (post.Mail == '') {
		alert('請輸入電子信箱.');
		return;
	}
	if (post.DepName == '') {
		alert('請輸入單位名稱.');
		return;
	}
	if (post.GroupId == -1) {
		alert('請選擇角色群組.');
		return;
	}
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/InsertAccount",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			if (d == "OK") {
				alert('新增成功.');
				$("#AddNewUser").modal("hide");
				get_sys_manage(true);
			}
			else {
				alert('新增失敗.');
			}
		}
	});
}
function sys_user_account_edit() {
	var post = {};
	post.Sid = $("#add_edit_sid").val();
	post.Name = $("#add_user_name").val();
	post.Account = $("#add_user_account").val();
	post.Password = $("#add_user_pass").val();
	post.DepName = $("#add_user_unit").val();
	post.Mail = $("#add_user_mail").val();
	post.GroupId = $("#add_user_group").val();
	post.Did = $("#add_user_dept").val();
	
	if (post.Name == '') {
		alert('請輸入使用者名稱.');
		return;
	}
	if (post.Account == '') {
		alert('請輸入帳號.');
		return;
	}
	if (post.Password == '') {
		alert('請輸入密碼.');
		return;
	}
	if (post.Mail == '') {
		alert('請輸入電子信箱.');
		return;
	}
	if (post.DepName == '') {
		alert('請輸入單位名稱.');
		return;
	}
	if (post.GroupId == -1) {
		alert('請選擇角色群組.');
		return;
	}
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/UpdateAccount",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			if (d == "OK") {
				alert('編輯成功.');
				$("#AddNewUser").modal("hide");
				get_sys_manage(true);
			}
			else {
				alert('編輯失敗.');
			}
		}
	});
}
// 使用者管理END

// 群組管理START
var sys_group_tree = [];
function sys_group_init() {
	var post1 = {};
	var post2 = {};
	var post3 = {};
	var funtionlist = [];
	var grouplist = [];
	var accesslist = [];
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/GetFunctionList",
		type: "Post",
		data: post1,
		async: false,
		success: function(data) {
			var d = data.data;
			funtionlist = d;
		}
	});
	
	post2.GroupName = $("#sys_user_name").val();
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/GetGroupList",
		type: "Post",
		data: post2,
		async: false,
		success: function(data) {
			var d = data.data;
			grouplist = d;
			
			$("#del_group_search").empty();
			$("#del_group_search").append('<option value="-1">請選擇</option>');
			
			for (var i = 0; i < d.length; i++) {
				if (d[i].name == "系統管理員" || d[i].name == "本署" || d[i].name == "分署" || d[i].name == "工作站") continue;
				$("#del_group_search").append('<option value="' + d[i].sid + '">' + d[i].name + '</option>');
			}
		}
	});
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/GetGroupAccessList",
		type: "Post",
		data: post3,
		async: false,
		success: function(data) {
			var d = data.data;
			accesslist = d;
		}
	});
	
	//head
	$("#sys_group_head").empty();
	$("#sys_group_head").append("<th colspan='2' style='width: 470px;'>標頭</th>");
	for (var j = 0; j < grouplist.length + 1; j++) {
		if (j == grouplist.length) {
			var tmp = "<th class='sys_group_add'>" + '<input id="insert_new_name" class="form-control form-custom-select" type="text" />' + "</th>";
			$("#sys_group_head").append(tmp);
		}
		else {
			var tmp = "<th>" + htmlEncode(grouplist[j].name) + "</th>";
			$("#sys_group_head").append(tmp);
		}
	}
	
	//SetTree
	var accesstree = [];
	var flevel = funtionlist.filter(x => x.level == '1'); // 篩選出Level1
	
	for (var i = 0; i < flevel.length; i++) {
		var tmp = {};
		tmp.name = flevel[i].model;
		tmp.sid = flevel[i].sid;
		tmp.nlevel = [];
		
		var nlevel = funtionlist.filter(x => x.level == '2' && x.model == flevel[i].model); // 篩選出Level2
		for (var j = 0; j < nlevel.length; j++) {
			var tmp2 = {};
			tmp2.name = nlevel[j].subClass;
			tmp2.sid = nlevel[j].sid;
			tmp2.plevel = tmp;
			tmp2.nlevel = [];
			
			var llevel = funtionlist.filter(x => x.level == '3' && x.model == flevel[i].model && x.subClass == nlevel[j].subClass); // 篩選出Level3
			for (var k = 0; k < llevel.length; k++) {
				var tmp3 = {};
				tmp3.name = llevel[k].buttonName;
				tmp3.sid = llevel[k].sid;
				tmp3.plevel = tmp2;
				
				tmp2.nlevel.push(tmp3);
			}
			tmp.nlevel.push(tmp2);
		}
		accesstree.push(tmp);
	}
	
	sys_group_tree = accesstree;
	
	//body
	$("#sys_group_body").empty();
	for (var i = 0; i < accesstree.length; i++) {
		var tmp = "<tr>";
		tmp += '<td class="parent_' + i + '" colspan="2" style="font-weight: 900; position: relative;">' + htmlEncode(accesstree[i].name) + '<img class="sys_group_first_vect" src="image/Vector.svg" onclick="sys_group_drop(this);" />' + '</td>';
		
		for (var j = 0; j < grouplist.length + 1; j++) {
			if (j == grouplist.length) {
				tmp += "<td class='sys_group_add'>" + '<input id="' + '0_' + accesstree[i].sid + '" class="form-check-input" name="insert" type="checkbox" value="' + '0_' + accesstree[i].sid + '" onchange="accessCheckchange(this, 1);" />' + "</td>";
			}
			else {
				tmp += "<td class='sys_group_view'>" + '<img src="image/NoUse.svg" id="v_' + grouplist[j].sid + '_' + accesstree[i].sid + '" />' + "</td>";
				tmp += "<td class='sys_group_edit'>" + '<input id="' + grouplist[j].sid + '_' + accesstree[i].sid + '" class="form-check-input" name="access" type="checkbox" value="' + grouplist[j].sid + '_' + accesstree[i].sid + '" onchange="accessCheckchange(this, 1);" />' + "</td>";
			}
		}
		tmp += "</tr>";
		
		$("#sys_group_body").append(tmp);
		
		var nlevel = accesstree[i].nlevel;
		for (var k = 0; k < nlevel.length; k++) {
			if (nlevel[k].nlevel.length == 0) {
				var ntmp = "<tr class='child_" + i + "' style='display: none;'>";
				ntmp += '<td colspan="2">' + nlevel[k].name + '</td>';
				for (var j = 0; j < grouplist.length + 1; j++) {
					if (j == grouplist.length) {
						ntmp += "<td class='sys_group_add'>" + '<input id="' + '0_' + nlevel[k].sid + '" class="form-check-input" name="insert" type="checkbox" value="' + '0_' + nlevel[k].sid + '" onchange="accessCheckchange(this, 2);" />' + "</td>";
					}
					else {
						ntmp += "<td class='sys_group_view'>" + '<img src="image/NoUse.svg" id="v_' + grouplist[j].sid + '_' + nlevel[k].sid + '" />' + "</td>";
						ntmp += "<td class='sys_group_edit'>" + '<input id="' + grouplist[j].sid + '_' + nlevel[k].sid + '" class="form-check-input" name="access" type="checkbox" value="' + grouplist[j].sid + '_' + nlevel[k].sid + '" onchange="accessCheckchange(this, 2);" />' + "</td>";
					}
				}
				ntmp += "</tr>";
				
				$("#sys_group_body").append(ntmp);
			}
			else {
				var llevel = nlevel[k].nlevel;
				var ntmp = "<tr class='child_" + i + "' style='display: none;'>";
				ntmp += '<td rowspan="' + llevel.length + '">' + nlevel[k].name + '</td>';
				
				for (var n = 0; n < llevel.length; n++) {
					if (n == 0) {
						ntmp += '<td>' + llevel[n].name + '</td>';
						for (var j = 0; j < grouplist.length + 1; j++) {
							if (j == grouplist.length) {
								ntmp += "<td class='sys_group_add'>" + '<input id="' + '0_' + llevel[n].sid + '" class="form-check-input" name="insert" type="checkbox" value="' + '0_' + llevel[n].sid + '" onchange="accessCheckchange(this, 3);" />' + "</td>";
							}
							else {
								ntmp += "<td class='sys_group_view'>" + '<img src="image/NoUse.svg" id="v_' + grouplist[j].sid + '_' + llevel[n].sid + '" />' + "</td>";
								ntmp += "<td class='sys_group_edit'>" + '<input id="' + grouplist[j].sid + '_' + llevel[n].sid + '" class="form-check-input" name="access" type="checkbox" value="' + grouplist[j].sid + '_' + llevel[n].sid + '" onchange="accessCheckchange(this, 3);" />' + "</td>";
							}
						}
						ntmp += "</tr>";
						$("#sys_group_body").append(ntmp);
					} else {
						var ltmp = '<tr class="child_' + i + '" style="display: none;">';
						ltmp += '<td>' + llevel[n].name + '</td>';
						for (var j = 0; j < grouplist.length + 1; j++) {
							if (j == grouplist.length) {
								ltmp += "<td class='sys_group_add'>" + '<input id="' + '0_' + llevel[n].sid + '" class="form-check-input" name="insert" type="checkbox" value="' + '0_' + llevel[n].sid + '" onchange="accessCheckchange(this, 3);" />' + "</td>";
							}
							else {
								ltmp += "<td class='sys_group_view'>" + '<img src="image/NoUse.svg" id="v_' + grouplist[j].sid + '_' + llevel[n].sid + '" />' + "</td>";
								ltmp += "<td class='sys_group_edit'>" + '<input id="' + grouplist[j].sid + '_' + llevel[n].sid + '" class="form-check-input" name="access" type="checkbox" value="' + grouplist[j].sid + '_' + llevel[n].sid + '" onchange="accessCheckchange(this, 3);" />' + "</td>";
							}
						}
						ltmp += '</tr>';
						$("#sys_group_body").append(ltmp);
					}
				}
			}
		}
	}
	
	for (var i = 0; i < accesslist.length; i++) {
		var groupid = accesslist[i].groupid;
		var functionid = accesslist[i].functionid;
		
		$("#v_" + groupid + '_' + functionid).attr("src", "image/IsUse.svg");
		$("#" + groupid + '_' + functionid).prop('checked', true);
	}
	
	sys_group_update_show(grouplist);
}
function sys_group_successtoast(label) {
	$("#toast_label_success").empty();
	$("#toast_label_success").append(htmlEncode(label));
	$("#toast_success").toast("show");
}
function sys_group_erroetoast(label) {
	$("#toast_label_error").empty();
	$("#toast_label_error").append(htmlEncode(label));
	$("#toast_error").toast("show");
}
function sys_group_update_show(grouplist) {
	for (var i = 0; i < sys_group_tree.length; i++) {
		for (var j = 0; j < grouplist.length; j++) {
			sys_check_AllChecked(grouplist[j].sid, sys_group_tree[i].sid);
			
			if($('#' + grouplist[j].sid + '_' + sys_group_tree[i].sid).is(":indeterminate")) {
				$("#v_" + grouplist[j].sid + '_' + sys_group_tree[i].sid).attr("src", "image/SomeUse.svg");
			}
		}
	}
}
function sys_group_drop(that) {
	var pid = $(that).parent()[0].className;
	var ps = pid.split('_');
	var id = ps[1];
		
	if (that.isShow == false) {
		$(".child_" + id).show();
		$(that).addClass('transimg');
		that.isShow = true;
	}
	else if (that.isShow == true) {
		$(".child_" + id).hide();
		$(that).removeClass('transimg');
		that.isShow = false;
	}
	else {
		$(".child_" + id).show();
		$(that).addClass('transimg');
		that.isShow = true;
	}
}
function sys_group_search_clear() {
	$("#sys_user_name").val("");
	sys_group_init();
}
function accessCheckchange(that, level) {
	var value = $(that).val();
	var groupid = value.split('_')[0];
	var functionid = value.split('_')[1];
	var checked = that.checked;
	
	if (level == 1) {
		for (var i = 0; i < sys_group_tree.length; i++) {
			if (sys_group_tree[i].sid == functionid) {
				var nlevel = sys_group_tree[i].nlevel;
				for (var j = 0; j < nlevel.length; j++) {
					if (checked == true)
						$("#" + groupid + '_' + nlevel[j].sid).prop('checked', true);
					else
						$("#" + groupid + '_' + nlevel[j].sid).prop('checked', false);
					
					var llevel = nlevel[j].nlevel;
					for (var k = 0; k < llevel.length; k++) {
						if (checked == true)
							$("#" + groupid + '_' + llevel[k].sid).prop('checked', true);
						else
							$("#" + groupid + '_' + llevel[k].sid).prop('checked', false);
					}
				}
				break;
			}
		}
	}
	else if (level == 2) {
		var target;
		for (var i = 0; i < sys_group_tree.length; i++) {
			var nlevel = sys_group_tree[i].nlevel;
			for (var j = 0; j < nlevel.length; j++) {
				if (nlevel[j].sid == functionid) {
					target = nlevel[j];
					break;
				}
			}
		}
		
		var pid = target.plevel.sid;
		sys_check_AllChecked(groupid, pid);
	}
	else if (level == 3) {
		var target;
		
		for (var i = 0; i < sys_group_tree.length; i++) {
			var nlevel = sys_group_tree[i].nlevel;
			for (var j = 0; j < nlevel.length; j++) {
				var llevel = nlevel[j].nlevel;
				for (var k = 0; k < llevel.length; k++) {
					if (llevel[k].sid == functionid) {
						target = nlevel[j];
						break;
					}
				}
			}
		}
		
		var pid = target.plevel.sid;
		sys_check_AllChecked(groupid, pid);
	}
}
function sys_check_AllChecked(groupid, id) {
	var allchecked = true;
	var checkedlength = 0;
	
	for (var i = 0; i < sys_group_tree.length; i++) {
		if (sys_group_tree[i].sid == id) {
			var nlevel = sys_group_tree[i].nlevel;
			for (var j = 0; j < nlevel.length; j++) {
				if (!$('#' + groupid + '_' + nlevel[j].sid).length) {
					
				} else if ($('#' + groupid + '_' + nlevel[j].sid).is(":checked")) {
					checkedlength++;
				}
				else {
					allchecked = false;
				}
				
				var llevel = nlevel[j].nlevel;
				for (var k = 0; k < llevel.length; k++) {
					if (!$("#" + groupid + '_' + llevel[k].sid).length) {
					
					}
					else if ($("#" + groupid + '_' + llevel[k].sid).is(":checked"))
						checkedlength++;
					else
						allchecked = false;
				}
			}
			break;
		}
	}
	
	if (allchecked == true) {
		$("#" + groupid + '_' + id).prop('indeterminate', false);
		$("#" + groupid + '_' + id).prop('checked', true);
	}
	else if (checkedlength == 0) {
		$("#" + groupid + '_' + id).prop('indeterminate', false);
		$("#" + groupid + '_' + id).prop('checked', false);
	}
	else if (allchecked == false && checkedlength > 0) {
		$("#" + groupid + '_' + id).prop('indeterminate', true);
		$("#" + groupid + '_' + id).prop('checked', false);
	}
}
function sys_add_newgroup() {
	sys_cancel_edit_group();
	$(".user_group_base").hide();
	$(".user_group_add").show();
	
	$(".sys_group_add").show();
}
function sys_cancel_add_group() {
	$(".user_group_base").show();
	$(".user_group_add").hide();
	
	sys_group_init();
}
function sys_add_update_group() {
	var values = [];
	$("input[name='insert']:checked").each(function(){values.push($(this).val());});

	var post = {};
	post.Name = $("#insert_new_name").val();
	post.FunctionArray = values;
	post.Level = "1";
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/InsertNewGroup",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			if (d == "OK") {
				sys_group_successtoast("新增成功");
				sys_cancel_add_group();
			}
			else {
				sys_group_erroetoast("新增失敗");
				$("#toast_error").toast("show");
			}
		}
	});
}
function sys_edit_group() {
	$(".user_group_base").hide();
	$(".user_group_edit").show();
	$(".sys_group_view").hide();
	$(".sys_group_edit").show();
}
function sys_cancel_edit_group() {
	$(".user_group_base").show();
	$(".user_group_edit").hide();
	$(".sys_group_view").show();
	$(".sys_group_edit").hide();
	
	sys_group_init();
}
function sys_edit_update_group() {
	var values = [];
	$("input[name='access']:checked").each(function(){values.push($(this).val());});

	var post = {};
	post.FunctionArray2 = values;
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/UpdateGroup",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			if (d == "OK") {
				sys_group_successtoast("更新成功，權限將在下次登入時生效.");
				sys_cancel_edit_group();
			}
			else
				sys_group_erroetoast("更新失敗.");
		}
	});
}
function sys_add_modal_group() {
	$("#addgroup").modal("show");
}
function sys_cancel_add_modal_group() {
	$("#addgroup").modal("hide");
}
function sys_add_update_modal_group() {
	var post = {};
	post.Name = $("#add_group_name").val();
	post.FunctionArray = [];
	post.Level = "1";
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/InsertNewGroup",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			if (d == "OK") {
				sys_group_successtoast("新增成功");
				sys_cancel_add_modal_group();
				sys_group_init();
			}
			else {
				sys_group_erroetoast("新增失敗");
				$("#toast_error").toast("show");
			}
		}
	});
}
function sys_del_modal_group() {
	$("#delgroup").modal("show");
}
function sys_cancel_del_modal_group() {
	$("#delgroup").modal("hide");
}
function sys_del_update_modal_group() {
	var post = {};
	post.Groupid = $("#del_group_search").val();
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/DeleteGroup",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			if (d == "OK") {
				sys_group_successtoast("刪除成功");
				sys_cancel_del_modal_group();
				sys_group_init();
			}
			else {
				sys_group_erroetoast("刪除失敗");
				$("#toast_error").toast("show");
			}
		}
	});
}
// 群組管理END

// 人員異動START
function getGroupManageList() {
	var post = {};
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/GetGroupList",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			
			$("#targetgroup").empty();
			$("#targetgroup").append('<option value="-1">請選擇</option>');
			$("#changegroup").empty();
			$("#changegroup").append('<option value="-1">請選擇</option>');
			
			for (var i = 0; i < d.length; i++) {
				$("#targetgroup").append('<option value="' + d[i].sid + '">' + htmlEncode(d[i].name) + '</option>');
				$("#changegroup").append('<option value="' + d[i].sid + '">' + htmlEncode(d[i].name) + '</option>');
			}
		}
	});
}
function getTargetUser() {
	var post = {};
	post.Groupid = $("#targetgroup").val();
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/GetTargetGroupUser",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			
			$("#sys_pepole_tab_list_target").empty();
			for (var i = 0; i < d.length; i++) {
				var tstr = "<tr>";
				tstr += "<td>";
				tstr += '<input id="user_' + d[i].sid + '" class="user_left" type="checkbox" value="' + htmlEncode(d[i].name) + '" />';
				tstr += htmlEncode(d[i].name);
				tstr += "</td>";
				tstr += "</tr>";
				
				$("#sys_pepole_tab_list_target").append(tstr);
			}
		}
	});
	
	var post2 = {};
	post2.Groupid = $("#changegroup").val();
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/GetTargetGroupUser",
		type: "Post",
		data: post2,
		async: false,
		success: function(data) {
			var d = data.data;
			
			$("#sys_pepole_tab_list_change").empty();
			
			for (var i = 0; i < d.length; i++) {
				var tstr = "<tr>";
				tstr += "<td>";
				tstr += '<input id="user_' + d[i].sid + '" class="user_right" type="checkbox" value="' + htmlEncode(d[i].name) + '" />';
				tstr += htmlEncode(d[i].name);
				tstr += "</td>";
				tstr += "</tr>";
				
				$("#sys_pepole_tab_list_change").append(tstr);
			}
		}
	});
}
function UserToRight() {
	var leftselect = $("#targetgroup").val();
	var rightselect = $("#changegroup").val();
	
	if (leftselect == "-1" || rightselect == "-1") {
		alert("請先選擇角色群組.");
		return;
	}
	if (leftselect == rightselect) {
		alert("移動群組需要兩個不同的群組.");
		return;
	}
	
    var target = $(".user_left");
	
	for (var i = 0; i < target.length; i++) {
		if (target[i].checked == true) {
			var tmpid = target[i].id;
			var tmpname = $(target[i]).val();
			$(target[i]).closest('tr').remove();
			
			var tstr = "<tr>";
			tstr += "<td>";
			tstr += '<input id="' + tmpid + '" class="user_right" type="checkbox" value="' + htmlEncode(tmpname) + '" />';
			tstr += htmlEncode(tmpname);
			tstr += "</td>";
			tstr += "</tr>";
			
			$("#sys_pepole_tab_list_change").append(tstr);
		}
	}
}
function UserToLeft() {
	var leftselect = $("#targetgroup").val();
	var rightselect = $("#changegroup").val();
	
	if (leftselect == "-1" || rightselect == "-1") {
		alert("請先選擇角色群組.");
		return;
	}
	if (leftselect == rightselect) {
		alert("移動群組需要兩個不同的群組.");
		return;
	}
	
    var target = $(".user_right");
	
	for (var i = 0; i < target.length; i++) {
		if (target[i].checked == true) {
			var tmpid = target[i].id;
			var tmpname = $(target[i]).val();
			$(target[i]).closest('tr').remove();
			
			var tstr = "<tr>";
			tstr += "<td>";
			tstr += '<input id="' + tmpid + '" class="user_left" type="checkbox" value="' + htmlEncode(tmpname) + '" />';
			tstr += htmlEncode(tmpname);
			tstr += "</td>";
			tstr += "</tr>";
			
			$("#sys_pepole_tab_list_target").append(tstr);
		}
	}
}
function CancelUserChange() {
	var leftselect = $("#targetgroup").val("-1");
	var rightselect = $("#changegroup").val("-1");
	
	$("#sys_pepole_tab_list_target").empty();
	$("#sys_pepole_tab_list_change").empty();
}
function SaveUserChange() {
	var post = {};
	var leftselect = $("#targetgroup").val();
	var rightselect = $("#changegroup").val();
	
	post.FirstGid = leftselect;
	post.SecondGid = rightselect;
	
	var ul = $(".user_left");
	var ula = [];
	for (var i = 0; i < ul.length; i++) {
		var tmpid = ul[i].id;
		var id = tmpid.split("_")[1];
		
		ula.push(id);
	}
	post.FirstGroupUserId = ula;
	
	var ur = $(".user_right");
	var ura = [];
	for (var i = 0; i < ur.length; i++) {
		var tmpid = ur[i].id;
		var id = tmpid.split("_")[1];
		
		ura.push(id);
	}
	post.SecondGroupUserId = ura;
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/UpdateUserGroup",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			alert("更新成功.");
		}
	});
}
// 人員異動END
// 系統操作記錄START
function getGroupList() {
	var post = {};
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/GetGroupList",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			$("#sys_group").empty();
			$("#sys_group").append('<option value="-1">請選擇</option>');
			for (var i = 0; i < d.length; i++) {
				$("#sys_group").append('<option value="' + d[i].sid + '">' + htmlEncode(d[i].name) + '</option>');
			}
		}
	});
}
function getFunctionList() {
	var post = {};
	$.ajax({
		url: ApiRequestURL + "LogManagement/GetFunctionList",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			
			var ary = [];
			for (var i = 0; i < d.length; i++) {
				if (d[i].modal != "" && d[i].sub != "") {
					var dstr = d[i].modal + '/' + d[i].sub;
					if ($.inArray(dstr, ary) == -1)
						ary.push(dstr);
				}
			}
			
			var aary = [];
			for (var i = 0; i < d.length; i++) {
				if (d[i].modal != "" && d[i].sub != "" && d[i].buttom !== "") {
					var dstr = d[i].buttom;
					if ($.inArray(dstr, aary) == -1)
						aary.push(dstr);
				}
			}
			
			for (var i = 0; i < ary.length; i++) {
				var astr = ary[i];
				$("#sys_function").append('<option value="' + astr + '">' + htmlEncode(astr) + '</option>');
			}
			
			for (var i = 0; i < aary.length; i++) {
				var astr = aary[i];
				$("#sys_action").append('<option value="' + astr + '">' + htmlEncode(astr) + '</option>');
			}
		}
	});
}
function GetLogList() {
	var post = {};
	
	var name = $("#sys_user_name").val();
	var unit = $("#sys_unit").val();
	var group = $("#sys_group").val();
	var action = $("#sys_action").val();
	var sfunction = $("#sys_function").val();
	
	if (name != "") {
		post.Name = name;
	}
	if (unit != "") {
		post.DepName = unit;
	}
	if (group != "-1") {
		post.Groupid = group;
	}
	if (action != "-1") {
		post.SearchAction = action;
	}
	if (sfunction != "-1") {
		post.Function = sfunction;
	}
	
	$.ajax({
		url: ApiRequestURL + "LogManagement/GetLogList",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			
			$('#sys_user_page').pagination({
				dataSource: d,
				pageSize: 10,
				pageNumber: 1,
				callback: function(dd, pagination) {
					$("#fc_tab_list_body").empty();
					
					for (var i = 0; i < dd.length; i++) {
						var tstr = '<tr>';
						tstr += '<td>' + htmlEncode(dd[i].sid) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].userName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].account) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].unitName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].depName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].groupName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].functionName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].action) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].ip) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].time) + '</td>';
						tstr += '</tr>';
						
						$("#fc_tab_list_body").append(tstr);
					}
				}
			});
		}
	});
}
function LogListSearchClear() {
	$("#sys_user_name").val("");
	$("#sys_unit").val("");
	$("#sys_group").val("-1");
	$("#sys_action").val("-1");
	$("#sys_function").val("-1");
	
	GetLogList();
}
// 系統操作記錄END
// 下載統計紀錄START
function getDownloadFunctionList() {
	var post = {};
	post.IsDownload = "true";
	
	$.ajax({
		url: ApiRequestURL + "LogManagement/GetFunctionList",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			
			var ary = [];
			for (var i = 0; i < d.length; i++) {
				if (d[i].modal != "" && d[i].sub != "") {
					var dstr = d[i].modal + '/' + d[i].sub;
					if ($.inArray(dstr, ary) == -1)
						ary.push(dstr);
				}
			}
			
			for (var i = 0; i < ary.length; i++) {
				var astr = ary[i];
				$("#sys_function").append('<option value="' + astr + '">' + htmlEncode(astr) + '</option>');
			}
		}
	});
}
function GetDownloadLogList() {
	var post = {};
	
	var name = $("#sys_user_name").val();
	var unit = $("#sys_unit").val();
	var sfunction = $("#sys_function").val();
	
	if (name != "") {
		post.Name = name;
	}
	if (unit != "") {
		post.DepName = unit;
	}
	if (sfunction != "-1") {
		post.Function = sfunction;
	}
	
	$.ajax({
		url: ApiRequestURL + "LogManagement/GetDownloadLogList",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			
			$('#sys_user_page').pagination({
				dataSource: d,
				pageSize: 10,
				pageNumber: 1,
				callback: function(dd, pagination) {
					$("#fc_tab_list_body").empty();
					
					for (var i = 0; i < dd.length; i++) {
						var tstr = '<tr>';
						tstr += '<td>' + htmlEncode(dd[i].sid) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].userName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].unitName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].depName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].groupName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].functionName) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].dataType) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].ip) + '</td>';
						tstr += '<td>' + htmlEncode(dd[i].time) + '</td>';
						tstr += '</tr>';
						
						$("#fc_tab_list_body").append(tstr);
					}
				}
			});
		}
	});
}
function DownloadLogListSearchClear() {
	$("#sys_user_name").val("");
	$("#sys_unit").val("");
	$("#sys_group").val("-1");
	$("#sys_action").val("-1");
	$("#sys_function").val("-1");
	
	GetDownloadLogList();
}
// 下載統計紀錄END

// 自訂常用查詢START
var sys_custom = {};
function sys_custom_inti() {
	$.ajax({
		url: ApiRequestURL + "InfoOverView/GetCountyList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				sys_custom.county = d;
			}
		}
	});
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/GetDistList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				sys_custom.dist = d;
			}
		}
	});
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetStaticParameter",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				sys_custom.param = d;
				// 主
				$('#edit_custom_main').empty();
				for (var i = 0; i < d.length; i++)
				{
					if (d[i].groupY == 'True')
					{
						$('#edit_custom_main').append('<option value="' + d[i].sid + '">' + htmlEncode(d[i].name) + '</option>');
					}
				}
				
				// 次
				$('#edit_custom_sub').empty();
				for (var i = 0; i < d.length; i++)
				{
					if (d[i].groupX == 'True')
					{
						$('#edit_custom_sub').append('<option value="' + d[i].sid + '">' + htmlEncode(d[i].name) + '</option>');
					}
				}
				
				sys_custom_main_change($('#edit_custom_main'));
				sys_custom_sub_change($('#edit_custom_sub'));
			}
		}
	});
}

function sys_get_custom_table() {
	var post = {};

	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetCustomThemeTable",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$('#sys_user_page').pagination({
					dataSource: d,
					pageSize: 10,
					pageNumber: 1,
					callback: function(dd, pagination) {
						$("#sys_custom_theme_body").empty();
						
						for (var i = 0; i < dd.length; i++) {
							var tmp = "<tr>";
							tmp += '<td>' + (i + 1) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].name) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].note) + '</td>';
							tmp += '<td>' + htmlEncode(dd[i].time) + '</td>';
							
							if (dd[i].state == "True")
								tmp += '<td>' + '<div class="custom-switch form-switch"><input class="form-check-input" type="checkbox" onchange="sys_custom_update_state(this, \'' + dd[i].sid + '\');" checked /></div>' + '</td>';
							else
								tmp += '<td>' + '<div class="custom-switch form-switch"><input class="form-check-input" type="checkbox" onchange="sys_custom_update_state(this, \'' + dd[i].sid + '\');" /></div>' + '</td>';
							
							tmp += '<td>' + '<label style="color:#74642A; cursor: pointer;" onclick="edit_sys_custom(\'' + dd[i].sid + '\')">編輯</label>' + '<label style="color:#74642A; cursor: pointer;" onclick="delete_sys_custom(\'' + dd[i].sid + '\')">刪除</label>' + '</td>';
							tmp += '</tr>';
							
							$("#sys_custom_theme_body").append(tmp);
						}
					}
				});
			}
		}
	});
}

function sys_custom_main_change(that, data) {
	var val = $(that).val();
	var param = sys_custom.param;
	
	var type = '-1';
	for (var i = 0; i < param.length; i++) {
		if (param[i].groupY == 'True' && param[i].sid == val) {
			type = param[i].type;
		}
	}
	
	if (type == '3') {
		$("#edit_custom_main_filter").multiselect('destroy');
		$("#edit_custom_main_filter").empty();
		$('#edit_custom_main_filter').hide();
		$('#edit_custom_main_input').show();
		$('#edit_custom_main_input').val('');
	}
	else {
		$('#edit_custom_main_filter').show();
		$('#edit_custom_main_input').hide();
		
		$("#edit_custom_main_filter").multiselect('destroy');
		$("#edit_custom_main_filter").empty();
		
		if (val == '1') {
			var d = sys_custom.county;
			
			for (var i = 0; i < d.length; i++) {
				var hasv = false;
				if (data) {
					for (var j = 0; j < data.length; j++) {
						if (d[i].code == data[j]) {
							hasv = true;
							break;
						}
					}	
				}
				if (hasv)
					$("#edit_custom_main_filter").append('<option value="' + d[i].code + '" selected>' + htmlEncode(d[i].name) + '</option>');
				else
					$("#edit_custom_main_filter").append('<option value="' + d[i].code + '">' + htmlEncode(d[i].name) + '</option>');
			}
		}
		else if (val == '2') {
			var d = sys_custom.dist;
			
			for (var i = 0; i < d.length; i++) {
				var hasv = false;
				if (data) {
					for (var j = 0; j < data.length; j++) {
						if (d[i].distId == data[j]) {
							hasv = true;
							break;
						}
					}	
				}
				if (hasv)
					$("#edit_custom_main_filter").append('<option value="' + d[i].distId + '" selected>' + htmlEncode(d[i].distName) + '</option>');
				else
					$("#edit_custom_main_filter").append('<option value="' + d[i].distId + '">' + htmlEncode(d[i].distName) + '</option>');
			}
			$("#edit_custom_main_filter").append('<option value="ZZ">其他</option>');
		}
		
		$("#edit_custom_main_filter").multiselect({
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
	}
}

function sys_custom_sub_change(that, data) {
	var val = $(that).val();
	var param = sys_custom.param;
	
	var type = '-1';
	for (var i = 0; i < param.length; i++) {
		if (param[i].groupX == 'True' && param[i].sid == val) {
			type = param[i].type;
		}
	}
	
	if (type == '3') {
		$("#edit_custom_sub_filter").multiselect('destroy');
		$("#edit_custom_sub_filter").empty();
		$('#edit_custom_sub_filter').hide();
		$('#edit_custom_sub_input').show();
		$('#edit_custom_sub_input').val('');
	}
	else {
		$('#edit_custom_sub_filter').show();
		$('#edit_custom_sub_input').hide();
		
		$("#edit_custom_sub_filter").multiselect('destroy');
		$("#edit_custom_sub_filter").empty();
		
		if (val == '2') {
			var d = sys_custom.dist;
			
			for (var i = 0; i < d.length; i++) {
				var hasv = false;
				if (data) {
					for (var j = 0; j < data.length; j++) {
						if (d[i].distId == data[j]) {
							hasv = true;
							break;
						}
					}	
				}
				if (hasv)
					$("#edit_custom_sub_filter").append('<option value="' + d[i].distId + '" selected>' + htmlEncode(d[i].distName) + '</option>');
				else
					$("#edit_custom_sub_filter").append('<option value="' + d[i].distId + '">' + htmlEncode(d[i].distName) + '</option>');
				
				$("#edit_custom_sub_filter").append('<option value="ZZ">其他</option>');
			}
		}
		else if (val == '4') {
			var d = [
				{ type: '1', name: '國有' },
				{ type: '2', name: '公有' },
				{ type: '3', name: '私有' }
			];
			
			for (var i = 0; i < d.length; i++) {
				var hasv = false;
				if (data) {
					for (var j = 0; j < data.length; j++) {
						if (d[i].type == data[j]) {
							hasv = true;
							break;
						}
					}	
				}
				if (hasv)
					$("#edit_custom_sub_filter").append('<option value="' + d[i].type + '" selected>' + htmlEncode(d[i].name) + '</option>');
				else
					$("#edit_custom_sub_filter").append('<option value="' + d[i].type + '">' + htmlEncode(d[i].name) + '</option>');
			}
		}
		else if (val == '5') {
			var d = [
				{ type: '1', name: '國有林事業區' },
				{ type: '2', name: '保安林' },
				{ type: '3', name: '環境敏感區' },
				{ type: '4', name: '其他' }
			];
			
			for (var i = 0; i < d.length; i++) {
				var hasv = false;
				if (data) {
					for (var j = 0; j < data.length; j++) {
						if (d[i].type == data[j]) {
							hasv = true;
							break;
						}
					}	
				}
				if (hasv)
					$("#edit_custom_sub_filter").append('<option value="' + d[i].type + '" selected>' + htmlEncode(d[i].name) + '</option>');
				else
					$("#edit_custom_sub_filter").append('<option value="' + d[i].type + '">' + htmlEncode(d[i].name) + '</option>');
			}
		}
		
		$("#edit_custom_sub_filter").multiselect({
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
	}
}

function sys_custom_update_state(that, sid) {
	var val = that.checked;
	
	var post = {};
	post.Id = sid;
	post.Status = val;
	
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/UpdateCustomStatus",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				if (d != 'OK') alert('更新顯示狀態失敗.');
			}
		}
	});
}

function delete_sys_custom(sid) {
	var post = {};
	post.Id = sid;
	
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/DeleteTargetCustomSearch",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				if (d == 'OK') {
					alert('刪除成功.');
					sys_get_custom_table();
				}
			}
		}
	});
}

function sys_custom_insert() {
	$('#sys_custom_theme_search').hide();
	$('#sys_custom_theme_edit').show();
	$('#sys_custom_insert').show();
	$('#sys_custom_edit').hide();
	
	sys_custom_main_change($('#edit_custom_main'));
	sys_custom_sub_change($('#edit_custom_sub'));
}

function edit_sys_custom(sid) {
	$('#sys_custom_theme_search').hide();
	$('#sys_custom_theme_edit').show();
	$('#sys_custom_insert').hide();
	$('#sys_custom_edit').show();
	
	sys_custom.editid = sid;
	
	var post = {};
	post.Id = sid;
	
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/GetEditCustomSearch",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			if (data.data) {
				var d = data.data;
				
				$('#edit_custom_name').val(d.name);
				$('#edit_custom_note').val(d.note);
				
				// 主
				$('#edit_custom_main').val(d.mainType);
				if (d.mainParamType == '3')
				{
					sys_custom_main_change($('#edit_custom_main'));
					$('#edit_custom_main_input').val(d.mainInput);
				}
				else
				{
					var msp = d.mainFilter.split(',');
					sys_custom_main_change($('#edit_custom_main'), msp);
				}
				
				// 次
				$('#edit_custom_sub').val(d.subType);
				if (d.subParamType == '3')
				{
					sys_custom_sub_change($('#edit_custom_sub'));
					$('#edit_custom_sub_input').val(d.subInput);
				}
				else
				{
					var ssp = d.subFilter.split(',');
					sys_custom_sub_change($('#edit_custom_sub'), ssp);
				}
				
				$('#edit_custom_land_class').val(d.landClass);
				$('#edit_custom_unit').val(d.unit);
			}
		}
	});
}

function sys_custom_cancel() {
	$('#sys_custom_theme_search').show();
	$('#sys_custom_theme_edit').hide();
	
	$('#edit_custom_name').val('');
	$('#edit_custom_note').val('');
	
	$('#edit_custom_main').val('1');
	$('#edit_custom_main_filter').multiselect("clearSelection");
	$('#edit_custom_main_input').val('');
	
	$('#edit_custom_sub').val('2');
	$('#edit_custom_sub_filter').multiselect("clearSelection");
	$('#edit_custom_sub_input').val('');
	
	$('#edit_custom_land_class').val('1');
	$('#edit_custom_unit').val('1');
}

function sys_custom_insertDB() {
	var name = $('#edit_custom_name').val();
	var note = $('#edit_custom_note').val();
	var main = $('#edit_custom_main').val();
	var mainf = $('#edit_custom_main_filter').val();
	var maini = $('#edit_custom_main_input').val();
	var sub = $('#edit_custom_sub').val();
	var subf = $('#edit_custom_sub_filter').val();
	var subi = $('#edit_custom_sub_input').val();
	var lc = $('#edit_custom_land_class').val();
	var unit = $('#edit_custom_unit').val();
	
	var param = sys_custom.param;
	
	var mtype = '-1';
	for (var i = 0; i < param.length; i++) {
		if (param[i].groupY == 'True' && param[i].sid == main) {
			mtype = param[i].type;
		}
	}
	
	var stype = '-1';
	for (var i = 0; i < param.length; i++) {
		if (param[i].groupX == 'True' && param[i].sid == sub) {
			stype = param[i].type;
		}
	}
	
	if (name == '')
	{
		alert('主題名稱需要輸入.');
		return;
	}
	if ((mtype != '3' && mainf.length == 0) || (mtype== '3' && maini == ''))
	{
		alert('主分類依據篩選要處理.');
		return;
	}
	if ((stype != '3' && subf.length == 0) || (stype == '3' && subi == ''))
	{
		alert('次分類依據篩選要處理.');
		return;
	}
	
	var post = {};
	post.Name = name;
	post.Note = note;
	post.MainType = main;
	
	if (mtype == '3')
		post.MainInput = maini;
	else
	{
		var tstr = '';
		for (var i = 0; i < mainf.length; i++)
		{
			if (i != 0) tstr += ',';
			tstr += mainf[i];
		}
		post.MainFilter = tstr;
	}
	
	post.SubType = sub;
	if (stype == '3')
		post.SubInput = subi;
	else
	{
		var tstr = '';
		for (var i = 0; i < subf.length; i++)
		{
			if (i != 0) tstr += ',';
			tstr += subf[i];
		}
		post.SubFilter = tstr;
	}
	
	post.LandClass = lc;
	post.Unit = unit;
	
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/InsertIntoCustomSearch",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			if (data.data)
			{
				var d = data.data;
				if (d == 'OK') {
					alert('新增成功.');
					sys_custom_cancel();
					sys_get_custom_table();
				}
				else {
					alert('新增失敗.');
				}
			}
			else
			{
				alert('新增失敗.');
			}
		}
	});
}

function sys_custom_editDB() {
	var name = $('#edit_custom_name').val();
	var note = $('#edit_custom_note').val();
	var main = $('#edit_custom_main').val();
	var mainf = $('#edit_custom_main_filter').val();
	var maini = $('#edit_custom_main_input').val();
	var sub = $('#edit_custom_sub').val();
	var subf = $('#edit_custom_sub_filter').val();
	var subi = $('#edit_custom_sub_input').val();
	var lc = $('#edit_custom_land_class').val();
	var unit = $('#edit_custom_unit').val();
	
	var param = sys_custom.param;
	
	var mtype = '-1';
	for (var i = 0; i < param.length; i++) {
		if (param[i].groupY == 'True' && param[i].sid == main) {
			mtype = param[i].type;
		}
	}
	
	var stype = '-1';
	for (var i = 0; i < param.length; i++) {
		if (param[i].groupX == 'True' && param[i].sid == sub) {
			stype = param[i].type;
		}
	}
	
	if (name == '')
	{
		alert('主題名稱需要輸入.');
		return;
	}
	if ((mtype != '3' && mainf.length == 0) || (mtype== '3' && maini == ''))
	{
		alert('主分類依據篩選要處理.');
		return;
	}
	if ((stype != '3' && subf.length == 0) || (stype == '3' && subi == ''))
	{
		alert('次分類依據篩選要處理.');
		return;
	}
	
	var post = {};
	post.Id = sys_custom.editid;
	post.Name = name;
	post.Note = note;
	post.MainType = main;
	
	if (mtype == '3')
		post.MainInput = maini;
	else
	{
		var tstr = '';
		for (var i = 0; i < mainf.length; i++)
		{
			if (i != 0) tstr += ',';
			tstr += mainf[i];
		}
		post.MainFilter = tstr;
	}
	
	post.SubType = sub;
	if (stype == '3')
		post.SubInput = subi;
	else
	{
		var tstr = '';
		for (var i = 0; i < subf.length; i++)
		{
			if (i != 0) tstr += ',';
			tstr += subf[i];
		}
		post.SubFilter = tstr;
	}
	
	post.LandClass = lc;
	post.Unit = unit;
	
	$.ajax({
		url: ApiRequestURL + "CustomThemeManagement/EditToCustomSearch",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			if (data.data)
			{
				var d = data.data;
				if (d == 'OK') {
					alert('編輯成功.');
					sys_custom_cancel();
					sys_get_custom_table();
				}
				else {
					alert('編輯失敗.');
				}
			}
			else
			{
				alert('編輯失敗.');
			}
		}
	});
}

// 自訂常用查詢END
function download_sys_log(type) {
	var formdata = new FormData();
	
	var name = $("#sys_user_name").val();
	var unit = $("#sys_unit").val();
	var group = $("#sys_group").val();
	var action = $("#sys_action").val();
	var sfunction = $("#sys_function").val();
	
	if (name != "") {
		formdata.append('Name', name);
	}
	if (unit != "") {
		formdata.append('DepName', unit);
	}
	if (group != "-1") {
		formdata.append('Groupid', group);
	}
	if (action != "-1") {
		formdata.append('SearchAction', action);
	}
	if (sfunction != "-1") {
		formdata.append('Function', sfunction);
	}
	formdata.append('ExportType', type);
	
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "LogManagement/GetSystemLogExcel", true);
	// request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.responseType = 'blob';

	request.onload = function(e) {
		if (this.status === 200) {
			var blob = this.response;
			if (window.navigator.msSaveOrOpenBlob) {
				if (type == "excel")
					window.navigator.msSaveBlob(blob, "系統操作紀錄.xlsx");
				else if (type == "ods")
					window.navigator.msSaveBlob(blob, "系統操作紀錄.ods");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				if (type == "excel")
					downloadLink.download = "系統操作紀錄.xlsx";
				else if (type == "ods")
					downloadLink.download = "系統操作紀錄.ods";
				
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
           }
       }
   };
   
   request.send(formdata);
}
function download_download_log(type) {
	var data = new FormData();
	
	var name = $("#sys_user_name").val();
	var unit = $("#sys_unit").val();
	var sfunction = $("#sys_function").val();
	
	if (name != "") {
		data.append('Name', name);
	}
	if (unit != "") {
		data.append('DepName', unit);
	}
	if (sfunction != "-1") {
		data.append('Function', sfunction);
	}
	data.append('ExportType', type);
	
	var request = new XMLHttpRequest();
	request.open('POST', ApiRequestURL + "LogManagement/GetDownloadLogExcel", true);
	// request.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
	request.responseType = 'blob';

	request.onload = function(e) {
		if (this.status === 200) {
			var blob = this.response;
			if(window.navigator.msSaveOrOpenBlob) {
				if (type == 'excel')
					window.navigator.msSaveBlob(blob, "下載統計紀錄.xlsx");
				else
					window.navigator.msSaveBlob(blob, "下載統計紀錄.ods");
			}
			else {
				var downloadLink = window.document.createElement('a');
				var contentTypeHeader = request.getResponseHeader("Content-Type");
				downloadLink.href = window.URL.createObjectURL(new Blob([blob], { type: contentTypeHeader }));
				if (type == 'excel')
					downloadLink.download = "下載統計紀錄.xlsx";
				else
					downloadLink.download = "下載統計紀錄.ods";
				
				document.body.appendChild(downloadLink);
				downloadLink.click();
				document.body.removeChild(downloadLink);
           }
       }
   };
   
   request.send(data);
}

function sys_manage_tab6_init() {
	$("#add_file_date").prop("disabled", false);
	$('#add_file_date').datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'yy/mm/dd',
		beforeShow: function (e, t) {
			if ($(this).attr('maxDate')) {
				var dateItem = $('#' + $(this).attr('maxDate'));
				if (dateItem.val() !== "") {
					$(this).datepicker('option', 'maxDate', dateItem.val());
				}
			}
			if ($(this).attr('minDate')) {
				var dateItem = $('#' + $(this).attr('minDate'));
				if (dateItem.val() !== "") {
					$(this).datepicker('option', 'minDate', dateItem.val());
				}
			}
		}
	});
	sys_manage_tab6_get_list();
}

function sys_manage_tab6_get_list() {
	$.ajax({
		url: ApiRequestURL + "ProjectManagement/AnnouncementFileList",
		type: "Post",
		success: function(data) {
			if (data.data) {
				var d = data.data;
				$("#sys_manage_tab6_list").empty();
				for (var i = 0; i < d.length; i++) {
					
					var appendtr = "";
					appendtr += "<tr class=\"align-middle\">";
					appendtr += "<td>" + htmlEncode(d[i].className) + "</td>";
					appendtr += "<td>" + htmlEncode(d[i].name) + "</td>";
					appendtr += "<td>" + htmlEncode(d[i].note) + "</td>";
					appendtr += "<td>" + htmlEncode(d[i].date) + "</td>";
					appendtr += "<td><button type=\"button\" class=\"btn btn-success\" OnClick=\"sys_manage_tab6_file_add('" + d[i].sid + "');\">編輯</button><button type=\"button\" class=\"btn btn-danger\" style=\"margin-left: 10px\" OnClick=\"sys_manage_tab6_file_delete('" + d[i].sid + "');\">刪除</button></td>";
					appendtr += "</tr>";
					
					$("#sys_manage_tab6_list").append(appendtr);
				}
			}
		}
	});
}

function sys_manage_tab6_file_add(type) {
	if (!type) {
		$("#add_edit_file_modal").empty();
		$("#add_edit_file_modal").append("檔案新增管理");
		$("#add_file_type").val("-1");
		$("#add_file_name").val("");
		$("#add_file_note").val("");
		$("#add_file_date").val("");
		$("#add_file_files").val("");
		
		$("#add_file_zone").empty();
		$("#AddNewAnnFile").modal("show");
		$("#add_file_btn").show();
		$("#edit_file_btn").hide();
	} else {
		var post = {};
		post.Sid = type;
		
		$.ajax({
			url: ApiRequestURL + "SyetemManagement/GetTargetAnnFile",
			type: "Post",
			data: post,
			async: false,
			success: function(data) {
				var d = data.data;
				$("#add_edit_file_modal").empty();
				$("#add_edit_file_modal").append("檔案編輯管理");
				if (d != null) {
					$("#add_edit_sid").val(htmlEncode(d.sid));
					$("#add_file_type").val(htmlEncode(d.type));
					$("#add_file_name").val(htmlEncode(d.name));
					$("#add_file_note").val(htmlEncode(d.note));
					$("#add_file_date").val(htmlEncode(d.date));
					
					$("#add_file_zone").empty();
					$("#add_file_zone").append('<a href="' + DownLoadURL + '/' + d.path + '/' + htmlEncode(d.savename) + '" target="_blank">' + htmlEncode(d.savename) + '</a>');
					
					$("#AddNewAnnFile").modal("show");
					$("#add_file_btn").hide();
					$("#edit_file_btn").show();
				}
			}
		});
	}
}

function sys_manage_tab6_file_delete(type) {
	var cfm = confirm('確定是否要刪除該檔案?');
	if (!cfm) return;
	
	var post = {};
	post.Sid = type;
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/AnnFileDelete",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			if (d == "OK") {
				alert("刪除成功.");
				sys_manage_tab6_get_list();
			}
			else {
				alert("刪除失敗.");
			}
		}
	});
}

function sys_manage_tab6_file_close() {
	$("#AddNewAnnFile").modal("hide");
}

function sys_manage_tab6_click_add() {
	// 檢查欄位
	var type = $("#add_file_type").val();
	var name = $("#add_file_name").val();
	var note = $("#add_file_note").val();
	var date = $("#add_file_date").val();
	var filelist = $('#add_file_files').prop('files');
	
	if (type == "-1") {
		alert("請選擇類型!");
		return;
	}
	if (name == "") {
		alert("請輸入名稱.");
		return;
	}
	if (date == "") {
		alert("請選擇日期.");
		return;
	}
	if (!filelist || filelist.length == 0) {
		alert("請確認上傳圖資檔案");
		return;
	}
	
	var formdata = new FormData();

	formdata.append("type", type);
	formdata.append("name", name);
	formdata.append("note", note);
	formdata.append("date", date);
	
	$.each(filelist, function(j, file){
		formdata.append('files', file);
	});
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/AnnFileInsert",
		type: "Post",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data) {
			if (data.data) {
				var d = data.data;
				
				if (d == "OK") {
					alert("新增成功.");
					sys_manage_tab6_file_close();
					sys_manage_tab6_get_list();
				}
				else {
					alert("新增失敗.");
				}
			}
		}
	});
}

function sys_manage_tab6_click_edit() {
	// 檢查欄位
	var sid = $("#add_edit_sid").val();
	var type = $("#add_file_type").val();
	var name = $("#add_file_name").val();
	var note = $("#add_file_note").val();
	var date = $("#add_file_date").val();
	var filelist = $('#add_file_files').prop('files');
	
	if (!sid) {
		alert("沒有取到SID.")
		return;
	}
	if (type == "-1") {
		alert("請選擇類型!");
		return;
	}
	if (name == "") {
		alert("請輸入名稱.");
		return;
	}
	if (date == "") {
		alert("請選擇日期.");
		return;
	}
	
	var formdata = new FormData();

	formdata.append("sid", sid);
	formdata.append("type", type);
	formdata.append("name", name);
	formdata.append("note", note);
	formdata.append("date", date);
	
	$.each(filelist, function(j, file){
		formdata.append('files', file);
	});
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/AnnFileEdit",
		type: "Post",
		data: formdata,
		processData: false,
		contentType: false,
		success: function (data) {
			if (data.data) {
				var d = data.data;
				
				if (d == "OK") {
					alert("編輯成功.");
					sys_manage_tab6_file_close();
					sys_manage_tab6_get_list();
				}
				else {
					alert("編輯失敗.");
				}
			}
		}
	});
}

function sys_manage_tab7_init() {
	$("#add_ann_date").prop("disabled", false);
	$('#add_ann_date').datepicker({
		changeMonth: true,
		changeYear: true,
		dateFormat: 'yy/mm/dd',
		beforeShow: function (e, t) {
			if ($(this).attr('maxDate')) {
				var dateItem = $('#' + $(this).attr('maxDate'));
				if (dateItem.val() !== "") {
					$(this).datepicker('option', 'maxDate', dateItem.val());
				}
			}
			if ($(this).attr('minDate')) {
				var dateItem = $('#' + $(this).attr('minDate'));
				if (dateItem.val() !== "") {
					$(this).datepicker('option', 'minDate', dateItem.val());
				}
			}
		}
	});
	sys_manage_tab7_get_list();
}

function sys_manage_tab7_get_list() {
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/GetAnnounList",
		type: "Post",
		async: false,
		success: function(data) {
			var d = data.data;
			if (d != null) {
				$("#sys_manage_tab7_list").empty();
				for (var i = 0; i < d.length; i++) {
					var appendtr = "";
					appendtr += "<tr class=\"align-middle\">";
					appendtr += "<td>" + htmlEncode(d[i].date) + "</td>";
					appendtr += "<td>" + htmlEncode(d[i].note) + "</td>";
					
					if (d[i].status == "True")
						appendtr += '<td>' + '<div class="custom-switch form-switch"><input class="form-check-input" type="checkbox" onchange="sys_manage_tab7_click_status(this, \'' + d[i].sid + '\');" checked /></div>' + '</td>';
					else
						appendtr += '<td>' + '<div class="custom-switch form-switch"><input class="form-check-input" type="checkbox" onchange="sys_manage_tab7_click_status(this, \'' + d[i].sid + '\');" /></div>' + '</td>';
					
					appendtr += "<td><button type=\"button\" class=\"btn btn-success\" OnClick=\"sys_manage_tab7_ann_add('" + d[i].sid + "');\">編輯</button><button type=\"button\" class=\"btn btn-danger\" style=\"margin-left: 10px\" OnClick=\"sys_manage_tab7_click_delete('" + d[i].sid + "');\">刪除</button></td>";
					appendtr += "</tr>";
					
					$("#sys_manage_tab7_list").append(appendtr);
				}
			}
		}
	});
}

function sys_manage_tab7_ann_add(type) {
	if (!type) {
		$("#add_ann_date").val("");
		$("#add_ann_note").val("");
		
		$("#AddNewAnn").modal("show");
		$("#add_file_btn").show();
		$("#edit_file_btn").hide();
	} else {
		var post = {};
		post.Sid = type;
		
		$.ajax({
			url: ApiRequestURL + "SyetemManagement/GetTargetAnnoun",
			type: "Post",
			data: post,
			async: false,
			success: function(data) {
				var d = data.data;
				if (d != null) {
					$("#add_edit_sid").val(d.sid);
					$("#add_ann_date").val(d.date);
					$("#add_ann_note").val(d.note);
					
					$("#AddNewAnn").modal("show");
					$("#add_file_btn").hide();
					$("#edit_file_btn").show();
				}
			}
		});
	}
}

function sys_manage_tab7_ann_close() {
	$("#AddNewAnn").modal("hide");
}

function sys_manage_tab7_click_add() {
	// 檢查欄位
	var note = $("#add_ann_note").val();
	var date = $("#add_ann_date").val();
	
	if (note == "") {
		alert("請輸入名稱.");
		return;
	}
	if (date == "") {
		alert("請選擇日期.");
		return;
	}

	var post = {};
	post.date = date;
	post.note = note;
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/AnnounInsert",
		type: "Post",
		data: post,
		success: function (data) {
			if (data.data) {
				var d = data.data;
				
				if (d == "OK") {
					alert("新增成功.");
					sys_manage_tab7_ann_close();
					sys_manage_tab7_get_list();
				}
				else {
					alert("新增失敗.");
				}
			}
		}
	});
}

function sys_manage_tab7_click_edit() {
	// 檢查欄位
	var sid = $("#add_edit_sid").val();
	var note = $("#add_ann_note").val();
	var date = $("#add_ann_date").val();
	
	if (!sid) {
		alert("沒有取到SID.")
		return;
	}
	if (note == "") {
		alert("請輸入名稱.");
		return;
	}
	if (date == "") {
		alert("請選擇日期.");
		return;
	}

	var post = {};
	post.sid = sid;
	post.date = date;
	post.note = note;
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/AnnounEdit",
		type: "Post",
		data: post,
		success: function (data) {
			if (data.data) {
				var d = data.data;
				
				if (d == "OK") {
					alert("編輯成功.");
					sys_manage_tab7_ann_close();
					sys_manage_tab7_get_list();
				}
				else {
					alert("編輯失敗.");
				}
			}
		}
	});
}

function sys_manage_tab7_click_status(that, sid) {
	
	var state = that.checked == true ? "1" : "0";
	var post = {};
	post.sid = sid;
	post.status = state;
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/AnnounEdit",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			if (d == "OK")
				alert("更新成功.")
			else
				alert("更新失敗.")
		}
	});
}

function sys_manage_tab7_click_delete(type) {
	var cfm = confirm('確定是否要刪除該檔案?');
	if (!cfm) return;
	
	var post = {};
	post.Sid = type;
	
	$.ajax({
		url: ApiRequestURL + "SyetemManagement/AnnounDelete",
		type: "Post",
		data: post,
		async: false,
		success: function(data) {
			var d = data.data;
			if (d == "OK") {
				alert("刪除成功.");
				sys_manage_tab7_get_list();
			}
			else {
				alert("刪除失敗.");
			}
		}
	});
}