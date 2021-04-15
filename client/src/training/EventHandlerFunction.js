// melakukan event handler dengan sebuah fungsi
function Clicker() {
    function HandleClick(event) {
        event.preventDefault()
        alert('Successfull')
    }
    return (
        <a href="#" onClick={HandleClick}>Please Click Here</a>
    )
}

export default Clicker