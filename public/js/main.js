let input = new Object();
let button = new Object();
let view = new Object();
let el = new Object();

let formData = new Object();

window.onload = () => {
	el['interior_design_status'] = document.getElementById("interior-design-status");
	el['renovation_status'] = document.getElementById("renovation-status");
	
	
	button['space_type_0'] = document.getElementById("space-type-0");
	button['space_type_1'] = document.getElementById("space-type-1");
	
	button['sub_stage_5'] = document.getElementById("sub-stage-5");
	button['sub_stage_6'] = document.getElementById("sub-stage-6");
	button['sub_stage_6_back'] = document.getElementById("sub-stage-6-back");
	button['sub_stage_7'] = document.getElementById("sub-stage-7");
	
	button['back_stage_2'] = document.getElementById("back-stage-2");
	button['next_stage_2'] = document.getElementById("next-stage-2");
	button['back_stage_3'] = document.getElementById("back-stage-3");
	button['next_stage_3'] = document.getElementById("next-stage-3");
	button['back_stage_8'] = document.getElementById("back-stage-8");
	button['next_stage_8'] = document.getElementById("next-stage-8");
	button['back_stage_9'] = document.getElementById("back-stage-9");
	button['next_stage_9'] = document.getElementById("next-stage-9");
	button['back_stage_10'] = document.getElementById("back-stage-10");
	button['next_stage_10'] = document.getElementById("next-stage-10");
	button['next_stage_4'] = document.getElementById("next-stage-4");
	
	button['view_stage_4'] = document.getElementById("view-stage-4");
	button['view_stage_5'] = document.getElementById("view-stage-5");
	
	button['degree-renovation-0'] = document.getElementById("s5-degree-0");
	button['degree-renovation-1'] = document.getElementById("s5-degree-1");
	button['degree-renovation-2'] = document.getElementById("s5-degree-2");
	button['degree-renovation-3'] = document.getElementById("s5-degree-3");
	
	view['stage_1'] = document.getElementById("stage-1");
	view['stage_2'] = document.getElementById("stage-2");
	view['stage_3'] = document.getElementById("stage-3");
	view['stage_4'] = document.getElementById("stage-4");
	view['stage_5'] = document.getElementById("stage-5");
	view['stage_6'] = document.getElementById("stage-6");
	view['stage_7'] = document.getElementById("stage-7");
	view['stage_8'] = document.getElementById("stage-8");
	view['stage_9'] = document.getElementById("stage-9");
	view['stage_10'] = document.getElementById("stage-10");
	view['stage_11'] = document.getElementById("stage-11");

	button['space_type_0'].onclick = () => {
		formData['space_type'] = 0;
		stage(2);
	}
	
	button['space_type_1'].onchange = function(){
		if (this.value == 1) {
			error("Please choose Subcategory");
			return;
		}
		formData['space_type'] = this.value;
		stage(2);
	}
	button['space_type_1'].onclick2 = function(){
		if (this.value == 1) {
			return;
		}
		if (formData['space_type'] = this.value)
			stage(2);
	}
	
	button['back_stage_2'].onclick = () => {
		
		stage(1);
	}
	button['sub_stage_6_back'].onclick = () => {
		$("#stage-6").hide();
		stage(5);
	}
	button['next_stage_2'].onclick = () => {
		
		getFormData();
		
		if (formData['address'] == "" || formData['zip'] == "" || formData['phone'] == "") {
			error("Required Fields are empty");
			return;
		}
		
		stage(3);
	}
	
	button['back_stage_3'].onclick = () => {
		stage(2);
	}
	button['next_stage_3'].onclick = () => {
		
		getFormData();
		
		let c1 = formData['interior_finishes'] == 0 && formData['art_selection'] ==0 && formData['style_guidance'] ==0 && formData['furniture_selection'] ==0;
		let c2 = formData['living_rooms'] ==0 && formData['bed_rooms'] ==0 && formData['dining_rooms'] ==0 && formData['kitchens'] ==0 && formData['bathrooms'] ==0 && formData['entryways']  ==0 && formData['kids'] ==0  && formData['outdoor'] ==0 ;
		
		console.log(c1, c2) ;
		
		if (c1 && c2) {
			error("Choose something for work.");
			return;
		}
		
		stage(8);
	}
	
	button['view_stage_4'].onclick = () => {
		stage(4);
	}
	button['view_stage_5'].onclick = () => {
		stage(5);
	}
	
	button['next_stage_4'].onclick = () => {
		stage(3);
	}
	/*
	button['sub_stage_5'].onclick = () => {
		stage(6);
	}
	*/
	button['sub_stage_6'].onclick = () => {
		stage(7);
	}
	
	button['sub_stage_7'].onclick = () => {
		stage(3);
	}
	
	button['back_stage_8'].onclick = () => {
		stage(3);
	}
	button['next_stage_8'].onclick = () => {
		stage(9);
	}
	
	button['back_stage_9'].onclick = () => {
		stage(8);
	}
	button['next_stage_9'].onclick = () => {
		stage(10);
	}
	
	/*button['back_stage_10'].onclick = () => {
		stage(8);
	}*/
	button['next_stage_10'].onclick = () => {
		stage(10);
	}
	
	button['degree-renovation-0'].onclick = () => {
		formData['degree_renovation'] = 0;
		stage(6);
	}
	button['degree-renovation-1'].onclick = () => {
		formData['degree_renovation'] = 1;
		stage(6);
	}
	button['degree-renovation-2'].onclick = () => {
		formData['degree_renovation'] = 2;
		stage(6);
	}
	button['degree-renovation-3'].onclick = () => {
		formData['degree_renovation'] = 3;
		stage(6);
	}
	
	button['next_stage_10'].onclick = () => {
		getFormData();
		button['next_stage_10'].innerHTML = "<div class='loading'></div>";
		button['next_stage_10'].disabled = true;
		$.ajax({
			url : "form",
			type : "post",
			data : formData,
			success : function (data) {
				stage(11)
			},
			error : function () {
				button['next_stage_10'].innerHTML = "Continue";
		button['next_stage_10'].disabled = false;
				error("No response from server");
			}
		})
	}
	
	$(".fsc-cancel").click(() => {
		$("#fixed-ele-container").fadeOut(300);
		$(".fixed-container").fadeOut(300);
	})
	
	function error(msg) {
		$("#stage-error").fadeIn(300);
		$("#error-msg").text(msg);
	}
	
	$("input[type=checkbox]").click(function(){
		if(this.checked) {
			$(this).parent().parent().css("border", "1px solid rgb(30, 30, 30)");
		}
		else {
			$(this).parent().parent().css("border", "1px solid rgb(190, 190, 190)");
		}
	});
	
	$("#s6-structural-changes").click(function(){
		if (this.checked) {
			$("#already-contacted").slideDown(300);
		}
		else {
			$("#already-contacted").slideUp(300);
		}
	});
	$("#s6-want-connection").click(function(){
		if (this.checked) {
			$("#s6-want-connection-no").attr("checked", false);
			$("#s6-want-connection-no").parent().parent().css("border", "1px solid rgb(190, 190, 190)");
		}
		else {
			$("#s6-want-connection-no").attr("checked", true);
			$("#s6-want-connection-no").parent().parent().css("border", "1px solid rgb(30, 30, 30)");
		}
	});
	$("#s6-want-connection-no").click(function(){
		if (this.checked) {
			$("#s6-want-connection").attr("checked", false);
			$("#s6-want-connection").parent().parent().css("border", "1px solid rgb(190, 190, 190)");
		}
		else {
			$("#s6-want-connection").attr("checked", true);
			$("#s6-want-connection").parent().parent().css("border", "1px solid rgb(30, 30, 30)");
		}
	});
	$("#s6-structural-changes-no").click(function(){
		if (this.checked) {
			$("#already-contacted").slideUp(300);
		}
		else {
			$("#already-contacted").slideDown(300);
		}
	});
	$("#s6-structural-changes").click(function(){
		if (this.checked) {
			$("#s6-structural-changes-no").attr("checked", false);
			$("#s6-structural-changes-no").parent().parent().css("border", "1px solid rgb(190, 190, 190)");
		}
		else {
			$("#s6-structural-changes-no").attr("checked", true);
			$("#s6-structural-changes-no").parent().parent().css("border", "1px solid rgb(30, 30, 30)");
		}
	});
	$("#s6-structural-changes-no").click(function(){
		if (this.checked) {
			$("#s6-structural-changes").attr("checked", false);
			$("#s6-structural-changes").parent().parent().css("border", "1px solid rgb(190, 190, 190)");
		}
		else {
			$("#s6-structural-changes").attr("checked", true);
			$("#s6-structural-changes").parent().parent().css("border", "1px solid rgb(30, 30, 30)");
		}
	});
	$("#s6-contacted-before").click(function(){
		if (this.checked) {
			$("#s6-contacted-before-no").attr("checked", false);
			$("#s6-contacted-before-no").parent().parent().css("border", "1px solid rgb(190, 190, 190)");
		}
		else {
			$("#s6-contacted-before-no").attr("checked", true);
			$("#s6-contacted-before-no").parent().parent().css("border", "1px solid rgb(30, 30, 30)");
		}
	});
	$("#s6-contacted-before-no").click(function(){
		if (this.checked) {
			$("#s6-contacted-before").attr("checked", false);
			$("#s6-contacted-before").parent().parent().css("border", "1px solid rgb(190, 190, 190)");
		}
		else {
			$("#s6-contacted-before").attr("checked", true);
			$("#s6-contacted-before").parent().parent().css("border", "1px solid rgb(30, 30, 30)");
		}
	});
	$("#s6-structural-changes-no").click(function(){
		if (this.checked) {
			$("#already-contacted").slideUp(300);
		}
		else {
			$("#already-contacted").slideDown(300);
		}
	});
	
	$("#id-do-nothing").click(() => {
		$(".id-cb").attr("checked",false);
		$(".id-cb").parent().parent().css("border" , "1px solid rgb(190,190,190)");
		stage(3);
	});
	
	$("#ren-do-nothing").click(function() {
		stage(3);
	})
	$("#s9-estimated-amount").on("input", function() {
		$("#amount-view").html(String($(this).val()) + " k");
		$("#amount-view").addClass("amount-view");
	})
	
	$("#stage-7 .input-container").click(function(){
		$(this).find(".s7-input-value").show(300);
	});
	
	$(".inc").click(function(){
		var value = parseInt($(this).prev().val(), 10);
		value = isNaN(value) ? 0 : value;
		value++;
		$(this).prev().val(value)
	})
	$(".dec").click(function(){
		var value = parseInt($(this).prev().val(), 10);
		value = isNaN(value) ? 0 : value;
		value < 1 ? value = 1 : '';
		value--;
		$(this).next().val(value)
	})
	$(".val-cancel").click(function(e){
		$(this).parent().hide(300);
		e.stopPropagation();
	})
	$(".val-done").click(function(e){
		$(this).parent().hide(300);
		$(this).parent().prev().val($(this).prev().prev().find("#number").val());
		e.stopPropagation();
	})
	resetContainers();
	stage(1);
}

