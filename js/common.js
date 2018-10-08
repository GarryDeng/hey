/**
 * Created by some on 2017/6/14.
 */
function Jm(){
    this.rem = function(){
        var html = document.documentElement;
        var x = html.clientWidth;
        html.style.fontSize = x * 0.1 + 'px';
    };
    this.rem();
    window.addEventListener('resize',this.rem,false);
}
Jm();
jQuery(function(){
    jQuery(".hamburger").on('click',function(){
        if(jQuery(this).hasClass("two-hamburger")){
            jQuery(this).removeClass('two-hamburger');
            jQuery(".left-nav").removeClass('left-nav-scale');
            return;
        }
        jQuery(".left-nav").addClass('left-nav-scale');
        jQuery(this).addClass("two-hamburger");
    })
    jQuery(window).on('scroll',function(){
        jQuery('.hamburger').removeClass('two-hamburger');
        jQuery(".left-nav").removeClass('left-nav-scale');
    });
    jQuery(".left-nav").on('click',function(ev){
        if(jQuery(ev.target).parents().length==2){
            jQuery('.hamburger').removeClass('two-hamburger');
            jQuery(".left-nav").removeClass('left-nav-scale');
        }
    });
    jQuery('.left-nav a').on('click touchend', function(e) {
        var el = jQuery(this);
        var link = el.attr('href');
        window.location = link;
    });
    piMu();
    window.addEventListener("resize",piMu,false);
});
function piMu(){
    jQuery(".header-top").css({"width":document.documentElement.clientWidth+"px","height":document.documentElement.clientHeight+"px"});
}