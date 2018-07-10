enterView({
    selector: '.step-sanitario',
    enter: function(el) {
        el.classList.add('entered');
        sanitario();
    }
});


enterView({
    selector: '.step-expansion',
    enter: function(el) {
        el.classList.add('entered');
        expansion();
    },
    exit: function(el) {
        el.classList.add('entered');
        colapso();
    } 
});


enterView({
    selector: '.step-colapso',
    enter: function(el) {
        el.classList.add('entered');
        colapso();
    },
    exit: function(el) {
        el.classList.add('entered');
        sanitario();
    }
});

enterView({
    selector: '.step-ambiente',
    enter: function(el) {
        el.classList.add('entered');
        ambiente();
    },
    exit: function(el) {
        el.classList.add('entered');
        expansion();
    }
});


$("#keep").click(function() {
	console.log("scrol");
    $('html,body').animate({
        scrollTop: $(".main").offset().top-50},
        'slow');
});

