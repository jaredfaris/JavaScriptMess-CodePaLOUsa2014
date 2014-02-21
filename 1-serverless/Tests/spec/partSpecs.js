describe("Step 4 - Create part object", function () {

    var part = null;

    describe("part function called", function() {
        beforeEach(function() {
            part = window.receivingApp.part();

            // create some fake HTML
            $(document.body).append('<div id="currentParts"><a class="deletePartLink"></a></div>');
        });

        it("part should have a method to initialize the delete link", function() {
            expect(part.initializeDeleteLink).toBeDefined();
        });

        it("should handle a click on the #currentParts delete link", function() {
            // note - because of how .on binds to the parent controller, we have to detect the event there and
            // not on the link itself
            var $target = $('#currentParts');

            part.initializeDeleteLink();

            expect($target).toHandle("click");
        })
    });
});