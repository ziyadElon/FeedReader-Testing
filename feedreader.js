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
    /* Error handling block
    * -to check for error in case a reference is 
    * made to an undefined variable.
    */
   try{

   /* 
    * Test Suite called 'RSS Feeds'   
    */
    describe('RSS Feeds', function() {
        /* Test to make sure that the allFeeds variable has 
         * been defined and that it is not empty, that is,
         * it holds some data.
         */
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* Test that loops through each feed in the allFeeds 
         * object and ensures it has a URL defined
         * and that the URL is not empty.
         */

        it('have URLs defined', function(){
            allFeeds.forEach( function(feed) {
                expect(feed.url).toBeDefined();
                expect(feed.url).not.toBeNull();
            });
        });

        /* Test that ensures each feed in the allFeeds
         * array is initialised with a name which is
         * not null.
         */
        it('have name defined', function(){
            allFeeds.forEach( function(feed) {
                expect(feed.name).toBeDefined();
                expect(feed.name).not.toBeNull();
            });
        });

    });


    /* Hamburger menu visibility test suite */
    describe('The Menu', function(){

        /* Test that ensures the menu element is
         * hidden by default.
         */
        it('is hidden by default', function(){
            const body = document.querySelector('body');
            //console.log(body.classList.contains('menu-hidden'));
            expect(body.classList).toContain('menu-hidden');
        });

        /*  Test that ensures the menu changes
          * visibility when the menu icon is clicked. 
          * Menu is hidden by adding the CSS class 
          * .menu-hidden to the body.
          * The same class is removed from the body
          * to make the menu visible.
        */
        
        
        it('changes visibility on click', function(){
            const $menuIcon = $('.icon-list');
            const body = document.querySelector('body');
            $menuIcon.trigger('click');
            expect(body.classList).not.toContain('menu-hidden');
            $menuIcon.trigger('click');
            expect(body.classList).toContain('menu-hidden');
        });

        

    });
        
    /* Test suite named "Initial Entries" 
    * to test functionality of the ajax request
    * used to load feed. 
    */

    describe('Initial Entries', function(){
        /* Test that ensures when the loadFeed
         * function is working correctly, there is at least
         * a single .entry element within the .feed container.
         */


        /*To make sure loadFeed function completes
        * execution before the test is carried out 
        */
        beforeEach(function(done){
            loadFeed( 0, function(){
                done();
            });
        }); 

        it('are available', function(done){
            let entries = document.querySelectorAll('.feed .entry');
            expect(entries.length).toBeGreaterThan(0);
            done();
        });
    });

    /* Test suite named "New Feed Selection" */
    describe('New Feed Selection', function(){
        let initialContent = [];
        let finalContent = [];
        /* Test that ensures when a new feed is loaded
        * by the loadFeed function, the content actually changes.
        * Two sets of data- initial and final content are 
        * compared.
        */
       beforeEach(function(done){  
        loadFeed(0, function(){
            initialContent = document.querySelectorAll('.entry');
            loadFeed(1, function(){
                finalContent = document.querySelectorAll('.entry');
                done();
            });
        });
       });

       it('new feed available', function(done){
        expect(finalContent).not.toBe(initialContent);
        done();
       });
    });
    }

    catch(error){
        if(error.name === 'ReferenceError')
        {
            console.log(`${error.message} on line Number ${error.lineNumber}`);        
        }
    }
}());
