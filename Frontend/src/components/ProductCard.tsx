import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

interface Props{
  id: string;
  title: string;
  image: string;
  price: number
}

export default function ProductCard({ title, image, price}: Props) {
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
        <Button  variant= "contained" size="small" sx={{   
      
        }}>Add to Cart</Button>
       
      </CardActions>
    </Card>
  );
}
