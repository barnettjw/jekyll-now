var selectedTag;
// requires jquery
// adapted from: https://www.jqueryscript.net/other/Minimal-jQuery-Live-Search-Plugin-With-Fade-Effect-jSearch.html

function jFilter(input, items){
    var filtered;
    switch(true){
        case input === '':
            items.css('opacity', '1');
            break;
        default:
            // change opacity tabindex for non-filtered elements
            items.css('opacity', '0.1');
            items.children('a').attr("tabindex", -1);

            filtered = items.filter('[data-tag*="' + input.toLowerCase() + '"]');
            filtered.css('opacity', '1');

            $.each(filtered , function (index, value){
                $(value).children('a').attr("tabindex", 0); //set tabindex for filtered elements
            });

            // if only 1 element matches filter, set it as selectedTag
            if(filtered.length === 1){ selectedTag = filtered.attr("data-tag"); }

            break;
    }
}

var jSearch = (function (){
    // Item List
    var input = $('input');
    var items = $('.item');

    // filter on focus and keyup
    input.focus(function() { jFilter($(this).val(), items) });
    input.keyup(function() { jFilter($(this).val(), items) });

    //on enter navigate to page of selectedTag
    input.on('keypress',function(e) {
        if(e.which == 13) {
            if(selectedTag !== null) { window.location.href = '/tags/' + selectedTag; }
        }
    });
}());
