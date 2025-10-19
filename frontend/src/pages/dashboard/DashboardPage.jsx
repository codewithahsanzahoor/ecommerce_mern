import React, { useEffect } from "react";
import DashboardOverviewComponent from "../../components/dashboard/DashboardOverviewComponent";
import useStatsStore from "../../store/statsStore";

function DashboardPage() {
    const { stats, loading, fetchStats } = useStatsStore();

    useEffect(() => {
        fetchStats();
    }, [fetchStats]);

    if (loading || !stats) {
        return <div>Loading...</div>;
    }

    return (
        <div id="dashboard">
            <DashboardOverviewComponent stats={stats} />
        </div>
    );
}

export default DashboardPage;
