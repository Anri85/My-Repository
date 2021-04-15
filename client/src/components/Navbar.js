import { AppBar, Toolbar, Typography } from '@material-ui/core'

// membuat navbar component
const Navbar = () => {
    return (
        <AppBar position='static'>
            <Toolbar>
                <Typography variant='h6'>People Data</Typography>
            </Toolbar>
        </AppBar>
    )
}

export default Navbar