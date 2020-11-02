import React from 'react';
import Card from '@material-ui/core/Card';
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import FormControl from "@material-ui/core/FormControl";
import SaveIcon from '@material-ui/icons/Save';

const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap"
    },
    margin: {
      margin: theme.spacing(4)
    },
    withoutLabel: {
      marginTop: theme.spacing(4)
    },
    textField: {
      width: "40ch"
    }
}));

const Product = (props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [del, setDelete] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDeleteOpen = () => {
        setDelete(true);
    };

    const handleDeleteClose = () => {
        setDelete(false);
    };

    const [values, setValues] = React.useState({...props.product});

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values);
    };

    React.useEffect(() => {
        setValues(props.product);
    }, [props.product]);

    const saveProduct = () => {
        let price = parseFloat(values.price);
        if(isNaN(price)){
            alert('Price is not a valid number')
        }
        else{
            let product = values;
            product.price = price;

            fetch(`/api/${props.productType}/${props.product.id}`, {
                method: 'PUT',
                mode: 'cors',
                headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(product)
            }).catch(console.log)

            alert('Your changes have been saved');
            setOpen(false);
        }
    }

    return(
        <div>
            { props.product ? (
                <div>
                <Card >
                    <CardMedia style={{height: 400}}
                    component="img"
                    height="250"
                    src={`../../images/${props.productType}/${props.product.id}.jpg`}
                    alt={`Image for ${props.product.title} Not Found`}
                    title={props.product.title}
                    />
                    <CardContent>
                    <Typography gutterBottom variant="inherit" component="h2">
                        {props.product.title} <span style={{float: "right", color: "green"}}>{props.product.price}€</span>
                    </Typography>
                    <Typography component="h6">
                        {props.product.ingredients}
                    </Typography>
                    </CardContent>
                    <CardActions>
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                    <div style={{display: 'flex', alignItems: 'right'}}>
                    <Button size="large" color="primary" target="_blank" onClick={handleClickOpen}>
                        <span style={{fontWeight:"bold"}}>Edit</span>
                    </Button>
                    <Button size="large" color="primary" target="_blank" onClick={handleDeleteOpen}>
                        <span style={{fontWeight:"bold"}}>Delete</span>
                    </Button>
                    <Dialog
                        open={del}
                        onClose={handleDeleteClose}
                        aria-labelledby="product-title"
                    >
                        <DialogTitle id="product-title">{props.product.title}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Are you sure you want to delete this product?
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button size="medium" color="primary" >
                                Yes
                            </Button>
                            <Button size="medium" color="primary" onClick={handleDeleteClose}>
                                No
                            </Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="product-title"
                    >
                        <DialogTitle id="product-title">Id: {props.product.id}</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Edit this product's details
                            </DialogContentText>
                                <FormControl
                                    className={clsx(
                                    classes.margin,
                                    classes.withoutLabel,
                                    classes.textField
                                  )}
                                >
                                    {props.product.title ? (
                                        <TextField
                                            label="Title"
                                            value={values.title}
                                            onChange={handleChange("title")}
                                        />
                                    ) : null}
                                    {props.product.description ? (
                                        <TextField
                                            label="Description"
                                            value={values.description}
                                            onChange={handleChange("description")}
                                            multiline
                                        />
                                    ) : null}
                                    {props.product.ingredients ? (
                                        <TextField
                                            label="Ingredients"
                                            value={values.ingredients}
                                            onChange={handleChange("ingredients")}
                                            multiline
                                        />
                                    ) : null}
                                    {props.product.price ? (
                                        <TextField
                                            label="Price"
                                            value={values.price}
                                            onChange={handleChange("price")}
                                            InputProps={{
                                                endAdornment: <InputAdornment position="end">€</InputAdornment>
                                              }}
                                            style={{ display: "inline-block", width: "6ch"}}
                                        />
                                    ) : null}
                                </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button size="large" color="primary" target="_blank" onClick={saveProduct}>
                                <SaveIcon /> Save
                            </Button>
                            <IconButton aria-label="close" color="primary" onClick={handleClose}>
                                <CloseIcon />
                            </IconButton>
                        </DialogActions>
                    </Dialog>
                    </div>
                    </Grid>
                    </CardActions>
                </Card>
                </div>
            ) : null}
        </div>
    )
}
export default Product