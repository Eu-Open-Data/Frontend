import HomeIcon from "/src/assets/home2.png";
import MapIcon from "/src/assets/map.png";
import LikeIcon from "/src/assets/like.png";
import SaveIcon from "/src/assets/save.png";
import ExitIcon from "/src/assets/exit.png";

export const SidebarData = [
  {
    //title: "Home",
    icon: (
      <img
        src={HomeIcon}
        alt="Home"
        style={{ width: "24px", height: "24px" }}
      />
    ),
    link: "/",
  },
  {
    //title: "Map",
    icon: (
      <img src={MapIcon} alt="Map" style={{ width: "24px", height: "24px" }} />
    ),
    link: "/map",
  },
  {
    //title: "Like",
    icon: (
      <img
        src={LikeIcon}
        alt="Like"
        style={{ width: "24px", height: "24px" }}
      />
    ),
    link: "/login",
  },
  {
    //title: "Save",
    icon: (
      <img
        src={SaveIcon}
        alt="Save"
        style={{ width: "24px", height: "24px" }}
      />
    ),
    link: "/login",
  },
  {
    //title: "Exit",
    icon: (
      <img
        src={ExitIcon}
        alt="Exit"
        style={{ width: "24px", height: "24px" }}
      />
    ),
    link: "/exit",
    className: "exit",
  },
];
