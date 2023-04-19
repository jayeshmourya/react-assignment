import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { Button, Grid, TextField } from '@material-ui/core'
import { createContext } from 'react'
const View = () => {
    const [startindex, setstartindex] = useState(0)
    const [endindex, setendindex] = useState(2)
    const [postslength, setpostslength] = useState()

    const [products, setproducts] = useState([])

    const [searchbar, setsearchbar] = useState('')
    const [searchdisplay, setsearchdisplay] = useState('')
    const [productdisplay, setproductdisplay] = useState('')
    const[filtered,setfiltered]=useState([])

    useEffect(() => {
        let url = 'http://127.0.0.1:8000/products/'
        axios.get(url)
            .then(response => {
                const data = response.data;
                setproducts(data)
                setpostslength(data.length)

            })
            .catch(error => {
                // Handle error here
                console.log(error);
            });
    }, [])

    const handleprevious = () => {

        setstartindex(startindex - 2)
        setendindex(endindex - 2)

    }
    const handlenext = () => {
        setstartindex(startindex + 2)
        setendindex(endindex + 2)
    }

    const handlesearch = (e) => {
        setsearchbar(e.target.value)
        console.log(searchbar,'searchbar')
        if(searchbar==''){
            setsearchdisplay('none')
            setproductdisplay('')
        }

    }
    const handlesearchclick = () => {
        
        setproductdisplay('none')
        setsearchdisplay('')
        setfiltered(
            products.filter((item)=>item.title==searchbar||item.description==searchbar))
         }
         console.log(filtered)
    

        


    console.log(searchbar,'searchbar')
    return (
        <div>

            <div>List of all the Products</div><br />

            <div style={{ float: 'right' }}> <TextField onChange={handlesearch} size='small' value={searchbar} variant='outlined'></TextField>
                <Button color='secondary' onClick={handlesearchclick} variant='contained'> Search</Button></div><br />

                <div >
                     {
                products.map((item, index) => {
                    return (

                        <Grid key={index} style={{display:productdisplay}}container spacing={1} >
                            <Grid item >{index + 1}</Grid>
                            <Grid item xs={2} >  <img style={{ width: 100, height: 100 }} src={item.image} /></Grid>
                            <Grid item xs={1} > {item.title}</Grid>
                            <Grid item xs={2} > {item.description}</Grid>
                            <Grid item xs={1} > {item.qty}</Grid>
                            <Grid item xs={1} > {item.price}</Grid>
                            <Grid item xs={2} > {item.date}</Grid>
                        </Grid>

                    )
                }).slice(startindex, endindex)

            }
            </div>

            <div >
            {
                filtered.map((item, index) => {
                    return (

                        <Grid key={index}style={{display:searchdisplay}} container spacing={1} >
                            <Grid item >{index + 1}</Grid>
                            <Grid item xs={2} >  <img style={{ width: 100, height: 100 }} src={item.image} /></Grid>
                            <Grid item xs={1} > {item.title}</Grid>
                            <Grid item xs={2} > {item.description}</Grid>
                            <Grid item xs={1} > {item.qty}</Grid>
                            <Grid item xs={1} > {item.price}</Grid>
                            <Grid item xs={2} > {item.date}</Grid>
                        </Grid>

                    )
                })

            }</div>

            <Button disabled={true ? startindex < 2 : false} onClick={handleprevious} style={{ float: 'left' }} color='primary' variant='contained'>&#8592;PREVIOUS</Button>
            <Button disabled={true ? endindex > postslength : false} onClick={handlenext} style={{ float: 'right' }} color='primary' variant='contained'>NEXT&#8594;</Button>

        </div>
    )
}

export default View
