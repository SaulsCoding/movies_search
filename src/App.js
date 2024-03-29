import React, { Component } from 'react';
import './App.css';
import MovieRows from './MovieRows.js'
import $ from 'jquery'
import MovieRow from './MovieRows.js';

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {}
    // console.log("This is a initializer")

    // const movies = [
    //   {id: 0, poster_src: "https://image.tmdb.org/t/p/w185_and_h278_bestv2/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg",
    //     title: "Avengers: Infinity War", overview: "As the Avengers and their"},
    //   {id: 1, poster_src: "https://image.tmdb.org/t/p/w185/cezWGskPY5x7GaglTTRN4Fugfb8.jpg",
    //     title: "Avengers", overview: "This is my second overview"},
    // ]

    // var movieRows = []
    // movies.forEach((movie) => {
    //   console.log(movie.title)
    //   const movieRow = <MovieRows movie={movie}/>
    //   movieRows.push(movieRow)
    // })

    // this.state = {rows: movieRows}

    this.performSearch("wonder")
  }
  performSearch(searchTerm) {
    console.log("Perform search using moviedb")
    const urlString = "https://api.themoviedb.org/3/search/movie?api_key=1b5adf76a72a13bad99b8fc0c68cb085&query=" + searchTerm
    $.ajax({
      url: urlString,
      success: (searchResults) => {
        console.log("Fetched data successfully")
        // console.log(results[0])
        const results = searchResults.results
        //console.log([results[0]) 

        var movieRows = []

        results.forEach((movie) => {
           movie.poster_src = "https://image.tmdb.org/t/p/w185" + movie.poster_path
          // console.log(movie.poster_path) 
          const movieRow = <MovieRow key={movie.id} movie={movie}/>
          movieRows.push(movieRow)
        })

        this.setState({rows: movieRows})
      },
      error: (xhr, status, err) => {
        console.error("Failed to fetch data")
      }

    })
  }
    
  searchChangeHandler(event) {
    console.log(event.target.value)
    const boundObject = this
    const searchTerm = event.target.value
    boundObject.performSearch(searchTerm)

  }

render() {
  return (
    <div>
      
      <table className="titleBar">
        
        <tbody>
          <tr>
            <td>
              <img alt="app.icon" width="50" src="icons8-green-arrow.svg"/>
            </td> 
            <td width="8"/>
            <td>
              <h1>MoviesDB Search</h1>
              
            </td>
          </tr>
        </tbody>
      </table>
     
      <input stye={{
        fontSize: 24,
        display: 'blcok',
        width:'99%',
        paddingTop: 8,
        paddingBottom: 8,
        paddingLeft: 16,
        }} onChange={this.searchChangeHandler.bind(this)} placeholder="Enter search term"/>

        {this.state.rows}

      </div>
    );
  }
}

export default App;
