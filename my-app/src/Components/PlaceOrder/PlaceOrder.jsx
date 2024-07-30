import React, { useState } from 'react'
import axios from 'axios'
import Navbar from '../Navbar/Navbar';
import '../PlaceOrder/PlaceOrder.css'
function PlaceOrder() {
    const [formData, setFormData] = useState({
        receiverName: '',
        receiverAddress: '',
        receiverPincode: '',
        receiverPhone: '',
        parcelWeight: '',
        price: '',
        deliveryDate: '',
    });

    const [errors, setErrors] = useState({});

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.receiverName) newErrors.receiverName = 'Receiver Name is required';
        if (!formData.receiverAddress) newErrors.receiverAddress = 'Receiver Address is required';
        if (!formData.receiverPincode) newErrors.receiverPincode = 'Receiver Pincode is required';
        if (!formData.receiverPhone) newErrors.receiverPhone = 'Receiver Phone is required';
        if (!formData.parcelWeight) newErrors.parcelWeight = 'Parcel Weight is required';
        if (!formData.price) newErrors.price = 'Price is required';
        if (!formData.deliveryDate) newErrors.deliveryDate = 'Delivery Date is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            await axios.post('https://localhost:7258/api/Order/AddOrder', formData);
            alert('Order placed successfully!');
            // Redirect or reset form here
        } catch (error) {
            console.error('Error placing order:', error);
            alert('Failed to place order.');
        }
    };

    return (
        <div className='background'>
            <Navbar></Navbar>
            <div className="container">
                <h2>Place a New Courier Order</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="receiverName">Receiver Name</label>
                        <input
                            type="text"
                            id="receiverName"
                            name="receiverName"
                            value={formData.receiverName}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.receiverName && <small className="form-text text-danger">{errors.receiverName}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="receiverAddress">Receiver Address</label>
                        <input
                            type="text"
                            id="receiverAddress"
                            name="receiverAddress"
                            value={formData.receiverAddress}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.receiverAddress && <small className="form-text text-danger">{errors.receiverAddress}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="receiverPincode">Receiver Pincode</label>
                        <input
                            type="text"
                            id="receiverPincode"
                            name="receiverPincode"
                            value={formData.receiverPincode}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.receiverPincode && <small className="form-text text-danger">{errors.receiverPincode}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="receiverPhone">Receiver Phone</label>
                        <input
                            type="text"
                            id="receiverPhone"
                            name="receiverPhone"
                            value={formData.receiverPhone}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.receiverPhone && <small className="form-text text-danger">{errors.receiverPhone}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="parcelWeight">Parcel Weight</label>
                        <input
                            type="text"
                            id="parcelWeight"
                            name="parcelWeight"
                            value={formData.parcelWeight}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.parcelWeight && <small className="form-text text-danger">{errors.parcelWeight}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.price && <small className="form-text text-danger">{errors.price}</small>}
                    </div>

                    <div className="form-group">
                        <label htmlFor="deliveryDate">Delivery Date</label>
                        <input
                            type="date"
                            id="deliveryDate"
                            name="deliveryDate"
                            value={formData.deliveryDate}
                            onChange={handleChange}
                            className="form-control"
                        />
                        {errors.deliveryDate && <small className="form-text text-danger">{errors.deliveryDate}</small>}
                    </div>

                    <button type="submit" className="btn-primary">Place Order</button>
                </form>
            </div>
        </div>
    );
};

export default PlaceOrder