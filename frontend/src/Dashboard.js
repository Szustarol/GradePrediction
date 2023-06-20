import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [dashboardPath, setDashboardPath] = useState("");

  const fetchDashboardPath = async () => {
    const fetchDashboardPath = await fetch(
      "http://127.0.0.1:8001/dashboards"
    ).then((response) => response.json());

    setDashboardPath(fetchDashboardPath);
  };

  useEffect(() => {
    fetchDashboardPath();
  });

  return (
    <div>
      <iframe src={dashboardPath} width="100%" height="800px"></iframe>
    </div>
  );
};

export default Dashboard;
