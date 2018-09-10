var docDefinition = { content: 'My Text' };

Template.HomePrivate.onCreated(function() {

});

Template.HomePrivate.onDestroyed(function() {

});

Template.HomePrivate.onRendered(function() {

	Meteor.defer(function() {
		globalOnRendered();
		$("input[autofocus]").focus();
	});
});

Template.HomePrivate.events({
	'click .myButton': function() {
			// Some variables with 'this' (requires router setup - see below)
			var customerName = this.name;
			var customerDetailOne = this.detail_one;
			var customerDetailTwo = this.detail_two;
			// Some variables without 'this'
			var customerAdress = Customers.findOne(this._id).adress;
			var currentUser = Meteor.user().profile.name;

			// Define the pdf-document
			var docDefinition = {
				pageSize: 'A4',
				pageMargins: [ 30, 25, 30, 25 ],

				// Content with styles
				content: [
					{ text: customerName, style: 'headline' },
					{
						columns: [
							{ width: '15%', text: 'Detail #1:', style: ['listItem', 'listLabel'] },
							{ width: '35%', text: customerDetailOne, style: ['listItem', 'listText'] },
							{ width: '15%', text: 'Detail #2:', style: ['listItem', 'listLabel'] },
							{ width: '35%', text: customerDetailTwo, style: ['listItem', 'listText'] }
						],
						columnGap: 10
					},
					{ text: customerAdress },
					{ text: currentUser }
				],

				// Style dictionary
				styles: {
					headline: { fontSize: 25, bold: true, margin: [0, 0, 0, 25] },
					listItem: { fontSize: 14, margin: [0, 0, 0, 5] },
					listLabel: { bold: true },
					listText: { italic: true }
				}
			};

			// Start the pdf-generation process
			pdfMake.createPdf(docDefinition).open();
		}
});

Template.HomePrivate.helpers({

});
