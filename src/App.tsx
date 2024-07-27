// import React from "react";

import { useEffect, useState, useRef } from "react";

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
  const skipCount = useRef(0);
  const limit = 10;

  const targetRef = useRef<null | HTMLDivElement>(null);

  const fetchData = async function (range: number = 0) {
    const req = await fetch(
      `https://dummyjson.com/users?limit=${limit}&skip=${range * limit}`
    );

    const res = await req.json();
    const data = res.users;

    setUsersData((prevData) => {
      if (range > 0) {
        return [...prevData, ...data];
      } else {
        return data;
      }
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const options = {
      root: null,
      threshold: 0
    };

    const targetValue = targetRef.current;

    const callBackFn = (entries: IntersectionObserverEntry[]) => {
      if (entries[0].isIntersecting) {
        fetchData(skipCount.current);
        skipCount.current += 1;
      }
    };
    const observer = new IntersectionObserver(callBackFn, options);
    if (targetValue) {
      observer.observe(targetValue);
    }

    return () => {
      if (targetValue) {
        observer.unobserve(targetValue);
      }
    };
  }, []);

  console.log(usersData, skipCount.current);

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
      <div className="user-list">
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
        <div className="target" ref={targetRef}></div>
      </div>
    </div>
  );
}

export default App;
