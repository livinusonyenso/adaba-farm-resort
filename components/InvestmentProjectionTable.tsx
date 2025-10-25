"use client";

import React from "react";

export default function InvestmentProjectionTable() {
  const data = [
    {
      land: "1 Acre",
      trees: 60,
      fruits: "12,000",
      avgRevenue: "₦6,000,000",
      maxRevenue: "₦12,000,000",
      processing: "₦1.8M / ₦3.6M",
      profit: "₦4.2M / ₦8.4M",
    },
    {
      land: "5 Acres",
      trees: 300,
      fruits: "60,000",
      avgRevenue: "₦30,000,000",
      maxRevenue: "₦60,000,000",
      processing: "₦9M / ₦18M",
      profit: "₦21M / ₦52M",
    },
    {
      land: "10 Acres",
      trees: 600,
      fruits: "120,000",
      avgRevenue: "₦60,000,000",
      maxRevenue: "₦120,000,000",
      processing: "₦18M / ₦36M",
      profit: "₦42M / ₦84M",
    },
    {
      land: "20 Acres",
      trees: 1200,
      fruits: "240,000",
      avgRevenue: "₦120,000,000",
      maxRevenue: "₦240,000,000",
      processing: "₦36M / ₦72M",
      profit: "₦84M / ₦168M",
    },
    {
      land: "50 Acres",
      trees: 3000,
      fruits: "300,000",
      avgRevenue: "₦300,000,000",
      maxRevenue: "₦600,000,000",
      processing: "₦90M / ₦180M",
      profit: "₦210M / ₦420M",
    },
  ];

  return (
    <>
      <h2 className="text-center text-green-800 text-4xl md:text-3xl font-extrabold decoration-green-600 mb-4">
        Investment and Return of Investment Projection
      </h2>

      <div className="overflow-x-auto bg-green-700 text-white p-6 shadow-lg mb-2 ">
        <table className="w-full border-collapse text-sm md:text-base">
          <thead>
            <tr className="border-b border-white/40">
              <th className="py-3 px-2">Land Size</th>
              <th className="py-3 px-2">(Qty) Coconut Tree</th>
              <th className="py-3 px-2">Fruit Projection</th>
              <th className="py-3 px-2">Average Revenue</th>
              <th className="py-3 px-2">Maximum Revenue</th>
              <th className="py-3 px-2">Processing Fee (30%)</th>
              <th className="py-3 px-2">Net Profit Projection</th>
            </tr>
          </thead>

          <tbody>
            {data.map((row, i) => (
              <tr key={i} className="border-b border-white/20 text-center">
                <td className="py-3 px-2">{row.land}</td>
                <td className="py-3 px-2">{row.trees}</td>
                <td className="py-3 px-2">{row.fruits}</td>
                <td className="py-3 px-2">{row.avgRevenue}</td>
                <td className="py-3 px-2">{row.maxRevenue}</td>
                <td className="py-3 px-2">{row.processing}</td>
                <td className="py-3 px-2">{row.profit}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <p className="mt-4 text-xs opacity-90 leading-relaxed">
          <strong>Note:</strong> The quoted prices are based on retail estimates.
          Bulk selling may reduce price range between ₦300 to ₦500 per coconut.
          Values depend on prevailing economic conditions.
        </p>
      </div>
    </>
  );
}
