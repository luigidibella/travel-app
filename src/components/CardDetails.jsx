function CardDetails ({ cardID, imgURL, title, isVisited, description, link }) {
  return (
    <>
      <div className="flex h-full items-center justify-center">
        <div className="flex h-full">
          <a href="#">
            <div className="square rounded-tl-lg md:rounded-bl-lg">
              <img  
                src={imgURL} 
                alt={title}
              />
            </div>
          </a>
          <div className="p-5">
            <a href="#">
              <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {title}
              </h5>
            </a>
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
            <p className="mb-3 text-start font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardDetails;
