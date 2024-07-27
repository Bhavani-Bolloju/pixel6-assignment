// import React from "react";

import { useEffect, useState } from "react";

interface UserDataProps {
  address: {
    address: string;
    city: string;
    coordinates: void;
    country: string;
    postalCode: string;
    state: string;
    stateCode: string;
  };
  age: number;
  bank: void;
  birthDate: string;
  bloodGroup: string;
  company: {
    title: string;
    name: string;
    department: string;
    address: {
      address: string;
      city: string;
      coordinates: void;
    };
  };
  crypto: string;
  ein: string;
  email: string;
  eyecolor: string;
  firstName: string;
  gender: string;
  hair: void;
  height: number;
  id: number;
  image: string;
  ip: string;
  lastName: string;
  macAddress: string;
  maidenName: string;
  password: string;
  phone: string;
  role: string;
  ssn: string;
  university: string;
  userAgent: string;
  username: string;
  weight: number;
}

function App() {
  const [usersData, setUsersData] = useState([]);

  useEffect(() => {
    const fetchData = async function () {
      const req = await fetch(`https://dummyjson.com/users?limit=10&skip=0`);

      const res = await req.json();

      console.log(res.users);
      const data = res.users;
      setUsersData(data);
    };

    fetchData();
  }, []);

  // console.log(usersData);
  const formatUserData = usersData?.map((user: UserDataProps) => {
    return {
      id: user.id,
      image: user.image,
      fullName: `${user.firstName} ${user.maidenName} ${user.lastName}`,
      demography: user.gender[0] + "/" + user.age,
      designation: user.company.title,
      location: user.address.state + ", " + user.address.country
    };
  });

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Image</th>
            <th scope="col">Full Name</th>
            <th scope="col">Demography</th>
            <th scope="col">Destination</th>
            <th scope="col">Location</th>
          </tr>
        </thead>
        <tbody>
          {formatUserData.length > 0 &&
            formatUserData?.map((user) => {
              return (
                <tr key={user.id}>
                  <td>{user.id.toString().padStart(2, "0")}</td>
                  <td className="image">
                    <img src={user.image} alt={user.fullName} />
                  </td>
                  <td>{user.fullName}</td>
                  <td>{user.demography}</td>
                  <td>{user.designation}</td>
                  <td>{user.location}</td>
                </tr>
              );
            })}
        </tbody>
      </table>
    </div>
  );
}

export default App;

// {
//   id,
//   image,
//   firstName,
//   maidenName,
//   lastName,
//   gender,
//   age,
//   company
// }

// <tr>
// <td>id</td>
// <td>image</td>
// <td>first,maiden,last</td>
// <td>gender/age</td>
// <td>title</td>
// <td>country</td>
// </tr>
