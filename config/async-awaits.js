////aller chercher un blob avec fetch.
//https://rallycoding.herokuapp.com/api/music_albums

const fetch = require('isomorphic-fetch');


//FETCH promise
// function fetchAlbum(){
//   fetch('https://rallycoding.herokuapp.com/api/music_albums') //retourne un promesse
//     .then(res => {
//     return res.json()
//   })
//   .then(data => console.log(data[0])) //premier
// }
// fetchAlbum()

//Donne :
/*{ title: 'Taylor Swift',
  ...
  }*/


  //FETCH Async awaits


  // async function fetchAlbum(){
  // const res =  await fetch('https://rallycoding.herokuapp.com/api/music_albums') //retourne un promesse
  // const data =  await res.json()
  //
  //  console.log(data[0])
  // }
  // fetchAlbum()

  /*{ title: 'Taylor Swift',
    ...
    }*/


//     //SELF INVOKED FAUT METTRE LE ASYNC DEDANS
// (async function fetchAlbum(){
//     const res =  await fetch('https://rallycoding.herokuapp.com/api/music_albums') //retourne un promesse
//     const data =  await res.json()
//
//      console.log(data[0])
//  })()

   /*{ title: 'Taylor Swift',
     ...
 }*/

//ARROW
 const fetchAlbum = async() => {
    const res =  await fetch('https://rallycoding.herokuapp.com/api/music_albums') //retourne un promesse
    const data =  await res.json()

     console.log(data[0])
 }
fetchAlbum()

/*{ title: 'Taylor Swift',
  ...
}*/
