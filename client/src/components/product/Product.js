// importing npm package and component
import { CircularProgress, Container, Grid, Paper, Slider, makeStyles, TextField, Typography, FormControl, RadioGroup, FormControlLabel, Radio } from '@material-ui/core'
import { useState, useEffect } from 'react'
import { useHistory, useLocation } from 'react-router-dom'
import axios from 'axios'
import DataCard from './ProductCard'

// membuat syle untuk data page
const useStyles = makeStyles({
    root: {
        marginTop: 15,
    },
    loader: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    paper: {
        marginBottom: '1rem',
        padding: '10px',
    },
    filter: {
        padding: '0 1.5rem'
    },
    PriceRangeInput: {
        display: 'flex',
        justifyContent: 'space-between'
    }
})

// membuat halaman untuk menampilkan data
const DataPage = () => {
    // membuat fungsi untuk menerapkan style
    const classes = useStyles()
    // variabel agar merefresh halaman secara otomatis saat mengatur filter
    const history = useHistory()
    const location = useLocation()
    // mengambil paramter filter pada url
    const params = location.search ? location.search : null
    // membuat component state (menampung data dari api)
    const [Data, setData] = useState([])
    const [Loading, setLoading] = useState(false)
    // membuat component state (untuk fungsionalitas filters)
    const [SliderMax, setSliderMax] = useState(100)
    const [PriceRange, setPriceRange] = useState([0, 500000])
    const [PriceOrder, setPriceOrder] = useState('descending')
    const [Filter, setFilter] = useState('')
    const [Sorting, setSorting] = useState('')

    const updateUIValue = (uiValues) => {
        setSliderMax(uiValues.maxPrice)
        if(uiValues.filtering.price) {
            let priceFilter = uiValues.filtering.price

            setPriceRange([Number(priceFilter.gte), Number(priceFilter.lte)])
        }

        if(uiValues.sorting.price) {
            let priceSort = uiValues.sorting.price
            setPriceOrder(priceSort)
        }
    }
    
    // membuat side effect (melakukan koneksi dengan API)
    useEffect(() => {
        let cancel
        const fetchData = async () => {
            setLoading(true)
            try {
                let query
                if(params && !Filter) {
                    query = params
                } else {
                    query = Filter
                }

                if(Sorting) {
                    if(query.length === 0) {
                        query = `?sort=${Sorting}`
                    } else {
                        query = query + '&sort=' + Sorting
                    }
                }

                const {...item} = await axios({
                    method: 'GET',
                    url: `http://localhost:5000/api/product${query}`,
                    cancelToken: new axios.CancelToken((C) => {
                        cancel = C
                    })
                })
                setData(item.data.value)
                setLoading(false)
                updateUIValue(item.data.uiValues)
            } catch (error) {
                if(axios.isCancel(error)) {
                    return
                } else {
                    console.log(error.response.data)
                }
            }
        }
        fetchData()

        return () => {
            cancel()
        }
    }, [Filter, params, Sorting])

    // fungsionalitas min age dan max age (filters)
    const handlePriceInputChange = (e, type) => {
        let newRange
        if(type === 'lower') {
            newRange = [...PriceRange]
            newRange[0] = Number(e.target.value)

            setPriceRange(newRange)
        }

        if(type === 'upper') {
            newRange = [...PriceRange]
            newRange[1] = Number(e.target.value)

            setPriceRange(newRange)
        }
    }
    const onTextFieldCommitHandler = () => {
        buildRangeFilter(PriceRange)
    }

    // fungsionalitas slider
    const onSliderCommitHandler = (e, newValue) => {
        buildRangeFilter(newValue)
    }
    const buildRangeFilter = (newValue) => {
        const urlFilter = `?price[gte]=${newValue[0]}&price[lte]=${newValue[1]}`
        setFilter(urlFilter)

        history.push(urlFilter)
    }

    // fungsionalitas Sort By
    const handleSortChange = (e) => {
        setPriceOrder(e.target.value)

        if(e.target.value === 'ascending') {
            setSorting('price')
        } else if (e.target.value === 'descending') {
            setSorting('-price')
        }
    }

    return (
        <Container className={classes.root}>
            {/* tempat tombol filter dan sorting */}
            <Paper className={classes.paper}>
                <Grid container>
                    <Grid item={true} xs={12} sm={6}>
                        <Typography gutterBottom>Filters</Typography>
                        <div className={classes.filter}>
                            <Slider
                                min={0}
                                max={Number(SliderMax)}
                                value={PriceRange}
                                valueLabelDisplay='auto'
                                disabled={Loading}
                                onChange={(e, newValue) => {
                                    setPriceRange(newValue)
                                }}
                                onChangeCommitted={onSliderCommitHandler}
                            />
                            <div className={classes.PriceRangeInput}>
                                <TextField
                                    size='small'
                                    id='lower'
                                    label='Min Price'
                                    variant='outlined'
                                    type='number'
                                    disabled={Loading}
                                    value={PriceRange[0]}
                                    onChange={(e) => {
                                        handlePriceInputChange(e, 'lower')
                                    }}
                                    onBlur={onTextFieldCommitHandler}
                                />
                                <TextField
                                    size='small'
                                    id='upper'
                                    label='Max Price'
                                    variant='outlined'
                                    type='number'
                                    disabled={Loading}
                                    value={PriceRange[1]}
                                    onChange={(e) => {
                                        handlePriceInputChange(e, 'upper')
                                    }}
                                    onBlur={onTextFieldCommitHandler}
                                />
                            </div>
                        </div>
                    </Grid>

                    <Grid item={true} xs={12} sm={6}>
                        <Typography gutterBottom>Sort By</Typography>
                        <FormControl component='fieldset' className={classes.filter}>
                            <RadioGroup aria-label='price-order' name='price-order' value={PriceOrder} onChange={handleSortChange}>
                                <FormControlLabel
                                    disabled={Loading}
                                    control={<Radio/>}
                                    label='Max Price - To Min'
                                    value='descending'
                                />
                                <FormControlLabel
                                    disabled={Loading}
                                    control={<Radio/>}
                                    label='Min Price - To Max'
                                    value='ascending'
                                />
                            </RadioGroup>
                        </FormControl>
                    </Grid>
                </Grid>
            </Paper>

            {/* menampilkan list data */}
            <Grid container spacing={1}>
                {Loading ? (
                    <div className={classes.loader}>
                        <CircularProgress size='4rem' thickness={7}/>
                    </div>
                ) : (
                    Data.map((item) => {
                        return (
                            <Grid item={true} key={item._id} xs={12} sm={9} md={6} lg={3}>
                                {/* memanggil componen card pada file DataCard */}
                                <DataCard item={item}/>
                            </Grid>
                        )
                    })
                )}
            </Grid>
        </Container>
    )
}

export default DataPage