this.Agency = new Mongo.Collection("agency");

this.Agency.userCanInsert = function(userId, doc) {
	return true;
};

this.Agency.userCanUpdate = function(userId, doc) {
	return true;
};

this.Agency.userCanRemove = function(userId, doc) {
	return true;
};
