var pageSession = new ReactiveDict();

Template.Agencies.onCreated(function() {
	
});

Template.Agencies.onDestroyed(function() {
	
});

Template.Agencies.onRendered(function() {
	
	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.Agencies.events({
	
});

Template.Agencies.helpers({
	
});

var AgenciesViewItems = function(cursor) {
	if(!cursor) {
		return [];
	}

	var searchString = pageSession.get("AgenciesViewSearchString");
	var sortBy = pageSession.get("AgenciesViewSortBy");
	var sortAscending = pageSession.get("AgenciesViewSortAscending");
	if(typeof(sortAscending) == "undefined") sortAscending = true;

	var raw = cursor.fetch();

	// filter
	var filtered = [];
	if(!searchString || searchString == "") {
		filtered = raw;
	} else {
		searchString = searchString.replace(".", "\\.");
		var regEx = new RegExp(searchString, "i");
		var searchFields = ["Agency_Name", "Agency_Address_1", "Agency_Address_2", "Agency_City", "Agency_State", "Agency_Zipcode", "Agency_Phone", "Agency_Fax", "Agency_Email", "Agency_URL"];
		filtered = _.filter(raw, function(item) {
			var match = false;
			_.each(searchFields, function(field) {
				var value = (getPropertyValue(field, item) || "") + "";

				match = match || (value && value.match(regEx));
				if(match) {
					return false;
				}
			})
			return match;
		});
	}

	// sort
	if(sortBy) {
		filtered = _.sortBy(filtered, sortBy);

		// descending?
		if(!sortAscending) {
			filtered = filtered.reverse();
		}
	}

	return filtered;
};

var AgenciesViewExport = function(cursor, fileType) {
	var data = AgenciesViewItems(cursor);
	var exportFields = [];

	var str = exportArrayOfObjects(data, exportFields, fileType);

	var filename = "export." + fileType;

	downloadLocalResource(str, filename, "application/octet-stream");
}

Template.AgenciesView.onCreated(function() {
	
});

Template.AgenciesView.onDestroyed(function() {
	
});

Template.AgenciesView.onRendered(function() {
	pageSession.set("AgenciesViewStyle", "table");
	
});

Template.AgenciesView.events({
	"submit #dataview-controls": function(e, t) {
		return false;
	},

	"click #dataview-search-button": function(e, t) {
		e.preventDefault();
		var form = $(e.currentTarget).parent();
		if(form) {
			var searchInput = form.find("#dataview-search-input");
			if(searchInput) {
				searchInput.focus();
				var searchString = searchInput.val();
				pageSession.set("AgenciesViewSearchString", searchString);
			}

		}
		return false;
	},

	"keydown #dataview-search-input": function(e, t) {
		if(e.which === 13)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					var searchString = searchInput.val();
					pageSession.set("AgenciesViewSearchString", searchString);
				}

			}
			return false;
		}

		if(e.which === 27)
		{
			e.preventDefault();
			var form = $(e.currentTarget).parent();
			if(form) {
				var searchInput = form.find("#dataview-search-input");
				if(searchInput) {
					searchInput.val("");
					pageSession.set("AgenciesViewSearchString", "");
				}

			}
			return false;
		}

		return true;
	},

	"click #dataview-insert-button": function(e, t) {
		e.preventDefault();
		Router.go("agencies.insert", mergeObjects(Router.currentRouteParams(), {}));
	},

	"click #dataview-export-default": function(e, t) {
		e.preventDefault();
		AgenciesViewExport(this.agency_list, "csv");
	},

	"click #dataview-export-csv": function(e, t) {
		e.preventDefault();
		AgenciesViewExport(this.agency_list, "csv");
	},

	"click #dataview-export-tsv": function(e, t) {
		e.preventDefault();
		AgenciesViewExport(this.agency_list, "tsv");
	},

	"click #dataview-export-json": function(e, t) {
		e.preventDefault();
		AgenciesViewExport(this.agency_list, "json");
	}

	
});

