var pageSession = new ReactiveDict();

Template.AgenciesUpdate.onCreated(function() {
	
});

Template.AgenciesUpdate.onDestroyed(function() {
	
});

Template.AgenciesUpdate.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AgenciesUpdate.events({
	
});

Template.AgenciesUpdate.helpers({
	
});

Template.AgenciesUpdateForm.onCreated(function() {
	
});

Template.AgenciesUpdateForm.onDestroyed(function() {
	
});

Template.AgenciesUpdateForm.onRendered(function() {
	

	pageSession.set("agenciesUpdateFormInfoMessage", "");
	pageSession.set("agenciesUpdateFormErrorMessage", "");

	$(".input-group.date").each(function() {
		var format = $(this).find("input[type='text']").attr("data-format");

		if(format) {
			format = format.toLowerCase();
		}
		else {
			format = "mm/dd/yyyy";
		}

		$(this).datepicker({
			autoclose: true,
			todayHighlight: true,
			todayBtn: true,
			forceParse: false,
			keyboardNavigation: false,
			format: format
		});
	});

	$("input[type='file']").fileinput();
	$("select[data-role='tagsinput']").tagsinput();
	$(".bootstrap-tagsinput").addClass("form-control");
	$("input[autofocus]").focus();
});

Template.AgenciesUpdateForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("agenciesUpdateFormInfoMessage", "");
		pageSession.set("agenciesUpdateFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var agenciesUpdateFormMode = "update";
			if(!t.find("#form-cancel-button")) {
				switch(agenciesUpdateFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("agenciesUpdateFormInfoMessage", message);
					}; break;
				}
			}

			Router.go("agencies", mergeObjects(Router.currentRouteParams(), {}));
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("agenciesUpdateFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				Meteor.call("agencyUpdate", t.data.agency._id, values, function(e, r) { if(e) errorAction(e); else submitAction(r); });
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		Router.go("agencies", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		/*CLOSE_REDIRECT*/
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		/*BACK_REDIRECT*/
	}

	
});

Template.AgenciesUpdateForm.helpers({
	"infoMessage": function() {
		return pageSession.get("agenciesUpdateFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("agenciesUpdateFormErrorMessage");
	}
	
});
