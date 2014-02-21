//describe("Vendors", function () {
//  var player;
//  var song;

//  beforeEach(function() {
//    player = new Player();
//    song = new Song();
//  });

describe("Vendor object", function () {

    var vendor = null;

    describe("vendor function called", function() {
        beforeEach(function() {
            vendor = window.receivingApp.vendor();
        });

        describe("Step 4 - delete link code moved to object", function () {
            beforeEach(function() {
                // create some fake HTML
                $(document.body).append('<div id="currentVendors"><a class="deleteVendorLink"></a></div>');
            });

            it("vendor should have a method to initialize the delete link", function() {
                expect(vendor.initializeDeleteLink).toBeDefined();
            });

            it("should handle a click on the #currentVendors delete link", function() {
                // note - because of how .on binds to the parent controller, we have to detect the event there and
                // not on the link itself
                vendor.initializeDeleteLink();

                expect($('#currentVendors')).toHandle("click");
            });
        });

        describe("Step 5 - move the remaining functionality to the object", function() {
            beforeEach(function() {
                // create some fake HTML
                $(document.body).append('<div id="createNewVendor"></div>');
            });

            afterEach(function() {
            });

            it("vendor should have a bunch more functions", function() {
                expect(vendor.initialize).toBeDefined();
                expect(vendor.initializeCreateNewLink).toBeDefined();
                expect(vendor.loadCurrentVendors).toBeDefined();
            })

            it("should handle a click on #createNewVendor", function() {
                vendor.initializeCreateNewLink();

                expect($('#createNewVendor')).toHandle('click');
            });

            it("should make an ajax call when loaded", function() {
                // return a fake object with a done function
                spyOn($, 'ajax').and.returnValue({
                    done: function() {}
                })

                vendor.loadCurrentVendors();

                expect($.ajax).toHaveBeenCalled();
            });
        });
    });
});

//
//    it("should be able to play a Song", function () {
//        player.play(song);
//        expect(player.currentlyPlayingSong).toEqual(song);
//
//        //demonstrates use of custom matcher
//        expect(player).toBePlaying(song);
//    });
//
//    describe("when song has been paused", function () {
//        beforeEach(function () {
//            player.play(song);
//            player.pause();
//        });
//
//        it("should indicate that the song is currently paused", function () {
//            expect(player.isPlaying).toBeFalsy();
//
//            // demonstrates use of 'not' with a custom matcher
//            expect(player).not.toBePlaying(song);
//        });
//
//        it("should be possible to resume", function () {
//            player.resume();
//            expect(player.isPlaying).toBeTruthy();
//            expect(player.currentlyPlayingSong).toEqual(song);
//        });
//    });
//
//    // demonstrates use of spies to intercept and test method calls
//    it("tells the current song if the user has made it a favorite", function () {
//        spyOn(song, 'persistFavoriteStatus');
//
//        player.play(song);
//        player.makeFavorite();
//
//        expect(song.persistFavoriteStatus).toHaveBeenCalledWith(true);
//    });
//
//    //demonstrates use of expected exceptions
//    describe("#resume", function () {
//        it("should throw an exception if song is already playing", function () {
//            player.play(song);
//
//            expect(function () {
//                player.resume();
//            }).toThrowError("song is already playing");
//        });
//    });
//});
