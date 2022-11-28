import { Footer, Info, LearnMore, Normal, PageHero } from "../../GLOBAL";
import { Navigation } from "../../../Components/Navigation";

export const Children = () => {
  return (
    <>
      <Navigation />
      <PageHero title="Children’s Ministries" />
      <Normal
        title="Our Mission"
        paragraph="The mission of the Children’s Ministries Department is to nurture children into a loving, serving relationship with Jesus."
      />
      <section className="section">
        <h4 className="right-paragraph">
          We seek to fulfill our mission by developing the following:
        </h4>
        <p className="right-paragraph">
          1.<span className="starter">Grace-oriented ministries,</span> in which
          all children will experience the unconditional love of Jesus, find
          assurance of acceptance and forgiveness, and make a commitment to Him
          and develop their faith.
        </p>
        <p className="right-paragraph">
          2.<span className="starter">Inclusive ministries,</span> in which the
          volunteers who minister and the children to whom they minister will be
          valued and involved regardless of race, color, language, gender, age,
          abilities, or socio-economic circumstances;
        </p>
        <p className="right-paragraph">
          3.<span className="starter">Leadership ministries,</span> in which
          volunteers are empowered, trained, and equipped for effective ministry
          to children;
        </p>
        <p className="right-paragraph">
          4.<span className="starter">Service-oriented ministries,</span> in
          which children are given opportunities for hands-on service to people
          in their neighborhood or city, which could establish a pattern of
          outreach to others that may well continue through life;
        </p>
        <p className="right-paragraph">
          5.<span className="starter">Cooperative ministries,</span> which
          involve working in partnership with other ministries, such as family
          ministries, Sabbath School, and stewardship, to support and help
          parents develop the faith of their children.
        </p>
        <p className="right-paragraph">
          6.<span className="starter">Safe ministries,</span> whereby our
          churches adopt safeguards to protect children from physical,
          emotional, and spiritual abuse; to choose volunteers with high
          spiritual and moral backgrounds; and to minimize the church’s
          liability; and,
        </p>
        <p className="right-paragraph">
          7.<span className="starter">Evangelistic ministries,</span>in which
          children who are not enfolded in the church family will be introduced
          to the love of Jesus through outreach-programs such as: Vacation Bible
          Schools, children’s branch Sabbath Schools, Neighborhood Bible Clubs,
          and Story Hours.
        </p>
        <LearnMore
          header="Get Bible Timeline"
          link="https://www.faithfinders.com/day-by-day-with-jesus-bible-reading-guide.pdf"
          path="Learn More"
        />
        <LearnMore
          header="ONLINE JIGSAW PUZZLES"
          link="https://www.faithfinders.com/online-jigsaw-puzzles"
          path="Play Now"
        />
        <Info
          image="https://images.unsplash.com/photo-1593896385987-16bcbf9451e5?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTB8fHlvdXRofGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
          name="Victoria Nswila"
          phone="+260972975737"
          email="victoria@gmail.com"
          position="Director"
        />
      </section>
      <Footer />
    </>
  );
};
