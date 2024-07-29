import { useEffect, useState, useRef, useCallback } from "react";
import { UsersDataProps } from "../types";
import { useAppDispatch, useAppSelector } from "../redux-store/hooks";
import { countryNames, genderIdentities } from "../redux-store/usersSlice";
import Spinner from "./UI/Spinner";
import TabelHead from "./TabelHead";
import UserListItem from "./UserListItem";

function UserList() {
  const [usersData, setUsersData] = useState([]);
  const [status, setStatus] = useState({ isLoading: false, error: "" });

  const { countryName, genderType, IDSort, ageSort, nameSort } = useAppSelector(
    (state) => state.users
  );
  const limit = 10;
  const skipCount = useRef(0);
  const targetRef = useRef<null | HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  const fetchData = useCallback(
    async function (range: number = 0) {
      try {
        setStatus((prev) => ({ ...prev, isLoading: true }));
        const req = await fetch(
          `https://dummyjson.com/users?limit=${limit}&skip=${range * limit}`
        );

        const res = await req.json();
        const data = res.users;

        const filterCountries = [
          ...new Set(data.map((user: UsersDataProps) => user.address.country))
        ];
        dispatch(countryNames(filterCountries));

        const filterGenderTypes = [
          ...new Set(data.map((user: UsersDataProps) => user.gender))
        ];

        dispatch(genderIdentities(filterGenderTypes));

        setUsersData((prevData) => {
          if (range > 0) {
            return [...prevData, ...data];
          } else {
            return data;
          }
        });
      } catch (error) {
        if (error instanceof Error) {
          const message = error.message;
          setStatus((prev) => ({ ...prev, error: message }));
        }
      } finally {
        setStatus((prev) => ({ ...prev, isLoading: false }));
      }
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

  let formatUserData = usersData?.map((user: UsersDataProps) => {
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

  IDSort === "des"
    ? formatUserData.sort((a, b) => {
        if (a.id < b.id) {
          return 1;
        } else {
          return -1;
        }
      })
    : IDSort === "asc"
    ? formatUserData.sort((a, b) => {
        if (a.id > b.id) {
          return 1;
        } else {
          return -1;
        }
      })
    : formatUserData;

  ageSort === "des"
    ? formatUserData.sort((a, b) => {
        if (a.age < b.age) {
          return 1;
        } else {
          return -1;
        }
      })
    : ageSort === "asc"
    ? formatUserData.sort((a, b) => {
        if (a.age > b.age) {
          return 1;
        } else {
          return -1;
        }
      })
    : formatUserData;

  nameSort === "asc"
    ? formatUserData.sort((a, b) => a.fullName.localeCompare(b.fullName))
    : nameSort === "des"
    ? formatUserData.sort((a, b) => b.fullName.localeCompare(a.fullName))
    : formatUserData;

  return (
    <div className="user-list">
      {usersData && (
        <table>
          <TabelHead />
          <tbody>
            {formatUserData.length > 0 &&
              formatUserData?.map((user) => {
                return (
                  <UserListItem
                    key={user.id}
                    id={user.id.toString().padStart(2, "0")}
                    image={user.image}
                    fullName={user.fullName}
                    gender={user.gender}
                    designation={user.designation}
                    state={user.state}
                    country={user.country}
                    age={user.age}
                  />
                );
              })}
          </tbody>
        </table>
      )}
      <div>
        {status.isLoading && (
          <div className="loading">
            <Spinner />
          </div>
        )}
        {status.error !== "" && <div className="error">{status.error}</div>}
      </div>
      <div className="target" ref={targetRef} />
    </div>
  );
}

export default UserList;
