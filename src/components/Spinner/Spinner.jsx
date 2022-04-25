import './Spinner.css'
const Spinner = () => {
    return (
        <div className="spinner__container">
            <div className="lds-roller"><div></div><div></div><div></div><div></div><div></div><div></div><div></div><div></div></div>
        </div>
    );
}

export default Spinner;