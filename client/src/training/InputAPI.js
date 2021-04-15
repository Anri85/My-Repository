import { Component } from 'react'
import axios from 'axios'

// mengkonsumsi data API menggunakan react
class InputAPI extends Component {
    // membuat constructor agar dapat membuat state
    constructor(props) {
        super(props)
        this.state = {
            // membuat state
            name: ''
        }
    }

    handleSubmit = (event) => {
        event.preventDefault()
        const input = {
            name: this.state.name
        }
    }



    // melakukan fetch data kedalam url API dengan axios
    componentDidMount() {
        axios.post('http://localhost:5000/api/data').then(response => {this.setState({result: response.data})})
    }

    // merender dan menampilkan data API
    render() {
        // mengakses value dari state result
        const {result} = this.state
        return (
            <div>
                {
                    // melakukan array map karena state result berisi array
                    result.map((item, index) => {
                        return <li key={index}>{item.name}</li>
                    })
                }
            </div>
        )
    }
}

export default InputAPI