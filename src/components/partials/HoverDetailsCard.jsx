import './HoverDetailsCard.css';

function HoverDetailsCard ({ imgURL, title, children, isVisited, description, cityID }) {
  return (
    <>
      <div class="card">
            <img src={imgURL} alt={title} />
        <div class="remove-when-use">
          <label>
          </label>
        </div>
        <div class="details">
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