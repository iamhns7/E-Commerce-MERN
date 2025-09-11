import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useCart } from '../context/cart/CartContext';

interface Props{
  _id: string;
  title: string;
  image: string;
  price: number
}

export default function ProductCard({ _id ,title, image, price}: Props) {
  const {AddItemToCart} = useCart();
  return ( 
    <Card >
      <CardMedia
        sx={{ height: "250px" 

        }}
        image={image}
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          {title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
         {price +" $"}
        </Typography>
      </CardContent>
      <CardActions>
        <Button  variant= "contained" size="small"  onClick={() => AddItemToCart(_id)} >Add to Cart</Button>
       
      </CardActions>
    </Card>
  );
}

