import { Component } from 'react';

// contoh menampilkan sesuatu pada layar oleh sebuah class dengan penulisan yang harus diawali dengan huruf besar atau CamelCase
class SetTimer extends Component {
    // mempelajari tentang state (hanya dapat dibuat pada class) dan membuat sebuah timer untuk contoh
    constructor(props) {
        super(props)
        this.state = {
            time: props.startTime
        }
    }

    // sintaks dibawah digunakan apabila component siap digunakan
    componentDidMount() {
        this.doInterval = setInterval(() => this.doIncrease(), 1000)
    }

    // sintaks dibawah digunakan apabila component sudah digunakan
    componentWillUnmount() {
        clearInterval(this.doInterval)
    }

    // fungsi untuk mengubah nilai state yang bermula 0 menjadi 0++
    doIncrease() {
        this.setState((state, props) => ({
            time: parseInt(state.time) + 1
        }))
    }

    // melakukan rendering agar hasil dari class ini tampil pada layar
    render() {
        return (
            <div>{this.state.time} Second</div>
        )
    }
}

// melakukan export agar class ini dapat digunakan pada file yang mengimportnya
export default SetTimer