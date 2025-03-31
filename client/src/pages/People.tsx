import React, { useState } from "react";
import PeopleListItem from "../components/PeopleListItem/PeopleListItem";
import useGetPeople from "../hooks/useGetPeople";
import "./People.styles.css";

const People: React.FC = () => {
  const { users, loading, error } = useGetPeople();
  const [searchPeople, setSearchPeople] = useState("");

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredUsers = users?.filter((user) =>
    user.firstName.toLowerCase().includes(searchPeople.toLowerCase())
  );

  return (
    <div className="people-page">
      <div className="people-header-container">
        <h1>People Page</h1>
        <p>Explore people in the community!</p>
        <input
          type="text"
          placeholder="Search people..."
          value={searchPeople}
          onChange={(e) => setSearchPeople(e.target.value)}
          className="search-input"
        />
      </div>
      <ul className="people-list">
        {filteredUsers && filteredUsers.length > 0 ? (
          filteredUsers.map((user) => (
            <PeopleListItem key={user.id} user={user} />
          ))
        ) : (
          <p>No people found!</p>
        )}
      </ul>
    </div>
  );
};

export default People;
