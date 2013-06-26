$(document).ready(function ($) {

    //Скорость анимации
    var speed = 300;

    // Переключаем боковую панель
    $('.btn-navbar').click( function() {
	    $('html').toggleClass('expanded');
    });
		
	// Скроллинг
	var links = $('.navigation').find('li');
    var section = $('section');
    var mywindow = $(window);
    var htmlbody = $('html,body');
    
    section.waypoint(function (direction) {

        var datasection = $(this).attr('data-section');

        if (direction === 'down') {
            $('.navigation li[data-section="' + datasection + '"]').addClass('active').siblings().removeClass('active');
        }
        else {
        	var newsection = parseInt(datasection) - 1;
            $('.navigation li[data-section="' + newsection + '"]').addClass('active').siblings().removeClass('active');
        }

    });
    
    mywindow.scroll(function () {
        if (mywindow.scrollTop() == 0) {
            $('.navigation li[data-section="1"]').addClass('active');
            $('.navigation li[data-section="2"]').removeClass('active');
        }
    });
    
    function goToByScroll(datasection) {
        
        if (datasection == 1) {
	        htmlbody.animate({
	            scrollTop: $('.section[data-section="' + datasection + '"]').offset().top
	        }, 500, 'easeOutQuart');
        }
        else {
	        htmlbody.animate({
	            scrollTop: $('.section[data-section="' + datasection + '"]').offset().top + 70
	        }, 500, 'easeOutQuart');
        }
        
    }

    links.click(function (e) {
        e.preventDefault();
        var datasection = $(this).attr('data-section');
        goToByScroll(datasection);
    });

    //Валидация формы заказа и отправка данных
    $("form#order").submit(function(){
        var errors = 0;
        $("form#order label").removeClass("red");
        
        $(this).find("input").each(function(key, val){
            
            var reg = new RegExp($(this).data('regexp'));
            var current = $(this).val();

            if(!reg.test(current)){
                $("form#order label:eq("+key+")").addClass("red");
                errors++;
            }

        });
        
        if(errors > 0) {
            return false;
        } else {
            console.log("AJAX");
            $(this).slideUp(speed, function(){
                $("<p/>",{
                    text: "Ваш запрос успешно отправлен. Ожидайте звонка от менеджера для подтверждения заявки."
                }).appendTo($("#orderResult"));
                $("#orderResult").slideDown(speed);
            });
            return false;
        }
    });

    //Заказать звонок
    $("form#orderCall").submit(function(){
        var errors = 0;
        $("form#order label").removeClass("red");
        
        $(this).find("input").each(function(key, val){
            
            var reg = new RegExp($(this).data('regexp'));
            var current = $(this).val();

            if(!reg.test(current)){
                $("form#orderCall label:eq("+key+")").addClass("red");
                errors++;
            }

        });
        
        if(errors > 0) {
            return false;
        } else {
            console.log("AJAX");
            $(this).slideUp(speed, function(){
                $("<p/>",{
                    text: "Спасибо. Мы с Вами свяжемся в ближайшее время."
                }).appendTo($("#orderCallResult"));
                $("#orderCallResult").slideDown(speed);
            });
            return false;
        }
    });


});