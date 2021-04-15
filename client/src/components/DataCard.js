import { Avatar, Card, CardHeader, CardContent, Typography, CardActions, Button } from '@material-ui/core'

// membuat card untuk menapilkan data
const DataCard = ({ item }) => {
    return (
        <Card>
            <CardHeader avatar={<Avatar/>} title={<Typography variant='h5'>{item.name}</Typography>} subheader={item.email}/>
            <CardContent>
                <Typography variant='caption'>
                    {item.description}
                </Typography>
                <Typography variant='h6'>Age: {Number(item.age)}</Typography>
            </CardContent>
            <CardActions>
                <Button variant='contained' size='small' color='primary'>Buy Now</Button>
                <Button size='small' color='secondary'>Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default DataCard