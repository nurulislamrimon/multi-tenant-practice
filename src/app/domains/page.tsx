"use client";

import { IDomain } from "@/interfaces/domain.interface";
import { useState, useEffect } from "react";

export default function DomainsPage() {
  const [domains, setDomains] = useState<IDomain[]>([]);

  const fetchDomains = () => {
    fetch("/api/domains")
      .then((res) => res.json())
      .then((data) => setDomains(data));
  };

  useEffect(() => {
    fetchDomains();
  }, []);

  const handleVerify = async (domain: string) => {
    await fetch("/api/verify-domain", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain }),
    });
    fetchDomains();
  };

  const handleCheckVerification = async (domain: string) => {
    await fetch("/api/check-verification", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ domain }),
    });
    fetchDomains();
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Domains</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {domains.map((domain) => (
          <div
            key={domain.domain}
            className="border rounded-lg p-4 flex flex-col justify-between"
          >
            <div>
              <h2 className="text-xl font-semibold py-2 text-gray-300">
                {domain.domain}
              </h2>
              <h6 className="text-xs font-semibold text-gray-400">
                {domain.cloudflareId}
              </h6>
              <p className="text-gray-500">{domain.status}</p>
              {domain.verificationToken && domain.verificationRecordName && (
                <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 my-4">
                  <p className="text-white">
                    Create a TXT record with this name:
                  </p>
                  <pre className="bg-gray-900 text-white rounded-lg p-2 mt-2">
                    <code>{domain.verificationRecordName}</code>
                  </pre>
                  <p className="text-white mt-2">And this value:</p>
                  <pre className="bg-gray-900 text-white rounded-lg p-2 mt-2">
                    <code>{domain.verificationToken}</code>
                  </pre>
                </div>
              )}
            </div>
            <div className="flex flex-row mt-4">
              <button
                className="border rounded-xl p-2 mr-2"
                onClick={() => handleVerify(domain.domain)}
              >
                {domain.verificationToken ? "Re-Verify" : "Verify"}
              </button>
              <button
                className="border rounded-xl p-2"
                onClick={() => handleCheckVerification(domain.domain)}
                disabled={!domain.verificationToken}
              >
                Check Verification
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
