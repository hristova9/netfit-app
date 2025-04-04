import { User } from "../../models/User.model";
import { FaUser } from "react-icons/fa";
import "./PeopleListItem.css";
import Button from "../Button/Button";

interface PeopleListItemProps {
  user: User;
  onClick: () => void;
}

const PeopleListItem: React.FC<PeopleListItemProps> = ({ user, onClick }) => {
  return (
    <li className="people-list-item">
      <div className="avatar-container">
        {user.avatar ? (
          <img src={user.avatar} alt="Avatar" className="avatar" />
        ) : (
          <FaUser className="avatar-icon" />
        )}
      </div>
      <h4 className="people-list-item-name">
        {user.firstName} {user.lastName}
      </h4>
      <div className="people-list-item-actions">
        <Button
              type="button"
              title="View Profile"
              className="view-profile-button"
              onClick={onClick}
            />
      </div>
    </li>
  );
};

export default PeopleListItem;
