function error(message)
{
    $('#error').html(message);
}

function getHolidaysPaycheck(days)
{
    var rate = 62;

    return days * rate;
}

function getWeekendPaycheck(days)
{
    var rate = 55;

    return days * rate;
}

function calculate()
{
    var sum = parseInt($('input[name=sum]').val());

    var paycheck = {
        a: 0,
        s: 0,
        j: 0
    }

    console.log(sum);

    if (sum <= 0 || isNaN(sum)) {
        error('Podaj sumę zarobioną przez zespół');
    }

    var workdaysSum = 0;
    $('[name^=workdays]').each(function(index, field) {
        workdaysSum += parseInt($(field).val());
    });

    if (workdaysSum > 0) {
        var rate = sum / workdaysSum;

        paycheck.a = rate * parseInt($('[name=workdays\\[a\\]').val());
        paycheck.s = rate * parseInt($('[name=workdays\\[s\\]]').val());
        paycheck.j = rate * parseInt($('[name=workdays\\[j\\]]').val());

        console.log(workdaysSum, rate);
        console.log(paycheck);
    }

    // Urlop
    paycheck.a += getHolidaysPaycheck(parseInt($('[name=holidays\\[a\\]]').val()));
    paycheck.s += getHolidaysPaycheck(parseInt($('[name=holidays\\[s\\]]').val()));
    paycheck.j += getHolidaysPaycheck(parseInt($('[name=holidays\\[j\\]]').val()));

    console.log(paycheck);

    // Soboty
    paycheck.a += getWeekendPaycheck(parseInt($('[name=weekend\\[a\\]]').val()));
    paycheck.s += getWeekendPaycheck(parseInt($('[name=weekend\\[s\\]]').val()));
    paycheck.j += getWeekendPaycheck(parseInt($('[name=weekend\\[j\\]]').val()));

    console.log(paycheck);
    $('[name=paycheck\\[a\\]]').val(Math.round(paycheck.a * 100) / 100, 2);
    $('[name=paycheck\\[s\\]]').val(Math.round(paycheck.s * 100) / 100, 2);
    $('[name=paycheck\\[j\\]]').val(Math.round(paycheck.j * 100) / 100, 2);
}

$('button').click(function() {
    error('');
    calculate();
});
