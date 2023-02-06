import React from 'react';
import logo from './logo.svg';
import './App.css';
import AuthorList from './components/Author.js'
import BookList from './components/Books' 
import AuthorBookList from './components/AuthorBook'
import {HashRouter, Route, Link, Switch, Redirect, BrowserRouter} from 'react-router-dom'
import axios from 'axios'
import LoginForm from './components/Auth';
import Cookies from 'universal-cookie'

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
           'books': [],
           'token': ''
        } 
    }

    set_token(token) {
        const cookies = new Cookies()
        cookies.set('token', token)
        this.setState(({'token': token}))
    }

    is_authenticated() {
        return this.state.token !== ''
    }

    logout() {
        this.set_token('')
    }

    get_token_from_storage() {
        const cookies = new Cookies()
        const token = cookies.get('token')
        this.setState({'token': token})
    }

    get_token(login, password) {
        axios.post('http://127.0.0.1:8000/api-token-auth', {login: login, password: password})
            .then(response => {
                this.set_token(response.data['token'])
            }).catch(error => alert('Неверный пароль'))
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
        this.get_token_from_storage()
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
                                {this.is_authenticated() ? <button onClick={() => this.logout()}>Logout</button> : <Link to='/login'>Login</Link>}
                                
                            </li>
                        </ul>
                    </nav>
                    <Switch>
                        <Route exact path='/' component={() => <AuthorList authors={this.state.authors}> </AuthorList>} />
                        <Route exact path='/books' component={() => <BookList items={this.state.books}> </BookList>} />
                        <Route exact path='/author/:id' component={() => <AuthorBookList items={this.state.books}> </AuthorBookList>} />
                        <Route exact path='/login ' component={() => <LoginForm get_token={(login, password) => this.get_token(login, password)}></LoginForm>} />
                        <Redirect from='/authors' to='/'/>
                        <Route component={NotFound404}/>
                    </Switch>
                </BrowserRouter>
            </div>
        )
    } 
}

export default App;
  