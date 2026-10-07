import { useAuth } from "@/context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <div>Welcome back, {user?.firstName}.</div>
      <div>Current balance: ${user?.balance}</div>
      <div>Account: xxxx-xxxx-xxxx-{user?.accountNumber?.slice(-4)}</div>
    </div>
  );
};
export default Dashboard;
