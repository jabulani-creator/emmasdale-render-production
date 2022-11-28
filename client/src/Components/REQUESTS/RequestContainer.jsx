import { useEffect } from "react";
import Wrapper from "../../assets/wrappers/JobsContainer";
import { useAppContext } from "../../context/appContext";
import Loading from "../Loading";
import { SingleRequest } from "./SingleRequest";

export const RequestContainer = () => {
  const {
    getRequests,
    requests,
    isLoading,
    page,
    totalRequests,
    searchPurpose,
    sort,
  } = useAppContext();

  useEffect(() => {
    getRequests();
    // eslint-disable-next-line
  }, [page, sort, searchPurpose]);

  if (isLoading) {
    return <Loading />;
  }
  if (totalRequests.length === 0) {
    return (
      <Wrapper>
        <h2>No Requests to display ....</h2>
      </Wrapper>
    );
  }

  return (
    <Wrapper>
      <h5>
        {totalRequests} Request{totalRequests.length > 1 && "s"} found
      </h5>
      <div className="jobs">
        {requests.map((request) => {
          return <SingleRequest key={request._id} {...request} />;
        })}
      </div>
    </Wrapper>
  );
};
