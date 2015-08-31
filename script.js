var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        $('button').click(function() {
            error('');
            $('#hourly').html('');
            app.calculate();
        });
    },
    // Update DOM on a Received Event
    // receivedEvent: function(id) {
    //     var parentElement = document.getElementById(id);
    //     var listeningElement = parentElement.querySelector('.listening');
    //     var receivedElement = parentElement.querySelector('.received');

    //     listeningElement.setAttribute('style', 'display:none;');
    //     receivedElement.setAttribute('style', 'display:block;');

    //     console.log('Received Event: ' + id);
    // }

    error: function(message)
    {
        $('#error').html(message);
    },

    getHolidaysPaycheck: function(days)
    {
        var rate = 62;

        return days * rate;
    },

    getWeekendPaycheck: function(days)
    {
        var rate = 55;

        return days * rate;
    },

    calculate: function()
    {
        var sum = parseInt($('input[name=sum]').val());

        var paycheck = {
            a: 0,
            s: 0,
            j: 0
        }

        if (sum <= 0 || isNaN(sum)) {
            error('Podaj sumę zarobioną przez zespół');
        }

        var workdaysSum = 0;
        $('[name^=workdays]').each(function(index, field) {
            workdaysSum += parseInt($(field).val());
        });

        if (workdaysSum > 0) {
            var rate = sum / workdaysSum;

            $('#hourly').html(Math.round((rate / 8) * 100) / 100);

            paycheck.a = rate * parseInt($('[name=workdays\\[a\\]').val());
            paycheck.s = rate * parseInt($('[name=workdays\\[s\\]]').val());
            paycheck.j = rate * parseInt($('[name=workdays\\[j\\]]').val());
        }

        // Urlop
        paycheck.a += app.getHolidaysPaycheck(parseInt($('[name=holidays\\[a\\]]').val()));
        paycheck.s += app.getHolidaysPaycheck(parseInt($('[name=holidays\\[s\\]]').val()));
        paycheck.j += app.getHolidaysPaycheck(parseInt($('[name=holidays\\[j\\]]').val()));

        // Soboty
        paycheck.a += app.getWeekendPaycheck(parseInt($('[name=weekend\\[a\\]]').val()));
        paycheck.s += app.getWeekendPaycheck(parseInt($('[name=weekend\\[s\\]]').val()));
        paycheck.j += app.getWeekendPaycheck(parseInt($('[name=weekend\\[j\\]]').val()));

        $('[name=paycheck\\[a\\]]').val(Math.round(paycheck.a * 100) / 100, 2);
        $('[name=paycheck\\[s\\]]').val(Math.round(paycheck.s * 100) / 100, 2);
        $('[name=paycheck\\[j\\]]').val(Math.round(paycheck.j * 100) / 100, 2);
    }

};











