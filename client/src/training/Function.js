// menampilkan sebuah value berupa nama dan memanggil fungsi GetAge agar memunculkan umur dalam bentuk <span></span>
function GetName(props) {
    return (
        <p>Hello My Name Is {props.name} And Im <GetAge age={props.age}/> Years Old</p>
    )
}

function GetAge(props) {
    return (
        <span>{props.age}</span>
    )
}

export default GetName