$(()=>{
  imagesLoaded('.Grid', ({ images }) => {
    images.map(({ img }) =>{
      img.classList.add('img--loaded')
    })
  })

  $('.sidebarToggle').click(()=>{
    $(".sidebarMenu").animate({width:'toggle'},350)
  })

  $('.sidebarclose').click(()=>{
    $(".sidebarMenu").animate({width:'toggle'},350)
  })
  //
  // let urlMatch = new RegExp(/^((https?):\/\/)?([w|W]{3}\.)+[a-zA-Z0-9\-\.]{3,}\.[a-zA-Z]{2,}(\.[a-zA-Z]{2,})?$/, 'g')
  // let embedurl = $('.textBlockContent').text().match(urlMatch)
  // console.log($('.textBlockContent').text())
  // console.log(embedurl)

  // $('.textBlockContent').text().linkify()

  linkify($('.textBlockContent').text())

  function linkify(text){
    if (text) {
        text = text.replace(
            /((https?\:\/\/)|(www\.))(\S+)(\w{2,4})(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/gi,
            function(url){
                var full_url = url
                if (!full_url.match('^https?:\/\/')) {
                    full_url = 'http://' + full_url
                }
                return '<a href="' + full_url + '">' + url + '</a>'
            }
        )
    }
    console.log(text)
    return text
}
})
