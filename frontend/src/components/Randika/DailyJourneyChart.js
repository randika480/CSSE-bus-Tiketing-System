import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

const DailyJourneyChart = () => {
  const [regularJourneys, setregularJourneys] = useState([]);

  //initialize data array
  const setDataArray = () => {
    const dataArray = [
      { name: "Journey 1", count: 20 },
      { name: "Journey 2", count: 40 },
      { name: "Journey 3", count: 60 },
      { name: "Journey 4", count: 40 },
    ];
    console.log(dataArray);
    setregularJourneys(dataArray);
  };

  useEffect(() => {
    setDataArray();
  }, []);
  return (
    <div className="w-full p-3 h-72 mb-3 pt-0">
      <div className="w-full h-72 bg-white shadow-2xl ">
        <div className="w-full m-auto h-4/5 ">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              width={500}
              height={300}
              data={regularJourneys}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Bar dataKey="count" fill="#8884d8" label={{ position: "top" }}>
                {regularJourneys.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={entry.count > 45 ? "red" : "#042B58"}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DailyJourneyChart;
