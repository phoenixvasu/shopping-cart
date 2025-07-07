import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/forbidden.css';

const Forbidden = () => (
  <div className="forbidden-page">
    <h1>403 - Forbidden</h1>
    <p>You do not have permission to view this page.</p>
    <Link to="/">Go to Home</Link>
  </div>
);

export default Forbidden; 