Template.AgenciesView.helpers({

	"insertButtonClass": function() {
		return Agency.userCanInsert(Meteor.userId(), {}) ? "" : "hidden";
	},

	"isEmpty": function() {
		return !this.agency_list || this.agency_list.count() == 0;
	},
	"isNotEmpty": function() {
		return this.agency_list && this.agency_list.count() > 0;
	},
	"isNotFound": function() {
		return this.agency_list && pageSession.get("AgenciesViewSearchString") && AgenciesViewItems(this.agency_list).length == 0;
	},
	"searchString": function() {
		return pageSession.get("AgenciesViewSearchString");
	},
	"viewAsTable": function() {
		return pageSession.get("AgenciesViewStyle") == "table";
	},
	"viewAsBlog": function() {
		return pageSession.get("AgenciesViewStyle") == "blog";
	},
	"viewAsList": function() {
		return pageSession.get("AgenciesViewStyle") == "list";
	},
	"viewAsGallery": function() {
		return pageSession.get("AgenciesViewStyle") == "gallery";
	}

	
});


Template.AgenciesViewTable.onCreated(function() {
	
});

Template.AgenciesViewTable.onDestroyed(function() {
	
});

Template.AgenciesViewTable.onRendered(function() {
	
});

Template.AgenciesViewTable.events({
	"click .th-sortable": function(e, t) {
		e.preventDefault();
		var oldSortBy = pageSession.get("AgenciesViewSortBy");
		var newSortBy = $(e.target).attr("data-sort");

		pageSession.set("AgenciesViewSortBy", newSortBy);
		if(oldSortBy == newSortBy) {
			var sortAscending = pageSession.get("AgenciesViewSortAscending") || false;
			pageSession.set("AgenciesViewSortAscending", !sortAscending);
		} else {
			pageSession.set("AgenciesViewSortAscending", true);
		}
	}
});

Template.AgenciesViewTable.helpers({
	"tableItems": function() {
		return AgenciesViewItems(this.agency_list);
	}
});


Template.AgenciesViewTableItems.onCreated(function() {
	
});

Template.AgenciesViewTableItems.onDestroyed(function() {
	
});

Template.AgenciesViewTableItems.onRendered(function() {
	
});

Template.AgenciesViewTableItems.events({
	

	"click td": function(e, t) {
		e.preventDefault();
		
		Router.go("agencies.details", mergeObjects(Router.currentRouteParams(), {agencyId: this._id}));
		return false;
	},

	"click .inline-checkbox": function(e, t) {
		e.preventDefault();

		if(!this || !this._id) return false;

		var fieldName = $(e.currentTarget).attr("data-field");
		if(!fieldName) return false;

		var values = {};
		values[fieldName] = !this[fieldName];

		Meteor.call("agencyUpdate", this._id, values, function(err, res) {
			if(err) {
				alert(err.message);
			}
		});

		return false;
	},

	"click #delete-button": function(e, t) {
		e.preventDefault();
		var me = this;
		bootbox.dialog({
			message: "Delete? Are you sure?",
			title: "Delete",
			animate: false,
			buttons: {
				success: {
					label: "Yes",
					className: "btn-success",
					callback: function() {
						Meteor.call("agencyRemove", me._id, function(err, res) {
							if(err) {
								alert(err.message);
							}
						});
					}
				},
				danger: {
					label: "No",
					className: "btn-default"
				}
			}
		});
		return false;
	},
	"click #edit-button": function(e, t) {
		e.preventDefault();
		Router.go("agencies.update", mergeObjects(Router.currentRouteParams(), {agencyId: this._id}));
		return false;
	}
});

Template.AgenciesViewTableItems.helpers({
	

	"checked": function(value) { return value ? "checked" : "" }, 
	"editButtonClass": function() {
		return Agency.userCanUpdate(Meteor.userId(), this) ? "" : "hidden";
	},

	"deleteButtonClass": function() {
		return Agency.userCanRemove(Meteor.userId(), this) ? "" : "hidden";
	}
});
