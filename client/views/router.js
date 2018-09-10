
Router.route('/home_private/:_id/', {
	action: function () {
		this.render('HomePrivate', {
			data: function () {
				return Customers.findOne({_id: this.params._id});
			}
		});
	}
});


Router.configure({
	templateNameConverter: "upperCamelCase",
	routeControllerNameConverter: "upperCamelCase",
	layoutTemplate: "layout",
	notFoundTemplate: "notFound",
	loadingTemplate: "loading"
});

Router.publicRoutes = [
	"login",
	"register",
	"our-work",
	"why",
  "about",
	"verify_email",
	"forgot_password",
	"reset_password"
];

Router.privateRoutes = [
	"home_private",
	"admin",
	"admin.users",
	"admin.users.details",
	"admin.users.insert",
	"admin.users.edit",
	"user_settings",
	"user_settings.profile",
	"user_settings.change_pass",
	"logout",
	"agencies",
	"agencies.details",
	"agencies.insert",
	"agencies.update",
	"editor"
];

Router.freeRoutes = [
	"home_public",
	"donate"
];

Router.roleMap = [
	{ route: "admin",	roles: ["admin"] },
	{ route: "admin.users",	roles: ["admin"] },
	{ route: "admin.users.details",	roles: ["admin"] },
	{ route: "admin.users.insert",	roles: ["admin"] },
	{ route: "admin.users.edit",	roles: ["admin"] },
	{ route: "user_settings",	roles: ["user","admin"] },
	{ route: "user_settings.profile",	roles: ["user","admin"] },
	{ route: "user_settings.change_pass",	roles: ["user","admin"] },
	{ route: "agencies",	roles: ["user","admin"] },
	{ route: "agencies.details",	roles: ["user","admin"] },
	{ route: "agencies.insert",	roles: ["user","admin"] },
	{ route: "agencies.update",	roles: ["user","admin"] },
	{ route: "editor",	roles: ["user","admin"] }
];

Router.defaultFreeRoute = "home_public";
Router.defaultPublicRoute = "home_public";
Router.defaultPrivateRoute = "agencies";

Router.waitOn(function() {
	Meteor.subscribe("current_user_data");
});

Router.onBeforeAction(function() {
	// loading indicator here
	if(!this.ready()) {
		this.render('loading');
		$("body").addClass("wait");
	} else {
		$("body").removeClass("wait");
		this.next();
	}
});

Router.onBeforeAction(Router.ensureNotLogged, {only: Router.publicRoutes});
Router.onBeforeAction(Router.ensureLogged, {only: Router.privateRoutes});
Router.onBeforeAction(Router.ensureGranted, {only: Router.freeRoutes}); // yes, route from free zone can be restricted to specific set of user roles

Router.map(function () {

	this.route("/", {name: "home_public", title: "", controller: "HomePublicController"});
	this.route("/login", {name: "login", title: "", controller: "LoginController"});
	this.route("/register", {name: "register", title: "", controller: "RegisterController"});
	this.route("/donate", {name: "donate", title: "", controller: "DonateController"});
	this.route("/about", {name: "about", title: ""});
	this.route("/our-work", {name: "ourWork", title: ""});
	this.route("/why", {name: "why", title: ""});
	this.route("/editor", {name: "editor", title: ""});
	this.route("/verify_email/:verifyEmailToken", {name: "verify_email", title: "", controller: "VerifyEmailController"});
	this.route("/forgot_password", {name: "forgot_password", title: "", controller: "ForgotPasswordController"});
	this.route("/reset_password/:resetPasswordToken", {name: "reset_password", title: "", controller: "ResetPasswordController"});
	this.route("/home_private", {name: "home_private", title: "Welcome {{userFullName}}!", controller: "HomePrivateController"});
	this.route("/admin", {name: "admin", title: "", controller: "AdminController"});
	this.route("/admin/users", {name: "admin.users", title: "", controller: "AdminUsersController"});
	this.route("/admin/users/details/:userId", {name: "admin.users.details", title: "", controller: "AdminUsersDetailsController"});
	this.route("/admin/users/insert", {name: "admin.users.insert", title: "", controller: "AdminUsersInsertController"});
	this.route("/admin/users/edit/:userId", {name: "admin.users.edit", title: "", controller: "AdminUsersEditController"});
	this.route("/user_settings", {name: "user_settings", title: "", controller: "UserSettingsController"});
	this.route("/user_settings/profile", {name: "user_settings.profile", title: "", controller: "UserSettingsProfileController"});
	this.route("/user_settings/change_pass", {name: "user_settings.change_pass", title: "", controller: "UserSettingsChangePassController"});
	this.route("/logout", {name: "logout", title: "", controller: "LogoutController"});
	this.route("/agencies", {name: "agencies", title: "", controller: "AgenciesController"});
	this.route("/agencies/details/:agencyId", {name: "agencies.details", title: "", controller: "AgenciesDetailsController"});
	this.route("/agencies/insert", {name: "agencies.insert", title: "", controller: "AgenciesInsertController"});
	this.route("/agencies/update/:agencyId", {name: "agencies.update", title: "", controller: "AgenciesUpdateController"});
});
