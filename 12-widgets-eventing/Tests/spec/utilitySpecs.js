describe("Step 3 - Delete Popup", function () {

    it("Create a deletePopup object inside of utility", function () {
        expect(window.receivingApp.utility.deletePopup).toBeDefined();
    });

    it("Create an open function inside of deletePopup", function () {
        expect(window.receivingApp.utility.deletePopup.open).toBeDefined();

    });

    var mockDialog = null;

    beforeEach(function() {
        // create a spy that will return from $(something).dialog()
        mockDialog = jasmine.createSpy('dialog');

        var mock$ = spyOn(window, '$').and.returnValue({
            dialog: mockDialog
        });
    });

    it("Make sure that jQuery UI's dialog gets called when the deletePopup opens", function() {
        window.receivingApp.utility.deletePopup.open("test", null);

        expect(mockDialog).toHaveBeenCalled();
    });
});

describe("Step 6 - Using prototyping to inherit behaviors", function() {
    it("Add a createObjectPopup function to receivingApp.utility", function() {
        expect(window.receivingApp.utility.createObjectPopup).toBeDefined();
    });

    var dialogObject = null;

    beforeEach(function() {
        dialogObject = new window.receivingApp.utility.createObjectPopup;

        // create a spy that will return from $(something).dialog()
        mockDialog = jasmine.createSpy('dialog');

        var mock$ = spyOn(window, '$').and.returnValue({
            dialog: mockDialog
        });
    });

    it("Add an openDialog function to createObjectPopup", function() {
        expect(dialogObject.openDialog).toBeDefined();
    });

    it("Calling openDialog should call jQuery UI's dialog", function() {
        dialogObject.openDialog();

        expect(mockDialog).toHaveBeenCalled();
    });
});
