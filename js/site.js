
var _cookieName = 'kendoTest1';

function _resetCookie() {
    document.cookie = 'kendoTest1=;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;';
}

function _getCookie() {
    var name = _cookieName + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');

    for(var i = 0; i <ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return JSON.parse(c.substring(name.length, c.length));
        }
    }
    return {};
}

function _setCookie(data) {
    var d = new Date();
    var days = 10;

    d.setTime(d.getTime() + (days * 24 * 60 * 60 * 1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie = _cookieName + "=" + JSON.stringify(data) + ";" + expires + ";path=/";
}

function LoadValidationScripts() {
    $.ajax({
        async: true,
        cache: false,
        url: '_ValidationScriptsPartial.html',
        success: function (d) {
            $('#scripts').append(d);
        }
    });
}

function LoadPage(page, target) {
    $.ajax({
        async: true,
        cache: false,
        url: page,
        success: function (d) {
            ViewBag.Title = null;
            $(target).html(d);
            $('title').html(ViewBag.Title || ViewBag.ApplicationName );
            BuildAspLinks();
        }
    });
}

function BuildAspLinks() {
    // my fancy way of converting asp tags to actual href links
    $('a[asp-action]').each(function(){
        if ($(this).data('asp-link-processed')) {
            return;
        }

        var area = $(this).attr('asp-area');
        var controller = $(this).attr('asp-controller');
        var action = $(this).attr('asp-action');

        if (action == undefined)
            return;

        var link = '';
        if (area != undefined && area.length > 0) {
            link = area + '/Views/';
        } else {
            link = 'Views/';
        }

        if (controller != undefined && controller.length > 0) {
            link += controller + '/';
        }
        
        link += action + '.html';
        
        $(this).attr('data-href', link);
        $(this).attr('data-asp-link-processed', true);
        $(this).attr('href', '#');
        $(this).on('click', function(){
            LoadPage(link, '#body-container');
        });
    });
}


$(function(){
    //BuildAspLinks();
    
    $.ajax({
        async: true,
        // cache: false,
        url: 'CookieConsentPartial.html',
        success: function (d) {
            $('div[name="_CookieConsentPartial"]').prepend(d);
        }
    });

    $.ajax({
        async: true,
        // cache: false,
        url: 'NavMenuPartial.html',
        success: function (d) {
            $('div[name="_NavMenu"]').prepend(d);
        }
    });


});