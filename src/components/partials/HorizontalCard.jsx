function HorizontalCard ({ imgURL, title, children, isVisited, description, cityID }) {
  return (
    <>
      <a
          href="#"
          className="h-full relative flex items-center bg-white border border-gray-200 rounded-lg shadow flex-row max-w-full hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700"
          style={{
            backgroundImage: `url(${imgURL})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div
            className="absolute inset-0 bg-black opacity-50 rounded-lg"
            style={{ borderRadius: 'inherit' }}
          ></div>
          <div className="relative flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-white">
              {title}
            </h5>
            <span
              className={`inline-block mb-2 ${
                isVisited
                  ? 'text-green-500 border-t border-b border-green-500 w-full'
                  : 'text-red-500 border-t border-b border-red-500 w-full'
              }`}
            >
              {isVisited ? (
                <span><i className="fas fa-check" style={{ color: '#0e9f6e' }}></i> visitata</span>
              ) : (
                <span><i className="fa-solid fa-xmark" style={{ color: '#f05252' }}></i> non visitata</span>
              )}
            </span>
            <p className="mb-3 font-normal text-white">
              {description}
            </p>
          </div>
        </a>


    </>
  );
}

export default HorizontalCard;