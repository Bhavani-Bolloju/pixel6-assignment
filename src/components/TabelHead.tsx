// import { sortFields } from "../redux-store/usersSlice";
import { useAppDispatch, useAppSelector } from "../redux-store/hooks";
import { sortFields } from "../redux-store/usersSlice";

function TabelHead() {
  const dispatch = useAppDispatch();
  const { IDSort, ageSort, nameSort } = useAppSelector((state) => state.users);

  const handleSort = function (title: string, sort: string) {
    if (title === "id" && sort !== IDSort) {
      dispatch(sortFields({ title, sort }));
    }

    if (title === "age" && sort !== ageSort) {
      dispatch(sortFields({ title, sort }));
    }

    if (title === "name" && sort !== nameSort) {
      dispatch(sortFields({ title, sort }));
    }
  };

  return (
    <thead>
      <tr>
        <th scope="col">
          <span className="title">ID</span>
          <button onClick={() => handleSort("id", "asc")}>
            {/* up arrow ascending */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={IDSort === "asc" ? `active` : ""}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
              />
            </svg>
          </button>
          <button onClick={() => handleSort("id", "des")}>
            {/* down arrow - descending */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={IDSort === "des" ? `active` : ""}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
              />
            </svg>
          </button>
        </th>
        <th scope="col">Image</th>
        <th scope="col">
          <span className="title">Full Name</span>
          <button onClick={() => handleSort("name", "asc")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={nameSort === "asc" ? `active` : ""}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
              />
            </svg>
          </button>
          <button onClick={() => handleSort("name", "des")}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={nameSort === "des" ? `active` : ""}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
              />
            </svg>
          </button>
        </th>
        <th scope="col">
          <span className="title">Demography</span>

          <button onClick={() => handleSort("age", "asc")}>
            {/* up arrow ascending */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className={ageSort === "asc" ? "active" : ""}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 6.75 12 3m0 0 3.75 3.75M12 3v18"
              />
            </svg>
          </button>
          <button onClick={() => handleSort("age", "des")}>
            {/* down arrow - descending */}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className={ageSort === "des" ? "active" : ""}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M15.75 17.25 12 21m0 0-3.75-3.75M12 21V3"
              />
            </svg>
          </button>
        </th>
        <th scope="col">Destination</th>
        <th scope="col">Location</th>
      </tr>
    </thead>
  );
}

export default TabelHead;
