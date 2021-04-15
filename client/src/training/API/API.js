import { Component } from 'react'
import axios from 'axios'

const url = axios.create({
    baseURL: 'http://localhost:5000/api/data'
})

class API extends Component {
    constructor(props) {
        super(props)
        this.state = {
            users: [],
            user: [],
            name : '',
            email: '',
            password: ''
        }
    }

    componentDidMount() {
        try {
            url.get('/').then(response => {
                this.setState({users: response.data})
                console.log(response.data)
            })
        } catch (error) {
            console.log(error)
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const userData = {
            name: this.state.name,
            email: this.state.email,
            password: this.state.password
        }
        try {
            url.post('/add', userData).then(response => {
                console.log(response.data)
            })
        } catch (error) {
            console.log(error)
        }
        window.location = '/'
    }

    handleChangeName = (event) => {
        this.setState({
            name: event.target.value,
        })
    }

    handleChangeEmail = (event) => {
        this.setState({
            email: event.target.value,
        })
    }

    handleChangePassword = (event) => {
        this.setState({
            password: event.target.value,
        })
    }

    detailData(id) {
        try {
            url.get(`/${id}`).then(response => {
            this.setState({user: response.data})
            console.log(response.data)
            })
        } catch (error) {
            console.log(error)
        }
        window.location = '/'
    }

    updateData = async (id) => {
        try {
            await url.patch(`/update/:${id}`).then(response => {
                this.setState({user: response.data})
                console.log(response.data)
            })
        } catch (error) {
            
        }
    }

    render() {
        const {users} = this.state
        return (
            <div>
                {
                    users.map(item => {
                        return <li key={item._id}>
                            {item.name} || {item._id}
                        </li>
                    })
                }
                <form onSubmit={this.handleSubmit}>
                    <input type="text" name="name" onChange={this.handleChangeName}/><br/>
                    <input type="email" name="email" onChange={this.handleChangeEmail}/><br/>
                    <input type="password" name="password" onChange={this.handleChangePassword}/><br/>
                    <button type='submit'>Add Data</button>
                </form>
            </div>
        )
    }
}

export default API