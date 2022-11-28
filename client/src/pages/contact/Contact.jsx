import {
  DepartmentContainer,
  EldersContainer,
  Footer,
  PastorsContainer,
  WorkersContainer,
} from "../../Components/CONTACT";
import { Form, NewSidebar, Normal, PageHero } from "../../Components/GLOBAL";

export const Contact = () => {
  return (
    <>
      <NewSidebar />
      <PageHero title="CONTACT" />
      <Normal
        title="How can we help you?"
        paragraph="Need a Prayer? Interested in becoming a member? Considering Baptism? We are here to serve! Let us know how we can help?"
      />
      <Form />
      <h2 className="title primary">Pastor</h2>
      <PastorsContainer />
      <h2 className="title primary">Elders</h2>
      <EldersContainer />
      <h2 className="title primary">Department Heads</h2>
      <DepartmentContainer />
      <h2 className="title primary">General Workers</h2>
      <WorkersContainer />
      <Footer />
    </>
  );
};
