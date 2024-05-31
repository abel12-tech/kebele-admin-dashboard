import React from "react";

const Forms = () => {
  return (
    <main className="h-full pb-16 overflow-y-auto">
      <div className="container px-6 mx-auto grid">
        {/* General elements */}
        <h4 className="mb-4 text-center p-4 text-lg font-semibold text-gray-600 dark:text-gray-300">
          Manage Orders
        </h4>
        <div className="px-4 py-3 mb-8 bg-white rounded-lg shadow-md dark:bg-gray-800">
          <label className="block text-sm">
            <span className="text-gray-700 dark:text-gray-400">Name</span>
            <input
              className="block h-10 w-full mt-1 text-sm dark:border-gray-600 dark:bg-gray-700 focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:text-gray-300 dark:focus:shadow-outline-gray"
              placeholder="Jane Doe"
            />
          </label>
          <div className="mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">
              Account Type
            </span>
            <div className="mt-2">
              <label className="inline-flex items-center text-gray-600 dark:text-gray-400">
                <input
                  type="radio"
                  className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  name="accountType"
                  defaultValue="personal"
                />
                <span className="ml-2">Personal</span>
              </label>
              <label className="inline-flex items-center ml-6 text-gray-600 dark:text-gray-400">
                <input
                  type="radio"
                  className="text-purple-600 form-radio focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
                  name="accountType"
                  defaultValue="busines"
                />
                <span className="ml-2">Business</span>
              </label>
            </div>
          </div>
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">
              Requested Limit
            </span>
            <select className="block h-10 w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-select focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray">
              <option>$1,000</option>
              <option>$5,000</option>
              <option>$10,000</option>
              <option>$25,000</option>
            </select>
          </label>
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">
              Multiselect
            </span>
            <select
              className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-multiselect focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              multiple
            >
              <option>Option 1</option>
              <option>Option 2</option>
              <option>Option 3</option>
              <option>Option 4</option>
              <option>Option 5</option>
            </select>
          </label>
          <label className="block mt-4 text-sm">
            <span className="text-gray-700 dark:text-gray-400">Message</span>
            <textarea
              className="block w-full mt-1 text-sm dark:text-gray-300 dark:border-gray-600 dark:bg-gray-700 form-textarea focus:border-purple-400 focus:outline-none focus:shadow-outline-purple dark:focus:shadow-outline-gray"
              rows={3}
              placeholder="Enter some long form content."
              defaultValue={""}
            />
          </label>
        </div>
      </div>
    </main>
  );
};

export default Forms;