function stage(stageNo) {
	console.log(stageNo);
	getFormData();
	if (stageNo < 4) {
		load(stageNo * 100/8);
	}
	else if (stageNo > 7) {
		load((stageNo - 3) * 100/8);
	}
	if (stageNo == 3) {
		let c1 = formData['interior_finishes'] == 0 && formData['art_selection'] ==0 && formData['style_guidance'] ==0 && formData['furniture_selection'] ==0;
		if (c1) {
			el['interior_design_status'].innerHTML = "+";
			el['interior_design_status'].style.color = "rgb(90, 80, 80)";
		}
		else {
			el['interior_design_status'].innerHTML = "✓";
			el['interior_design_status'].style.color = "rgb(50,200,50)";
		}
		
		let c2 = formData['living_rooms'] == 0 && formData['bed_rooms'] ==0 && formData['dining_rooms'] ==0 && formData['kitchens'] ==0 && formData['bathrooms'] ==0 && formData['entryways']  ==0 && formData['kids'] ==0  && formData['outdoor'] ==0 ;
		if (c2) {
			el['renovation_status'].innerHTML = "+";
			el['renovation_status'].style.color = "rgb(90, 80, 80)";
		}
		else {
			el['renovation_status'].innerHTML = "✓";
			el['renovation_status'].style.color = "rgb(50,200,50)";
		}
	}
	const otherStages = [4, 5, 6, 7];
	
	if (otherStages.indexOf(stageNo) != -1)
		show(document.getElementById("fixed-ele-container"));
	else
		resetContainers();
	
	if (view['stage_' + stageNo])
		show(view['stage_' + stageNo]);
}

