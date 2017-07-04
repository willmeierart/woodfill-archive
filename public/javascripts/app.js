$(()=>{
  imagesLoaded('.Grid', ({ images }) => {
    images.map(({ img }) =>{
      img.classList.add('img--loaded')
    });

    const packery = new Packery('.Grid', {
      itemSelector: '.GridBlock',
      gutter: 5,
      percentPosition: true,
    });
    console.log(packery)

    // packery.items.map(({ element }) => {
    //   const drag = new Draggabilly(element);
    //   packery.bindDraggabillyEvents(drag);
    // });
  });
})
