import { useEffect, useRef, useState } from "react";

const API_BASE_URL = "https://api.trainseatchecker.tech/web";
const TRAIN_LIST_URL = `${API_BASE_URL}/all-trains/info`;
const TRAIN_SCHEDULE_URL = `${API_BASE_URL}/train-routes`;
const BLOCKLIST_URL = `${API_BASE_URL}/seat-pairs/blacklist`;

const KNOWN_TRAIN_NAMES = [
  ["Suborno Express", "701"], ["Suborno Express", "702"],
  ["Mahanagar Godhuli", "703"], ["Mahanagar Godhuli", "704"],
  ["Ekota Express", "705"], ["Ekota Express", "706"],
  ["Tista Express", "707"], ["Tista Express", "708"],
  ["Parabat Express", "709"], ["Parabat Express", "710"],
  ["Karatoya Express", "713"], ["Karatoya Express", "714"],
  ["Kapotaksha Express", "715"], ["Kapotaksha Express", "716"],
  ["Joyantika Express", "717"], ["Joyantika Express", "718"],
  ["Paharika Express", "719"], ["Paharika Express", "720"],
  ["Mahanagar Express", "721"], ["Mahanagar Express", "722"],
  ["Sundarban Express", "725"], ["Sundarban Express", "726"],
  ["Rupsha Express", "727"], ["Rupsha Express", "728"],
  ["Agnibina Express", "735"], ["Agnibina Express", "736"],
  ["Upaban Express", "739"], ["Upaban Express", "740"],
  ["Turna Express", "741"], ["Turna Express", "742"],
  ["Brahmaputra Express", "743"], ["Brahmaputra Express", "744"],
  ["Jamuna Express", "745"], ["Jamuna Express", "746"],
  ["Lalmoni Express", "751"], ["Lalmoni Express", "752"],
  ["Silk City Express", "753"], ["Silk City Express", "754"],
  ["Drutojan Express", "757"], ["Drutojan Express", "758"],
  ["Padma Express", "759"], ["Padma Express", "760"],
  ["Sagardari Express", "761"], ["Sagardari Express", "762"],
  ["Chitra Express", "763"], ["Chitra Express", "764"],
  ["Nil Sagar Express", "765"], ["Nil Sagar Express", "766"],
  ["Dhumketu Express", "769"], ["Dhumketu Express", "770"],
  ["Rangpur Express", "771"], ["Rangpur Express", "772"],
  ["Kalni Express", "773"], ["Kalni Express", "774"],
  ["Sonar Bangla Express", "787"], ["Sonar Bangla Express", "788"],
  ["Banalata Express", "791"], ["Banalata Express", "792"],
  ["Panchagarh Express", "793"], ["Panchagarh Express", "794"],
  ["Benapole Express", "795"], ["Benapole Express", "796"],
  ["Kurigram Express", "797"], ["Kurigram Express", "798"],
];

const TRAIN_NAMES_BY_NUMBER = new Map(
  KNOWN_TRAIN_NAMES.map(([name, number]) => [number, name]),
);

function apiHeaders(includeJsonContentType = false) {
  return {
    Accept: "application/json",
    "X-Requested-With": "XMLHttpRequest",
    ...(includeJsonContentType ? { "Content-Type": "application/json" } : {}),
  };
}

async function readJsonResponse(response, label) {
  const text = await response.text();
  let payload;
  try {
    payload = JSON.parse(text);
  } catch {
    throw new Error(`${label} returned HTTP ${response.status} with a non-JSON response.`);
  }
  if (!response.ok) {
    const apiMessage = payload?.error?.messages?.join("; ");
    throw new Error(apiMessage || `${label} returned HTTP ${response.status}`);
  }
  return payload;
}

