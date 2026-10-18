import { Hero } from './components/Hero/Hero';
import { Blessing } from './components/Blessing/Blessing';
import { Couple } from './components/Couple/Couple';
import { Countdown } from './components/Countdown/Countdown';
import { OrnamentDivider } from './components/OrnamentDivider/OrnamentDivider';
import { Events } from './components/Events/Events';
import { Venue } from './components/Venue/Venue';
import { Gallery } from './components/Gallery/Gallery';
import { Rsvp } from './components/Rsvp/Rsvp';
import { Footer } from './components/Footer/Footer';
import { TopBar } from './components/TopBar/TopBar';

export function App() {
  return (
    <>
      <TopBar />
      <Hero />
      <Blessing />
      <Couple />
      <Countdown />
      <OrnamentDivider variant="lotus" />
      <Events />
      <OrnamentDivider variant="paisley" />
      <Venue />
      <OrnamentDivider variant="lotus" />
      <Gallery />
      <Rsvp />
      <Footer />
    </>
  );
}
