/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() 
    {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. 
         */
		 
        it('feeds are defined', function() {
			// The first step is to make sure that the array in the allFeeds are properly defined
            expect(allFeeds).toBeDefined();
			// this is to ensure that allFeeds array is not empty by testing the leght of the array not be 0
            expect(allFeeds.length).not.toBe(0);
        });


        /* Our goal here is to loop through each feed in the allFeeds object and ensures it has a URL defined and that the URL is not empty.
         */
        it('url is defined', function(){
			// The first step is to make sure that the URL in the allFeeds are properly defined
			//this loop through allFeeds arrays 
            allFeeds.forEach(function(feed){
				//This is to set expectation  the URL are defined
                expect(feed.url).toBeDefined();
				//This is also setting an expection that the the array is not empty
                expect(feed.url.length).not.toBe(0);
            });

        });


        /* Similarly, we want to loops through each feed in the allFeeds object and ensures it has a name defined
		* and that the name is not empty.
         */
         it('name is defined', function(){
		// The first step is to make sure that the URL in the names in the allFeeds are properly defined
		//this is ensure by looping through the array
            allFeeds.forEach(function(feed) {
				//and set the expectation to be "define"
                expect(feed.name).toBeDefined();
				//the expectation here is that the name of the feed is not zero at anytime
                expect(feed.name.length).not.toBe(0);
            });

        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('the menu', function(){
            /* in this section we want to ensures that the menu element is hidden by default.   */
        it('menu item is hidden', function(){
			/* By looking at the HTML, we see that the 'menu-hidden' 
             * class is applied to/removed from the body element, so we grab that element.
             */
			 //the document.body expectation tested if the menu is set to hidden by default when loaded initially to be true	
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });

         /* This is a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * has two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
        it('displays when clicked and hides when clicked again', function() {
            $('a.menu-icon-link').click();
			expect($('body').hasClass('menu-hidden')).toBe(false);
			//click effent ADD the men-hidden class
            $('a.menu-icon-link').click();
            expect($('body').hasClass('menu-hidden')).toBe(true);
        });


    });


    describe("Initial Entries", function(){
		/* This is a test that ensures when the loadFeed function is called and completes its work, 
		*there is at least a single .entry element within the .feed container.
         * The loadFeed() function is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
		 //load the first feed and wait loading is complete 

        beforeEach(function(done) {
            loadFeed(0, function(){
                done();
            });
        });
		//we want to confim if at least there is one entry

        it('there is at least a single entry within the feed container', function() {
			//list of all entry within .fee 
            var entryNumber = document.querySelectorAll('.feed .entry');
			// esures that the entrynumber is greater than 0
            expect(entryNumber.length).toBeGreaterThan(0);
        });

    });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */

    /* This section is to ensure that the new fee is loaed b the loadFeed function */
	describe("New Feed Selection", function(){
		// when a new feed is loaded by the loadFeed function that the content actually changes
			var firstFeed, secondFeed;

			beforeEach(function(done){
				loadFeed(0);
				loadFeed(1, function(){
					firstFeed = $('.feed').html();
					loadFeed(2, function(){
						done();
					});
				});
			});

			it('The content actually changes', function(){
				// Check the newsfeed  html is properly defined.
				expect(firstFeed).toBeDefined();
				secondFeed = $('.feed').html();
				expect(secondFeed).toBeDefined();
				// Check the newsfeed  html to be not same as previous.
				expect(firstFeed).not.toEqual(secondFeed);
			});

		});

}());




