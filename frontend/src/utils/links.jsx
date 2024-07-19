import { MdAddToPhotos } from "react-icons/md";
import { TbMapPinSearch } from "react-icons/tb";
import { MdHistory } from "react-icons/md";
import { ImProfile } from "react-icons/im";

const links = [
    { id: 1, text: 'History', path: 'history', icon: <MdHistory /> },
    { id: 2, text: 'All property', path: '/', icon: <TbMapPinSearch /> },
    { id: 3, text: 'Add property', path: 'add-property', icon: <MdAddToPhotos /> },
    { id: 4, text: 'Profile', path: 'profile', icon: <ImProfile /> },
  ]

  export default links