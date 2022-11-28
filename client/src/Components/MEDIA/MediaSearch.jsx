import Wrapper from "../../assets/wrappers/SearchContainer";
import { useAppContext } from "../../context/appContext";
import { FormRowSelect } from "../index";
import { FaSearch } from "react-icons/fa";

const MediaSearch = () => {
  const {
    search,
    handleChange,
    departmentOptions,
    searchDepartment,
    clearFilters,
    isLoading,
  } = useAppContext();
  const handleSearch = (e) => {
    if (isLoading) return;
    handleChange({ name: e.target.name, value: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    clearFilters();
  };
  return (
    <Wrapper>
      <form className="form">
        <div className="form-center">
          <div className="form-row">
            <input
              type="text"
              placeholder="Search"
              name="search"
              value={search}
              onChange={handleSearch}
              className="form-inputS"
            />
            <button type="submit" className="submit-btnS">
              <FaSearch />
            </button>
          </div>

          <FormRowSelect
            labelText="department"
            name="searchDepartment"
            value={searchDepartment}
            handleChange={handleSearch}
            list={["all", ...departmentOptions]}
          />
          <button
            className="btn btn-block btn-danger"
            disabled={isLoading}
            onClick={handleSubmit}
          >
            clear filters
          </button>
        </div>
      </form>
    </Wrapper>
  );
};

export default MediaSearch;
