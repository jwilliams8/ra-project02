// Creating option values in drop down based on array created above
var selectMenu = {
  optionValue: ["- Select - ", "home", "opinion", "world", "national", "politics", "upshot", "nyregion", "business", "technology", "science", "health", "sports", "arts", "books", "movies", "theater", "sundayreview", "fashion", "tmagazine", "food", "travel", "magazine", "realestate", "automobiles", "obituaries", "insider"],
  optionText: ["- Select -", "Home", "Opinion", "World", "National", "Politics", "Upshot", "NY Region", "Business", "Technology", "Science", "Health", "Sports", "Arts", "Books", "Movies", "Theater", "Sunday Review", "Fashion", "T Magazine", "Food", "Travel", "Magazine", "Real Estate", "Automobiles", "Obituaries", "Insider"],
  output: "",
  buildMenu: function() {
    for (var i = 0 ; i < this.optionText.length; i++){
      this.output += "<option value='" + this.optionValue[i] + "'>" + this.optionText[i] + "</option>";
    }
    $(".options").html(this.output);
  }
};

selectMenu.buildMenu();

// Function to add/remove class with duration
(function($){
  $.fn.extend({ 
    addTemporaryClass: function(className, duration) {
      var elements = this;
      setTimeout(function() {
        elements.removeClass(className, 150);
      }, duration);
      return this.each(function() {
      $(this).addClass(className, 150);
    });
  }
});
})(jQuery);  
          
// HTML injection based on AJAX call and selection
var dynamicCategory = function(data){
  var html = "";
  var i = 0;
  for (var index = 0; i < 12; index++) {
    if (data.results[index].multimedia.length > 0) {
      html += "<a href='" + data.results[index].url + "' target='_blank' class='top-story' style='background: url(" + data.results[index].multimedia[data.results[index].multimedia.length-1].url + ") center center / cover no-repeat;'>";
      html += "<div class='text-section'>";
      html += "<p class='text-decoration-none padding-sm'>" + data.results[index].abstract + "</p>";
      html += "</div>";
      html += "</div>";
      html += "</a>";
      $('#articles').html(html);
      i++;
    };
  };
}; 

// AJAX call based on user selection
var onReadyFn = function(data){
  $('.options').on('change', function(){
    $("#loading").addTemporaryClass("loading", 2000);
    $('nav').addClass('nav-post-select');
    $('#logo').addClass('reduced-logo-height');
    $.ajax({
      url:'https://api.nytimes.com/svc/topstories/v2/' + this.value.toLowerCase() + '.json', 
      type: 'GET',
      data: {'api-key' : '86b2cab13dff42ca9d5445b89b6e8ab6'},
    }).done(dynamicCategory, function() {
    }).fail(function(err) {
      throw err;
    });
  });
};
         
$(document).ready(onReadyFn);