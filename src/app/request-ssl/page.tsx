export default function RequestSSL() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Request SSL Certificate</h1>
        <form action="/api/request-ssl" method="post">
          <div className="mt-8">
            <label htmlFor="domain" className="block text-sm font-medium text-gray-700">
              Domain Name
            </label>
            <div className="mt-1">
              <input
                type="text"
                name="domain"
                id="domain"
                className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="your-domain.com"
              />
            </div>
          </div>
          <div className="mt-8">
            <button
              type="submit"
              className="inline-flex items-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Request SSL
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
