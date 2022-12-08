const InputForm = (): JSX.Element => {
  return (
    <form className="w-full">
      <div className="relative z-0 mb-6 w-full group">
        <input
          type="OilRemaining"
          name="OilRemaining"
          id="floating_email"
          className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
          placeholder=""
          required
        />
        <label
          htmlFor="floating_email"
          className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transhtmlForm -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6"
        >
          Remaining Oil
        </label>
      </div>
      <legend className="pb-4">Queue</legend>

      <div className="flex items-center mb-4">
        <input
          id="queue-option-1"
          type="radio"
          name="queue"
          value="medium"
          className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 "
          checked
        />
        <label
          htmlFor="queue-option-1"
          className="block ml-2 text-sm font-medium text-gray-700"
        >
          High
        </label>
      </div>

      <div className="flex items-center mb-4">
        <input
          id="queue-option-2"
          type="radio"
          name="queue"
          value="medium"
          className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 "
        />
        <label
          htmlFor="queue-option-2"
          className="block ml-2 text-sm font-medium text-gray-700"
        >
          Medium
        </label>
      </div>
      <div className="flex items-center mb-4">
        <input
          id="queue-option-3"
          type="radio"
          name="queue"
          value="low"
          className="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 "
        />
        <label
          htmlFor="country-option-2"
          className="block ml-2 text-sm font-medium text-gray-700"
        >
          Low
        </label>
      </div>

      <button
        type="submit"
        className="text-white bg-primary hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center "
      >
        Submit
      </button>
    </form>
  );
};
export default InputForm;

{
  /* <fieldset>
  <legend class="sr-only">Countries</legend>

  <div class="flex items-center mb-4">
    <input id="country-option-1" type="radio" name="countries" value="USA" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600" checked>
    <label for="country-option-1" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      United States
    </label>
  </div>

  <div class="flex items-center mb-4">
    <input id="country-option-2" type="radio" name="countries" value="Germany" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:focus:bg-blue-600 dark:bg-gray-700 dark:border-gray-600">
    <label for="country-option-2" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      Germany
    </label>
  </div>

  <div class="flex items-center mb-4">
    <input id="country-option-3" type="radio" name="countries" value="Spain" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600">
    <label for="country-option-3" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      Spain
    </label>
  </div>

  <div class="flex items-center mb-4">
    <input id="country-option-4" type="radio" name="countries" value="United Kingdom" class="w-4 h-4 border-gray-300 focus:ring-2 focus:ring:blue-300 dark:focus-ring-blue-600 dark:bg-gray-700 dark:border-gray-600">
    <label for="country-option-4" class="block ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
      United Kingdom
    </label>
  </div>

  <div class="flex items-center">
    <input id="option-disabled" type="radio" name="countries" value="China" class="w-4 h-4 border-gray-200 focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-600 dark:bg-gray-700 dark:border-gray-600" disabled>
    <label for="option-disabled" class="block ml-2 text-sm font-medium text-gray-300 dark:text-gray-700">
      China (disabled)
    </label>
  </div>
</fieldset> */
}
