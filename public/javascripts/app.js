$(()=>{
  imagesLoaded('.Grid', ({ images }) => {
    images.map(({ img }) =>{
      img.classList.add('img--loaded')
    })
  })

  $('.sidebarToggle').click(()=>{
    $(".sidebarMenu").animate({width:'toggle'},350);
  })

  $('.sidebarclose').click(()=>{
    $(".sidebarMenu").animate({width:'toggle'},350);
  })




})
