import React, { useState } from "react";
import PeopleListItem from "../components/PeopleListItem/PeopleListItem";
import useGetPeople from "../hooks/useGetPeople";
import "./People.styles.css";
import { useSelector } from "react-redux";
import { RootState } from "../store/store";
import { useNavigate } from "react-router-dom";

const People: React.FC = () => {
  const { users, loading, error } = useGetPeople();
  const [searchPeople, setSearchPeople] = useState("");
  const loggedInUser = useSelector((state: RootState) => state.users.loggedInUser);
  const navigate = useNavigate();

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  const filteredUsers = users?.filter((user) =>
    user.firstName.toLowerCase().includes(searchPeople.toLowerCase())
  ) ?? [];

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
            <PeopleListItem key={user.id} user={user}
            onClick= {() => navigate(user.id === loggedInUser?.id ? "/profile/me" : `/profile/${user.id}`)} />
          ))
        ) : (
          <p>No people found!</p>
        )}
      </ul>
    </div>
  );
};

export default People;
