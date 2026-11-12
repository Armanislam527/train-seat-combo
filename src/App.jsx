import { Link, Navigate, Route, Routes } from "react-router-dom";
import CommunityPage from "./CommunityPage.jsx";
import PrivacyPolicy from "./PrivacyPolicy.jsx";
import TermsOfService from "./TermsOfService.jsx";
import TrainTimetable from "./TrainTimetable.jsx";
import app from './../assets/app.svg';
function BrandMark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      {/* <svg viewBox="0 0 24 24" fill="none">
        <path
          d="M5 18V6h9.5a4.5 4.5 0 0 1 0 9H5m0-4h9m-9 7 3-3m-3 3-3-3m17-9v12m-3-3 3 3 3-3"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg> */}
      <img src={app} alt="Our logo" className="app-logo" />
    </span>
  );
}

function Header() {
  return (
    <header className="site-header">
      <div className="wrap topbar">
        <Link className="brand" to="/home" aria-label="Seat Combo home">
          <BrandMark />
          Seat Combo
        </Link>
        <nav className="nav" aria-label="Main navigation">
          <Link to="/home">Home</Link>
          <Link className="timetable-link" to="/app">Train timetable</Link>
          <Link className="nav-cta" to="/community">Join the community</Link>
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <div className="wrap footer-inner">
        <Link className="brand" to="/home">
          <BrandMark />
          Seat Combo
        </Link>
        <Link className="footer-link" to="/terms-of-service">
          Terms of Service
        </Link>
        <Link className="footer-link" to="/privacy-policy">
          Privacy Policy
        </Link>
        <span>Made for Bangladesh rail journeys.</span>
      </div>
    </footer>
  );
}

function PageLayout({ children }) {
  return (
    <>
      <Header />
      {children}
      <Footer />
    </>
  );
}

