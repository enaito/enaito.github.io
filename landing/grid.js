var $grid = $('.grid').masonry({
  itemSelector: '.grid-item',
  columnWidth: 160
});

$grid.on( 'layoutComplete', function( event, items ) {
  console.log( items.length );
});

// $grid.on( 'click', '.grid-item', function() {
//   // change size of item via class
//   $( this ).toggleClass('grid-item--gigante');
//   // trigger layout
//   $grid.masonry();
// });