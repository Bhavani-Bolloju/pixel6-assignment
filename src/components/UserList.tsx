import { useEffect, useState, useRef, useCallback } from "react";
import { UserDataProps } from "../types";
import { useAppDispatch, useAppSelector } from "../redux-store/hooks";
import { countryNames, genderIdentities } from "../redux-store/usersSlice";

function UserList() {
  const [usersData, setUsersData] = useState([]);
  const { countryName, genderType } = useAppSelector((state) => state.users);
  const limit = 10;
  const skipCount = useRef(0);
  const targetRef = useRef<null | HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(
    async function (range: number = 0) {
      const req = await fetch(
        `https://dummyjson.com/users?limit=${limit}&skip=${range * limit}`
      );

      const res = await req.json();
      const data = res.users;

      const filterCountries = [
        ...new Set(data.map((user: UserDataProps) => user.address.country))
      ];
      dispatch(countryNames(filterCountries));

      const filterGenderTypes = [
        ...new Set(data.map((user: UserDataProps) => user.gender))
      ];

      dispatch(genderIdentities(filterGenderTypes));

      setUsersData((prevData) => {
        if (range > 0) {
          return [...prevData, ...data];
        } else {
          return data;
        }
      });
    },
    [dispatch]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

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
  }, [fetchData]);

  console.log(genderType, countryName);

  let formatUserData = usersData?.map((user: UserDataProps) => {
    return {
      id: user.id,
      image: user.image,
      fullName: `${user.firstName} ${user.maidenName} ${user.lastName}`,
      gender: user.gender,
      age: user.age,
      designation: user.company.title,
      country: user.address.country,
      state: user.address.state
    };
  });

  if (genderType !== "") {
    formatUserData = formatUserData.filter(
      (user) => user.gender === genderType
    );
  }

  if (countryName !== "") {
    formatUserData = formatUserData.filter(
      (user) => user.country === countryName
    );
  }

  return (
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
                  <td>
                    {user.gender[0]}/{user.age}
                  </td>
                  <td>{user.designation}</td>
                  <td>
                    {user.state}, {user.country}
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <div className="target" ref={targetRef}></div>
    </div>
  );
}

export default UserList;
