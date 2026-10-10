import React from 'react';
import { HeartHandshake, Landmark, Sparkles } from 'lucide-react';
import Container from '../common/Container';
import SectionHeading from '../common/SectionHeading';

export default function TrustIntro({ site = {}, count = 6 }) {
  return (
    <section className="section section--cream">
      <Container className="intro-layout">
        <SectionHeading eyebrow="WHO WE ARE" title={site.tagline || 'One trust. Many institutions. One shared purpose.'} text={site.description || 'Al Huda Trust is a family of institutions committed to education, care and meaningful service to the community.'} />
        <div className="intro-side">
          <p className="intro-side__lead">We create spaces where learners can grow, families can find support and institutions can serve with purpose.</p>
          <div className="principle-list">
            <div><span><Landmark size={19} /></span><div><strong>Rooted in trust</strong><small>Responsible institutions, built for generations.</small></div></div>
            <div><span><Sparkles size={19} /></span><div><strong>Focused on growth</strong><small>Education that develops knowledge and character.</small></div></div>
            <div><span><HeartHandshake size={19} /></span><div><strong>Driven by service</strong><small>Care and community at the heart of our work.</small></div></div>
          </div>
          <div className="intro-number"><strong>0{count}</strong><span>institutions<br />and initiatives</span></div>
        </div>
      </Container>
    </section>
  );
}
