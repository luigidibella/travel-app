function HorizontalCard ({ imgURL, title, children, isVisited, description, cityID }) {
  return (
    <>
      <a href="#" className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-full my-5 hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700">
        <img className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg" src={imgURL} alt={title} />
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{title}</h5>
          <span
            className={`inline-block mb-2 ${isVisited ? 'text-green-500 border-t border-b border-[#e5e7eb] w-full' : 'text-red-500 border-t border-b border-[#e5e7eb] w-full'}`}
          >
            {isVisited ? '✔️ visitata' : '❌ non visitata'}
          </span>
          <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">{description}</p>
        </div>
      </a>
    </>
  );
}

export default HorizontalCard;