function hide(el){
	el.style.display = "none";
}
function show(el){
	//el.style.display = "block";
	$(el).slideDown(300);
}

function resetContainers(){
	let containers = document.getElementsByClassName("form-sub-container");
	for (i = 0; i < containers.length; i++) {
		//containers[i].style.display = "none";
		$(containers[i]).slideUp(300);
	}
	document.getElementById("fixed-ele-container").style.display = "none";
}

function getFormData(){
	//stage 2 inputs
	
	formData['address'] = document.getElementById("s2-address").value;
	formData['zip'] = document.getElementById("s2-zip").value;
	formData['phone'] = document.getElementById("s2-phone").value;
	formData['area'] = document.getElementById("s2-area").value;
	formData['news'] = document.getElementById("s2-news").value;
	
	//stage 4 inputs
	
	formData['interior_finishes'] = Number(document.getElementById("s4-interior-finishes").checked);
	formData['art_selection'] = Number(document.getElementById("s4-art-selection").checked);
	formData['style_guidance'] = Number(document.getElementById("s4-style-guidance").checked);
	formData['furniture_selection'] = Number(document.getElementById("s4-furniture-selection").checked);
	
	//stage 6 inputs
	
	formData['want_connection'] = Number(document.getElementById("s6-want-connection").checked);
	formData['structural_changes'] = Number(document.getElementById("s6-structural-changes").checked);
	formData['contacted_before'] = Number(document.getElementById("s6-contacted-before").checked);
	
	//stage 7 inputs
	
	formData['entire_location'] = document.getElementById("s7-entire-location").value;
	formData['living_rooms'] = document.getElementById("s7-living-rooms").value;
	formData['bed_rooms'] = document.getElementById("s7-bed-rooms").value;
	formData['dining_rooms'] = document.getElementById("s7-dining-rooms").value;
	formData['kitchens'] = document.getElementById("s7-kitchens").value;
	formData['bathrooms'] = document.getElementById("s7-bathrooms").value;
	formData['entryways'] = document.getElementById("s7-entryways").value;
	formData['offices'] = document.getElementById("s7-offices").value;
	formData['kids'] = document.getElementById("s7-kids").value;
	formData['outdoor'] = document.getElementById("s7-outdoor").value;
	formData['phone'] = document.getElementById("s2-phone").value;
	
	//stage 8 input
	
	formData['project_info'] = document.getElementById("s8-project-info").value;
	
	//stage 9 input
	
	formData['estimated_amount'] = document.getElementById("s9-estimated-amount").value;
}

function load(percent_) {
	$("#bar-thumb").animate({"width" : percent_ + "%"}, 300);
}

//number
function increaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value++;
  document.getElementById('number').value = value;
}

function decreaseValue() {
  var value = parseInt(document.getElementById('number').value, 10);
  value = isNaN(value) ? 0 : value;
  value < 1 ? value = 1 : '';
  value--;
  document.getElementById('number').value = value;
}


//number