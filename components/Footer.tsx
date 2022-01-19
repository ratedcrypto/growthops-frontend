import Link from "next/link";

const Footer: React.FC = () => {
  return (
    <footer className="border-t border-gray-200">
      <div className="container flex flex-wrap items-center justify-center px-4 py-8 mx-auto  lg:justify-between">
        <div className="flex flex-wrap justify-center">
          <ul className="flex items-center space-x-4">
            <Link href="/">
              <a>
                <li>Home</li>
              </a>
            </Link>
            <Link href="/plants">
              <a>
                <li>Plants</li>
              </a>
            </Link>
            <Link href="/plants/add">
              <a>
                <li>Add Plant</li>
              </a>
            </Link>
          </ul>
        </div>
        <div className="flex justify-center lg:mt-0">
          <a
            className="ml-3"
            target="_blank"
            rel="noreferrer"
            href="https://www.linkedin.com/in/rujul-trivedi-53307049/"
          >
            <svg
              fill="currentColor"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="0"
              className="w-6 h-6 text-blue-500"
              viewBox="0 0 24 24"
            >
              <path
                stroke="none"
                d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"
              ></path>
              <circle cx="4" cy="4" r="2" stroke="none"></circle>
            </svg>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
