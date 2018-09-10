Meteor.publish("agency_list", function() {
	return Agency.find({}, {});
});

Meteor.publish("agencies_null", function() {
	return Agency.find({_id:null}, {});
});

Meteor.publish("agency", function(agencyId) {
	return Agency.find({_id:agencyId}, {});
});

