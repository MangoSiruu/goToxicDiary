import s from "./Icon.module.css";

import beer from "../../../assets/icons/png/beer.png";
import coffee from "../../../assets/icons/png/coffee.png";
import cola from "../../../assets/icons/png/cola.png";
import instant from "../../../assets/icons/png/instant.png";
import mango_logo from "../../../assets/icons/png/mango_logo.png";
import pepper from "../../../assets/icons/png/pepper.png";
import pizza from "../../../assets/icons/png/pizza.png";
import spoon from "../../../assets/icons/png/spoon.png";
import success_stamp from "../../../assets/icons/png/success_stamp.png";
import success from "../../../assets/icons/png/success.png";

const icons = {
  beer,
  coffee,
  cola,
  instant,
  mango_logo,
  pepper,
  pizza,
  spoon,
  success_stamp,
  success
};

function Icon({ input }) {
  const imgSrc = icons[input] || icons.default; 

  return (
    <div className={s.defaultImg}>
      <img
        className={s.profileImg}
        src={imgSrc}
        alt={input}
      />
    </div>
  );
}

export default Icon;
