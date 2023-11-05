const Hero = () => {
    return (
      <div className="bg-gray-50 dark:bg-gray-800 px-6 py-24 sm:py-32 lg:px-8 pattern selection:bg-orange-400">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-base font-semibold leading-7 text-indigo-600 dark:text-blue-300">Paste & Share your snippets</p>
          <h2 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-6xl text-gradient ">  &lt;PasteIt <span className="text-lime-400 ">/</span>&gt;</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 dark:text-gray-300">
            Paste and share your snippet. No account required.
          </p>
        </div>
      </div>
    )
  }
  
  export default Hero