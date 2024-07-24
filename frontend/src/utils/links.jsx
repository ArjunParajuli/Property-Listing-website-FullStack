import { MdAddToPhotos } from "react-icons/md";
import { TbMapPinSearch } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import { ImProfile } from "react-icons/im";

const links = [
    { id: 1, text: 'All Activities', path: 'history', icon: <MdHistory /> },
    { id: 2, text: 'All properties', path: '/', icon: <TbMapPinSearch /> },
    { id: 3, text: 'Add property', path: 'add-property', icon: <MdAddToPhotos /> },
    { id: 4, text: 'Profile', path: 'profile', icon: <ImProfile /> },
  ]

  export default links