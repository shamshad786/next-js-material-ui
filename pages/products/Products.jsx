import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Divider from '@mui/material/Divider';
import Pagination from '@mui/material/Pagination';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import Skeleton from '@mui/material/Skeleton';

import axios from 'axios'
import { useRouter } from 'next/router'


const Products = () => {

  const router = useRouter()

    const [data,setData] = React.useState([]);
    const [loading,setLoading]= React.useState(false);

    const getSingleProduct = async(e)=>{
        try{

            const itemId = e.currentTarget.id  
            let pageItem = `/products/${itemId}`
            router.push(pageItem)

        }catch(err){
            console.log(err)
        }
    }



    React.useEffect(()=>{
        const fetchProduducts = async()=>{
            try{
              setLoading(true)
                const res = await axios.get('https://fakestoreapi.com/products')
                console.log(res.data);
                setData(res.data)
                setLoading(false)
            }catch(err){
                console.log(err)
            }
        }
         fetchProduducts()   
    },[])
  

  return (
    <>
     <Container maxWidth="lg" padding='normal' >
        <div style={{display: 'flex', flexWrap: 'wrap', gap: '40px', padding: '20px 0px'}}>

        {
          loading ? (
          <>
           <Skeleton animation="wave" variant="circular" width={40} height={40} />
          </>
          ): (
          <>
             {
            data?.map((d,i)=>{
                return (
                  <>
                    <Card sx={{ maxWidth: 345 }} key={i}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={d.image}
                      alt="green iguana"
                    />
                    <CardContent>
                      <Typography gutterBottom variant="h5" component="div">
                        {d.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                      {d.description}
                      </Typography>
                      <Divider />

                    </CardContent>
                    <CardActions>
                      <Button size="small"><CurrencyRupeeIcon/>{d.price}</Button>
                      <Button size="small" variant="contained" id={d.id} onClick={getSingleProduct}  >View</Button>
                    </CardActions>
                  
                  </Card>
                  </>
                )
            })
        }
            </>)
        }

       
    </div>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'}}>
        <Pagination count={data.length} color="primary" />
        </div>
   
    </Container>
    </>
  )
}

export default Products