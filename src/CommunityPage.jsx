export default function CommunityPage() {
  return (
    <main className="wrap community-page">
      <section className="community-card" aria-labelledby="community-title">
        <p className="eyebrow">Help make Seat Combo better</p>
        <h1 id="community-title" className="app-title">
          Join the community
          <br />
          <span>to test the application.</span>
        </h1>
        <p className="section-intro">
          Connect with other people who want to try Seat Combo, share feedback,
          and help us improve the app.
        </p>
        <a
          className="button community-button"
          href="https://groups.google.com/g/trainseatchecker"
          target="_blank"
          rel="noreferrer"
        >
          Join the Google Group
          <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M7 17 17 7M7 7h10v10"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </a>
        <p className="community-email">
          Group email:{" "}
          <a href="mailto:trainseatchecker@googlegroups.com">
            trainseatchecker@googlegroups.com
          </a>
        </p>
      </section>
    </main>
  );
}
