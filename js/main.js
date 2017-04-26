 
     // Successfull Call Function
     /*
     var successFn = function(data){
     	  var sectionsArray = [];

          // creating an array based on section values of JSON objects
          $.each(data.results, function(index) {
                if (sectionsArray.includes(data.results[index].section)) {
                //do nothing
              } else {
                 sectionsArray.push(data.results[index].section);       
              }
          });
          */
          // Sorting array alphabetically
          // var sortedArray = sectionsArray.sort();
          var optionValueArray = ["- Select - ", "home", "opinion", "world", "national", "politics", "upshot", "nyregion", "business", "technology", "science", "health", "sports", "arts", "books", "movies", "theater", "sundayreview", "fashion", "tmagazine", "food", "travel", "magazine", "realestate", "automobiles", "obituaries", "insider"];
          var optionText = ["- Select -", "Home", "Opinion", "World", "National", "Politics", "Upshot", "NY Region", "Business", "Technology", "Science", "Health", "Sports", "Arts", "Books", "Movies", "Theater", "Sunday Review", "Fashion", "T Magazine", "Food", "Travel", "Magazine", "Real Estate", "Automobiles", "Obituaries", "Insider"];
          var sortedOptionValue = optionValueArray.sort();
          var sortedOptionText = optionText.sort();
          console.log
         // Creating option values in drop down based on array created above
          var output= "";
          for (var i = 0 ; i < sortedOptionText.length; i++){
              output += "<option value='" + sortedOptionValue[i] + "'>" + sortedOptionText[i] + "</option>";
            }
           $(".options").html(output);

       
     $(function() {
        $(window).scroll(function() {
          if($(window).scrollTop() >= 100) {
            $('nav').addClass('scrolled');
          } else {
            $('nav').removeClass('scrolled');
          }
        });
      });

        // AJAX call based on user selection
      var successFn = function(data){
         $('.options').on('change', function(){
            $('header').addClass('padding-tb-md');
            $('#logo').addClass('reduced-logo-height');

               $.ajax({
                  url:'https://api.nytimes.com/svc/topstories/v2/' + this.value.toLowerCase() + '.json', 
                  type: 'GET',
                  data: {'api-key' : '86b2cab13dff42ca9d5445b89b6e8ab6'},
                  success: dynamicCategory,
                  error: failureFn,
                });
            });
       };
            
            // HTML injection based on AJAX call and selection
            var dynamicCategory = function(data){
            var html = "";
            var i = 0;

           while (i < 12) {
           if (data.results[i].multimedia.length > 0) {
              html += "<div class='top-story' style='background: url(" + data.results[i].multimedia[data.results[i].multimedia.length-1].url + ") center center / cover no-repeat;'>";
              html += "<a href='" + data.results[i].url + "' target='_blank'>";
              html += "<div class='text-section'>";
              html += "<p class='text-decoration-none font-white'>" + data.results[i].abstract + "</p>";
              html += "</div>";
              html += "</a>";
              html += "</div>";
              $('#articles').html(html);
              console.log(i);
              i++;
            };
          };
         };
                // Failed Call Function
        var failureFn = function(e){
          console.log('error occured: ' + e.message);
        };

        // Document Load Function
        var onReadyFn = function(){
            // using .ajax
            var ajaxSettings = {
              url:'https://api.nytimes.com/svc/topstories/v2/home.json',
              type: 'GET',
              data: {'api-key' : '86b2cab13dff42ca9d5445b89b6e8ab6'},
              success: successFn,
              error: failureFn,
            };
            $.ajax(ajaxSettings);
        };

        $(document).ready(onReadyFn);