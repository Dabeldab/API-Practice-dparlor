import React from 'react'


const CustomerItem = ({ customer }) => (
        
    <div className="customer-card">
        <h1>Contact Card</h1>
        <h3>{customer.firstName}</h3>
        <p>Email: {customer.email}</p>
        {/* Other fields */}
    </div>
);


export default CustomerItem