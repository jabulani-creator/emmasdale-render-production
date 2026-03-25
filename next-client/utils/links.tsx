import {
  MdQueryStats,
  MdOutlineLocalPostOffice,
  MdOutlinePostAdd,
} from "react-icons/md";
import { FaWpforms, FaPray, FaUserPlus, FaPlusCircle } from "react-icons/fa";
import { ImProfile } from "react-icons/im";
import { BsCalendar2Event } from "react-icons/bs";
import { RiHealthBookLine } from "react-icons/ri";

const links = [
  {
    id: 1,
    text: "request",
    path: "request",
    icon: <MdOutlineLocalPostOffice />,
  },
  {
    id: 16,
    text: "Prayer Requests",
    path: "requests",
    icon: <FaPray />,
  },
  {
    id: 2,
    text: "all post",
    path: "all-post",
    icon: <MdQueryStats />,
  },
  {
    id: 4,
    text: "all events",
    path: "all-events",
    icon: <BsCalendar2Event />,
  },
  {
    id: 6,
    text: "all health",
    path: "all-health",
    icon: <RiHealthBookLine />,
  },
  {
    id: 8,
    text: "profile",
    path: "profile",
    icon: <ImProfile />,
  },
  {
    id: 17,
    text: "Add Staff / Leader",
    path: "add-leader",
    icon: <FaUserPlus />,
  },
  {
    id: 18,
    text: "Publish Content",
    path: "create-content",
    icon: <FaPlusCircle />,
  },
  {
    id: 12,
    text: "add images",
    path: "add-images",
    icon: <RiHealthBookLine />,
  },
  {
    id: 15,
    text: "add Ministry",
    path: "add-ministry",
    icon: <FaWpforms />,
  },
];

export default links;
