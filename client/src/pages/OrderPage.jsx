import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import './OrderPage.css'; // Import the CSS for styling the table and box shadow
import { DoctorContext } from '../components/DoctorContext';
import { jsPDF } from 'jspdf'; // Import jsPDF for PDF generation

const OrderPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { url, userId } = useContext(DoctorContext);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get(`${url}/api/v1/get-order/${userId}`);

        // Check if the API returned valid data (an array)
        if (Array.isArray(response.data.data)) {
          setOrders(response.data.data);
        } else {
          setOrders([]); // If it's not an array, set orders to an empty array
        }
      } catch (err) {
        setError('Failed to fetch orders');
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [url, userId]);

  const downloadReceipt = (order) => {
    const doc = new jsPDF();

    // Add Title and Styling
    doc.setFontSize(22);
    doc.setFont("helvetica", "bold");
    doc.text('Order Receipt', 105, 20, null, null, 'center');
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Add Order Information (Centered)
    doc.text(`Order ID: ${order._id}`, 105, 35, null, null, 'center');
    doc.text(`Date: ${new Date(order.createdAt).toLocaleDateString()}`, 105, 45, null, null, 'center');

    // Add Divider
    doc.setLineWidth(0.5);
    doc.line(10, 50, 200, 50); // Horizontal line

    // Add Customer Info Section
    doc.setFontSize(14);
    doc.text('Customer Information:', 20, 60);
    doc.setFontSize(12);
    doc.text(`Email: ${order.userData.email}`, 20, 70);
    doc.text(`Age: ${order.userData.age}`, 20, 80);
    doc.text(`Address: ${order.userData.address}`, 20, 90);

    // Add Divider
    doc.setLineWidth(0.5);
    doc.line(10, 100, 200, 100); // Horizontal line

    // Add Order Details Section (Using Table)
    doc.setFontSize(14);
    doc.text('Order Details:', 20, 110);

    const startY = 120;
    const rowHeight = 10;
    const margin = 20;
    const tableWidth = 180;
    const itemColumnWidth = 100;
    const priceColumnWidth = 50;

    // Header Row
    doc.setFontSize(12);
    doc.setFont("helvetica", "bold");
    doc.text('Doctor ID', margin, startY);
    doc.text('Amount', margin + itemColumnWidth, startY);
    doc.line(margin, startY + 2, margin + tableWidth, startY + 2); // Horizontal line

    // Order Items Rows
    doc.setFont("helvetica", "normal");
    let currentY = startY + rowHeight;
    order.items.forEach((item, index) => {
      doc.text(item.doctorId.name, margin, currentY); // Display doctor's name
      doc.text('$20', margin + itemColumnWidth, currentY); // Assuming $20 per doctor
      currentY += rowHeight;
    });

    // Total Amount Section
    doc.setFont("helvetica", "bold");
    doc.text('Total Booking Payment:', margin, currentY);
    doc.text(`$${order.bookingPayment}`, margin + itemColumnWidth, currentY);

    // Add Payment Status
    currentY += 10;
    doc.setFont("helvetica", "normal");
    doc.text('Payment Status:', margin, currentY);
    doc.setFont("helvetica", "bold");
    doc.text(order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1), margin + itemColumnWidth, currentY);

    // Add Divider
    doc.setLineWidth(0.5);
    doc.line(10, currentY + 10, 200, currentY + 10); // Horizontal line

    // Add Footer
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.text('Thank you for choosing our service!', 105, currentY + 20, null, null, 'center');
    doc.text('Visit us again for more appointments.', 105, currentY + 30, null, null, 'center');

    // Save the PDF
    doc.save(`Order-${order._id}.pdf`);
  };

  if (loading) return <p>Loading orders...</p>;

  return (
    <div className="receipt-container">
      <h2 style={{ textAlign: 'center'}}>My Orders</h2>
      
      {/* Conditional rendering for no orders */}
      {orders.length === 0 ? (
        <p style={{ textAlign: 'center', paddingTop:'8rem' }}>No orders placed yet</p>
      ) : (
        orders.map(order => (
          <div key={order._id} className="receipt">
            <h3>Receipt</h3>
            <table className="receipt-table">
              <tbody>
                <tr>
                  <td><strong>Appointment ID:</strong></td>
                  <td>{order._id}</td>
                </tr>
                <tr>
                  <td><strong>Date:</strong></td>
                  <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                </tr>
                <tr>
                  <td><strong>Email:</strong></td>
                  <td>{order.userData.email}</td>
                </tr>
                <tr>
                  <td><strong>Age:</strong></td>
                  <td>{order.userData.age}</td>
                </tr>
                <tr>
                  <td><strong>Address:</strong></td>
                  <td>{order.userData.address}</td>
                </tr>
              </tbody>
            </table>
            <div className="receipt-section">
              <h4>Appointment Details</h4>
              <table className="order-details">
                <thead>
                  <tr>
                    <th>Doctor Name</th>
                    <th>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {order.items.map((item, index) => (
                    <tr key={index}>
                      <td>{item.doctorId.name}</td>
                      <td>{item.doctorId.appointmentFee}</td> {/* Assuming $20 per doctor */}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="total-payment">
              <p><strong>Total Booking Payment:</strong> ${order.bookingPayment}</p>
              <p><strong>Payment Status:</strong> {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}</p>
            </div>
            <button onClick={() => downloadReceipt(order)}>Download Receipt</button>
          </div>
        ))
      )}
      
      {/* Display an error message if fetching failed */}
      {error && !orders.length && (
        <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>
      )}
    </div>
  );
};

export default OrderPage;
