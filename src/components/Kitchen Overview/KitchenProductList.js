import React from "react";
import Grid from "@material-ui/core/Grid";
import KitchenProduct from "./KitchenProduct";
import Typography from "@material-ui/core/Typography";
import IconButton from '@material-ui/core/IconButton';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';

class ProductsList extends React.Component {

  displayProducts(product) {
    var rows = [];
    for (let i = 0; i < product.title.length; i++) {
      rows.push(
        <KitchenProduct key={i}
          product={product.title[i]}
          enabled={product.state[i]}
          element={product}
          position={i}
          listTitle={this.props.listTitle}
          itemReady={this.props.itemReady}
        />);
    }

    return <div>{rows}</div>;
  }

  checkItemsProgress(state) {
    for (let i = 0; i < state.length; i++) {
      if (state[i] === false)
        return false;
    }

    return true;
  }

  getTotalItemProgress(items) {
    let count = 0;

    if (items === undefined || items === null)
      return;

    items.forEach(function(order) {
      if (!order)
        count++;
    });

    return count;
  }

  render() {
    return (
      <Grid item xs={12} sm={6} lg={4} xl={4} style={{ padding: 25 }}>
        <Typography variant="h4">{this.props.listTitle}</Typography>
        {this.props.fullScreen ? (
          <div className="background-lightgray kitchen-overview-container-fullscreen">
            <div className="upperRightButton" onClick={this.props.click}>
              <button>X</button>
            </div>
            {this.props.products.length > 0 ?
              <div>
                {this.props.products.map(product => (
                  <Grid container style={{ backgroundColor: 'white', padding: 10 }}>
                    <Grid item xs={6}>
                      <Typography variant="h5">Table {product.tableNumber}</Typography>
                      <Typography variant="h5">Timestamp {product.timeStamp}</Typography>
                    </Grid>
                    <Grid item xs={6}>
                      {this.getTotalItemProgress(product.state) > 0 ?
                          <Typography style={{textAlign: 'right'}} variant="h5">{this.getTotalItemProgress(product.state)} items remaining!</Typography>
                          :
                          <Typography style={{textAlign: 'right'}} variant="h5">Order is done!</Typography>
                      }
                    </Grid>
                    {this.displayProducts(product)}
                    <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                      <div style={{ display: 'flex', alignItems: 'right' }}>
                        <IconButton aria-label="push" onClick={() => this.props.goToNext(product)}>
                          <ArrowForwardIcon />
                        </IconButton>
                      </div>
                    </Grid>
                  </Grid>
                ))}
              </div>
              : (null)}
          </div>
        ) : (
            <div className="background-lightgray kitchen-overview-container">
              <div className="upperRightButton" onClick={this.props.click}>
                <button>-</button>
              </div>
              {this.props.products.length > 0 ?
                <div>
                  {this.props.products.map(product => (
                    <Grid container style={{ backgroundColor: 'white', padding: 10 }}>
                      <Grid item xs={6}>
                        <Typography variant="h5">Table {product.tableNumber}</Typography>
                        <Typography variant="h5">Timestamp {product.timeStamp}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        {this.getTotalItemProgress(product.state) > 0 ?
                            <Typography style={{textAlign: 'right'}} variant="h5">{this.getTotalItemProgress(product.state)} items remaining!</Typography>
                            :
                            <Typography style={{textAlign: 'right'}} variant="h5">Order is done!</Typography>
                        }
                      </Grid>
                      {this.displayProducts(product)}
                      {this.checkItemsProgress(product.state) ? (
                        <Grid container alignItems="flex-start" justify="flex-end" direction="row">
                          <div style={{ display: 'flex', alignItems: 'right' }}>
                            <IconButton aria-label="push" onClick={() => this.props.goToNext(product)}>
                              <ArrowForwardIcon />
                            </IconButton>
                          </div>
                        </Grid>
                      ) : null}
                    </Grid>
                  ))}
                </div>
                : (null)}
            </div>
          )}
      </Grid>
    );
  }
}
export default ProductsList;
