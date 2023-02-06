import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import BookList from './components/Books' 
import AuthorBookList from './components/AuthorBook'
import {HashRouter, Route, Link, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import axios from 'axios'
import LoginForm from './components/Auth';

const NotFound404 = ({ location }) => {
    return (
        <div>
            <h1>Страница по адресу '{location.pathname}' не найдена</h1>
        </div>
    )
}


class App extends React.Component {
   constructor(props) {
       super(props)

        this.state = {
           'authors': [],
           'books': []
        } 
    }

    load_data() {
        axios.get('http://127.0.0.1:8000/api/authors')
            .then(response => {
                const authors = response.data['results']
                this.setState(
                {
                    'authors': authors
                }
                )
            }).catch(error => console.log(error))

        axios.get('http://127.0.0.1:8000/api/books')
            .then(response => {
                const books = response.data['results']
                this.setState(
                {
                    'books': books
                }
                )
            }).catch(error => console.log(error))
    }

    
    componentDidMount() {
        this.load_data()
    }
    
    render () {
        return (
            <div className='App'>
                <BrowserRouter>
                    <nav>
                        <ul>
                            <li>
                                <Link to='/'>Authors</Link>                                
                            </li>
                            <li>
                                <Link to='/books'>Books</Link>
                            </li>
                            <li>
                                <Link to='/login'>Login</Link>
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <AuthorList authors={this.state.authors}> </AuthorList>} />
                        <Route exact path='/books' component={() => <BookList items={this.state.books}> </BookList>} />
                        <Route exact path='/author/:id' component={() => <AuthorBookList items={this.state.books}> </AuthorBookList>} />
                        <Route exact path='/login ' component={() => <LoginForm></LoginForm>} />
                        <Redirect from='/authors' to='/'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    } 
}

export default App;
  