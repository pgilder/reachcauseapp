this.AgenciesUpdateController = RouteController.extend({
	template: "AgenciesUpdate",
	

	yieldTemplates: {
		/*YIELD_TEMPLATES*/
	},

	onBeforeAction: function() {
		this.next();
	},

	action: function() {
		if(this.isReady()) { this.render(); } else { this.render("loading"); }
		/*ACTION_FUNCTION*/
	},

	isReady: function() {
		

		var subs = [
			Meteor.subscribe("agency", this.params.agencyId)
		];
		var ready = true;
		_.each(subs, function(sub) {
			if(!sub.ready())
				ready = false;
		});
		return ready;
	},

	data: function() {
		

		var data = {
			params: this.params || {},
			agency: Agency.findOne({_id:this.params.agencyId}, {})
		};
		

		

		return data;
	},

	onAfterAction: function() {
		
	}
});