function BlockedSeatPairs() {
  const [filter, setFilter] = useState("");
  const [pairs, setPairs] = useState([]);
  const [status, setStatus] = useState({
    message: "Loading shared seat-pair list…",
    kind: "",
  });
  const [loading, setLoading] = useState(false);
  const requestId = useRef(0);

  async function loadBlocklist() {
    const currentRequestId = ++requestId.current;
    setLoading(true);
    setStatus({ message: "Loading shared seat-pair list…", kind: "" });

    try {
      const response = await fetch(BLOCKLIST_URL, {
        method: "GET",
        headers: apiHeaders(),
      });
      const payload = await readJsonResponse(response, "Seat-pair blocklist API");
      if (!Array.isArray(payload?.pairs)) {
        throw new Error("Unexpected blocklist response: expected an array at pairs.");
      }
      if (currentRequestId !== requestId.current) return;

      const validPairs = payload.pairs
        .filter(
          (pair) =>
            pair &&
            /^\d{1,6}$/.test(String(pair.trainNumber || "")) &&
            typeof pair.from === "string" &&
            typeof pair.to === "string",
        )
        .map((pair) => ({
          trainNumber: String(pair.trainNumber),
          from: pair.from,
          to: pair.to,
        }))
        .sort(
          (a, b) =>
            a.trainNumber.localeCompare(b.trainNumber, undefined, {
              numeric: true,
            }) ||
            a.from.localeCompare(b.from) ||
            a.to.localeCompare(b.to),
        );
      setPairs(validPairs);
      setStatus({
        message: validPairs.length
          ? "Showing shared reports of station pairs without seat allocation."
          : "No shared seat pairs without allocation yet.",
        kind: "",
      });
    } catch (error) {
      if (currentRequestId !== requestId.current) return;
      console.error("Could not load seat-pair blocklist:", error);
      setStatus({
        message: `${error instanceof Error ? error.message : String(error)} Check the Worker deployment and CORS settings.`,
        kind: "error",
      });
    } finally {
      if (currentRequestId === requestId.current) {
        setLoading(false);
      }
    }
  }

  useEffect(() => {
    loadBlocklist();
  }, []);

  const query = filter.trim();
  const visiblePairs = pairs.filter(
    (pair) => !query || pair.trainNumber.includes(query),
  );

  return (
    <section className="lookup blocklist-card" aria-labelledby="blocklist-heading">
      <div className="details-heading">
        <h2 id="blocklist-heading">Seat pairs without allocation</h2>
        <span className="note">
          {loading && pairs.length === 0
            ? "Loading…"
            : `${visiblePairs.length} shown · ${pairs.length} total`}
        </span>
      </div>
      <p className="blocklist-description">
        Pairs with missing seat data are shared here by train. Confirmed
        zero-seat results are not included.
      </p>
      <div className="blocklist-tools">
        <label htmlFor="blocklist-filter">
          Filter by train number
          <input
            id="blocklist-filter"
            type="search"
            inputMode="numeric"
            placeholder="Leave empty to show all trains"
            autoComplete="off"
            value={filter}
            onChange={(event) => setFilter(event.target.value)}
          />
        </label>
        <button
          className="primary"
          type="button"
          onClick={loadBlocklist}
          disabled={loading}
        >
          {loading ? "Loading blocklist…" : "Refresh full blocklist"}
        </button>
      </div>
      <p className={`blocklist-summary ${status.kind}`} role="status" aria-live="polite">
        {status.message}
      </p>
      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th scope="col">Train</th>
              <th scope="col">From</th>
              <th scope="col">To</th>
            </tr>
          </thead>
          <tbody>
            {visiblePairs.length ? (
              visiblePairs.map((pair, index) => (
                <tr key={`${pair.trainNumber}-${pair.from}-${pair.to}-${index}`}>
                  <td>{pair.trainNumber}</td>
                  <td>{pair.from}</td>
                  <td>{pair.to}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td className="empty" colSpan="3">
                  {loading && pairs.length === 0
                    ? "Loading seat pairs…"
                    : status.kind === "error" && pairs.length === 0
                      ? "Unable to load shared seat pairs."
                      : query
                        ? "No seat pairs without allocation for this train."
                        : "No shared seat pairs yet."}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default function TrainTimetable() {
  const [activeTab, setActiveTab] = useState("timetable");
  const [query, setQuery] = useState("");
  const [trains, setTrains] = useState(null);
  const [suggestions, setSuggestions] = useState([]);
  const [selectedTrain, setSelectedTrain] = useState(null);
  const [details, setDetails] = useState(null);
  const [status, setStatus] = useState({
    message: "Start typing a train name or number.",
    kind: "",
  });
  const [requestTrace, setRequestTrace] = useState("No request sent yet.");
  const [loadingTrains, setLoadingTrains] = useState(false);
  const [loadingSchedule, setLoadingSchedule] = useState(false);
  const trainIndexPromise = useRef(null);
  const suggestionRequestId = useRef(0);
  const scheduleRequestId = useRef(0);

  function showRequestTrace(request) {
    setRequestTrace(JSON.stringify(request, null, 2));
  }

  async function loadTrainIndex() {
    if (trains) return trains;
    if (trainIndexPromise.current) return trainIndexPromise.current;

    const request = (async () => {
      showRequestTrace({ method: "GET", url: TRAIN_LIST_URL, status: "pending" });
      try {
        const response = await fetch(TRAIN_LIST_URL, {
          method: "GET",
          headers: apiHeaders(),
        });
        const payload = await readJsonResponse(response, "Train list API");
        showRequestTrace({
          method: "GET",
          url: TRAIN_LIST_URL,
          status: response.status,
          response: payload,
        });
        if (!Array.isArray(payload?.data?.trains)) {
          throw new Error(
            "Unexpected train list response: expected an array at data.trains.",
          );
        }

        const index = payload.data.trains
          .filter((train) => train && train.train_number != null)
          .map((train) => {
            const number = String(train.train_number);
            return {
              name: TRAIN_NAMES_BY_NUMBER.get(number) || "",
              number,
              origin: train.origin_city || "",
              destination: train.destination_city || "",
              zone: train.zone || "",
            };
          });
        setTrains(index);
        return index;
      } catch (error) {
        showRequestTrace({
          method: "GET",
          url: TRAIN_LIST_URL,
          error: error instanceof Error ? error.message : String(error),
        });
        throw error;
      }
    })();

    trainIndexPromise.current = request;
    try {
      return await request;
    } catch (error) {
      trainIndexPromise.current = null;
      throw error;
    }
  }

  async function loadTrainList() {
    setLoadingTrains(true);
    setStatus({
      message: "Fetching the train list through your Cloudflare Worker…",
      kind: "",
    });
    try {
      const index = await loadTrainIndex();
      setStatus({
        message: `Loaded ${index.length} train records. Search by train number or station to choose a schedule.`,
        kind: "success",
      });
    } catch (error) {
      console.error("Could not load train list:", error);
      const detail = error instanceof Error ? error.message : String(error);
      setStatus({
        message: `${detail} Confirm the Worker is deployed and allows this page's origin.`,
        kind: "error",
      });
    } finally {
      setLoadingTrains(false);
    }
  }

  async function searchTrains(value) {
    const currentRequestId = ++suggestionRequestId.current;
    scheduleRequestId.current += 1;
    setQuery(value);
    setSelectedTrain(null);
    setDetails(null);
    setLoadingSchedule(false);
    setSuggestions([]);
    setStatus({ message: "Loading train list from the server…", kind: "" });

    const search = value.trim().toLocaleLowerCase();
    if (!search) {
      setStatus({ message: "Start typing a train name or number.", kind: "" });
      return;
    }

    try {
      const index = await loadTrainIndex();
      if (currentRequestId !== suggestionRequestId.current) return;
      const matches = index
        .filter((train) =>
          [train.name, train.number, train.origin, train.destination].some(
            (field) => field.toLocaleLowerCase().includes(search),
          ),
        )
        .slice(0, 12);
      setSuggestions(matches);
      setStatus({
        message: matches.length
          ? `${matches.length} matching train${matches.length === 1 ? "" : "s"} from the server. Select one to load its schedule.`
          : "No matching trains found in the server train list.",
        kind: "",
      });
    } catch (error) {
      if (currentRequestId !== suggestionRequestId.current) return;
      console.error("Could not load train list:", error);
      const detail = error instanceof Error ? error.message : String(error);
      setStatus({
        message: `${detail} The API may block this page's origin via CORS; the API owner must allow your localhost or deployment domain.`,
        kind: "error",
      });
    }
  }

  async function loadSelectedTrain(train = selectedTrain) {
    if (!train) return;
    const currentRequestId = ++scheduleRequestId.current;
    const requestBody = { model: train.number };
    setLoadingSchedule(true);
    setStatus({
      message: `Loading details for ${train.name || `Train ${train.number}`} (${train.number})…`,
      kind: "",
    });
    showRequestTrace({
      method: "POST",
      url: TRAIN_SCHEDULE_URL,
      headers: apiHeaders(true),
      body: requestBody,
      status: "pending",
    });

    try {
      const response = await fetch(TRAIN_SCHEDULE_URL, {
        method: "POST",
        headers: apiHeaders(true),
        body: JSON.stringify(requestBody),
      });
      const payload = await readJsonResponse(response, "Train schedule API");
      showRequestTrace({
        method: "POST",
        url: TRAIN_SCHEDULE_URL,
        body: requestBody,
        status: response.status,
        response: payload,
      });
      if (!payload?.data || !Array.isArray(payload.data.routes)) {
        throw new Error("Unexpected API response: expected train details at data.");
      }
      if (currentRequestId !== scheduleRequestId.current) return;
      if (!payload.data.train_name) {
        throw new Error(
          `The API did not find train ${train.number}. Check the train list.`,
        );
      }

      setDetails(payload.data);
      setStatus({
        message: `Loaded schedule details for ${payload.data.train_name}.`,
        kind: "success",
      });
    } catch (error) {
      if (currentRequestId !== scheduleRequestId.current) return;
      console.error("Could not load train details:", error);
      const detail = error instanceof Error ? error.message : String(error);
      showRequestTrace({
        method: "POST",
        url: TRAIN_SCHEDULE_URL,
        body: requestBody,
        error: detail,
      });
      const runHint =
        detail === "Failed to fetch"
          ? "This is commonly caused by the railway API rejecting this page's origin via CORS. Frontend-only code cannot override that policy; deploy on an allowed origin or ask the API owner to allow your production domain."
          : "";
      setStatus({ message: `${detail} ${runHint}`, kind: "error" });
    } finally {
      if (currentRequestId === scheduleRequestId.current) {
        setLoadingSchedule(false);
      }
    }
  }

  function chooseTrain(train) {
    suggestionRequestId.current += 1;
    setQuery(`${train.name || `Train ${train.number}`} (${train.number})`);
    setSuggestions([]);
    setSelectedTrain(train);
    setDetails(null);
    loadSelectedTrain(train);
  }

  return (
    <>
      <div className="timetable-tabs" role="tablist" aria-label="Train information">
        <button
          id="timetable-tab"
          className="timetable-tab"
          type="button"
          role="tab"
          aria-selected={activeTab === "timetable"}
          aria-controls="timetable-panel"
          onClick={() => setActiveTab("timetable")}
        >
          Train timetable
        </button>
        <button
          id="blocklist-tab"
          className="timetable-tab"
          type="button"
          role="tab"
          aria-selected={activeTab === "blocklist"}
          aria-controls="blocklist-panel"
          onClick={() => setActiveTab("blocklist")}
        >
          No seat allocation
        </button>
      </div>
      {activeTab === "blocklist" ? (
        <div
          id="blocklist-panel"
          className="timetable"
          role="tabpanel"
          aria-labelledby="blocklist-tab"
          tabIndex="0"
        >
          <BlockedSeatPairs />
        </div>
      ) : (
        <section
          id="timetable-panel"
          className="timetable"
          role="tabpanel"
          aria-labelledby="timetable-tab"
          tabIndex="0"
        >
          <div className="lookup">
        <div className="lookup-head">
          <div>
            <h2 id="search-heading">Train timetable</h2>
            <p>Search by train name or number to see stops and timings.</p>
          </div>
          <button
            className="primary load-list-button"
            type="button"
            onClick={loadTrainList}
            disabled={loadingTrains}
          >
            {loadingTrains
              ? "Loading train list…"
              : trains
                ? "Reload train list from proxy"
                : "Load train list"}
          </button>
        </div>
        <label htmlFor="train-search">Train name or number</label>
        <input
          id="train-search"
          type="search"
          placeholder="For example, Suborno or 701"
          autoComplete="off"
          aria-controls="suggestions"
          aria-autocomplete="list"
          value={query}
          onChange={(event) => searchTrains(event.target.value)}
          onFocus={() => {
            if (query) searchTrains(query);
          }}
        />
        <div id="suggestions" role="listbox" aria-label="Matching trains">
          {suggestions.map((train) => (
            <button
              className="suggestion"
              type="button"
              role="option"
              aria-selected="false"
              key={train.number}
              onClick={() => chooseTrain(train)}
            >
              <span>
                {train.name ||
                  `${train.origin || "Unknown origin"} → ${train.destination || "Unknown destination"}`}
              </span>
              <span className="suggestion-number">{train.number}</span>
            </button>
          ))}
        </div>
        <div className="actions">
          <button
            className="primary"
            type="button"
            onClick={() => loadSelectedTrain()}
            disabled={!selectedTrain || loadingSchedule}
          >
            {loadingSchedule
              ? "Loading schedule…"
              : details
                ? "Refresh train details"
                : selectedTrain
                  ? "Load train details"
                  : "Select a train to view its schedule"}
          </button>
          <span className="note">
            {selectedTrain
              ? `${selectedTrain.name || `Train ${selectedTrain.number}`} (${selectedTrain.number}) selected`
              : "No train selected"}
          </span>
        </div>
        <p id="status" className={status.kind} role="status" aria-live="polite">
          {status.message}
        </p>
        <details className="api-trace">
          <summary>Technical details</summary>
          <pre aria-live="polite">{requestTrace}</pre>
        </details>
          </div>

          {details && (
            <section className="lookup details-card" aria-labelledby="details-title">
          <div className="details-heading">
            <h2 id="details-title">{details.train_name || "Train details"}</h2>
            <span>Train {selectedTrain.number}</span>
          </div>
          <div className="meta">
            <span>
              <strong>Operating days:</strong>{" "}
              {Array.isArray(details.days) && details.days.length
                ? details.days.join(", ")
                : "Not provided"}
            </span>
            <span>
              <strong>Total duration:</strong>{" "}
              {details.total_duration || "Not provided"}
            </span>
          </div>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th scope="col">Station</th>
                  <th scope="col">Arrival</th>
                  <th scope="col">Departure</th>
                  <th scope="col">Halt</th>
                  <th scope="col">Duration</th>
                </tr>
              </thead>
              <tbody>
                {details.routes.length ? (
                  details.routes.map((stop, index) => (
                    <tr key={`${stop.city || "stop"}-${index}`}>
                      <td>{stop.city || "—"}</td>
                      <td>{stop.arrival_time || "—"}</td>
                      <td>{stop.departure_time || "—"}</td>
                      <td>{stop.halt || "—"}</td>
                      <td>{stop.duration || "—"}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5">No route stops were returned for this train.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
            </section>
          )}
        </section>
      )}
    </>
  );
}
