import './HoverDetailsCard.css';

function HoverDetailsCard ({ imgURL, title, children, isVisited, description, cityID }) {
  return (
    <>
      <div className="card">
            <img src={imgURL} alt={title} />
        <div className="remove-when-use">
          <label>
          </label>
        </div>
        <div className="details">
          <label>{title}</label>
          <p>
            <span
              className={`inline-block mb-2 ${isVisited ? 'text-green-500 border-t border-b border-green-500 w-full' : 'text-red-500 border-t border-b border-red-500 w-full'}`}
            >
              {isVisited ? '✔️ visitata' : '❌ non visitata'}
            </span>
            {description}
            {/* <br/> */}
            {/* <i>California, USA</i> */}
          </p>
        </div>
      </div>
    </>
  );
}

export default HoverDetailsCard;