import { BrowserRouter, Switch, Route, Link} from 'react-router-dom'
import axios from 'axios'
import FetchAPI from '../API/FetchAPI'

// membuat function untuk react-router-dom
function ReactRouter() {
    {/* BrouserRouter berfungsi untuk membuat halaman ini menjada halaman root untuk aplikasi single page */}
    return <BrowserRouter>
    <div>
      <nav>
        <li>
          {/* Link berfungsi untuk membuat url */}
          <Link to='/'>Home</Link>
        </li>
        <li>
          <Link to='/users'>Users</Link>
        </li>
        <li>
            <Link to='/post'>Post Data</Link>
        </li>

        <main>
          {/* Switch digunakan untuk menampilkan halaman spesifik mis: 404 Not Found */}
          <Switch>
            {/* Route berfungsi untuk menyambungkan url yang tersedia dengan componennya masing masing */}
            <Route path='/' exact component={Home}/>
            <Route path='/users' exact component={Users}/>
            {/* contoh apabila pengguna ingin melihat detail user secara spesifik */}
            <Route path='/user/:id' exact component={DetailUser}/>
            {/* contoh apabila halaman yang dituju tidak ditemukan */}
            <Route component={NotFoud}/>
          </Switch>
        </main>
      </nav>
    </div>
  </BrowserRouter>
}

// membuat fungsi untuk componen yang akan diakses oleh react-router-dom
function Home() {
    return <h2>Home Page</h2>
}
function Users() {
return <div>
        <h2>Users Page</h2>
          <FetchAPI/>
        </div>
  }
function DetailUser({ match }) {
    const detail = ''
    axios.get(`http://localhost:5000/api/data/${match.params.id}`).then(response => {detail = response.data})
    return <p>{detail}</p>
}
function NotFoud() {
    return <h2>404 Not Found!</h2>
}

export default ReactRouter