function LandingPage() {
  return (
    <PageLayout>
      <main>
        <section className="wrap hero" aria-labelledby="hero-title">
          <div>
            <p className="eyebrow">A better way to plan your rail journey</p>
            <h1 id="hero-title">
              Every seat pair.
              <br />
              <span>One simple journey.</span>
            </h1>
            <p className="hero-copy">
              Find your train, see the stops, and discover more ways to get
              there. Bangladesh rail travel, made a little clearer.
            </p>
            <div className="hero-actions">
              <Link className="button" to="/app">
                Explore the timetable
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12h14m-6-6 6 6-6 6"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <a className="text-link" href="#features">
                Meet the app <span>↓</span>
              </a>
            </div>
            <p className="hero-note">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M12 3 4.5 6v5.5c0 4.6 3.2 7.8 7.5 9.5 4.3-1.7 7.5-4.9 7.5-9.5V6L12 3Z"
                  stroke="currentColor"
                  strokeWidth="1.6"
                />
                <path
                  d="m9 12 2 2 4-4"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              Timetables at a glance. Seat availability when you’re signed in.
            </p>
          </div>

          <div
            className="showcase"
            aria-label="Preview of the Seat Combo mobile app"
          >
            <div className="floating-tag tag-one">
              <span aria-hidden="true">↗</span>
              <div>
                <strong>More ways to go</strong>
                <span>Explore seat combinations</span>
              </div>
            </div>
            <div className="phone">
              <div className="phone-screen">
                <div className="phone-status">
                  <span>9:41</span>
                  <span>●●●　◖　▰</span>
                </div>
                <div className="app-heading">
                  <BrandMark />
                  <div>
                    <strong>Seat Combo</strong>
                    <small>Bangladesh rail, made clearer</small>
                  </div>
                </div>
                <h2 className="screen-title">Where to next?</h2>
                <p className="screen-caption">Find your journey, your way.</p>
                <div className="search-card">
                  <div className="route-stop">
                    <span className="route-symbol from" />
                    <div>
                      <span>From</span>
                      <strong>Dhaka</strong>
                    </div>
                  </div>
                  <div className="route-divider" />
                  <div className="route-stop">
                    <span className="route-symbol to" />
                    <div>
                      <span>To</span>
                      <strong>Rajshahi</strong>
                    </div>
                  </div>
                  <div className="screen-options">
                    <div className="option">
                      <span>TRAVEL DATE</span>
                      <strong>Today</strong>
                    </div>
                    <div className="option">
                      <span>SEAT CLASS</span>
                      <strong>Shovon Chair</strong>
                    </div>
                  </div>
                  <div className="screen-search">Show seat combinations</div>
                </div>
                <div className="screen-result">
                  <div className="result-head">
                    <span>YOUR JOURNEY</span>
                    <strong>Train timetable</strong>
                  </div>
                  <div className="result-route">
                    <span>Dhaka</span>
                    <i />
                    <span>Rajshahi</span>
                  </div>
                  <p className="result-meta">
                    Train schedules · Stop-by-stop routes
                  </p>
                </div>
              </div>
            </div>
            <div className="floating-tag tag-two">
              <span aria-hidden="true">▦</span>
              <div>
                <strong>See every stop</strong>
                <span>Plan beyond the endpoints</span>
              </div>
            </div>
          </div>
        </section>

        <section
          className="wrap features"
          id="features"
          aria-labelledby="features-title"
        >
          <div className="section-heading">
            <p className="eyebrow">Made for the journey</p>
            <h2 id="features-title">Just what you need to get going.</h2>
            <p className="section-intro">
              A simple companion for finding trains and making sense of the
              route ahead.
            </p>
          </div>
          <div className="feature-grid">
            <article className="feature">
              <span className="feature-icon" aria-hidden="true">⌕</span>
              <h3>Search your route</h3>
              <p>
                Choose your stations, travel date, and seat class to get
                started.
              </p>
            </article>
            <article className="feature">
              <span className="feature-icon" aria-hidden="true">⌁</span>
              <h3>Explore seat pairs</h3>
              <p>
                Check ticketable combinations between stops along your
                journey.
              </p>
            </article>
            <article className="feature">
              <span className="feature-icon" aria-hidden="true">▤</span>
              <h3>Know the timetable</h3>
              <p>
                Look up train names, numbers, operating days, and stop-by-stop
                schedules.
              </p>
            </article>
          </div>
        </section>

        <section
          className="steps"
          id="how-it-works"
          aria-labelledby="steps-title"
        >
          <div className="wrap">
            <div className="section-heading">
              <p className="eyebrow">Three small steps</p>
              <h2 id="steps-title">Your next trip, made simpler.</h2>
              <p className="section-intro">
                From choosing a route to finding a train that fits.
              </p>
            </div>
            <div className="step-grid">
              <article className="step">
                <span className="step-number">01 / YOUR ROUTE</span>
                <h3>Pick your stations</h3>
                <p>Choose where you’re starting, where you’re going, and when.</p>
              </article>
              <article className="step">
                <span className="step-number">02 / YOUR TRAIN</span>
                <h3>Explore the options</h3>
                <p>
                  See trains that run your route and the stations along the way.
                </p>
              </article>
              <article className="step">
                <span className="step-number">03 / YOUR SEAT</span>
                <h3>Find a seat pair</h3>
                <p>
                  Check available station-to-station tickets with your railway
                  session.
                </p>
              </article>
            </div>
            <Link className="button steps-button" to="/app">
              Find your train
            </Link>
          </div>
        </section>
      </main>
    </PageLayout>
  );
}

function AppPage() {
  return (
    <PageLayout>
      <main className="wrap app-page">
        <section className="section-heading">
          <p className="eyebrow">Try it here</p>
          <h1 className="app-title">Find your train.</h1>
          <p className="section-intro">
            Search the Bangladesh train list and explore a train’s full route
            and schedule.
          </p>
        </section>
        <TrainTimetable />
      </main>
    </PageLayout>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/home" replace />} />
      <Route path="/home" element={<LandingPage />} />
      <Route path="/app" element={<AppPage />} />
      <Route
        path="/community"
        element={
          <PageLayout>
            <CommunityPage />
          </PageLayout>
        }
      />
      <Route
        path="/terms-of-service"
        element={
          <PageLayout>
            <TermsOfService />
          </PageLayout>
        }
      />
      <Route
        path="/privacy-policy"
        element={
          <PageLayout>
            <PrivacyPolicy />
          </PageLayout>
        }
      />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}
