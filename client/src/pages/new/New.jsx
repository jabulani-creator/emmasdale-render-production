import { Footer, Text, OnlineWorship } from "../../Components/NEW";
import {
  Normal,
  WeeklyBulleting,
  NormalFlex,
  Form,
  SabbathSchool,
  Reverse,
  PageHero,
  NewSidebar,
} from "../../Components/GLOBAL";
export const New = () => {
  return (
    <>
      <NewSidebar />
      <PageHero title="NEW" />
      <Text />
      <OnlineWorship />
      <Normal
        title="our sabbath worship"
        paragraph="Our Sabbath Worship is packed with activities for the entire day with special program for each age"
      />
      <WeeklyBulleting />
      <SabbathSchool />
      <NormalFlex
        title="main service"
        message="Our Sabbath Worship is packed with activities for the entire day with special program for each age"
        image="https://images.unsplash.com/photo-1543702404-38c2035462ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAxfHx3b3JzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
        time="10:00 - 12:00"
        service="Main Service :"
      />
      <Reverse
        title="bible study"
        message="Our Sabbath Worship is packed with activities for the entire day with special program for each age"
        image="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGJpYmxlJTIwc3R1ZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
        time="14:00 - 17:00"
        service="Bible Study : "
      />
      <NormalFlex
        title="Do you have kids?"
        message="Our Sabbath Worship is packed with activities for the entire day with special program for each age"
        image="https://images.unsplash.com/photo-1529070538774-1843cb3265df?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MjR8fGJpYmxlJTIwc3R1ZHl8ZW58MHx8MHx8&auto=format&fit=crop&w=500&q=60"
      />
      <Reverse
        title="Youths & Young Adults"
        message="Our Sabbath Worship is packed with activities for the entire day with special program for each age"
        image="https://images.unsplash.com/photo-1543702404-38c2035462ad?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTAxfHx3b3JzaGlwfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=500&q=60"
      />
      <Normal
        title="optionally, let us know you are coming:"
        paragraph="Let su Know that your are planning a visit. and we'll have a friendly face waiting to greet you! Our guests often find it helpful to have someone show them around during their first visit. A team member can show you where the class is located, where restrooms can be found amd can answer any question regarding service times, class recommendation etc"
      />
      <Form />
      <Footer />
    </>
  );
};
