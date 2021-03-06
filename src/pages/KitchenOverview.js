import React from 'react';
import { HubConnectionBuilder, LogLevel } from '@microsoft/signalr'
import SplitItems from '../components/Kitchen Overview/SplitItems';
import toDo from '../components/Kitchen Overview/Arrays/ToDo';

class KitchenOverview extends React.Component {
    constructor() {
        super();

        this.state = {
            order: null,
            hubConnection: null,
        }
    }

    componentDidMount() {
        document.title = "Kitchen Overview | " + this.props.name
        this.ConnectToHub();
        let mounted = true;

        if (mounted) {
            let toDos = localStorage.getItem("toDo") ? JSON.parse(localStorage.getItem("toDo") || []) : [];
            toDos.map(item => {
                toDo.push(item);
                return true;
            })
        }

        return () => mounted = false;
    }

    ConnectToHub() {
        const hubConnection = new HubConnectionBuilder()
            .withUrl(`https://s3-restaurant-api.azurewebsites.net/Order`)
            .configureLogging(LogLevel.Information)
            .build();

        this.setState({ hubConnection }, () => {
            this.state.hubConnection
                .start()
                .then(() => console.log('Connection started!'))
                .catch(err => console.log('Error while establishing connection :('));

            this.state.hubConnection.on('OrderSent', (order) => {
                let processOrder = order;
                let processedItem = [];
                processOrder.title.map(item => (
                    processedItem.push(false)
                ));
                processOrder.state = processedItem;
                toDo.push(processOrder);
                localStorage.setItem("toDo", JSON.stringify(toDo));
                this.setState({ order });
            });
        });
    }

    render() {
        return (
            <div>
                <SplitItems />
            </div>
        )
    }
}
export default KitchenOverview
