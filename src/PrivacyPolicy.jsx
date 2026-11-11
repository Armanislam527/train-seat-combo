export default function PrivacyPolicy() {
  return (
    <main className="wrap policy-page">
      <header className="policy-heading">
        <p className="eyebrow">Seat Combo</p>
        <h1 className="app-title">Privacy Policy</h1>
        <p className="section-intro">Last updated: November 11, 2026</p>
      </header>

      <div className="policy-content">
        <p>
          Train Seat (“the app”) helps users view Bangladesh Railway train
          schedules and seat availability and access the Bangladesh Railway
          e-ticketing service. This policy explains how information is handled
          when you use the app.
        </p>

        <section>
          <h2>Information handled</h2>
          <h3>Bangladesh Railway e-ticketing service</h3>
          <p>
            The app displays the Bangladesh Railway e-ticketing website (
            <a href="https://eticket.railway.gov.bd/">eticket.railway.gov.bd</a>)
            in an embedded web browser (WebView). When you use that service,
            Bangladesh Railway may collect and process information you provide,
            such as your account credentials, contact and passenger details,
            journey information, and booking or payment information. The Railway
            service may also use cookies and similar technologies to
            authenticate you and operate its website. This information is
            handled by Bangladesh Railway under its own privacy practices and
            terms.
          </p>

          <h3>Authentication and session information</h3>
          <p>
            To keep you signed in and support train and seat-availability
            requests, the app may read authentication and device-session values
            from the Railway website and store those values in the device’s
            secure storage. The app uses them to make requests to the Railway
            service on your behalf. WebView cookies and website storage may
            also be used for the Railway service to work. Do not share your
            device with people you do not trust, and sign out of the Railway
            service when appropriate.
          </p>

          <h3>Train and seat-availability requests</h3>
          <p>
            When you check train schedules or seat availability, the app may
            send the requested journey information and your session
            authentication values to Bangladesh Railway’s servers. The app
            receives the resulting information to display it to you. Train
            schedule information may also be bundled with the app.
          </p>

          <h3>Advertising</h3>
          <p>
            The app displays non-personalized ads through Google AdMob. Google
            and its partners may process information such as device or ad
            identifiers, app interactions, and diagnostic information to
            provide and measure ads and help prevent fraud. For more
            information, see{" "}
            <a href="https://policies.google.com/privacy">
              Google’s privacy policy
            </a>{" "}
            and information about{" "}
            <a href="https://policies.google.com/technologies/partner-sites">
              how Google uses data from sites or apps that use its services
            </a>
            .
          </p>
        </section>

        <section>
          <h2>How information is used</h2>
          <p>Information is used to:</p>
          <ul>
            <li>Provide the app’s train schedule and seat-availability features.</li>
            <li>
              Display the Bangladesh Railway e-ticketing service and maintain
              its authenticated session.
            </li>
            <li>Show non-personalized advertisements and support the app.</li>
            <li>Maintain, secure, and troubleshoot the app.</li>
          </ul>
        </section>

        <section>
          <h2>Sharing</h2>
          <p>
            The app does not sell your personal information. Information entered
            into the Railway website, and session information used for Railway
            requests, is sent to Bangladesh Railway to provide its services.
            Advertising-related information may be processed by Google AdMob as
            described above. These third parties handle information under their
            own privacy policies.
          </p>
        </section>

        <section>
          <h2>Data retention and deletion</h2>
          <p>
            Authentication and device-session values stored by the app remain
            on your device to support your session until they are overwritten or
            removed. You can clear the app’s stored data or uninstall the app to
            remove locally stored app data; this may not delete information
            held by Bangladesh Railway or Google.
          </p>
          <p>
            To delete your e-ticket account or associated data, please contact
            the Bangladesh Railway e-ticketing support channel or visit their
            official website portal.
          </p>
        </section>

        <section>
          <h2>Security</h2>
          <p>
            The app stores session values using the device’s secure storage
            facilities where available and uses the Railway service over its
            website connection. No method of electronic storage or transmission
            is completely secure, and the app cannot control the security
            practices of Bangladesh Railway or other third parties.
          </p>
        </section>

        <section>
          <h2>Children’s privacy</h2>
          <p>
            The app is not intended to collect personal information directly
            from children. The Railway e-ticketing service and advertising
            providers may apply their own age-related requirements and privacy
            practices.
          </p>
        </section>

        <section>
          <h2>Third-party services</h2>
          <p>
            Use of the Bangladesh Railway e-ticketing service is subject to
            Bangladesh Railway’s terms and privacy practices. Ads are provided
            by Google AdMob and are subject to Google’s terms and privacy
            policy. Please review those providers’ current notices for details
            about their collection and use of information.
          </p>
        </section>

        <section>
          <h2>Changes to this policy</h2>
          <p>
            This policy may be updated when the app or its practices change.
            The latest version should be made available through the app’s store
            listing or the website where this policy is published.
          </p>
        </section>

        <section>
          <h2>Contact</h2>
          <p>
            For questions about this app’s privacy practices, use the developer
            contact information shown on the app’s Google Play listing.
          </p>
        </section>
      </div>
    </main>
  );
}
