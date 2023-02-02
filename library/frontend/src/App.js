import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import BookList from './components/Books' 
import {HashRouter, Route} from 'react-router-dom'
import axios from 'axios'

class App extends React.Component {
   constructor(props) {
       super(props)

       const author1 = {id: 1, first_name: 'Достоевский', birthday_year: 1821}
       const author2 = {id: 2, first_name: 'Чехов', birthday_year: 1860}
       const authors = [author1, author2]

       const book1 = {id: 1, name: 'Преступление и наказание', author: author1}
       const book2 = {id: 2, name: 'Игрок', author: author1}
       const book3 = {id: 3, name: 'Лошадинная фамилия', author: author2}
       const book4 = {id: 4, name: 'Пари', author: author2}
       const books = [book1, book2, book3, book4]


       this.state = {
           'authors': authors,
           'books': books
        } 
    }

    
    // componentDidMount() {
    // axios.get('http://127.0.0.1:8000/api/authors')
    //         .then(response => {
    //             const authors = response.data
    //             this.setState(
    //             {
    //                 'authors': authors
    //             }
    //             )
    //         }).catch(error => console.log(error))
    // }
    
    render () {
        return (
            <div className='App'>
                <HashRouter>
                    <Route exact path='/' component={() => <AuthorList authors={this.state.authors}> </AuthorList>} />
                    <Route exact path='/books' component={() => <BookList items={this.state.books}> </BookList>} />
                </HashRouter>
                {/* <AuthorList authors={this.state.authors} />
                <BookList items={this.state.books} /> */}
            </div>
        )
    } 
}

export default App;
  