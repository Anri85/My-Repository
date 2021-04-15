import { Component } from 'react'

// latihan todolist
class TodoList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            // menentukan state item untuk menampung apa yang dituliskan oleh user dan state arrItem untuk menampung semua item
            item: '',
            arrItem : []
        }
    }

    // memasukan nilai yang ada pada state item kedalam array state arrItem
    HandleSubmit = (event) => {
        event.preventDefault()
        this.setState((state, props) => ({
            // memasukan nilai kedalam array
            arrItem: [...this.state.arrItem, this.state.item],
            item: ''
        }))
    }

    // memasukan apa yang diinputkan oleh user kedalam state item
    HandleChange = (event) => {
        event.preventDefault()
        this.setState((state, props) => ({
            item: event.target.value
        }))
    }



    render() {
        return (
            <form onSubmit={this.HandleSubmit}>
                <input value={this.state.list} onChange={this.HandleChange}></input>
                <button>Add To List</button>

                {/* menampilkan hasil*/}
                <ul>
                    {
                        this.state.arrItem.map((item, index) => {
                            return <li key={index}>{item}</li>
                        })
                    }
                </ul>
            </form>
        )
    }
}
export default TodoList