// import { sortFields } from "../redux-store/usersSlice";
import { useAppDispatch, useAppSelector } from "../redux-store/hooks";
import { sortFields } from "../redux-store/usersSlice";
import SortingButton from "./SortingButton";

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

          <SortingButton
            onSort={handleSort.bind(null, "id", "asc")}
            title={IDSort}
            sort="asc"
          />
          <SortingButton
            onSort={handleSort.bind(null, "id", "des")}
            title={IDSort}
            sort="des"
          />
        </th>
        <th scope="col">Image</th>
        <th scope="col">
          <span className="title">Full Name</span>
          <SortingButton
            onSort={handleSort.bind(null, "name", "asc")}
            title={nameSort}
            sort="asc"
          />
          <SortingButton
            onSort={handleSort.bind(null, "name", "des")}
            title={nameSort}
            sort="des"
          />
        </th>
        <th scope="col">
          <span className="title">Demography</span>

          <SortingButton
            onSort={handleSort.bind(null, "age", "asc")}
            title={ageSort}
            sort="asc"
          />
          <SortingButton
            onSort={handleSort.bind(null, "age", "des")}
            title={ageSort}
            sort="des"
          />
        </th>
        <th scope="col">Destination</th>
        <th scope="col">Location</th>
      </tr>
    </thead>
  );
}

export default TabelHead;
