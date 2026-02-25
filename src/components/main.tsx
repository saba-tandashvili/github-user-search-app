import "./main.css";
import { useState } from "react";
import Sun from "../assets/icon-sun.svg";
import Moon from "../assets/icon-moon.svg";
import Search from "../assets/icon-search.svg";
import Cat from "../assets/cat.png";
import Location from "../assets/icon-location.svg";
import Twitter from "../assets/icon-twitter.svg";
import Website from "../assets/icon-website.svg";
import Company from "../assets/icon-company.svg";

interface UserType {
  name: string | null;
  avatar_url: string | null;
  join: string | null;
  bio: string | null;
  login: string | null;
  public_repos: string | null;
  followers: string | null;
  following: string | null;
  location: string | null;
  twitter_username: string | null;
  blog: string | null;
  company: string | null;
  html_url: string | null;
}

function Main() {
  const [user, setUser] = useState<UserType | undefined>();
  const [search, setSearch] = useState("");
  const [light, setLight] = useState(false);

  const searchf = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      getUser();
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);

    const day = String(date.getUTCDate()).padStart(2, "0");
    const month = date.toLocaleString("en-GB", { month: "short" });
    const year = date.getUTCFullYear();

    return `Joined ${day} ${month} ${year}`;
  };

  const getUser = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${search}`);
      const jsonData = await response.json();

      setUser({
        name: jsonData.name,
        avatar_url: jsonData.avatar_url,
        join: formatDate(jsonData.created_at),
        login: jsonData.login,
        bio: jsonData.bio,
        public_repos: jsonData.public_repos,
        followers: jsonData.followers,
        following: jsonData.following,
        location: jsonData.location,
        twitter_username: jsonData.twitter_username,
        blog: jsonData.blog,
        company: jsonData.company,
        html_url: jsonData.html_url,
      });
    } catch (error) {
      console.error("Failed to fetch user:", error);
    }
  };

  return (
    <>
      <div className={!light ? "container" : "lcontainer"}>
        <div className="whole">
          <div className="top">
            <h1>devfinder</h1>
            <button
              className={!light ? "mode-switch" : "lmode-switch"}
              onClick={() => setLight(!light)}
            >
              {!light ? "LIGHT" : "DARK"}
              <img src={!light ? Sun : Moon} alt="" />
            </button>
          </div>

          <div className={!light ? "search" : "lsearch"}>
            <img src={Search} alt="" />
            <input
              type="text"
              onChange={(event) => {
                setSearch(event.target.value);
              }}
              placeholder="Search GitHub username…"
              onKeyDown={searchf}
            />
            <button onClick={() => getUser()}>Search</button>
          </div>

          <div className={!light ? "main" : "lmain"}>
            <img src={user?.avatar_url || Cat} className="pfp" />

            <div className="info">
              <div className={!light ? "name-t" : "lname-t"}>
                <h1>{!user ? "The Octocat" : user?.name || user?.login}</h1>
                <p>{user?.join || "Joined 25 Jan 2011"}</p>
              </div>

              <a href={`${user?.html_url}`}>{user?.login ? `@${user?.login}` : "@octocat"}</a>

              <p className={!light ? "bio" : "lbio"}>
                {search === ""
                  ? "This profile has no bio"
                  : user?.bio || "This profile has no bio"}
              </p>

              <div className={!light ? "numsd" : "lnumsd"}>
                <div className={!light ? "infod" : "linfod"}>
                  <p>Repos</p>
                  <h2>{!user ? "8" : user?.public_repos}</h2>
                </div>

                <div className={!light ? "infod" : "linfod"}>
                  <p>Followers</p>
                  <h2>{!user ? "3938" : user?.followers}</h2>
                </div>

                <div className={!light ? "infod" : "linfod"}>
                  <p>Following</p>
                  <h2>{!user ? "9" : user?.following}</h2>
                </div>
              </div>

              <div className={!light ? "linfo" : "llinfo"}>
                <p>
                  <img src={Location} className="location" />
                  {!user ? "San Francisco" : user?.location || "Not Available"}
                </p>
                <a href={`https://x.com/${user?.twitter_username}`}>
                  <img src={Twitter} className="twitter" />
                  {!user
                    ? "Not Available"
                    : user?.twitter_username || "Not Available"}
                </a>
                <a href={`${user?.blog}`} className="blog">
                  <img src={Website} />
                  {!user
                    ? "https://github.blog"
                    : user?.blog || "Not Available"}
                </a>
                <p>
                  <img src={Company} className="company" />
                  {!user ? "@github" : user?.company || "Not Available"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Main;
