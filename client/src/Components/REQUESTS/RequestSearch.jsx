import { FormRowSelect } from "../index";
import { useAppContext } from "../../context/appContext";
import Wrapper from "../../assets/wrappers/SearchContainer";

export const RequestSearch = () => {
  const {
    isLoading,
    purposeOptions,
    handleChange,
    clearFilters,
    searchPurpose,
    sort,
    sortOptions,
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
          <FormRowSelect
            labelText="search purpose"
            name="searchPurpose"
            value={searchPurpose}
            handleChange={handleSearch}
            list={["all", ...purposeOptions]}
          />

          <FormRowSelect
            labelText="sort"
            name="sort"
            value={sort}
            handleChange={handleSearch}
            list={sortOptions}
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
