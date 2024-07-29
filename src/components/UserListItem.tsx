import { UserProp } from "../types";

function UserListItem({
  id,
  image,
  fullName,
  age,
  gender,
  designation,
  state,
  country
}: UserProp) {
  return (
    <tr key={id}>
      <td>{id.toString().padStart(2, "0")}</td>
      <td className="image">
        <img src={image} alt={fullName} />
      </td>
      <td>{fullName}</td>
      <td>
        {gender[0].toUpperCase()}/{age}
      </td>
      <td>{designation}</td>
      <td>
        {state}, {country}
      </td>
    </tr>
  );
}

export default UserListItem;
