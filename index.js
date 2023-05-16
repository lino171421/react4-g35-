const cargarPeliculas = async() => {
    const respuesta = await fetch('https://api.themoviedb.org/3/movie/550?api_key=1167d99b30d4fca0a8a811f87fab5c84');

    console.log(respuesta);
    
}

cargarPeliculas();