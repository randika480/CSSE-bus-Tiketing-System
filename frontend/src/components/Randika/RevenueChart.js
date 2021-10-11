import React from "react";
import { PieChart, Pie, Cell } from "recharts";
import clsx from "clsx";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    "& > *": {
      margin: theme.spacing(1),
    },
  },
  shape: {
    backgroundColor: "#042B58",
    width: 20,
    height: 20,
    borderRadius: "50%",
  },
  shape2: {
    backgroundColor: "#EA2300",
    width: 20,
    height: 20,
    borderRadius: "50%",
  },
}));

const TodayRevenue = () => {
  const classes = useStyles();
  const circle1 = <div className={clsx(classes.shape)} />;
  const circle2 = <div className={clsx(classes.shape2)} />;

  const data = [
    { name: "Train", value: 2000 },
    { name: "Bus", value: 1500 },
  ];
  const COLORS = ["#042B58", "#EA2300"];

  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <div className="w-full  h-max mb-4 bg-white shadow-2xl pb-1">
      {
        <div className="w-2/3 m-auto h-full  ">
          <div>
            <div className="w-full m-auto h-48 ">
              <PieChart width={800} height={400} style={{ margin: "auto" }}>
                <Pie
                  data={data}
                  cx={150}
                  cy={100}
                  innerRadius={30}
                  outerRadius={80}
                  labelLine={false}
                  label={renderCustomizedLabel}
                  fill="#8884d8"
                  paddingAngle={4}
                  dataKey="value"
                  style={{ margin: "auto" }}
                >
                  {data.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
              </PieChart>
            </div>

            <div className="m-1 ml-4  h-11">
              <div style={{ float: "left", marginRight: "5px" }}>{circle1}</div>
              <div style={{ float: "left" }}>Bus : Rs. 1500</div>
              <br />
              <div
                style={{
                  float: "left",
                  marginRight: "5px",
                  margintop: "10px",
                }}
              >
                {circle2}
              </div>
              <div style={{ float: "left" }}>Train : Rs. 2000</div>
            </div>

            <div className="h-5 p-4 text-center font-bold text-md">
              <h5>Today Revenue : 3500</h5>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default TodayRevenue;
