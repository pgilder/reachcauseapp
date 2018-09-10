Meteor.methods({
	"agencyInsert": function(data) {
		if(!Agency.userCanInsert(this.userId, data)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		return Agency.insert(data);
	},

	"agencyUpdate": function(id, data) {
		var doc = Agency.findOne({ _id: id });
		if(!Agency.userCanUpdate(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Agency.update({ _id: id }, { $set: data });
	},

	"agencyRemove": function(id) {
		var doc = Agency.findOne({ _id: id });
		if(!Agency.userCanRemove(this.userId, doc)) {
			throw new Meteor.Error(403, "Forbidden.");
		}

		Agency.remove({ _id: id });
	}
});
