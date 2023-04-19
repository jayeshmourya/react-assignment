import React, { useState } from 'react'
import { TextField, Button, Grid, Box } from '@material-ui/core'
import { Add, Remove } from '@material-ui/icons'
import axios from 'axios'
const Home = () => {

    const [formfields, setformfields] = useState([{ image: '', title: '', description: '', qty: '', price: '', date: '' }])

    const handleOnchange = (event,index) => {
        
        let data=[...formfields]
        if (event.target.name=='image'){
            
            
            data[index][event.target.name]=event.target.files[index]
        }
        else{
        data[index][event.target.name]=event.target.value
    }
        setformfields(data);

    }


    const submit=()=>{
        const actualdata= formfields
        // console.log(actualdata)
        for (let i in actualdata){
            console.log(i)
            let url='http://127.0.0.1:8000/products/'
        axios.post(url,actualdata[i],{
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          })
        

        }
        
    }

    const handleadd = () => {
        let object={ image: '', title: '', description: '', qty: '', price: '', date: '' }
        setformfields([...formfields,object])
    }


    const handlesubtract = () => {
        setformfields(formfields.splice(1))

    }
    return (


        <div>

            <Box style={{ float: 'center', marginLeft: 75 }}>
                <Add style={{ position: 'inherit', float: 'center' }} onClick={handleadd} color='primary' /><br />
                <Remove style={{ position: 'inherit', float: 'center' }} onClick={handlesubtract} color='secondary' />
            </Box>
            <form onSubmit={submit}>

            {
                formfields.map((form, index) => {
                    return (


                        <Grid key={index} container spacing={1} >
                            {index+1}
                            <Grid item xs={2} >image:<input onChange={event=>handleOnchange(event,index)}name='image' type='file' value={form.name} /></Grid>
                            < Grid item xs={1}>title:<TextField  onChange={event=>handleOnchange(event,index)}name='title'  value={form.title}label='title' size='small' variant='outlined' color='primary' /></Grid>
                            < Grid item xs={2}>description:<TextField onChange={event=>handleOnchange(event,index)}name='description' value={form.description}size='small' variant='outlined' color='primary' /></Grid>
                            < Grid item xs={1} >qty:<TextField onChange={event=>handleOnchange(event,index)}type='number' name='qty' size='small' value={form.qty}variant='outlined' color='primary' /></Grid>
                            < Grid item xs={1}>price:<TextField onChange={event=>handleOnchange(event,index)}size='small' name='price' variant='outlined' value={form.price}color='primary' /></Grid>
                            < Grid item xs={1} >date:<TextField onChange={event=>handleOnchange(event,index)}name='date' type='date' size='small' value={form.date}variant='outlined' color='primary' /></Grid>

                        </Grid>
                    )
                })
            }
            </form>
            <Button onClick={submit} style={{ marginTop: 20 }} color='primary' variant='contained' type='submit'>SAVE</Button>



        </div>
    )
}


export default Home



