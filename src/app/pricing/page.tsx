export default function Pricing() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <h1 className="text-4xl font-bold">Pricing</h1>
        <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold">Basic</h2>
            <p className="mt-4 text-gray-500">For small teams</p>
            <p className="mt-8 text-4xl font-bold">$10</p>
            <p className="mt-4 text-gray-500">per month</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold">Pro</h2>
            <p className="mt-4 text-gray-500">For growing businesses</p>
            <p className="mt-8 text-4xl font-bold">$50</p>
            <p className="mt-4 text-gray-500">per month</p>
          </div>
          <div className="rounded-lg border border-gray-200 p-8">
            <h2 className="text-2xl font-bold">Enterprise</h2>
            <p className="mt-4 text-gray-500">For large organizations</p>
            <p className="mt-8 text-4xl font-bold">Contact us</p>
          </div>
        </div>
      </div>
    </main>
  );
}
