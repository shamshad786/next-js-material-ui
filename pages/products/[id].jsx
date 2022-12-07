import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useRouter } from 'next/router'
import Skeleton from '@mui/material/Skeleton';
import axios from 'axios'
import Divider from '@mui/material/Divider';
import CurrencyRupeeIcon from '@mui/icons-material/CurrencyRupee';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const singleProductPage = () => {

  const router = useRouter()
  const { id } = router.query
  const [singleData, setSingleData] = React.useState({})
  const [loading,setLoading]= React.useState(false);


  React.useEffect(()=>{
  const singleProduct = async()=>{
    try{
      setLoading(true)
      const res = await axios.get(`https://fakestoreapi.com/products/${id}`)
      console.log(res.data)
      setSingleData(res.data)
      setLoading(false)
    }catch(err){
      console.log(err)
    }
  }
  singleProduct()
  },[id])


  return (
    <>
     <Container maxWidth="lg" padding='normal' >
      <div style={{padding: '20px'}}>

      {
        loading ? (
        <>
         <Skeleton animation="wave" variant="circular" width={40} height={40} />
        </>
        ):(
        <>
          <Card sx={{ maxWidth: 1366 }}>
      <CardMedia
        component="img"
        alt="green iguana"
        height="300"
        image={singleData?.image}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
         {singleData?.title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
         {singleData?.description}
        </Typography>
        <Divider />
      </CardContent>
      <CardActions>

        <Button size="small"><CurrencyRupeeIcon/>{singleData?.price}</Button>
        <Button size="small"  variant="contained"><ShoppingCartIcon/></Button>
      </CardActions>
    </Card>
        </>
        )
      }

      </div>
     </Container>
    </>


  )
}

export default singleProductPage