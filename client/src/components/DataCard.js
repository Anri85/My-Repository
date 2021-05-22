import { Avatar, Card, CardHeader, CardContent, Typography, CardActions, Button } from '@material-ui/core'
import { Rating } from '@material-ui/lab'

// membuat card untuk menapilkan data
const DataCard = ({ item }) => {
    return (
        <Card>
            <CardHeader avatar={<Avatar/>} title={<Typography variant='h5'>{item.name}</Typography>}/>
            <CardContent>
                <Typography variant='caption'>
                    {item.description}
                </Typography>
                <Typography variant='h6'>Price: {Number(item.price)}</Typography>
                <Rating 
                    name= 'simple-rating'
                    value= {item.rating}
                />
            </CardContent>
            <CardActions>
                <Button variant='contained' size='small' color='primary'>Buy Now</Button>
                <Button size='small' color='secondary'>Learn More</Button>
            </CardActions>
        </Card>
    )
}

export default DataCard