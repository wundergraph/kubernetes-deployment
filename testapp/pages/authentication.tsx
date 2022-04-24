import { NextPage } from "next";
import styles from "../styles/Home.module.css";
import { useLiveQuery, useWunderGraph } from "../components/generated/hooks";
import { FC, useState } from "react";

const JobsPage: NextPage = () => {
  const { user, client } = useWunderGraph();
  const [city, setCity] = useState<string>("Berlin");
  const onClick = () => {
    if (user === null || user === undefined) {
      client.login.github();
    } else {
      client.logout();
    }
  };
  return (
    <div className={styles.examplesContainer}>
      <h1>Authentication aware Data Fetching</h1>
      <p>
        This Example looks similar to Realtime Subscriptions with one exception,
        users have to be authenticated to be able to use this Operation.
      </p>
      <p>
        Click the Login Button to login using GitHub. We provide a GitHub demo
        Oauth2 account for this to work.
      </p>
      <p>
        While not logged in, the LiveQuery will reset and wait until the user is
        logged in.
      </p>
      <p>
        Once you logged in, the LiveQuery will start streaming until you
        de-focus the browser tab or log out.
      </p>
      <p>
        When you re-focus the tab, the LiveQuery will start streaming again. You
        can open the DevTools / Network tab to observe this.
      </p>
      <p>
        Next, you can try something. First, make sure you're logged in. Then
        open a second tab and open the same url. Log yourself out in the second
        tab. Then come back to the first tab and see what happens once you focus
        the tab. =)
      </p>
      <p>
        Finally, log in again and go back to the second tab. This is what we
        call{" "}
        <a
          href="https://wundergraph.com/docs/overview/features/authentication_aware_data_fetching?utm_source=nextjs-starter"
          target="_blank"
        >
          authentication aware data fetching
        </a>
      </p>
      <p>
        You can change the authentication configuration at{" "}
        <code className={styles.code}>
          .wundergraph/wundergraph.operations.ts:54
        </code>
      </p>
      <p>
        Learn more on how to configure your Operations:{" "}
        <a
          target="_blank"
          href="https://wundergraph.com/docs/reference/wundergraph_operations_ts/overview?utm_source=nextjs-starter"
        >
          Operations Configuration Docs
        </a>
      </p>
      <h2>Login State</h2>
      <div>{user ? <p>{JSON.stringify(user)}</p> : <p>Not logged in</p>}</div>
      <button onClick={onClick}>{!user ? "Login" : "Logout"}</button>
      <h2>Enter City Search</h2>
      <input value={city} onChange={(e) => setCity(e.target.value)} />
      <ProtectedLiveWeather city={city} />
    </div>
  );
};

const ProtectedLiveWeather: FC<{ city: string }> = ({ city }) => {
  const liveWeather = useLiveQuery.ProtectedWeather({
    input: { forCity: city },
  });
  return (
    <div>
      {liveWeather.response.status === "requiresAuthentication" && (
        <p>LiveQuery waiting for user to be authenticated</p>
      )}
      {liveWeather.response.status === "loading" && <p>Loading...</p>}
      {liveWeather.response.status === "error" && <p>Error</p>}
      {liveWeather.response.status === "ok" && (
        <div>
          <h3>City: {liveWeather.response.body.data.getCityByName.name}</h3>
          <p>
            {JSON.stringify(liveWeather.response.body.data.getCityByName.coord)}
          </p>
          <h3>Temperature</h3>
          <p>
            {JSON.stringify(
              liveWeather.response.body.data.getCityByName.weather.temperature
            )}
          </p>
          <h3>Wind</h3>
          <p>
            {JSON.stringify(
              liveWeather.response.body.data.getCityByName.weather.wind
            )}
          </p>
        </div>
      )}
    </div>
  );
};

export default JobsPage;
