var pageSession = new ReactiveDict();

Template.AgenciesDetails.onCreated(function() {
	
});

Template.AgenciesDetails.onDestroyed(function() {
	
});

Template.AgenciesDetails.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.AgenciesDetails.events({
	
});

Template.AgenciesDetails.helpers({
	
});

Template.AgenciesDetailsForm.onCreated(function() {
	
});

Template.AgenciesDetailsForm.onDestroyed(function() {
	
});

Template.AgenciesDetailsForm.onRendered(function() {
	

	pageSession.set("agenciesDetailsFormInfoMessage", "");
	pageSession.set("agenciesDetailsFormErrorMessage", "");

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

Template.AgenciesDetailsForm.events({
	"submit": function(e, t) {
		e.preventDefault();
		pageSession.set("agenciesDetailsFormInfoMessage", "");
		pageSession.set("agenciesDetailsFormErrorMessage", "");

		var self = this;

		function submitAction(result, msg) {
			var agenciesDetailsFormMode = "read_only";
			if(!t.find("#form-cancel-button")) {
				switch(agenciesDetailsFormMode) {
					case "insert": {
						$(e.target)[0].reset();
					}; break;

					case "update": {
						var message = msg || "Saved.";
						pageSession.set("agenciesDetailsFormInfoMessage", message);
					}; break;
				}
			}

			/*SUBMIT_REDIRECT*/
		}

		function errorAction(msg) {
			msg = msg || "";
			var message = msg.message || msg || "Error.";
			pageSession.set("agenciesDetailsFormErrorMessage", message);
		}

		validateForm(
			$(e.target),
			function(fieldName, fieldValue) {

			},
			function(msg) {

			},
			function(values) {
				

				
			}
		);

		return false;
	},
	"click #form-cancel-button": function(e, t) {
		e.preventDefault();

		

		/*CANCEL_REDIRECT*/
	},
	"click #form-close-button": function(e, t) {
		e.preventDefault();

		Router.go("agencies", mergeObjects(Router.currentRouteParams(), {}));
	},
	"click #form-back-button": function(e, t) {
		e.preventDefault();

		Router.go("agencies", mergeObjects(Router.currentRouteParams(), {}));
	}

	
});

Template.AgenciesDetailsForm.helpers({
	"infoMessage": function() {
		return pageSession.get("agenciesDetailsFormInfoMessage");
	},
	"errorMessage": function() {
		return pageSession.get("agenciesDetailsFormErrorMessage");
	}
	
});
