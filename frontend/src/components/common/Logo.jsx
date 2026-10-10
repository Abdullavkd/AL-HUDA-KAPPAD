import React from 'react';
import { Link } from 'react-router-dom';

export default function Logo({ light = false }) {
  return (
    <Link to="/" className={`site-logo ${light ? 'site-logo--light' : ''}`} aria-label="Al Huda Trust home">
      <span className="site-logo__mark">AH</span>
      <span className="site-logo__text">
        <strong>Al Huda</strong>
        <small>TRUST · AINUL HUDA</small>
      </span>
    </Link>
  );
}
