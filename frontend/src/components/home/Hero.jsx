import React from 'react';
import { ArrowDownRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import Container from '../common/Container';

export default function Hero({ hero = {}, institutionCount = 6 }) {
  const title = hero.title || 'Growing minds. Building character. Serving people.';
  const subtitle = hero.subtitle || 'Al Huda Trust brings education, care and community service together through a family of institutions.';
  return (
    <section className="hero-section">
      <div className="hero-section__glow hero-section__glow--one" />
      <div className="hero-section__glow hero-section__glow--two" />
      <div className="hero-section__grid" />
      <Container className="hero-section__container">
        <div className="hero-section__copy">
          <div className="hero-kicker"><span /> AL HUDA TRUST · AINUL HUDA</div>
          <h1>{title}</h1>
          <p>{subtitle}</p>
          <div className="hero-actions">
            <Button to="/institutions">Explore our institutions</Button>
            <Link to="/about" className="text-link text-link--light"><span className="text-link__icon"><Play size={13} fill="currentColor" /></span> Discover our story</Link>
          </div>
        </div>
        <div className="hero-section__visual" aria-hidden="true">
          <div className="hero-orbit hero-orbit--outer" />
          <div className="hero-orbit hero-orbit--inner" />
          <div className="hero-emblem"><span>AH</span><small>EST.</small></div>
          <div className="hero-float-card hero-float-card--top"><strong>{institutionCount}</strong><span>institutions<br />under one vision</span></div>
          <div className="hero-float-card hero-float-card--bottom"><ArrowDownRight size={18} /><span>Education<br />Care · Service</span></div>
        </div>
      </Container>
      <div className="hero-scroll"><ArrowDownRight size={16} /> Scroll to explore</div>
    </section>
  );
}
