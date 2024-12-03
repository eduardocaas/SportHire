/* 
    Carousel
    */
$(document).ready(function () {
  $('.card-slider').slick({
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
     autoplaySpeed: 2000
  });
})

$(document).ready(function () {
  $('.card-slider-dual').slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
     autoplaySpeed: 2000
  });
})

$(document).ready(function () {
  $('.card-slider-one').slick({
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    dots: true,
    autoplay: true,
     autoplaySpeed: 2000
  });
})