import "../assets/styles.css";
import "./Cta.css";

export default function Cta({ target, text }) {
    return (
        <a href={target} className="cta-button">
            {text}
        </a>
    );
}
