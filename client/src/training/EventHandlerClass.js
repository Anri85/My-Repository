import { Component } from 'react'

// contoh event handler dengan menggunakan class
class Toggle extends Component {
    constructor(props) {
        super(props)
        this.state = {
            toggleStatus: true
        }
        // sintaks dibawah adalah cara agar fungsi HandleClick dapat digunakan pada tag button
        this.HandleClick = this.HandleClick.bind(this)
    }

    HandleClick() {
        this.setState((state, props) => ({
            toggleStatus: !state.toggleStatus
        }))
    }

    render() {
        return (
            <button onClick={this.HandleClick}>{this.state.toggleStatus ? 'ON' : 'OFF'}</button>
        )
    }
}

export default Toggle