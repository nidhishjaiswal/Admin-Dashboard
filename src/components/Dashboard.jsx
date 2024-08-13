import React, { useState, useEffect } from 'react';
import './dashboard.css';
import Card from './Card';
import Reports from './Reports';
import RecentSales from './RecentSales';
import TopSelling from './TopSelling';
import RecentActivity from './RecentActivity';
import BudgetReport from './BudgetReport';
import WebTraffic from './WebTraffic';
import CardFilter from './CardFilter';
import moment from 'moment';
import axios from 'axios';
import Clock from './Clock';

function Dashboard() {
    const [cards, setCards] = useState([]);
    const [orderDetails, setOrderDetails] = useState([]);
    const [approvedCount, setApprovedCount] = useState(0);
    const [totalAmount, setTotalAmount] = useState(0);
    const [filteredData, setFilteredData] = useState([]);
    const [startDate, setStartDate] = useState(null);
    const [endDate, setEndDate] = useState(null);

    const orderData = async () => {
        try {
            const res = await axios.get('http://localhost:5000/orderDetails');
            const data = res.data;
            setOrderDetails(data);
            filterData(data, startDate, endDate);
        } catch (e) {
            console.log(e.message);
        }
    };

    const fetchData = () => {
        try {
            fetch('http://localhost:4000/cards')
                .then((res) => res.json())
                .then((data) => {
                    setCards(data);
                })
                .catch((e) => console.log(e.message));
        } catch (e) {
            console.log(e.message);
        }
    };

    useEffect(() => {
        fetchData();
        orderData();
    }, []);

    useEffect(() => {
        filterData(orderDetails, startDate, endDate);
    }, [startDate, endDate, orderDetails]);

    const filterData = (data, startDate, endDate) => {
        let filtered = data;

        if (startDate && endDate) {
            const start = new Date(startDate);
            const end = new Date(endDate);
            filtered = data.filter((item) => {
                const itemDate = new Date(item.date);
                return itemDate >= start && itemDate <= end;
            });
        }

        // Calculate approved count and total amount for the filtered data
        let count = 0;
        let totalAmount = 0;

        filtered.forEach((item) => {
            if (item.status === 'Approved') {
                count++;
            }
            const amount = parseFloat(item.total_amount);
            if (!isNaN(amount)) {
                totalAmount += amount;
            }
        });

        setFilteredData(filtered);
        setApprovedCount(count);
        setTotalAmount(totalAmount);
    };

    const handleFilterChange = (dates) => {
        const [startDate, endDate] = dates.split(' - ');
        setStartDate(startDate);
        setEndDate(endDate);
    };


    return (
        <section className="dashboard section">
            <div className="row">
                <div className="">
                    {startDate && endDate &&
                        <h5>
                           Custom Range: <span>{moment(startDate).startOf('day').format('Do MMMM YYYY')} - {moment(endDate).startOf('day').format('Do MMMM YYYY')}</span>
                        </h5>
                    }
                </div>
                <div className="d-flex justify-content-end mb-1">
                    <h5>
                        <Clock/>
                    </h5>
                    <CardFilter filterChange={handleFilterChange} />
                </div>
                <div className="col-lg-8">
                    <div className="row">
                        <Card name={"Satellite"} totalsales={approvedCount} />
                        <Card name={"Vector"} totalsales={(new Intl.NumberFormat('en-IN').format(totalAmount.toFixed(2)))} />
                        <Card name={"Online"} totalsales={filteredData.length} />
                        <Card className="satellitedets" name={"Free"} totalsales={filteredData.length} />
                        <Card className="satellitedets" name={"Paid"} totalsales={filteredData.length} />
                        <div className="col-12">
                            <Reports />
                        </div>
                        <div className="col-12">
                            <RecentSales />
                        </div>
                        <div className="col-12">
                            <TopSelling />
                        </div>
                    </div>
                </div>
                <div className="col-lg-4">
                    <RecentActivity />
                    <BudgetReport />
                    <WebTraffic />
                </div>
            </div>
        </section>
    );
}

export default Dashboard;
