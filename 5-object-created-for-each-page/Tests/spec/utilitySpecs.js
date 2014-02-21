describe("Utilities", function () {
//  var player;
//  var song;

//  beforeEach(function() {
//    player = new Player();
//    song = new Song();
//  });

    describe("Step 3 - Delete Popup", function () {

        it("should be defined", function () {
            expect(window.receivingApp.utility.deletePopup).toBeDefined();
        });

        it("should have an open method", function () {
            expect(window.receivingApp.utility.deletePopup.open).toBeDefined();

        });

        var mockDialog = null;

        beforeEach(function() {
            // create a spy that will return from $(something).dialog()
            mockDialog = jasmine.createSpy('dialog');

            var mock$ = spyOn(window, '$').and.returnValue({
                dialog: mockDialog
            });

            // make the call
            window.receivingApp.utility.deletePopup.open("test", null);
        });

        it("should call jQueryUI dialog when open called", function() {
            expect(mockDialog).toHaveBeenCalled();
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
});
