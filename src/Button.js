import PropTypes from "prop-types";
import styles from "./btn.module.css";

Button.propTypes = {
  text: PropTypes.string.isRequired,
};

function Button({ text }) {
  return <button className={styles}>{text}</button>;
}

export default Button;
