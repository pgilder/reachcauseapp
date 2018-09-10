var pageSession = new ReactiveDict();

Template.Donate.onCreated(function() {
	pageSession.set("errorMessage", "");

});

Template.Donate.onRendered(function() {
	pageSession.set("errorMessage", "");
	pageSession.set("verificationEmailSent", false);



	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Donate.events({
	'submit #donate_form' : function(e, t) {
		e.preventDefault();

		var submit_button = $(t.find(":submit"));

		var donate_name = t.find('#donate_name').value.trim();
		var donate_email = t.find('#donate_email').value.trim();
		var donate_password = t.find('#donate_password').value;

		// check name
		if(donate_name == "")
		{
			pageSession.set("errorMessage", "Please enter your name.");
			t.find('#donate_name').focus();
			return false;
		}

		// check email
		if(!isValidEmail(donate_email))
		{
			pageSession.set("errorMessage", "Please enter valid e-mail address.");
			t.find('#donate_email').focus();
			return false;
		}

		// check password
		var min_password_len = 6;
		if(!isValidPassword(donate_password, min_password_len))
		{
			pageSession.set("errorMessage", "Your password must be at least " + min_password_len + " characters long.");
			t.find('#donate_password').focus();
			return false;
		}

		submit_button.button("loading");
		Accounts.createUser({email: donate_email, password : donate_password, profile: { name: donate_name }}, function(err) {
			submit_button.button("reset");
			if(err) {
				if(err.error === 499) {
					pageSession.set("verificationEmailSent", true);
				} else {
					pageSession.set("errorMessage", err.message);
				}
			}
			else
			{
				pageSession.set("errorMessage", "");
				pageSession.set("verificationEmailSent", true);
			}
		});
		return false;
	},

	"click .go-home": function(e, t) {
		Router.go("/");
	}

});

Template.Donate.helpers({
	errorMessage: function() {
		return pageSession.get("errorMessage");
	},
	verificationEmailSent: function() {
		return pageSession.get("verificationEmailSent");
	}

});
