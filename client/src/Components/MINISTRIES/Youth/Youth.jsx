import {
  Footer,
  Info,
  Normal,
  NormalFlex,
  PageHero,
  Reverse,
} from "../../GLOBAL";
import { Navigation } from "../../Navigation";

export const Youth = () => {
  return (
    <>
      <Navigation />
      <PageHero title="YOUTH" />
      <section className="section">
        <Normal paragraph="Twice in our past, brave writers have undertaken the task of putting the Youth Department history into print. The first was Matilda Erickson, the very first secretary in the first youth department working with the first director, M. E. Kern. The second one was tried by a historian by the name of Nathaniel Krum, under the guidance of the newly-elected world youth director, Theodore Lucas. No matter how hard one tries, the story gets abbreviated, lost in time, fuzzy and less precise. Also, it easily gets reduced to a few names and dates. We forget that these were/are people; people who loved God; people who have tons of exciting moments, difficult moments, shattered moments, moments we could all learn valuable lessons from. The true heroes are the youth of the past, present and future who follow our aim, “The Advent message to all the world in my generation.”" />
        <div className="youtube">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/xlsYGhIqqtU"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
        <div>
          <h3 className="title primary">Aim</h3>
          <p className="subtitle">
            The advent message to the world in my generation
          </p>
        </div>
        <div>
          <h3 className="title primary m">motto</h3>
          <p className="subtitle">The Love of christ compels us</p>
        </div>
        <NormalFlex
          image="https://www.gcyouthministries.org/wp-content/uploads/Adventurer_Logo-300x267.png"
          title="ADVENTURERS"
          message="More than one million kids around the world have discovered one of the most fun clubs ever created for them. The Adventurer Club is designed to strengthen parent-child relationships  for kids ages 4-9 by providing specialized weekly activities tuned into the psychological needs of this age group while simultaneously giving parents opportunities for learning parenting skills and enjoying special activities with their children. "
          path="https://www.gcyouthministries.org/ministries/adventurers/"
          learn="Learn More"
        />
        <Reverse
          image="https://www.gcyouthministries.org/wp-content/uploads/Pathfinder_logo-292x300.jpeg"
          title="PATHFINDER"
          message="For those who are familiar with it, “Pathfindering” conjures up images of marching, camping, curious hobbies, bugs and bats. Enlarging their windows on the world and building a relationship with God are the dual objectives of this club, which is designed for children ages 10-15. With nearly 2 million members around the world, this Seventh-day Adventist Church-sponsored club accepts any youth who promises to abide by the Pathfinder Pledge and Law regardless of their church affiliation."
          path="https://www.gcyouthministries.org/ministries/pathfinders/"
          learn="Learn More"
        />
        <NormalFlex
          image="https://www.gcyouthministries.org/wp-content/uploads/Ambassador-logo-101-x-111.jpg"
          title="AMBASSADORS"
          message="Since its inception, the Seventh-day Adventist Youth Ministry Department has served the youth through three levels; namely, Adventurer Club for 4-9 years old; Pathfinder Club for 10-15 years old; and Senior Youth/ Young Adults for 16-30+ years old. However, divisions noted that the young people who complete the Pathfinder requirements are left without a program that meets their needs. They do not want to leave the Pathfinder club, but at the same time they do not feel old enough to associate themselves with the Senior Youth/Young Adults. In the absence of an established program/level for this group several Divisions have been running their own programs, such as Companion in Europe, Medical Brigade in the Inter-America and South American Divisions, etc., to fill this vacuum.  "
          path="https://www.gcyouthministries.org/ministries/ambassadors/"
          learn="Learn More"
        />
        <Reverse
          image="https://adventistyouthministries.org/files/images/logos/A-%20Logo.jpg"
          title="YOUNG ADULTS"
          message="The story of the Adventist Youth Society, now titled Young Adults (YA), began over 125 years ago along a dusty country lane in Michigan with two young boys kneeling in prayer. Today that dusty lane has become a world-wide web of highways that links over 10 million Seventh-day Adventist young people in nearly every political entity on every continent of the globe. This story comes in every hue of the rainbow; it is filled with extremes of exhilaration and mountaintop experiences, as well as deep sadness and unfulfilled dreams. This is the story of God’s leading a fascinating army down through the battles of the great over arching conflict that is life as we know it now."
          path="https://www.gcyouthministries.org/ministries/young-adults/"
          learn="Learn More"
        />
        <Info
          image="https://images.unsplash.com/photo-1628890920690-9e29d0019b9b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8cGFzdG9yfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
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
